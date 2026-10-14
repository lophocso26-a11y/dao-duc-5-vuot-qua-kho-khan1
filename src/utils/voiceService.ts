import { DialogueItem, VoiceCharacter, AudioSourceType } from '../types/audio';
import { CHARACTER_PROFILES, DIALOGUES_DATABASE } from '../data/dialoguesData';

export type VoiceEventCallback = {
  onStart?: (dialogue: DialogueItem, source: AudioSourceType) => void;
  onEnd?: (dialogue: DialogueItem) => void;
  onProgress?: (progress: number, spokenWordIndex: number) => void;
  onError?: (err: Error) => void;
};

class UnifiedVoiceEngine {
  private isMuted: boolean = false;
  private currentAudioElement: HTMLAudioElement | null = null;
  private currentUtterance: SpeechSynthesisUtterance | null = null;
  private currentDialogue: DialogueItem | null = null;
  private activeSource: AudioSourceType = 'file';
  private isPlayingState: boolean = false;
  private listeners: Set<() => void> = new Set();
  private progressInterval: number | null = null;
  private audioContext: AudioContext | null = null;

  // Cache for generated backend TTS base64 audio
  private ttsCache: Map<string, string> = new Map();

  constructor() {
    if (typeof window !== 'undefined') {
      const savedMute = localStorage.getItem('applet_audio_muted');
      if (savedMute !== null) {
        this.isMuted = savedMute === 'true';
      }
      // Warm up voices
      if ('speechSynthesis' in window) {
        window.speechSynthesis.getVoices();
        window.speechSynthesis.onvoiceschanged = () => {
          window.speechSynthesis.getVoices();
        };
      }
    }
  }

  public subscribe(listener: () => void) {
    this.listeners.add(listener);
    return () => {
      this.listeners.delete(listener);
    };
  }

  private notify() {
    this.listeners.forEach((l) => l());
  }

  public getIsMuted(): boolean {
    return this.isMuted;
  }

  public setIsMuted(muted: boolean) {
    this.isMuted = muted;
    if (typeof window !== 'undefined') {
      localStorage.setItem('applet_audio_muted', muted ? 'true' : 'false');
    }
    if (muted) {
      this.stop();
    }
    this.notify();
  }

  public isPlaying(): boolean {
    return this.isPlayingState;
  }

  public getCurrentDialogue(): DialogueItem | null {
    return this.currentDialogue;
  }

  public getActiveSource(): AudioSourceType {
    return this.activeSource;
  }

  // Stop any ongoing voice output immediately
  public stop() {
    if (this.currentAudioElement) {
      this.currentAudioElement.pause();
      this.currentAudioElement.currentTime = 0;
      this.currentAudioElement = null;
    }
    if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
      window.speechSynthesis.cancel();
      this.currentUtterance = null;
    }
    if (this.progressInterval) {
      window.clearInterval(this.progressInterval);
      this.progressInterval = null;
    }
    this.isPlayingState = false;
    this.currentDialogue = null;
    this.notify();
  }

  // Speak a dialogue item or raw text with full fallback pipeline
  public async playDialogue(
    dialogueOrId: DialogueItem | string,
    callbacks?: VoiceEventCallback
  ): Promise<void> {
    if (this.isMuted) {
      return;
    }

    // Stop previous audio to avoid overlap
    this.stop();

    let dialogue: DialogueItem;
    if (typeof dialogueOrId === 'string') {
      const found = DIALOGUES_DATABASE[dialogueOrId];
      if (found) {
        dialogue = found;
      } else {
        // Fallback dynamic item
        dialogue = {
          id: dialogueOrId,
          character: 'teacher',
          characterName: 'Cô Ngô Thị Hà',
          category: 'feedback',
          text: dialogueOrId,
          audioSrc: '',
          status: 'idle',
          fallbackType: 'backend_tts',
          voiceConfig: CHARACTER_PROFILES.teacher.voiceConfig,
        };
      }
    } else {
      dialogue = dialogueOrId;
    }

    this.currentDialogue = dialogue;
    this.isPlayingState = true;
    this.notify();

    // Priority 1: Check Pre-recorded File
    if (dialogue.audioSrc) {
      const success = await this.playAudioFile(dialogue, callbacks);
      if (success) {
        this.activeSource = 'file';
        return;
      }
    }

    // Priority 2: Secure Backend TTS Service
    const ttsSuccess = await this.playBackendTTS(dialogue, callbacks);
    if (ttsSuccess) {
      this.activeSource = 'backend_tts';
      return;
    }

    // Priority 3: High-Fidelity Web Speech API with tailored 3-character personas
    this.activeSource = 'webspeech';
    this.playWebSpeech(dialogue, callbacks);
  }

  // Priority 1: Audio File Player (checks both specified path and alternate .wav/.mp3)
  private async playAudioFile(dialogue: DialogueItem, callbacks?: VoiceEventCallback): Promise<boolean> {
    const candidatePaths = [dialogue.audioSrc];
    if (dialogue.audioSrc.endsWith('.mp3')) {
      candidatePaths.push(dialogue.audioSrc.replace(/\.mp3$/, '.wav'));
    } else if (dialogue.audioSrc.endsWith('.wav')) {
      candidatePaths.push(dialogue.audioSrc.replace(/\.wav$/, '.mp3'));
    }

    for (const src of candidatePaths) {
      const success = await this.tryPlaySingleFile(src, dialogue, callbacks);
      if (success) return true;
    }
    return false;
  }

  private tryPlaySingleFile(src: string, dialogue: DialogueItem, callbacks?: VoiceEventCallback): Promise<boolean> {
    return new Promise((resolve) => {
      try {
        const audio = new Audio(src);
        audio.preload = 'auto';

        let hasResolved = false;

        const onCanPlay = () => {
          if (hasResolved) return;
          hasResolved = true;
          this.currentAudioElement = audio;

          audio
            .play()
            .then(() => {
              if (callbacks?.onStart) callbacks.onStart(dialogue, 'file');
              this.trackAudioProgress(audio, dialogue, callbacks);
              resolve(true);
            })
            .catch(() => {
              resolve(false);
            });
        };

        const onError = () => {
          if (!hasResolved) {
            hasResolved = true;
            resolve(false);
          }
        };

        audio.addEventListener('canplaythrough', onCanPlay, { once: true });
        audio.addEventListener('error', onError, { once: true });

        audio.addEventListener('ended', () => {
          this.isPlayingState = false;
          this.currentDialogue = null;
          this.currentAudioElement = null;
          if (this.progressInterval) clearInterval(this.progressInterval);
          if (callbacks?.onEnd) callbacks.onEnd(dialogue);
          this.notify();
        });

        // Timeout fallback if file doesn't load within 700ms
        setTimeout(() => {
          if (!hasResolved) {
            hasResolved = true;
            resolve(false);
          }
        }, 700);
      } catch {
        resolve(false);
      }
    });
  }

  // Priority 2: Backend Gemini Flash TTS (Serverless & Express)
  private async playBackendTTS(dialogue: DialogueItem, callbacks?: VoiceEventCallback): Promise<boolean> {
    try {
      // Check in-memory cache first
      let audioUrl = this.ttsCache.get(dialogue.text);

      if (!audioUrl) {
        const res = await fetch('/api/tts', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            text: dialogue.text,
            character: dialogue.character,
          }),
        });

        if (!res.ok) return false;
        const data = await res.json();
        if (data && data.success && typeof data.audioData === 'string') {
          audioUrl = data.audioData;
          this.ttsCache.set(dialogue.text, data.audioData);
        }
      }

      if (!audioUrl) return false;

      const audio = new Audio(audioUrl);
      this.currentAudioElement = audio;

      return new Promise((resolve) => {
        audio.onended = () => {
          this.isPlayingState = false;
          this.currentDialogue = null;
          this.currentAudioElement = null;
          if (this.progressInterval) clearInterval(this.progressInterval);
          if (callbacks?.onEnd) callbacks.onEnd(dialogue);
          this.notify();
        };

        audio.onerror = () => {
          resolve(false);
        };

        audio
          .play()
          .then(() => {
            if (callbacks?.onStart) callbacks.onStart(dialogue, 'backend_tts');
            this.trackAudioProgress(audio, dialogue, callbacks);
            resolve(true);
          })
          .catch(() => resolve(false));
      });
    } catch {
      return false;
    }
  }

  // Priority 3: Web Speech API - ONLY IF genuine Vietnamese voice is installed
  private playWebSpeech(dialogue: DialogueItem, callbacks?: VoiceEventCallback) {
    if (typeof window === 'undefined' || !('speechSynthesis' in window)) {
      this.isPlayingState = false;
      this.notify();
      return;
    }

    const cleanText = dialogue.text.replace(/[*_#]/g, '');

    // Search Vietnamese voice
    const voices = window.speechSynthesis.getVoices();
    const viVoices = voices.filter(
      (v) => v.lang.toLowerCase().includes('vi') || v.lang.toLowerCase().includes('vn')
    );

    // CRITICAL: NEVER use an English voice to pronounce Vietnamese words
    if (viVoices.length === 0) {
      console.warn('Thiết bị chưa có giọng đọc tiếng Việt Web Speech API. Vui lòng sử dụng tệp âm thanh AI hoặc kết nối mạng.');
      this.isPlayingState = false;
      this.notify();
      if (callbacks?.onError) {
        callbacks.onError(new Error('Thiết bị chưa có giọng đọc tiếng Việt hệ thống. Đang ưu tiên phát tệp âm thanh AI.'));
      }
      return;
    }

    const utterance = new SpeechSynthesisUtterance(cleanText);
    utterance.lang = 'vi-VN';

    const charConfig = CHARACTER_PROFILES[dialogue.character] || CHARACTER_PROFILES.teacher;
    utterance.pitch = charConfig.voiceConfig.pitch;
    utterance.rate = charConfig.voiceConfig.rate;

    if (dialogue.character === 'teacher') {
      // Prefer natural female Vietnamese voice
      const femaleVoice = viVoices.find(
        (v) =>
          v.name.toLowerCase().includes('female') ||
          v.name.toLowerCase().includes('nu') ||
          v.name.toLowerCase().includes('mai') ||
          v.name.toLowerCase().includes('hoaimy') ||
          v.name.toLowerCase().includes('linh')
      );
      utterance.voice = femaleVoice || viVoices[0];
    } else if (dialogue.character === 'minh') {
      const maleVoice = viVoices.find(
        (v) =>
          v.name.toLowerCase().includes('male') ||
          v.name.toLowerCase().includes('nam') ||
          v.name.toLowerCase().includes('minh')
      );
      utterance.voice = maleVoice || viVoices[0];
    } else {
      const girlVoice = viVoices.find(
        (v) =>
          v.name.toLowerCase().includes('an') ||
          v.name.toLowerCase().includes('female') ||
          v.name.toLowerCase().includes('nu')
      );
      utterance.voice = girlVoice || viVoices[0];
    }

    utterance.onstart = () => {
      this.isPlayingState = true;
      if (callbacks?.onStart) callbacks.onStart(dialogue, 'webspeech');
      this.trackSpeechProgress(cleanText, utterance, callbacks);
      this.notify();
    };

    utterance.onend = () => {
      this.isPlayingState = false;
      this.currentDialogue = null;
      this.currentUtterance = null;
      if (this.progressInterval) clearInterval(this.progressInterval);
      if (callbacks?.onEnd) callbacks.onEnd(dialogue);
      this.notify();
    };

    utterance.onerror = (e) => {
      this.isPlayingState = false;
      this.currentDialogue = null;
      this.currentUtterance = null;
      if (this.progressInterval) clearInterval(this.progressInterval);
      if (callbacks?.onError) callbacks.onError(new Error(e.error));
      this.notify();
    };

    this.currentUtterance = utterance;
    window.speechSynthesis.speak(utterance);
  }

  private trackAudioProgress(audio: HTMLAudioElement, dialogue: DialogueItem, callbacks?: VoiceEventCallback) {
    if (this.progressInterval) clearInterval(this.progressInterval);
    const words = dialogue.text.split(/\s+/);

    this.progressInterval = window.setInterval(() => {
      if (audio.duration && !audio.paused) {
        const progress = audio.currentTime / audio.duration;
        const wordIndex = Math.min(Math.floor(progress * words.length), words.length - 1);
        if (callbacks?.onProgress) {
          callbacks.onProgress(progress, wordIndex);
        }
      }
    }, 80);
  }

  private trackSpeechProgress(text: string, utterance: SpeechSynthesisUtterance, callbacks?: VoiceEventCallback) {
    if (this.progressInterval) clearInterval(this.progressInterval);
    const words = text.split(/\s+/);
    let currentIndex = 0;

    // Web Speech onboundary event for word progress
    utterance.onboundary = (e) => {
      if (e.name === 'word') {
        const charIndex = e.charIndex;
        const textBefore = text.slice(0, charIndex);
        currentIndex = textBefore.trim().split(/\s+/).length;
        const progress = Math.min(currentIndex / words.length, 1);
        if (callbacks?.onProgress) {
          callbacks.onProgress(progress, currentIndex);
        }
      }
    };
  }

  // Play dialogue sequence in order (e.g. Minh speaks -> An encourages -> Teacher concludes)
  public async playSequence(dialogueIds: string[], onSequenceComplete?: () => void) {
    if (this.isMuted || dialogueIds.length === 0) return;

    let index = 0;
    const playNext = async () => {
      if (index >= dialogueIds.length) {
        if (onSequenceComplete) onSequenceComplete();
        return;
      }
      const id = dialogueIds[index];
      index++;
      await this.playDialogue(id, {
        onEnd: () => {
          setTimeout(playNext, 450); // Natural breathing pause between speakers
        },
      });
    };

    playNext();
  }
}

export const unifiedVoice = new UnifiedVoiceEngine();
