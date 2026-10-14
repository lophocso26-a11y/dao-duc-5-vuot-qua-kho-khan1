import React, { useEffect, useState } from 'react';
import { StationOption } from '../types/game';
import { CharacterAvatar } from './CharacterAvatar';
import { VisualIllustration } from './VisualIllustration';
import { unifiedVoice } from '../utils/voiceService';
import { DIALOGUES_DATABASE, CHARACTER_PROFILES } from '../data/dialoguesData';
import { DialogueItem } from '../types/audio';
import { Volume2, VolumeX, RotateCcw, ArrowRight, BookOpen, Heart, HelpCircle, Compass, Sparkles, Radio } from 'lucide-react';

interface PedagogicalFeedbackCardProps {
  option: StationOption;
  character: 'minh' | 'an';
  onContinue: () => void;
  onTryAnother: () => void;
  isLastStation: boolean;
}

export const PedagogicalFeedbackCard: React.FC<PedagogicalFeedbackCardProps> = ({
  option,
  character,
  onContinue,
  onTryAnother,
  isLastStation,
}) => {
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [isMuted, setIsMuted] = useState(unifiedVoice.getIsMuted());

  const { fourPillars, fullSpeech, characterEmotion, appropriateness, visualIllustration, nextActionLabel } = option;

  const dialogueItem: DialogueItem = DIALOGUES_DATABASE[option.id] || {
    id: option.id,
    character: 'teacher',
    characterName: 'Cô Ngô Thị Hà',
    category: 'feedback',
    text: fullSpeech,
    audioSrc: `/audio/teacher/${option.id}.mp3`,
    status: 'idle',
    fallbackType: 'backend_tts',
    voiceConfig: CHARACTER_PROFILES.teacher.voiceConfig,
  };

  // Speak feedback automatically upon mounting if audio not muted
  useEffect(() => {
    setIsMuted(unifiedVoice.getIsMuted());
    if (!unifiedVoice.getIsMuted()) {
      unifiedVoice.playDialogue(dialogueItem, {
        onStart: () => setIsSpeaking(true),
        onEnd: () => setIsSpeaking(false),
      });
    }

    return () => {
      unifiedVoice.stop();
    };
  }, [option.id]);

  const handleToggleMute = () => {
    const nextMuted = !isMuted;
    setIsMuted(nextMuted);
    unifiedVoice.setIsMuted(nextMuted);
    if (!nextMuted) {
      unifiedVoice.playDialogue(dialogueItem, {
        onStart: () => setIsSpeaking(true),
        onEnd: () => setIsSpeaking(false),
      });
    }
  };

  const handleReplaySpeech = () => {
    if (isMuted) {
      setIsMuted(false);
      unifiedVoice.setIsMuted(false);
    }
    unifiedVoice.playDialogue(dialogueItem, {
      onStart: () => setIsSpeaking(true),
      onEnd: () => setIsSpeaking(false),
    });
  };

  const isOptimal = appropriateness === 'optimal';

  return (
    <div className="bg-white rounded-3xl shadow-xl border border-slate-200/80 overflow-hidden transition-all duration-300">
      {/* Top Banner with Teacher / Student Context */}
      <div className={`px-6 py-4 flex flex-wrap items-center justify-between gap-3 ${
        isOptimal
          ? 'bg-gradient-to-r from-emerald-500 via-teal-500 to-green-600 text-white'
          : 'bg-gradient-to-r from-amber-500 via-orange-500 to-yellow-600 text-white'
      }`}>
        <div className="flex items-center gap-3">
          <CharacterAvatar
            character="teacher"
            emotion="happy"
            size="sm"
            className="border-white/80"
          />
          <div>
            <div className="flex items-center gap-2">
              <span className="text-xs uppercase font-extrabold tracking-wider bg-white/20 backdrop-blur-xs px-2.5 py-0.5 rounded-full">
                Phản hồi sư phạm lớp 5A7
              </span>
              <span className="text-xs text-white/90 font-medium">Cô Ngô Thị Hà đồng hành</span>
            </div>
            <h3 className="text-lg font-black tracking-tight mt-0.5">
              {isOptimal ? '🎉 Hướng đi bản lĩnh và vững vàng' : '🌱 Góc nhìn chia sẻ & Cùng hoàn thiện'}
            </h3>
          </div>
        </div>

        {/* Audio controls */}
        <div className="flex items-center gap-2 bg-black/15 backdrop-blur-xs p-1.5 rounded-2xl">
          <button
            onClick={handleReplaySpeech}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-bold transition-all ${
              isSpeaking
                ? 'bg-white text-emerald-700 shadow-sm animate-pulse'
                : 'hover:bg-white/20 text-white'
            }`}
            title="Nghe lại giọng đọc tiếng Việt"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>{isSpeaking ? 'Đang đọc...' : 'Nghe lại'}</span>
          </button>

          <button
            onClick={handleToggleMute}
            className="p-1.5 rounded-xl hover:bg-white/20 text-white transition-colors"
            title={isMuted ? 'Bật âm thanh' : 'Tắt âm thanh'}
          >
            {isMuted ? <VolumeX className="w-4 h-4 text-rose-200" /> : <Volume2 className="w-4 h-4" />}
          </button>
        </div>
      </div>

      <div className="p-6 md:p-8 space-y-6">
        {/* Character Dialogue Box with Animated Speech Bubble */}
        <div className="flex flex-col sm:flex-row gap-5 items-start">
          <div className="flex flex-col items-center gap-2 shrink-0 mx-auto sm:mx-0">
            <CharacterAvatar
              character={character}
              emotion={characterEmotion}
              size="lg"
              isSpeaking={isSpeaking}
            />
            <span className="text-xs font-bold text-slate-600 bg-slate-100 px-3 py-1 rounded-full">
              {character === 'minh' ? 'Bạn Minh' : 'Bạn An'}
            </span>
          </div>

          <div className="relative flex-1 w-full">
            {/* Comic Speech Bubble */}
            <div className="relative bg-gradient-to-br from-slate-50 to-emerald-50/30 p-5 rounded-2xl border-2 border-emerald-200 shadow-inner">
              {/* Arrow pointing to avatar */}
              <div className="hidden sm:block absolute -left-3 top-6 w-0 h-0 border-t-8 border-t-transparent border-b-8 border-b-transparent border-r-[12px] border-r-emerald-200" />

              <div className="flex items-center gap-2 mb-2 text-emerald-800 text-xs font-extrabold tracking-wide uppercase">
                <Sparkles className="w-3.5 h-3.5" />
                <span>Lời khuyên chân thành (Đạo đức lớp 5)</span>
              </div>

              <p className="text-base sm:text-lg text-slate-800 font-medium leading-relaxed italic">
                “{fullSpeech}”
              </p>
            </div>
          </div>
        </div>

        {/* Visual Illustration of Choice Consequence */}
        <VisualIllustration
          illustration={visualIllustration}
          emotion={characterEmotion}
          appropriateness={appropriateness}
        />

        {/* 4 Pedagogical Pillars in Clean Cards */}
        <div className="space-y-3 pt-2">
          <div className="flex items-center justify-between">
            <h4 className="text-sm font-extrabold text-slate-700 uppercase tracking-wider flex items-center gap-2">
              <BookOpen className="w-4 h-4 text-emerald-600" />
              <span>4 Nấc thang phân tích sư phạm</span>
            </h4>
            <span className="text-xs text-slate-400 font-medium">Đạo đức lớp 5 - Bài 3</span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5">
            {/* Pillar 1: Acknowledge */}
            <div className="p-4 rounded-2xl bg-sky-50/80 border border-sky-200/90 hover:shadow-xs transition-shadow">
              <div className="flex items-center gap-2 text-sky-800 font-bold text-xs uppercase mb-1.5">
                <Heart className="w-4 h-4 text-sky-600" />
                <span>1. Ghi nhận suy nghĩ</span>
              </div>
              <p className="text-sm text-slate-700 leading-relaxed">
                {fourPillars.acknowledge}
              </p>
            </div>

            {/* Pillar 2: Explanation & Consequence */}
            <div className="p-4 rounded-2xl bg-amber-50/80 border border-amber-200/90 hover:shadow-xs transition-shadow">
              <div className="flex items-center gap-2 text-amber-800 font-bold text-xs uppercase mb-1.5">
                <HelpCircle className="w-4 h-4 text-amber-600" />
                <span>2. Nguyên nhân & Hệ quả</span>
              </div>
              <p className="text-sm text-slate-700 leading-relaxed">
                {fourPillars.explanation}
              </p>
            </div>

            {/* Pillar 3: Suggestion for Growth */}
            <div className="p-4 rounded-2xl bg-teal-50/80 border border-teal-200/90 hover:shadow-xs transition-shadow">
              <div className="flex items-center gap-2 text-teal-800 font-bold text-xs uppercase mb-1.5">
                <Compass className="w-4 h-4 text-teal-600" />
                <span>3. Gợi mở cách cải thiện</span>
              </div>
              <p className="text-sm text-slate-700 leading-relaxed">
                {fourPillars.suggestion}
              </p>
            </div>

            {/* Pillar 4: Encouragement */}
            <div className="p-4 rounded-2xl bg-purple-50/80 border border-purple-200/90 hover:shadow-xs transition-shadow">
              <div className="flex items-center gap-2 text-purple-800 font-bold text-xs uppercase mb-1.5">
                <Sparkles className="w-4 h-4 text-purple-600" />
                <span>4. Khích lệ & Tiếp tục</span>
              </div>
              <p className="text-sm text-slate-700 leading-relaxed">
                {fourPillars.encouragement}
              </p>
            </div>
          </div>
        </div>

        {/* Insight Pebble Banner */}
        <div className="p-3.5 bg-slate-50 border border-slate-200 rounded-2xl flex items-center gap-3">
          <div className="w-8 h-8 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center shrink-0">
            💎
          </div>
          <div className="text-xs text-slate-700">
            <strong className="text-slate-900 font-bold">Hạt ngọc bản lĩnh tích lũy:</strong>{' '}
            {option.resilienceInsight}
          </div>
        </div>

        {/* Bottom Action Buttons */}
        <div className="pt-2 flex flex-col sm:flex-row items-center justify-between gap-3 border-t border-slate-100">
          <button
            onClick={onTryAnother}
            className="w-full sm:w-auto px-5 py-3 rounded-2xl border-2 border-slate-300 text-slate-700 hover:bg-slate-100 font-bold text-sm flex items-center justify-center gap-2 transition-all active:scale-95"
          >
            <RotateCcw className="w-4 h-4 text-slate-500" />
            <span>Thử khám phá phương án khác</span>
          </button>

          <button
            onClick={onContinue}
            className={`w-full sm:w-auto px-7 py-3 rounded-2xl font-extrabold text-sm flex items-center justify-center gap-2 transition-all shadow-md active:scale-95 ${
              isOptimal
                ? 'bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700 text-white shadow-emerald-500/20'
                : 'bg-gradient-to-r from-amber-600 to-orange-600 hover:from-amber-700 hover:to-orange-700 text-white shadow-amber-500/20'
            }`}
          >
            <span>{isLastStation && isOptimal ? 'Lên Đỉnh Núi Vinh Quang' : nextActionLabel}</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
};
