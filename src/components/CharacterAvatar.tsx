import React from 'react';
import { CharacterEmotion } from '../types/game';

interface CharacterAvatarProps {
  character: 'minh' | 'an' | 'teacher';
  emotion: CharacterEmotion;
  size?: 'sm' | 'md' | 'lg' | 'xl';
  className?: string;
  isSpeaking?: boolean;
}

export const CharacterAvatar: React.FC<CharacterAvatarProps> = ({
  character,
  emotion,
  size = 'md',
  className = '',
  isSpeaking = false,
}) => {
  const sizeClasses = {
    sm: 'w-12 h-12',
    md: 'w-20 h-20',
    lg: 'w-28 h-28',
    xl: 'w-36 h-36',
  }[size];

  // Colors based on character
  const isMinh = character === 'minh';
  const isTeacher = character === 'teacher';

  return (
    <div
      className={`relative inline-flex items-center justify-center rounded-2xl bg-gradient-to-b ${
        isTeacher
          ? 'from-rose-100 to-pink-200 border-2 border-rose-300'
          : isMinh
          ? 'from-sky-100 to-blue-200 border-2 border-sky-300'
          : 'from-amber-100 to-orange-200 border-2 border-amber-300'
      } shadow-md overflow-hidden ${sizeClasses} ${className} ${
        isSpeaking ? 'ring-4 ring-emerald-400 ring-offset-2 scale-105 transition-transform' : ''
      }`}
    >
      {/* Speaking wave effect */}
      {isSpeaking && (
        <>
          <span className="absolute inset-0 rounded-2xl border-2 border-emerald-400 animate-ping opacity-60 pointer-events-none" />
          {/* Soundwave equalizer indicator overlay at bottom */}
          <div className="absolute bottom-1 right-1 flex items-end gap-0.5 bg-black/40 px-1 py-0.5 rounded-md z-20 pointer-events-none">
            <span className="w-1 bg-emerald-300 rounded-full animate-[bounce_0.6s_ease-in-out_infinite] h-2" />
            <span className="w-1 bg-emerald-400 rounded-full animate-[bounce_0.8s_ease-in-out_infinite] h-3.5" />
            <span className="w-1 bg-emerald-300 rounded-full animate-[bounce_0.5s_ease-in-out_infinite] h-2.5" />
          </div>
        </>
      )}

      <svg
        viewBox="0 0 100 100"
        className="w-full h-full transform transition-transform duration-300 hover:scale-105"
      >
        {/* Background glow circle */}
        <circle cx="50" cy="50" r="46" fill="white" fillOpacity="0.3" />

        {/* Teacher Avatar */}
        {isTeacher && (
          <g>
            {/* Hair back */}
            <path d="M25 45 C20 65 30 78 50 78 C70 78 80 65 75 45 C75 25 65 15 50 15 C35 15 25 25 25 45 Z" fill="#4a2810" />
            {/* Face */}
            <ellipse cx="50" cy="50" rx="24" ry="26" fill="#fed7aa" />
            {/* Hair bangs */}
            <path d="M26 40 C35 28 65 28 74 40 C68 32 40 30 26 40 Z" fill="#3b1d08" />
            {/* Glasses */}
            <rect x="33" y="44" width="13" height="10" rx="4" fill="none" stroke="#be123c" strokeWidth="2" />
            <rect x="54" y="44" width="13" height="10" rx="4" fill="none" stroke="#be123c" strokeWidth="2" />
            <line x1="46" y1="48" x2="54" y2="48" stroke="#be123c" strokeWidth="2" />
            {/* Teacher Ao Dai collar */}
            <path d="M36 76 C42 70 58 70 64 76 L75 100 L25 100 Z" fill="#e11d48" />
            <path d="M48 70 L52 70 L52 86 L48 86 Z" fill="#fecdd3" />
          </g>
        )}

        {/* Minh Avatar (Boy with cap and scarf) */}
        {isMinh && (
          <g>
            {/* Body / Shirt */}
            <path d="M26 84 C30 72 70 72 74 84 L80 100 L20 100 Z" fill="#0284c7" />
            {/* Red scarf for Grade 5 Vietnamese student */}
            <path d="M42 74 L50 82 L58 74 L53 92 L47 92 Z" fill="#dc2626" />
            {/* Ears */}
            <circle cx="27" cy="52" r="6" fill="#fed7aa" />
            <circle cx="73" cy="52" r="6" fill="#fed7aa" />
            {/* Face */}
            <ellipse cx="50" cy="52" rx="23" ry="24" fill="#fed7aa" />
            {/* Hair */}
            <path d="M27 45 C27 28 40 22 50 22 C60 22 73 28 73 45 C66 38 58 35 50 36 C42 35 34 38 27 45 Z" fill="#1e293b" />
            {/* Cap */}
            <path d="M26 40 C30 24 70 24 74 40 Z" fill="#0369a1" />
            <path d="M24 40 Q50 33 76 40 Q50 44 24 40 Z" fill="#0284c7" />
          </g>
        )}

        {/* An Avatar (Girl with twin pigtails) */}
        {!isMinh && !isTeacher && (
          <g>
            {/* Pigtails */}
            <circle cx="22" cy="48" r="10" fill="#292524" />
            <circle cx="78" cy="48" r="10" fill="#292524" />
            <circle cx="24" cy="56" r="4" fill="#f97316" />
            <circle cx="76" cy="56" r="4" fill="#f97316" />
            {/* Body */}
            <path d="M26 84 C30 72 70 72 74 84 L80 100 L20 100 Z" fill="#d97706" />
            {/* Red scarf */}
            <path d="M42 74 L50 82 L58 74 L53 92 L47 92 Z" fill="#dc2626" />
            {/* Ears */}
            <circle cx="28" cy="52" r="6" fill="#fed7aa" />
            <circle cx="72" cy="52" r="6" fill="#fed7aa" />
            {/* Face */}
            <ellipse cx="50" cy="52" rx="22" ry="23" fill="#fed7aa" />
            {/* Hair bangs */}
            <path d="M28 44 C33 32 67 32 72 44 C65 37 50 35 28 44 Z" fill="#292524" />
            {/* Cute hairpin */}
            <circle cx="34" cy="36" r="4" fill="#ec4899" />
          </g>
        )}

        {/* Facial Expressions based on emotion */}
        {/* 1. HAPPY / PROUD */}
        {(emotion === 'happy' || emotion === 'proud') && (
          <g>
            {/* Eyes - Happy curved arcs */}
            <path d="M37 48 Q42 42 47 48" stroke="#1e293b" strokeWidth="3" fill="none" strokeLinecap="round" />
            <path d="M53 48 Q58 42 63 48" stroke="#1e293b" strokeWidth="3" fill="none" strokeLinecap="round" />
            {/* Rosy cheeks */}
            <circle cx="35" cy="56" r="5" fill="#f43f5e" fillOpacity="0.4" />
            <circle cx="65" cy="56" r="5" fill="#f43f5e" fillOpacity="0.4" />
            {/* Beaming smile */}
            <path d="M40 58 Q50 68 60 58 Z" fill="#e11d48" />
            <path d="M44 58 Q50 61 56 58 Z" fill="#ffffff" />
            {/* Sparkles */}
            {emotion === 'proud' && (
              <polygon points="50,10 52,18 60,20 52,22 50,30 48,22 40,20 48,18" fill="#eab308" />
            )}
          </g>
        )}

        {/* 2. THOUGHTFUL / REFLECTIVE */}
        {emotion === 'thoughtful' && (
          <g>
            {/* Eyebrows raised slightly */}
            <path d="M36 43 Q42 41 47 44" stroke="#475569" strokeWidth="2" fill="none" strokeLinecap="round" />
            <path d="M53 44 Q58 41 64 43" stroke="#475569" strokeWidth="2" fill="none" strokeLinecap="round" />
            {/* Looking upward-left in thought */}
            <circle cx="41" cy="48" r="4" fill="#1e293b" />
            <circle cx="40" cy="46" r="1.5" fill="white" />
            <circle cx="57" cy="48" r="4" fill="#1e293b" />
            <circle cx="56" cy="46" r="1.5" fill="white" />
            {/* Puzzled/reflecting mouth */}
            <path d="M45 61 Q51 59 55 61" stroke="#334155" strokeWidth="2.5" fill="none" strokeLinecap="round" />
            {/* Thinking lightbulb bubble */}
            <g transform="translate(68, 14) scale(0.6)">
              <circle cx="15" cy="15" r="12" fill="#fef08a" stroke="#ca8a04" strokeWidth="2" />
              <path d="M12 25 L18 25 L16 29 L14 29 Z" fill="#ca8a04" />
              <text x="15" y="19" textAnchor="middle" fontSize="12" fontWeight="bold" fill="#854d0e">?</text>
            </g>
          </g>
        )}

        {/* 3. EMPATHETIC / CARING */}
        {emotion === 'empathetic' && (
          <g>
            {/* Soft, understanding eyes */}
            <path d="M36 45 Q42 48 48 45" stroke="#475569" strokeWidth="2" fill="none" strokeLinecap="round" />
            <path d="M52 45 Q58 48 64 45" stroke="#475569" strokeWidth="2" fill="none" strokeLinecap="round" />
            <circle cx="42" cy="50" r="3.5" fill="#1e293b" />
            <circle cx="43" cy="49" r="1.5" fill="white" />
            <circle cx="58" cy="50" r="3.5" fill="#1e293b" />
            <circle cx="59" cy="49" r="1.5" fill="white" />
            {/* Warm gentle smile */}
            <path d="M43 60 Q50 64 57 60" stroke="#be123c" strokeWidth="2.5" fill="none" strokeLinecap="round" />
            {/* Rosy warmth */}
            <circle cx="36" cy="56" r="4" fill="#f43f5e" fillOpacity="0.25" />
            <circle cx="64" cy="56" r="4" fill="#f43f5e" fillOpacity="0.25" />
          </g>
        )}

        {/* 4. COLLABORATIVE / ENERGETIC */}
        {emotion === 'collaborative' && (
          <g>
            {/* Excited bright open eyes */}
            <circle cx="41" cy="48" r="4" fill="#1e293b" />
            <circle cx="39" cy="46" r="1.5" fill="white" />
            <circle cx="59" cy="48" r="4" fill="#1e293b" />
            <circle cx="57" cy="46" r="1.5" fill="white" />
            {/* Rosy cheeks */}
            <circle cx="34" cy="56" r="4.5" fill="#f59e0b" fillOpacity="0.4" />
            <circle cx="66" cy="56" r="4.5" fill="#f59e0b" fillOpacity="0.4" />
            {/* Wide smiling cheer */}
            <path d="M42 58 Q50 67 58 58 Z" fill="#d97706" />
            <path d="M45 58 Q50 61 55 58 Z" fill="white" />
          </g>
        )}
      </svg>
    </div>
  );
};
