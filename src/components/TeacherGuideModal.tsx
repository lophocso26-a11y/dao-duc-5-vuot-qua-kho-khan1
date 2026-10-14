import React from 'react';
import { TEACHER_INFO } from '../data/stationsData';
import { X, GraduationCap, Target, Users, BookOpen, Lightbulb, CheckCircle2 } from 'lucide-react';

interface TeacherGuideModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const TeacherGuideModal: React.FC<TeacherGuideModalProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-xs overflow-y-auto">
      <div className="relative w-full max-w-3xl bg-white rounded-3xl shadow-2xl border border-slate-200 overflow-hidden my-6">
        {/* Header */}
        <div className="bg-gradient-to-r from-rose-600 via-pink-600 to-rose-700 text-white p-5 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-white/20 flex items-center justify-center text-xl shadow-xs">
              👩‍🏫
            </div>
            <div>
              <h3 className="text-lg font-black tracking-tight">
                Góc Sư Phạm & Hướng Dẫn Giảng Dạy
              </h3>
              <p className="text-xs text-rose-100">
                {TEACHER_INFO.lessonName} • {TEACHER_INFO.teacherName} - {TEACHER_INFO.className}
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

        {/* Content */}
        <div className="p-6 space-y-6 max-h-[75vh] overflow-y-auto text-slate-800 text-sm">
          {/* Section 1: Pedagogical Objective */}
          <div className="p-4 rounded-2xl bg-rose-50 border border-rose-200 space-y-2">
            <h4 className="font-extrabold text-rose-900 flex items-center gap-2">
              <Target className="w-4 h-4 text-rose-600" />
              <span>Yêu cầu cần đạt (Theo Chương trình GDPT 2018)</span>
            </h4>
            <ul className="space-y-1.5 text-xs md:text-sm text-slate-700 list-disc list-inside">
              <li>Nhận biết được một số biểu hiện của khó khăn trong học tập và đời sống.</li>
              <li>Hiểu được vì sao cần kiên trì, không nản lòng trước thử thách.</li>
              <li>Biết lắng nghe, làm chủ cảm xúc và chủ động tìm kiếm sự giúp đỡ khi cần thiết.</li>
              <li>Biết lập kế hoạch chia nhỏ mục tiêu và sẵn sàng hỗ trợ, động viên bạn bè cùng tiến bộ.</li>
            </ul>
          </div>

          {/* Section 2: Four Pillars Principle */}
          <div className="p-4 rounded-2xl bg-emerald-50 border border-emerald-200 space-y-2">
            <h4 className="font-extrabold text-emerald-900 flex items-center gap-2">
              <Lightbulb className="w-4 h-4 text-emerald-600" />
              <span>Cấu trúc 4 thành phần phản hồi sư phạm thông minh</span>
            </h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
              <div className="p-2.5 rounded-xl bg-white border border-emerald-100">
                <strong className="text-emerald-800">1. Ghi nhận suy nghĩ:</strong> Tôn trọng tâm lý lứa tuổi lớp 5, không tạo áp lực hay chê bai.
              </div>
              <div className="p-2.5 rounded-xl bg-white border border-emerald-100">
                <strong className="text-amber-800">2. Giải thích nguyên nhân:</strong> Phân tích thấu đáo vì sao cách làm đó có thể gây hệ quả gì.
              </div>
              <div className="p-2.5 rounded-xl bg-white border border-emerald-100">
                <strong className="text-teal-800">3. Gợi mở cách cải thiện:</strong> Cung cấp giải pháp hành động cụ thể, khả thi.
              </div>
              <div className="p-2.5 rounded-xl bg-white border border-emerald-100">
                <strong className="text-purple-800">4. Khích lệ và tiếp tục:</strong> Luôn truyền cảm hứng tích cực để học sinh tự tin bước tiếp.
              </div>
            </div>
          </div>

          {/* Section 3: Audio & Voice System for 3 AI Characters */}
          <div className="p-4 rounded-2xl bg-sky-50 border border-sky-200 space-y-4">
            <div className="flex items-center justify-between">
              <h4 className="font-extrabold text-sky-900 flex items-center gap-2">
                <span>🎙️</span>
                <span>Hệ thống Lồng tiếng 3 Nhân vật (Gemini TTS & Âm thanh thực tế)</span>
              </h4>
              <span className="text-[11px] font-bold px-2 py-0.5 rounded-full bg-emerald-200 text-emerald-800">
                Đã đồng bộ AI Voice
              </span>
            </div>

            {/* MỤC BẮT BUỘC: KIỂM TRA GIỌNG NÓI */}
            <div className="p-4 rounded-2xl bg-white border-2 border-emerald-300 shadow-sm space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-xs font-black uppercase tracking-wider text-emerald-800 flex items-center gap-1.5">
                  <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-ping" />
                  <span>KIỂM TRA GIỌNG NÓI THỰC TẾ (3 NHÂN VẬT)</span>
                </span>
                <span className="text-[11px] text-slate-500 font-semibold">
                  Nhấn để phát âm thanh thực tế
                </span>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                {/* 1. Cô giáo */}
                <div className="p-3.5 rounded-2xl bg-rose-50/70 border border-rose-200 flex flex-col justify-between space-y-2">
                  <div>
                    <div className="flex items-center gap-1.5 font-black text-rose-800 text-xs mb-1">
                      <span>👩‍🏫</span>
                      <span>Cô giáo (Cô Ngô Thị Hà)</span>
                    </div>
                    <p className="text-xs text-slate-700 italic leading-relaxed">
                      “Xin chào các em học sinh lớp 5A7! Cô rất vui được đồng hành cùng các em trong bài học Vượt qua khó khăn hôm nay!”
                    </p>
                  </div>
                  <button
                    onClick={() => unifiedVoice.playDialogue('test_teacher')}
                    className="w-full py-2 rounded-xl bg-rose-600 hover:bg-rose-700 text-white font-extrabold text-xs transition-all flex items-center justify-center gap-1.5 shadow-xs active:scale-95"
                  >
                    <span>▶️</span>
                    <span>Nghe giọng cô giáo</span>
                  </button>
                </div>

                {/* 2. Minh */}
                <div className="p-3.5 rounded-2xl bg-sky-50/70 border border-sky-200 flex flex-col justify-between space-y-2">
                  <div>
                    <div className="flex items-center gap-1.5 font-black text-sky-800 text-xs mb-1">
                      <span>👦</span>
                      <span>Minh (Bé trai 10 tuổi)</span>
                    </div>
                    <p className="text-xs text-slate-700 italic leading-relaxed">
                      “Bài toán này khó quá! Nhưng mình sẽ thử thêm một lần nữa!”
                    </p>
                  </div>
                  <button
                    onClick={() => unifiedVoice.playDialogue('test_minh')}
                    className="w-full py-2 rounded-xl bg-sky-600 hover:bg-sky-700 text-white font-extrabold text-xs transition-all flex items-center justify-center gap-1.5 shadow-xs active:scale-95"
                  >
                    <span>▶️</span>
                    <span>Nghe giọng Minh</span>
                  </button>
                </div>

                {/* 3. An */}
                <div className="p-3.5 rounded-2xl bg-amber-50/70 border border-amber-200 flex flex-col justify-between space-y-2">
                  <div>
                    <div className="flex items-center gap-1.5 font-black text-amber-800 text-xs mb-1">
                      <span>👧</span>
                      <span>An (Bé gái 10 tuổi)</span>
                    </div>
                    <p className="text-xs text-slate-700 italic leading-relaxed">
                      “Minh ơi, chúng mình cùng cố gắng nhé! Nếu cần, chúng mình có thể nhờ cô giáo giúp đỡ!”
                    </p>
                  </div>
                  <button
                    onClick={() => unifiedVoice.playDialogue('test_an')}
                    className="w-full py-2 rounded-xl bg-amber-600 hover:bg-amber-700 text-white font-extrabold text-xs transition-all flex items-center justify-center gap-1.5 shadow-xs active:scale-95"
                  >
                    <span>▶️</span>
                    <span>Nghe giọng An</span>
                  </button>
                </div>
              </div>

              {/* Stop button */}
              <div className="pt-1 flex items-center justify-between text-xs">
                <span className="text-[11px] text-slate-500">
                  Âm thanh được tạo bằng công nghệ Gemini AI TTS chuẩn tiếng Việt hoặc tệp chất lượng cao.
                </span>
                <button
                  onClick={() => unifiedVoice.stop()}
                  className="px-3 py-1 rounded-lg bg-slate-200 hover:bg-slate-300 text-slate-700 font-bold transition-colors"
                >
                  ⏹️ Dừng âm thanh
                </button>
              </div>
            </div>

            {/* Thông số kỹ thuật & Cảnh báo triển khai Vercel */}
            <div className="p-3 rounded-xl bg-slate-100 border border-slate-200 text-xs text-slate-700 leading-relaxed space-y-1">
              <strong className="text-slate-900 block">🚀 Cấu hình khi triển khai Vercel:</strong>
              <p>
                1. Đã tích hợp Serverless Function tại <code>/api/tts.ts</code> và tệp định tuyến <code>vercel.json</code>.
              </p>
              <p>
                2. Trên bảng điều khiển Vercel: Vào <strong>Project Settings → Environment Variables</strong>, thêm biến <code>GEMINI_API_KEY</code> với giá trị khóa API của bạn.
              </p>
              <p>
                3. Các tệp âm thanh kiểm tra đã được lưu trữ sẵn trong thư mục <code>public/audio/</code>, đảm bảo phát được ngay lập tức 100% không phụ thuộc độ trễ mạng!
              </p>
            </div>
          </div>

          {/* Section 4: Classroom Facilitation Tips */}
          <div className="space-y-2">
            <h4 className="font-extrabold text-slate-800 flex items-center gap-2">
              <Users className="w-4 h-4 text-blue-600" />
              <span>Gợi ý tổ chức hoạt động tại lớp 5A7 (Trường Tiểu học Đỗ Ngọc Du)</span>
            </h4>
            <p className="text-xs text-slate-600 leading-relaxed">
              - <strong>Hoạt động nhóm đôi / nhóm 4:</strong> Cho các tổ thảo luận trước khi bấm chọn phương án trên màn hình tương tác.
              <br />
              - <strong>Thử nghiệm các phương án khác nhau:</strong> Giáo viên khuyến khích học sinh thử bấm vào các phương án chưa tối ưu để cùng cả lớp lắng nghe lời phân tích ấm áp của cô giáo AI, qua đó khắc sâu bài học.
              <br />
              - <strong>Liên hệ thực tế:</strong> Sau mỗi trạm, giáo viên dừng lại 1-2 phút mời một học sinh chia sẻ khó khăn tương tự mà bản thân từng gặp phải.
            </p>
          </div>
        </div>

        {/* Footer */}
        <div className="bg-slate-50 px-6 py-3.5 border-t border-slate-200 flex justify-end">
          <button
            onClick={onClose}
            className="px-5 py-2 rounded-xl bg-slate-800 text-white font-bold text-xs hover:bg-slate-900 transition-colors"
          >
            Đã hiểu
          </button>
        </div>
      </div>
    </div>
  );
};
