import React, { useEffect, useState } from 'react';
import { unifiedVoice } from '../utils/voiceService';
import { DialogueItem, AudioSourceType } from '../types/audio';
import { CHARACTER_PROFILES, DIALOGUES_DATABASE } from '../data/dialoguesData';
import { CharacterAvatar } from './CharacterAvatar';
import { Volume2, VolumeX, RotateCcw, Play, Pause, Sparkles, Radio, MessageSquare } from 'lucide-react';

interface VoicePlayerBarProps {
  onOpenTeacherGuide?: () => void;
}

export const VoicePlayerBar: React.FC<VoicePlayerBarProps> = ({ onOpenTeacherGuide }) => {
  const [isPlaying, setIsPlaying] = useState(unifiedVoice.isPlaying());
  const [isMuted, setIsMuted] = useState(unifiedVoice.getIsMuted());
  const [currentDialogue, setCurrentDialogue] = useState<DialogueItem | null>(unifiedVoice.getCurrentDialogue());
  const [activeSource, setActiveSource] = useState<AudioSourceType>(unifiedVoice.getActiveSource());
  const [spokenWordIndex, setSpokenWordIndex] = useState<number>(-1);
  const [showDialogueSelector, setShowDialogueSelector] = useState(false);

  useEffect(() => {
    const unsubscribe = unifiedVoice.subscribe(() => {
      setIsPlaying(unifiedVoice.isPlaying());
      setIsMuted(unifiedVoice.getIsMuted());
      setCurrentDialogue(unifiedVoice.getCurrentDialogue());
      setActiveSource(unifiedVoice.getActiveSource());
    });
    return unsubscribe;
  }, []);

  const handleToggleMute = () => {
    const nextMute = !isMuted;
    setIsMuted(nextMute);
    unifiedVoice.setIsMuted(nextMute);
  };

  const handleReplay = () => {
    if (currentDialogue) {
      unifiedVoice.playDialogue(currentDialogue, {
        onProgress: (_, wordIdx) => setSpokenWordIndex(wordIdx),
        onEnd: () => setSpokenWordIndex(-1),
      });
    }
  };

  const handlePlaySample = (dialogueId: string) => {
    setSpokenWordIndex(-1);
    unifiedVoice.playDialogue(dialogueId, {
      onProgress: (_, wordIdx) => setSpokenWordIndex(wordIdx),
      onEnd: () => setSpokenWordIndex(-1),
    });
  };

  const handleStop = () => {
    unifiedVoice.stop();
    setSpokenWordIndex(-1);
  };

  if (!currentDialogue && !showDialogueSelector) {
    return (
      <div className="bg-white/90 backdrop-blur-md rounded-2xl p-3 border border-slate-200 shadow-xs flex flex-wrap items-center justify-between gap-3 text-xs">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-xl bg-emerald-100 text-emerald-800 flex items-center justify-center font-bold">
            🎙️
          </div>
          <div>
            <span className="font-extrabold text-slate-800 block">
              Hệ thống Giọng đọc 3 Nhân vật AI
            </span>
            <span className="text-slate-500 text-[11px]">
              Cô Ngô Thị Hà (Nữ mô phạm) • Minh (Bé trai 10 tuổi) • An (Bé gái 10 tuổi)
            </span>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => handlePlaySample('teacher_intro_global')}
            className="px-3 py-1.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold transition-all flex items-center gap-1.5 shadow-xs"
          >
            <Play className="w-3.5 h-3.5" />
            <span>Nghe Cô Giáo mở đầu</span>
          </button>

          <button
            onClick={() => setShowDialogueSelector(true)}
            className="px-3 py-1.5 rounded-xl border border-slate-300 text-slate-700 hover:bg-slate-100 font-bold transition-all flex items-center gap-1"
          >
            <MessageSquare className="w-3.5 h-3.5 text-slate-500" />
            <span>Thư viện hội thoại mẫu</span>
          </button>

          <button
            onClick={handleToggleMute}
            className={`p-2 rounded-xl border transition-all ${
              isMuted ? 'bg-rose-50 border-rose-200 text-rose-600' : 'bg-slate-100 hover:bg-slate-200 text-slate-700'
            }`}
            title={isMuted ? 'Bật âm thanh' : 'Tắt âm thanh'}
          >
            {isMuted ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4" />}
          </button>
        </div>
      </div>
    );
  }

  const charProfile = currentDialogue ? CHARACTER_PROFILES[currentDialogue.character] : CHARACTER_PROFILES.teacher;

  // Split text into words for live karaoke-style highlighting
  const words = currentDialogue ? currentDialogue.text.split(/\s+/) : [];

  return (
    <div className="bg-white rounded-3xl p-4 md:p-5 shadow-lg border-2 border-emerald-300/80 space-y-3 transition-all animate-fadeIn">
      {/* Top Status Bar */}
      <div className="flex flex-wrap items-center justify-between gap-2 border-b border-slate-100 pb-2.5">
        <div className="flex items-center gap-2">
          <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[11px] font-extrabold uppercase bg-emerald-100 text-emerald-800">
            <Radio className="w-3 h-3 animate-pulse text-emerald-600" />
            {isPlaying ? 'Đang phát lời thoại' : 'Sẵn sàng phát'}
          </span>

          {/* Source indicator */}
          <span className="text-[10px] font-bold px-2 py-0.5 rounded-md bg-slate-100 text-slate-600 border border-slate-200">
            {activeSource === 'file' && '📁 Tệp âm thanh thu sẵn'}
            {activeSource === 'backend_tts' && '⚡ AI TTS (Gemini Voice)'}
            {activeSource === 'webspeech' && '🗣️ Giọng đọc Web Speech chuẩn'}
          </span>
        </div>

        {/* Action Controls */}
        <div className="flex items-center gap-2">
          {isPlaying ? (
            <button
              onClick={handleStop}
              className="px-3 py-1 rounded-xl bg-slate-200 hover:bg-slate-300 text-slate-700 text-xs font-bold transition-all flex items-center gap-1"
            >
              <Pause className="w-3 h-3" />
              <span>Dừng</span>
            </button>
          ) : (
            <button
              onClick={handleReplay}
              className="px-3 py-1 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold transition-all flex items-center gap-1 shadow-xs"
            >
              <Play className="w-3 h-3" />
              <span>Phát</span>
            </button>
          )}

          <button
            onClick={handleReplay}
            className="p-1.5 rounded-xl border border-slate-200 hover:bg-slate-100 text-slate-600 transition-colors"
            title="Nghe lại câu thoại"
          >
            <RotateCcw className="w-3.5 h-3.5" />
          </button>

          <button
            onClick={handleToggleMute}
            className={`p-1.5 rounded-xl border transition-colors ${
              isMuted ? 'bg-rose-50 border-rose-200 text-rose-600' : 'border-slate-200 hover:bg-slate-100 text-slate-700'
            }`}
            title={isMuted ? 'Bật âm thanh' : 'Tắt âm thanh'}
          >
            {isMuted ? <VolumeX className="w-3.5 h-3.5" /> : <Volume2 className="w-3.5 h-3.5" />}
          </button>

          <button
            onClick={() => setShowDialogueSelector(!showDialogueSelector)}
            className="text-xs font-bold text-emerald-700 hover:underline px-2"
          >
            {showDialogueSelector ? 'Ẩn mẫu thoại' : 'Mẫu thoại'}
          </button>
        </div>
      </div>

      {/* Main Dialogue Box with Live Speaker & Subtitles */}
      {currentDialogue && (
        <div className="flex flex-col sm:flex-row items-start gap-4 bg-slate-50/80 p-4 rounded-2xl border border-slate-200/90">
          <div className="flex flex-col items-center gap-1 shrink-0 mx-auto sm:mx-0">
            <CharacterAvatar
              character={currentDialogue.character}
              emotion={currentDialogue.character === 'teacher' ? 'happy' : currentDialogue.character === 'minh' ? 'thoughtful' : 'happy'}
              size="md"
              isSpeaking={isPlaying}
            />
            <div className="text-center">
              <span className="text-xs font-black text-slate-800 block">
                {charProfile.name}
              </span>
              <span className="text-[10px] text-slate-500 font-semibold">
                {charProfile.roleTitle}
              </span>
            </div>
          </div>

          <div className="flex-1 space-y-1.5">
            <div className="flex items-center gap-1.5 text-xs text-slate-500 font-bold">
              <span>Đặc trưng âm sắc:</span>
              <span className="text-emerald-800 bg-emerald-50 px-2 py-0.5 rounded-md border border-emerald-200">
                {charProfile.voiceConfig.toneDescription}
              </span>
            </div>

            {/* Karaoke Subtitles */}
            <p className="text-sm sm:text-base font-semibold leading-relaxed text-slate-800">
              “
              {words.map((word, idx) => (
                <span
                  key={idx}
                  className={`transition-colors rounded-sm px-0.5 ${
                    idx === spokenWordIndex
                      ? 'bg-amber-300 text-slate-900 font-black shadow-2xs'
                      : idx < spokenWordIndex
                      ? 'text-emerald-900 font-bold'
                      : 'text-slate-700'
                  }`}
                >
                  {word}{' '}
                </span>
              ))}
              ”
            </p>
          </div>
        </div>
      )}

      {/* Dialogue Library Selector (Drawer for Teachers & Students) */}
      {showDialogueSelector && (
        <div className="pt-2 border-t border-slate-200 space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-xs font-black uppercase tracking-wider text-slate-500">
              🎧 Thư viện Lời thoại mẫu (3 Nhân vật)
            </span>
            <button
              onClick={() => setShowDialogueSelector(false)}
              className="text-xs text-slate-400 hover:text-slate-600 font-bold"
            >
              Đóng
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-2">
            <button
              onClick={() => handlePlaySample('teacher_intro_global')}
              className="p-2.5 rounded-xl bg-rose-50 hover:bg-rose-100 border border-rose-200 text-left transition-all active:scale-95"
            >
              <div className="flex items-center gap-1.5 mb-1 text-[11px] font-extrabold text-rose-800">
                <span>👩‍🏫</span>
                <span>Cô giáo – Mở đầu</span>
              </div>
              <p className="text-xs text-slate-700 line-clamp-2">
                “Xin chào các nhà chinh phục lớp 5A7! Cô rất vui...”
              </p>
            </button>

            <button
              onClick={() => handlePlaySample('s2_minh_scenario')}
              className="p-2.5 rounded-xl bg-sky-50 hover:bg-sky-100 border border-sky-200 text-left transition-all active:scale-95"
            >
              <div className="flex items-center gap-1.5 mb-1 text-[11px] font-extrabold text-sky-800">
                <span>👦</span>
                <span>Minh – Trạm 2 (Bài toán khó)</span>
              </div>
              <p className="text-xs text-slate-700 line-clamp-2">
                “Ôi, bài toán này khó quá! Mình đã thử nhiều lần...”
              </p>
            </button>

            <button
              onClick={() => handlePlaySample('s2_an_encourage')}
              className="p-2.5 rounded-xl bg-amber-50 hover:bg-amber-100 border border-amber-200 text-left transition-all active:scale-95"
            >
              <div className="flex items-center gap-1.5 mb-1 text-[11px] font-extrabold text-amber-800">
                <span>👧</span>
                <span>An – Động viên Minh</span>
              </div>
              <p className="text-xs text-slate-700 line-clamp-2">
                “Minh ơi, đừng vội bỏ cuộc nhé! Chúng mình có thể...”
              </p>
            </button>

            <button
              onClick={() => handlePlaySample('s2_teacher_feedback_global')}
              className="p-2.5 rounded-xl bg-emerald-50 hover:bg-emerald-100 border border-emerald-200 text-left transition-all active:scale-95"
            >
              <div className="flex items-center gap-1.5 mb-1 text-[11px] font-extrabold text-emerald-800">
                <span>👩‍🏫</span>
                <span>Cô giáo – Phản hồi</span>
              </div>
              <p className="text-xs text-slate-700 line-clamp-2">
                “Các em thấy không, khi gặp khó khăn, chúng ta có thể...”
              </p>
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
