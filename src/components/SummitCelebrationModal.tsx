import React, { useEffect } from 'react';
import confetti from 'canvas-confetti';
import { TEACHER_INFO } from '../data/stationsData';
import { audioService } from '../utils/audio';
import { CharacterAvatar } from './CharacterAvatar';
import { Award, Trophy, Sparkles, CheckCircle, Printer, BookOpen, RotateCcw } from 'lucide-react';

interface SummitCelebrationModalProps {
  studentName: string;
  character: 'minh' | 'an';
  isOpen: boolean;
  onClose: () => void;
  onOpenNotebook: () => void;
  onRestart: () => void;
}

export const SummitCelebrationModal: React.FC<SummitCelebrationModalProps> = ({
  studentName,
  character,
  isOpen,
  onClose,
  onOpenNotebook,
  onRestart,
}) => {
  useEffect(() => {
    if (isOpen) {
      audioService.playTriumphFanfare();
      // Burst celebratory confetti
      confetti({
        particleCount: 100,
        spread: 70,
        origin: { y: 0.6 },
      });
      setTimeout(() => {
        confetti({
          particleCount: 80,
          angle: 60,
          spread: 55,
          origin: { x: 0 },
        });
        confetti({
          particleCount: 80,
          angle: 120,
          spread: 55,
          origin: { x: 1 },
        });
      }, 350);
    }
  }, [isOpen]);

  if (!isOpen) return null;

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm overflow-y-auto">
      <div className="relative w-full max-w-2xl bg-white rounded-3xl shadow-2xl border-4 border-amber-300 overflow-hidden my-8 animate-fadeIn">
        {/* Decorative Top Header */}
        <div className="bg-gradient-to-r from-amber-500 via-yellow-500 to-emerald-600 text-white p-6 text-center relative">
          <div className="absolute top-4 left-6">
            <Trophy className="w-10 h-10 text-yellow-200 animate-bounce" />
          </div>
          <div className="absolute top-4 right-6">
            <Sparkles className="w-10 h-10 text-yellow-200 animate-spin" />
          </div>

          <span className="text-xs uppercase tracking-widest font-black bg-white/20 px-3 py-1 rounded-full">
            Đạo đức lớp 5 - Bài 3: Vượt qua khó khăn
          </span>
          <h2 className="text-2xl md:text-3xl font-black mt-2 tracking-tight">
            🎉 CHÚC MỪNG DŨNG SĨ BẢN LĨNH! 🎉
          </h2>
          <p className="text-sm text-yellow-100 font-semibold mt-1">
            Đã chinh phục thành công toàn bộ 5 trạm trên Đỉnh Núi Bản Lĩnh
          </p>
        </div>

        {/* Certificate Card Content */}
        <div className="p-6 md:p-8 space-y-6 text-center">
          <div className="flex justify-center items-center gap-4">
            <CharacterAvatar character={character} emotion="proud" size="lg" />
            <CharacterAvatar character="teacher" emotion="happy" size="lg" />
          </div>

          <div className="bg-amber-50/70 p-5 rounded-2xl border border-amber-200 space-y-2">
            <p className="text-xs font-bold text-amber-800 uppercase tracking-widest">
              GIẤY CHỨNG NHẬN DŨNG SĨ VƯỢT KHÓ
            </p>
            <h3 className="text-xl md:text-2xl font-black text-slate-800">
              Học sinh: {studentName || 'Em học sinh bản lĩnh'}
            </h3>
            <p className="text-sm font-semibold text-emerald-800">
              {TEACHER_INFO.className} • {TEACHER_INFO.schoolName}
            </p>
            <p className="text-xs text-slate-600 italic">
              Giáo viên chủ nhiệm hướng dẫn: {TEACHER_INFO.teacherName}
            </p>
          </div>

          {/* 5 Badges List */}
          <div>
            <h4 className="text-xs font-extrabold text-slate-500 uppercase tracking-wider mb-3">
              5 Huy hiệu danh dự đã thu thập
            </h4>
            <div className="grid grid-cols-2 sm:grid-cols-5 gap-2">
              {[
                { title: "Trái Tim Can Đảm", icon: "❤️", st: "Trạm 1" },
                { title: "Ngọn Lửa Kiên Trì", icon: "🔥", st: "Trạm 2" },
                { title: "Bàn Tay Gắn Kết", icon: "🤝", st: "Trạm 3" },
                { title: "Bản Đồ Kế Hoạch", icon: "🗺️", st: "Trạm 4" },
                { title: "Hải Đăng Tỏa Sáng", icon: "👑", st: "Trạm 5" },
              ].map((badge, idx) => (
                <div key={idx} className="p-2.5 rounded-xl bg-slate-50 border border-slate-200 text-center">
                  <span className="text-2xl">{badge.icon}</span>
                  <div className="text-[10px] text-slate-400 font-bold uppercase mt-1">{badge.st}</div>
                  <div className="text-xs font-bold text-slate-800 line-clamp-1">{badge.title}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Pedagogical Summary */}
          <div className="p-4 rounded-xl bg-emerald-50 border border-emerald-200 text-left text-xs md:text-sm text-slate-700 leading-relaxed">
            <strong className="text-emerald-900 block mb-1">🌱 Lời chúc mừng từ {TEACHER_INFO.teacherName}:</strong>
            “Chúc mừng em đã hoàn thành xuất sắc chuyến leo núi đạo đức hôm nay. Em không chỉ tìm ra những giải pháp đúng đắn mà còn thấu hiểu cảm xúc, biết kiên trì, sẵn sàng hợp tác và sẻ chia với bạn bè. Hãy luôn mang theo tinh thần bản lĩnh này vào mọi thử thách trong cuộc sống nhé!”
          </div>

          {/* Actions */}
          <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
            <button
              onClick={handlePrint}
              className="px-4 py-2.5 rounded-xl bg-slate-800 text-white font-bold text-xs flex items-center gap-1.5 hover:bg-slate-900 transition-colors"
            >
              <Printer className="w-4 h-4" />
              <span>In giấy chứng nhận</span>
            </button>

            <button
              onClick={onOpenNotebook}
              className="px-5 py-2.5 rounded-xl bg-emerald-600 text-white font-bold text-xs flex items-center gap-1.5 hover:bg-emerald-700 transition-colors shadow-sm"
            >
              <BookOpen className="w-4 h-4" />
              <span>Xem Sổ tay Bản lĩnh</span>
            </button>

            <button
              onClick={onRestart}
              className="px-4 py-2.5 rounded-xl border border-slate-300 text-slate-700 font-bold text-xs flex items-center gap-1.5 hover:bg-slate-100 transition-colors"
            >
              <RotateCcw className="w-4 h-4" />
              <span>Chinh phục lại</span>
            </button>

            <button
              onClick={onClose}
              className="px-4 py-2.5 rounded-xl text-slate-500 font-bold text-xs hover:text-slate-700"
            >
              Đóng lại
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
