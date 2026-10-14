import React, { useState } from 'react';
import { Station, StationOption } from '../types/game';
import { PedagogicalFeedbackCard } from './PedagogicalFeedbackCard';
import { audioService } from '../utils/audio';
import { unifiedVoice } from '../utils/voiceService';
import { DIALOGUES_DATABASE } from '../data/dialoguesData';
import { Sparkles, HelpCircle, Compass, Award, CheckCircle2, ChevronRight, Play, Volume2 } from 'lucide-react';

interface StationQuestionViewProps {
  station: Station;
  character: 'minh' | 'an';
  selectedOptionId?: string;
  onSelectOption: (option: StationOption) => void;
  onNextStation: () => void;
  isLastStation: boolean;
}

export const StationQuestionView: React.FC<StationQuestionViewProps> = ({
  station,
  character,
  selectedOptionId,
  onSelectOption,
  onNextStation,
  isLastStation,
}) => {
  const [activeOption, setActiveOption] = useState<StationOption | null>(() => {
    if (selectedOptionId) {
      return station.options.find(o => o.id === selectedOptionId) || null;
    }
    return null;
  });

  const [showHint, setShowHint] = useState(false);

  // Dialogue IDs for this station
  const teacherIntroId = `s${station.id}_teacher_intro`;
  const scenarioDialogueId = station.id === 3 ? `s3_an_scenario` : `s${station.id}_minh_scenario`;
  const encourageDialogueId = station.id === 3 ? `s3_minh_encourage` : `s${station.id}_an_encourage`;

  const handlePlayDialogue = (dialogueId: string) => {
    unifiedVoice.playDialogue(dialogueId);
  };

  const handleChooseOption = (opt: StationOption) => {
    setActiveOption(opt);
    onSelectOption(opt);

    if (opt.appropriateness === 'optimal') {
      audioService.playPositiveChime();
    } else {
      audioService.playGentleReflect();
    }
  };

  const handleResetOption = () => {
    setActiveOption(null);
  };

  return (
    <div className="space-y-6">
      {/* Station Header Header Card */}
      <div className="bg-white rounded-3xl p-6 md:p-8 shadow-sm border border-slate-200">
        <div className="flex flex-wrap items-center justify-between gap-3 mb-4">
          <div className="flex items-center gap-2">
            <span className="bg-emerald-100 text-emerald-800 text-xs font-black px-3 py-1 rounded-full uppercase tracking-wider">
              {station.mountainLocation}
            </span>
            <span className="bg-sky-100 text-sky-800 text-xs font-bold px-3 py-1 rounded-full">
              {station.competencyFocus}
            </span>
          </div>

          <div className="flex items-center gap-1.5 text-xs text-amber-700 bg-amber-50 px-3 py-1 rounded-full font-bold border border-amber-200">
            <Award className="w-3.5 h-3.5 text-amber-600" />
            <span>Huy hiệu: {station.stationBadge.name}</span>
          </div>
        </div>

        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div>
            <h2 className="text-2xl md:text-3xl font-black text-slate-800 tracking-tight">
              {station.title}
            </h2>
            <p className="text-emerald-700 font-bold text-sm md:text-base mt-1">
              {station.subtitle}
            </p>
          </div>

          {/* Quick Voice Line Button for Station Intro */}
          <button
            onClick={() => handlePlayDialogue(teacherIntroId)}
            className="self-start sm:self-auto px-3.5 py-2 rounded-2xl bg-rose-50 hover:bg-rose-100 text-rose-800 border border-rose-200 text-xs font-bold transition-all flex items-center gap-2 shadow-2xs active:scale-95"
            title="Lắng nghe lời dẫn dắt của Cô Ngô Thị Hà"
          >
            <span>👩‍🏫</span>
            <span>Nghe Cô Hà giới thiệu trạm</span>
            <Volume2 className="w-3.5 h-3.5 text-rose-600" />
          </button>
        </div>

        {/* Situation Card */}
        <div className="mt-5 p-5 md:p-6 rounded-2xl bg-gradient-to-br from-amber-50/70 via-orange-50/40 to-yellow-50/80 border border-amber-200/90 shadow-inner space-y-4">
          <div className="flex items-center justify-between gap-2 flex-wrap">
            <div className="flex items-center gap-2.5">
              <div className="w-7 h-7 rounded-lg bg-amber-500 text-white flex items-center justify-center font-black text-xs shadow-xs">
                📖
              </div>
              <h3 className="text-base font-extrabold text-slate-900">
                Tình huống: {station.scenario.situationTitle}
              </h3>
            </div>

            {/* Character Dialogue Voice Buttons */}
            <div className="flex items-center gap-2">
              <button
                onClick={() => handlePlayDialogue(scenarioDialogueId)}
                className="px-2.5 py-1.5 rounded-xl bg-white hover:bg-sky-50 text-sky-800 border border-sky-200 text-xs font-extrabold transition-all flex items-center gap-1 shadow-2xs"
                title="Lắng nghe giọng nhân vật chính"
              >
                <span>{station.id === 3 ? '👧' : '👦'}</span>
                <span>Nghe {station.id === 3 ? 'An' : 'Minh'} nói</span>
                <Play className="w-3 h-3 text-sky-600" />
              </button>

              <button
                onClick={() => handlePlayDialogue(encourageDialogueId)}
                className="px-2.5 py-1.5 rounded-xl bg-white hover:bg-amber-50 text-amber-800 border border-amber-200 text-xs font-extrabold transition-all flex items-center gap-1 shadow-2xs"
                title="Lắng nghe bạn bè động viên"
              >
                <span>{station.id === 3 ? '👦' : '👧'}</span>
                <span>Nghe {station.id === 3 ? 'Minh' : 'An'} động viên</span>
                <Play className="w-3 h-3 text-amber-600" />
              </button>
            </div>
          </div>

          <p className="text-slate-700 text-sm md:text-base leading-relaxed">
            {station.scenario.situationDescription}
          </p>

          <div className="mt-3 pt-3 border-t border-amber-200 flex items-center gap-2 text-slate-900 font-extrabold text-sm md:text-base">
            <Compass className="w-5 h-5 text-emerald-600 shrink-0" />
            <span>{station.scenario.dilemma}</span>
          </div>
        </div>

        {/* Gentle Pedagogical Hint Toggle */}
        <div className="mt-3 flex items-center justify-between">
          <button
            onClick={() => setShowHint(!showHint)}
            className="text-xs text-slate-500 hover:text-emerald-700 font-bold flex items-center gap-1.5 transition-colors"
          >
            <HelpCircle className="w-3.5 h-3.5" />
            <span>{showHint ? 'Ẩn lời khuyên của Cô Ngô Thị Hà' : 'Xem gợi ý từ Cô Ngô Thị Hà'}</span>
          </button>
          <span className="text-xs text-slate-400">
            Mỗi lựa chọn đều có bài học quý giá riêng
          </span>
        </div>

        {showHint && (
          <div className="mt-3 p-4 rounded-xl bg-emerald-50 border border-emerald-200 text-xs md:text-sm text-emerald-900 leading-relaxed animate-fadeIn">
            <strong>Lời cô nhắn nhủ:</strong> “Các em lớp 5A7 thân mến, khi đối mặt với khó khăn, không có lựa chọn nào là vô nghĩa. Hãy chọn cách em cho là phù hợp nhất để cùng lắng nghe phản hồi và rút ra kinh nghiệm quý báu nhé!”
          </div>
        )}
      </div>

      {/* Options Selection Grid */}
      <div className="space-y-3">
        <div className="flex items-center justify-between px-2">
          <span className="text-xs uppercase font-extrabold tracking-wider text-slate-500">
            Hãy chọn một phương án xử lý:
          </span>
          <span className="text-xs text-emerald-700 font-semibold">
            (Có thể nhấn thử nhiều phương án để tìm hiểu góc nhìn)
          </span>
        </div>

        <div className="grid grid-cols-1 gap-3.5">
          {station.options.map((opt) => {
            const isSelected = activeOption?.id === opt.id;
            return (
              <button
                key={opt.id}
                onClick={() => handleChooseOption(opt)}
                className={`w-full text-left p-4 md:p-5 rounded-2xl border-2 transition-all duration-200 flex items-start gap-4 active:scale-[0.99] ${
                  isSelected
                    ? 'bg-emerald-50/90 border-emerald-500 shadow-md ring-2 ring-emerald-300'
                    : 'bg-white hover:bg-slate-50/90 border-slate-200 hover:border-slate-300 shadow-xs'
                }`}
              >
                <div
                  className={`w-10 h-10 rounded-xl flex items-center justify-center font-black text-sm shrink-0 transition-colors ${
                    isSelected
                      ? 'bg-emerald-600 text-white shadow-xs'
                      : 'bg-slate-100 text-slate-700'
                  }`}
                >
                  {opt.label}
                </div>

                <div className="flex-1">
                  <p className="text-sm md:text-base font-bold text-slate-800 leading-snug">
                    {opt.text}
                  </p>
                  <div className="mt-1 flex items-center gap-2">
                    <span className="text-xs text-slate-400">
                      Nhấn để lắng nghe phản hồi chi tiết
                    </span>
                  </div>
                </div>

                <ChevronRight
                  className={`w-5 h-5 mt-2 transition-transform ${
                    isSelected ? 'text-emerald-600 translate-x-1' : 'text-slate-300'
                  }`}
                />
              </button>
            );
          })}
        </div>
      </div>

      {/* Pedagogical Feedback Card appears when an option is selected */}
      {activeOption && (
        <div id="pedagogical-feedback-section" className="pt-2 animate-fadeIn">
          <PedagogicalFeedbackCard
            option={activeOption}
            character={character}
            onContinue={onNextStation}
            onTryAnother={handleResetOption}
            isLastStation={isLastStation}
          />
        </div>
      )}
    </div>
  );
};
