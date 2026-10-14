import React, { useState, useEffect } from 'react';
import { TEACHER_INFO } from '../data/stationsData';
import { audioService } from '../utils/audio';
import { unifiedVoice } from '../utils/voiceService';
import { Volume2, VolumeX, BookOpen, GraduationCap, Sparkles, UserCheck, Edit3 } from 'lucide-react';

interface StudentProfileBarProps {
  studentName: string;
  setStudentName: (name: string) => void;
  character: 'minh' | 'an';
  setCharacter: (char: 'minh' | 'an') => void;
  completedStationsCount: number;
  totalStations: number;
  onOpenNotebook: () => void;
  onOpenTeacherGuide: () => void;
}

export const StudentProfileBar: React.FC<StudentProfileBarProps> = ({
  studentName,
  setStudentName,
  character,
  setCharacter,
  completedStationsCount,
  totalStations,
  onOpenNotebook,
  onOpenTeacherGuide,
}) => {
  const [isEditingName, setIsEditingName] = useState(false);
  const [isMuted, setIsMuted] = useState(unifiedVoice.getIsMuted());

  useEffect(() => {
    const unsub = unifiedVoice.subscribe(() => {
      setIsMuted(unifiedVoice.getIsMuted());
    });
    return unsub;
  }, []);

  const handleToggleAudio = () => {
    const next = !isMuted;
    setIsMuted(next);
    audioService.setMuted(next);
    unifiedVoice.setIsMuted(next);
  };

  const progressPercent = Math.round((completedStationsCount / totalStations) * 100);

  return (
    <div className="bg-white/95 backdrop-blur-md rounded-2xl shadow-sm border border-slate-200/90 p-4 transition-all">
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
        {/* Left: School & Class Info */}
        <div className="flex items-center gap-3">
          <div className="w-11 h-11 rounded-2xl bg-gradient-to-tr from-emerald-600 to-teal-500 text-white flex items-center justify-center font-black text-xl shadow-xs shrink-0">
            🏔️
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-[11px] font-extrabold uppercase px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800">
                {TEACHER_INFO.className}
              </span>
              <span className="text-xs text-slate-500 font-semibold">
                {TEACHER_INFO.schoolName}
              </span>
            </div>
            <h1 className="text-base sm:text-lg font-black text-slate-800 tracking-tight leading-tight">
              Hành trình chinh phục đỉnh núi bản lĩnh
            </h1>
            <p className="text-[11px] text-slate-500 font-medium">
              Giáo viên hướng dẫn: <strong className="text-slate-700">{TEACHER_INFO.teacherName}</strong>
            </p>
          </div>
        </div>

        {/* Center: Character Switch & Name */}
        <div className="flex flex-wrap items-center gap-3 bg-slate-50 p-2 rounded-2xl border border-slate-200/80">
          <div className="flex items-center gap-1 bg-white p-1 rounded-xl shadow-2xs border border-slate-200">
            <button
              onClick={() => setCharacter('minh')}
              className={`px-2.5 py-1 rounded-lg text-xs font-bold transition-all flex items-center gap-1 ${
                character === 'minh'
                  ? 'bg-sky-600 text-white shadow-xs'
                  : 'text-slate-600 hover:bg-slate-100'
              }`}
            >
              <span>👦</span>
              <span>Minh</span>
            </button>
            <button
              onClick={() => setCharacter('an')}
              className={`px-2.5 py-1 rounded-lg text-xs font-bold transition-all flex items-center gap-1 ${
                character === 'an'
                  ? 'bg-amber-600 text-white shadow-xs'
                  : 'text-slate-600 hover:bg-slate-100'
              }`}
            >
              <span>👧</span>
              <span>An</span>
            </button>
          </div>

          {/* Student Name */}
          <div className="flex items-center gap-1.5 text-xs font-bold text-slate-700">
            {isEditingName ? (
              <div className="flex items-center gap-1">
                <input
                  type="text"
                  value={studentName}
                  onChange={(e) => setStudentName(e.target.value)}
                  onBlur={() => setIsEditingName(false)}
                  onKeyDown={(e) => e.key === 'Enter' && setIsEditingName(false)}
                  className="px-2 py-1 rounded-lg border border-emerald-400 bg-white text-xs font-bold text-slate-800 w-32 focus:outline-none"
                  autoFocus
                />
                <button
                  onClick={() => setIsEditingName(false)}
                  className="p-1 rounded-md bg-emerald-600 text-white text-[10px] font-bold"
                >
                  Lưu
                </button>
              </div>
            ) : (
              <button
                onClick={() => setIsEditingName(true)}
                className="flex items-center gap-1 hover:text-emerald-700 px-2 py-1 rounded-lg hover:bg-white transition-all text-xs"
                title="Nhấn để đổi tên học sinh"
              >
                <span>Học sinh:</span>
                <span className="text-emerald-800 font-extrabold underline decoration-dashed">
                  {studentName || 'Em học sinh'}
                </span>
                <Edit3 className="w-3 h-3 text-slate-400" />
              </button>
            )}
          </div>
        </div>

        {/* Right: Actions (Audio, Notebook, Teacher Guide) */}
        <div className="flex items-center gap-2">
          {/* Audio toggle */}
          <button
            onClick={handleToggleAudio}
            className={`p-2.5 rounded-xl border font-bold text-xs flex items-center gap-1.5 transition-all ${
              isMuted
                ? 'bg-rose-50 border-rose-200 text-rose-700'
                : 'bg-emerald-50 border-emerald-200 text-emerald-800 hover:bg-emerald-100'
            }`}
            title={isMuted ? 'Bật giọng đọc tiếng Việt' : 'Tắt giọng đọc'}
          >
            {isMuted ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4" />}
            <span className="hidden sm:inline">{isMuted ? 'Bật âm' : 'Giọng đọc'}</span>
          </button>

          {/* Notebook */}
          <button
            onClick={onOpenNotebook}
            className="p-2.5 rounded-xl bg-slate-100 border border-slate-200 hover:bg-slate-200 text-slate-700 font-bold text-xs flex items-center gap-1.5 transition-all"
            title="Mở Sổ tay Bản lĩnh"
          >
            <BookOpen className="w-4 h-4 text-emerald-700" />
            <span className="hidden sm:inline">Sổ tay</span>
          </button>

          {/* Teacher Guide */}
          <button
            onClick={onOpenTeacherGuide}
            className="p-2.5 rounded-xl bg-rose-50 border border-rose-200 hover:bg-rose-100 text-rose-800 font-bold text-xs flex items-center gap-1.5 transition-all"
            title="Xem hướng dẫn sư phạm cho Cô Ngô Thị Hà"
          >
            <GraduationCap className="w-4 h-4 text-rose-700" />
            <span className="hidden md:inline">Góc Sư phạm</span>
          </button>
        </div>
      </div>

      {/* Progress Bar */}
      <div className="mt-3 pt-3 border-t border-slate-100 flex items-center gap-3">
        <div className="text-xs font-black text-slate-600 shrink-0 flex items-center gap-1">
          <Sparkles className="w-3.5 h-3.5 text-amber-500" />
          <span>Tiến độ vượt núi:</span>
        </div>
        <div className="flex-1 bg-slate-100 h-2.5 rounded-full overflow-hidden p-0.5">
          <div
            className="bg-gradient-to-r from-emerald-500 via-teal-500 to-green-600 h-full rounded-full transition-all duration-500 shadow-xs"
            style={{ width: `${Math.max(progressPercent, 10)}%` }}
          />
        </div>
        <span className="text-xs font-extrabold text-emerald-700 shrink-0">
          {completedStationsCount}/{totalStations} trạm ({progressPercent}%)
        </span>
      </div>
    </div>
  );
};
