export type VoiceCharacter = 'teacher' | 'minh' | 'an';

export type AudioLoadStatus = 'idle' | 'loading' | 'loaded' | 'error' | 'fallback_used';

export type AudioSourceType = 'file' | 'backend_tts' | 'webspeech';

export interface DialogueItem {
  id: string;
  character: VoiceCharacter;
  characterName: string;
  stationId?: number;
  optionId?: string;
  category: 'intro' | 'scenario' | 'encouragement' | 'feedback' | 'celebration' | 'ui';
  text: string;
  audioSrc: string; // e.g. "/audio/teacher/intro.mp3"
  durationEstimatedSeconds?: number;
  status: AudioLoadStatus;
  fallbackType: 'backend_tts' | 'webspeech';
  voiceConfig: {
    // Web Speech API tailored fallback parameters to distinguish the 3 characters
    pitch: number;    // Teacher ~ 1.0; Minh ~ 1.35; An ~ 1.45
    rate: number;     // Teacher ~ 0.95; Minh ~ 1.05; An ~ 0.98
    gender: 'female' | 'male';
    toneDescription: string;
    // Gemini TTS mapping
    geminiVoiceName: string; // e.g. "Kore" for teacher, "Puck" for Minh, "Zephyr" for An
    geminiPromptStyle?: string;
  };
}

export interface AudioPlaybackState {
  currentDialogueId: string | null;
  isPlaying: boolean;
  isPaused: boolean;
  isMuted: boolean;
  currentSpeaker: VoiceCharacter | null;
  spokenText: string;
  highlightedWordIndex: number;
  activeSource: AudioSourceType;
  audioDuration: number;
  currentTime: number;
}
