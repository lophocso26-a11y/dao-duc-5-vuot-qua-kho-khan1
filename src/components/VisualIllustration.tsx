import React from 'react';
import { StationOption } from '../types/game';
import { Lightbulb, Users, HeartHandshake, CheckCircle2, PauseCircle, Sparkles, Coffee } from 'lucide-react';

interface VisualIllustrationProps {
  illustration: StationOption['visualIllustration'];
  emotion: StationOption['characterEmotion'];
  appropriateness: StationOption['appropriateness'];
}

export const VisualIllustration: React.FC<VisualIllustrationProps> = ({
  illustration,
  appropriateness,
}) => {
  const isOptimal = appropriateness === 'optimal';

  return (
    <div className={`relative p-5 rounded-2xl border-2 transition-all duration-300 ${
      isOptimal
        ? 'bg-gradient-to-br from-emerald-50 via-teal-50 to-green-100 border-emerald-300 shadow-sm'
        : 'bg-gradient-to-br from-amber-50 via-orange-50 to-yellow-100 border-amber-300 shadow-sm'
    }`}>
      <div className="flex items-center gap-3 mb-2">
        <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${
          isOptimal ? 'bg-emerald-500 text-white shadow-md' : 'bg-amber-500 text-white shadow-md'
        }`}>
          {illustration.type === 'lightbulb' && <Lightbulb className="w-6 h-6 animate-pulse" />}
          {illustration.type === 'friends_collaborate' && <Users className="w-6 h-6" />}
          {illustration.type === 'comfort_cheer' && <HeartHandshake className="w-6 h-6" />}
          {illustration.type === 'checklist_steps' && <CheckCircle2 className="w-6 h-6" />}
          {illustration.type === 'breathe_relax' && <Sparkles className="w-6 h-6 animate-spin" />}
          {illustration.type === 'stop_pause' && <Coffee className="w-6 h-6" />}
        </div>
        <div>
          <span className={`text-xs uppercase tracking-wider font-bold px-2 py-0.5 rounded-full ${
            isOptimal ? 'bg-emerald-200 text-emerald-800' : 'bg-amber-200 text-amber-800'
          }`}>
            {isOptimal ? '🌟 Hành động bản lĩnh' : '💡 Góc nhìn sư phạm'}
          </span>
          <h4 className="text-base font-bold text-slate-800 mt-0.5">
            {illustration.title}
          </h4>
        </div>
      </div>

      <p className="text-sm text-slate-700 leading-relaxed pl-13">
        {illustration.description}
      </p>

      {/* Decorative ambient elements */}
      {isOptimal && (
        <div className="absolute top-3 right-3 flex items-center gap-1 text-emerald-600 opacity-70">
          <Sparkles className="w-4 h-4 animate-bounce" />
          <span className="text-xs font-semibold">+1 Ngọc Bản Lĩnh</span>
        </div>
      )}
    </div>
  );
};
