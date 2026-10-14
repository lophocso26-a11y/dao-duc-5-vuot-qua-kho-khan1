import React, { useState } from 'react';
import { STATIONS_DATA, TEACHER_INFO } from '../data/stationsData';
import { BookOpen, X, Sparkles, CheckCircle2, Bookmark, Save } from 'lucide-react';

interface ResilienceNotebookModalProps {
  isOpen: boolean;
  onClose: () => void;
  completedStations: number[];
  studentName: string;
}

export const ResilienceNotebookModal: React.FC<ResilienceNotebookModalProps> = ({
  isOpen,
  onClose,
  completedStations,
  studentName,
}) => {
  const [personalCommitment, setPersonalCommitment] = useState(
    'Em xin hứa sẽ luôn bình tĩnh khi gặp bài khó, không chép bài và sẵn sàng giúp đỡ các bạn trong lớp 5A7!'
  );
  const [savedSuccess, setSavedSuccess] = useState(false);

  if (!isOpen) return null;

  const handleSave = () => {
    setSavedSuccess(true);
    setTimeout(() => setSavedSuccess(false), 2500);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-xs overflow-y-auto">
      <div className="relative w-full max-w-2xl bg-white rounded-3xl shadow-2xl border border-slate-200 overflow-hidden my-6">
        {/* Notebook Header */}
        <div className="bg-gradient-to-r from-teal-600 via-emerald-600 to-green-700 text-white p-5 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-white/20 flex items-center justify-center text-xl shadow-xs">
              📔
            </div>
            <div>
              <h3 className="text-lg font-black tracking-tight">
                Sổ Tay Bản Lĩnh Lớp 5A7
              </h3>
              <p className="text-xs text-emerald-100">
                Chủ nhân: {studentName || 'Học sinh lớp 5A7'} • {TEACHER_INFO.schoolName}
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 rounded-xl hover:bg-white/20 text-white transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Notebook Content */}
        <div className="p-6 space-y-6 max-h-[75vh] overflow-y-auto">
          {/* Quote Banner */}
          <div className="p-4 rounded-2xl bg-amber-50 border border-amber-200 flex items-center gap-3 text-amber-900 text-xs md:text-sm italic font-medium">
            <Sparkles className="w-5 h-5 text-amber-600 shrink-0" />
            <span>{TEACHER_INFO.motto}</span>
          </div>

          {/* 5 Stations Key Takeaways */}
          <div className="space-y-3">
            <h4 className="text-xs font-black text-slate-500 uppercase tracking-wider flex items-center gap-2">
              <Bookmark className="w-4 h-4 text-emerald-600" />
              <span>5 Bài học kim chỉ nam đã khám phá</span>
            </h4>

            <div className="space-y-2.5">
              {STATIONS_DATA.map((st) => {
                const isDone = completedStations.includes(st.id);
                // find optimal option
                const optimal = st.options.find(o => o.appropriateness === 'optimal')!;

                return (
                  <div
                    key={st.id}
                    className={`p-3.5 rounded-xl border transition-all ${
                      isDone
                        ? 'bg-emerald-50/60 border-emerald-200'
                        : 'bg-slate-50 border-slate-200 opacity-60'
                    }`}
                  >
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-xs font-bold text-slate-800">
                        {st.title} {isDone ? '✓' : '(Chưa khám phá)'}
                      </span>
                      <span className="text-[10px] font-semibold text-slate-500">
                        Huy hiệu: {st.stationBadge.name}
                      </span>
                    </div>
                    <p className="text-xs text-slate-700 leading-relaxed font-medium">
                      💎 <strong>Hạt ngọc bản lĩnh:</strong> {optimal.resilienceInsight}
                    </p>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Student's Personal Pledge */}
          <div className="p-4 rounded-2xl bg-sky-50 border border-sky-200 space-y-2">
            <label className="text-xs font-black text-sky-900 uppercase tracking-wider block">
              ✍️ Lời cam kết hành động của em:
            </label>
            <textarea
              value={personalCommitment}
              onChange={(e) => setPersonalCommitment(e.target.value)}
              rows={3}
              className="w-full text-xs md:text-sm p-3 rounded-xl border border-sky-300 bg-white focus:outline-none focus:ring-2 focus:ring-sky-400 font-medium text-slate-800"
              placeholder="Em sẽ làm gì khi gặp khó khăn trong học tập và cuộc sống?"
            />
            <div className="flex items-center justify-between pt-1">
              <span className="text-[11px] text-sky-700 font-semibold">
                {savedSuccess ? '✅ Đã ghi vào sổ tay cá nhân!' : 'Ghi nhớ để luôn thực hiện nhé!'}
              </span>
              <button
                onClick={handleSave}
                className="px-3 py-1.5 rounded-lg bg-sky-600 text-white font-bold text-xs flex items-center gap-1 hover:bg-sky-700 transition-colors shadow-xs"
              >
                <Save className="w-3.5 h-3.5" />
                <span>Lưu lời hứa</span>
              </button>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="bg-slate-50 px-6 py-3.5 border-t border-slate-200 flex justify-end">
          <button
            onClick={onClose}
            className="px-5 py-2 rounded-xl bg-slate-800 text-white font-bold text-xs hover:bg-slate-900 transition-colors"
          >
            Đóng sổ tay
          </button>
        </div>
      </div>
    </div>
  );
};
