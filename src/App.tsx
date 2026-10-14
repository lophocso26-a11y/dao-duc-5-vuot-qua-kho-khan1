/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { STATIONS_DATA, TEACHER_INFO } from './data/stationsData';
import { Station, StationOption } from './types/game';
import { MountainTrailMap } from './components/MountainTrailMap';
import { StationQuestionView } from './components/StationQuestionView';
import { StudentProfileBar } from './components/StudentProfileBar';
import { VoicePlayerBar } from './components/VoicePlayerBar';
import { SummitCelebrationModal } from './components/SummitCelebrationModal';
import { ResilienceNotebookModal } from './components/ResilienceNotebookModal';
import { TeacherGuideModal } from './components/TeacherGuideModal';
import { audioService } from './utils/audio';
import { unifiedVoice } from './utils/voiceService';
import { Mountain, Compass, Award, BookOpen, GraduationCap, ChevronLeft, ChevronRight, RefreshCw, Sparkles } from 'lucide-react';

export default function App() {
  const [studentName, setStudentName] = useState('Nguyễn Gia Huy');
  const [character, setCharacter] = useState<'minh' | 'an'>('minh');
  const [currentStationId, setCurrentStationId] = useState<number>(1);
  const [completedStations, setCompletedStations] = useState<number[]>([]);
  const [selectedOptions, setSelectedOptions] = useState<Record<number, string>>({});

  // Modals
  const [isCelebrationOpen, setIsCelebrationOpen] = useState(false);
  const [isNotebookOpen, setIsNotebookOpen] = useState(false);
  const [isTeacherGuideOpen, setIsTeacherGuideOpen] = useState(false);

  // Active Station
  const currentStation = STATIONS_DATA.find((s) => s.id === currentStationId) || STATIONS_DATA[0];

  const handleSelectOption = (option: StationOption) => {
    setSelectedOptions((prev) => ({
      ...prev,
      [currentStationId]: option.id,
    }));

    // If optimal, mark this station as mastered/completed
    if (!completedStations.includes(currentStationId)) {
      setCompletedStations((prev) => [...prev, currentStationId]);
    }
  };

  const handleNextStation = () => {
    unifiedVoice.stop();
    if (currentStationId < 5) {
      const nextId = currentStationId + 1;
      setCurrentStationId(nextId);
      audioService.playPositiveChime();
      window.scrollTo({ top: 380, behavior: 'smooth' });
    } else {
      // Reached the summit!
      setIsCelebrationOpen(true);
      unifiedVoice.playDialogue('celebration_teacher_summit');
    }
  };

  const handleJumpToStation = (stationId: number) => {
    if (stationId !== currentStationId) {
      unifiedVoice.stop();
      setCurrentStationId(stationId);
      window.scrollTo({ top: 380, behavior: 'smooth' });
    }
  };

  const handleRestartJourney = () => {
    unifiedVoice.stop();
    setCompletedStations([]);
    setSelectedOptions({});
    setCurrentStationId(1);
    setIsCelebrationOpen(false);
    audioService.stopSpeech();
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen bg-slate-100/70 text-slate-800 pb-16">
      {/* Top Banner decoration */}
      <div className="h-2 bg-gradient-to-r from-emerald-500 via-teal-500 to-amber-500" />

      {/* Main Container */}
      <div className="max-w-5xl mx-auto px-4 sm:px-6 pt-5 space-y-6">
        {/* Student & Class Profile Bar */}
        <StudentProfileBar
          studentName={studentName}
          setStudentName={setStudentName}
          character={character}
          setCharacter={setCharacter}
          completedStationsCount={completedStations.length}
          totalStations={STATIONS_DATA.length}
          onOpenNotebook={() => setIsNotebookOpen(true)}
          onOpenTeacherGuide={() => setIsTeacherGuideOpen(true)}
        />

        {/* Dynamic Voice Player Bar with Subtitles & 3-Character Switcher */}
        <VoicePlayerBar onOpenTeacherGuide={() => setIsTeacherGuideOpen(true)} />

        {/* Mountain Ascent Trail Map (Interactive Visual Anchor) */}
        <div className="space-y-2">
          <div className="flex items-center justify-between px-1">
            <div className="flex items-center gap-2 text-xs font-black uppercase tracking-wider text-slate-600">
              <Mountain className="w-4 h-4 text-emerald-600" />
              <span>Bản đồ lộ trình Đỉnh núi Bản Lĩnh (5 Trạm)</span>
            </div>
            <span className="text-xs text-slate-500 font-semibold hidden sm:inline">
              Nhấn vào từng trạm để khám phá bài học
            </span>
          </div>

          <MountainTrailMap
            stations={STATIONS_DATA}
            currentStationId={currentStationId}
            completedStations={completedStations}
            onSelectStation={handleJumpToStation}
            character={character}
          />
        </div>

        {/* Station Navigation Quick Bar */}
        <div className="flex items-center justify-between bg-white px-4 py-3 rounded-2xl border border-slate-200 shadow-2xs">
          <button
            onClick={() => handleJumpToStation(Math.max(1, currentStationId - 1))}
            disabled={currentStationId === 1}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-bold text-slate-600 hover:bg-slate-100 disabled:opacity-30 disabled:pointer-events-none transition-all"
          >
            <ChevronLeft className="w-4 h-4" />
            <span>Trạm trước</span>
          </button>

          <div className="flex items-center gap-2">
            <span className="text-xs font-black text-slate-400">Đang ở:</span>
            <span className="text-xs sm:text-sm font-extrabold text-emerald-800 bg-emerald-50 px-3 py-1 rounded-full border border-emerald-200">
              {currentStation.title}
            </span>
          </div>

          <button
            onClick={() => {
              if (currentStationId < 5) {
                handleJumpToStation(currentStationId + 1);
              } else {
                setIsCelebrationOpen(true);
              }
            }}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-bold text-emerald-700 hover:bg-emerald-50 transition-all"
          >
            <span>{currentStationId === 5 ? 'Lên Đỉnh Núi' : 'Trạm kế'}</span>
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>

        {/* Current Active Station Dilemma & 4-Pillar Pedagogical Feedback */}
        <StationQuestionView
          key={currentStation.id}
          station={currentStation}
          character={character}
          selectedOptionId={selectedOptions[currentStation.id]}
          onSelectOption={handleSelectOption}
          onNextStation={handleNextStation}
          isLastStation={currentStationId === 5}
        />

        {/* Footer info & Pedagogical Credits */}
        <footer className="mt-12 pt-8 border-t border-slate-200/80 text-center space-y-2">
          <div className="flex flex-wrap items-center justify-center gap-3 text-xs text-slate-500 font-semibold">
            <span>{TEACHER_INFO.lessonName}</span>
            <span>•</span>
            <span>Giáo viên: {TEACHER_INFO.teacherName}</span>
            <span>•</span>
            <span>{TEACHER_INFO.className}</span>
            <span>•</span>
            <span>{TEACHER_INFO.schoolName}</span>
          </div>
          <p className="text-xs text-slate-400">
            Hệ thống phản hồi sư phạm thông minh theo Chương trình GDPT 2018 môn Đạo đức lớp 5. Tự động hỗ trợ âm thanh tiếng Việt và hoạt cảnh tương tác đa chiều.
          </p>
          <div className="pt-2">
            <button
              onClick={handleRestartJourney}
              className="inline-flex items-center gap-1.5 text-xs font-bold text-slate-500 hover:text-emerald-700 transition-colors"
            >
              <RefreshCw className="w-3.5 h-3.5" />
              <span>Chinh phục lại từ đầu</span>
            </button>
          </div>
        </footer>
      </div>

      {/* Modals */}
      <SummitCelebrationModal
        studentName={studentName}
        character={character}
        isOpen={isCelebrationOpen}
        onClose={() => setIsCelebrationOpen(false)}
        onOpenNotebook={() => {
          setIsCelebrationOpen(false);
          setIsNotebookOpen(true);
        }}
        onRestart={handleRestartJourney}
      />

      <ResilienceNotebookModal
        isOpen={isNotebookOpen}
        onClose={() => setIsNotebookOpen(false)}
        completedStations={completedStations}
        studentName={studentName}
      />

      <TeacherGuideModal
        isOpen={isTeacherGuideOpen}
        onClose={() => setIsTeacherGuideOpen(false)}
      />
    </div>
  );
}
