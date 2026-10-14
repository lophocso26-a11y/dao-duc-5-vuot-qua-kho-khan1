import React from 'react';
import { Station } from '../types/game';
import { Flag, CheckCircle2, MapPin, Sparkles } from 'lucide-react';

interface MountainTrailMapProps {
  stations: Station[];
  currentStationId: number;
  completedStations: number[];
  onSelectStation: (stationId: number) => void;
  character: 'minh' | 'an';
}

export const MountainTrailMap: React.FC<MountainTrailMapProps> = ({
  stations,
  currentStationId,
  completedStations,
  onSelectStation,
  character,
}) => {
  // Coordinates for the 5 stations along the mountain trail (SVG viewBox: 0 0 1000 480)
  const stationCoords: Record<number, { x: number; y: number; labelPos: 'top' | 'bottom' | 'left' | 'right' }> = {
    1: { x: 130, y: 390, labelPos: 'top' },    // Base camp
    2: { x: 310, y: 310, labelPos: 'bottom' }, // Slope 1
    3: { x: 500, y: 240, labelPos: 'top' },    // Forest
    4: { x: 690, y: 170, labelPos: 'bottom' }, // Waterfall
    5: { x: 880, y: 80, labelPos: 'top' },     // Summit
  };

  return (
    <div className="relative w-full rounded-3xl overflow-hidden bg-gradient-to-b from-sky-400 via-sky-200 to-emerald-100 border border-emerald-200 shadow-md">
      {/* Background Decorative Clouds */}
      <div className="absolute top-4 left-10 w-24 h-8 bg-white/70 rounded-full blur-xs pointer-events-none" />
      <div className="absolute top-12 right-24 w-36 h-10 bg-white/70 rounded-full blur-xs pointer-events-none" />
      <div className="absolute top-20 left-1/3 w-28 h-9 bg-white/60 rounded-full blur-xs pointer-events-none" />

      {/* SVG Canvas for Mountains and Trail */}
      <svg
        viewBox="0 0 1000 480"
        className="w-full h-auto drop-shadow-sm select-none"
        preserveAspectRatio="xMidYMid meet"
      >
        <defs>
          <linearGradient id="skyGrad" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#38bdf8" />
            <stop offset="60%" stopColor="#bae6fd" />
            <stop offset="100%" stopColor="#dcfce7" />
          </linearGradient>

          <linearGradient id="distantMountain" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#93c5fd" stopOpacity="0.7" />
            <stop offset="100%" stopColor="#bfdbfe" stopOpacity="0.4" />
          </linearGradient>

          <linearGradient id="mainMountain" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#10b981" />
            <stop offset="35%" stopColor="#059669" />
            <stop offset="70%" stopColor="#047857" />
            <stop offset="100%" stopColor="#065f46" />
          </linearGradient>

          <linearGradient id="rockyPeak" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#f8fafc" />
            <stop offset="25%" stopColor="#cbd5e1" />
            <stop offset="100%" stopColor="#64748b" />
          </linearGradient>

          <filter id="glow" x="-20%" y="-20%" width="140%" height="140%">
            <feGaussianBlur stdDeviation="6" result="blur" />
            <feComposite in="SourceGraphic" in2="blur" operator="over" />
          </filter>
        </defs>

        {/* Distant background mountain layers */}
        <polygon points="120,480 320,160 520,480" fill="url(#distantMountain)" />
        <polygon points="380,480 580,120 780,480" fill="url(#distantMountain)" />
        <polygon points="620,480 880,60 1020,480" fill="url(#distantMountain)" opacity="0.6" />

        {/* Main Mountain Silhouette */}
        <path
          d="M -20,480 L 100,410 L 260,330 L 460,250 L 640,180 L 880,70 L 980,180 L 1040,480 Z"
          fill="url(#mainMountain)"
        />

        {/* Snowy/Rocky Summit Cap */}
        <polygon points="880,70 850,110 870,105 885,115 905,108 920,115" fill="url(#rockyPeak)" />

        {/* Golden Sun behind peak */}
        <circle cx="880" cy="50" r="28" fill="#fbbf24" fillOpacity="0.4" filter="url(#glow)" />
        <circle cx="880" cy="50" r="16" fill="#f59e0b" />

        {/* Trail Pathway Line (dashed curving line connecting stations) */}
        <path
          d="M 130,390 C 220,380 230,320 310,310 C 390,300 420,250 500,240 C 580,230 610,180 690,170 C 780,160 810,100 880,80"
          fill="none"
          stroke="#fef08a"
          strokeWidth="6"
          strokeDasharray="10 8"
          strokeLinecap="round"
        />

        {/* Forest Pines along trail */}
        <g fill="#064e3b" opacity="0.75">
          <polygon points="210,380 200,405 220,405" />
          <polygon points="240,360 232,382 248,382" />
          <polygon points="400,285 392,305 408,305" />
          <polygon points="430,270 422,290 438,290" />
          <polygon points="600,210 592,230 608,230" />
          <polygon points="760,150 752,170 768,170" />
        </g>

        {/* Summit Golden Flag */}
        <g transform="translate(880, 50)">
          <line x1="0" y1="0" x2="0" y2="30" stroke="#f8fafc" strokeWidth="3" />
          <polygon points="0,0 26,8 0,16" fill="#dc2626" />
          <polygon points="6,6 9,10 5,8 10,8 7,11" fill="#facc15" />
        </g>

        {/* Render each Station node */}
        {stations.map((st) => {
          const coord = stationCoords[st.id];
          const isCompleted = completedStations.includes(st.id);
          const isCurrent = currentStationId === st.id;

          return (
            <g
              key={st.id}
              className="cursor-pointer transition-transform hover:scale-110"
              onClick={() => onSelectStation(st.id)}
            >
              {/* Pulsing ring around current station */}
              {isCurrent && (
                <circle
                  cx={coord.x}
                  cy={coord.y}
                  r="24"
                  fill="none"
                  stroke="#fbbf24"
                  strokeWidth="4"
                  className="animate-ping opacity-75"
                />
              )}

              {/* Station Circle Node */}
              <circle
                cx={coord.x}
                cy={coord.y}
                r={isCurrent ? 18 : 15}
                fill={isCompleted ? '#10b981' : isCurrent ? '#f59e0b' : '#ffffff'}
                stroke={isCurrent ? '#b45309' : '#047857'}
                strokeWidth="4"
                className="filter drop-shadow-md"
              />

              {/* Station Number or Checkmark */}
              {isCompleted ? (
                <g transform={`translate(${coord.x - 7}, ${coord.y - 7})`}>
                  <path
                    d="M 2 7 L 6 11 L 13 3"
                    fill="none"
                    stroke="#ffffff"
                    strokeWidth="2.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </g>
              ) : (
                <text
                  x={coord.x}
                  y={coord.y + 5}
                  textAnchor="middle"
                  fontSize={isCurrent ? "14" : "12"}
                  fontWeight="900"
                  fill={isCurrent ? '#ffffff' : '#065f46'}
                >
                  {st.id}
                </text>
              )}

              {/* Label banner */}
              <rect
                x={coord.x - 65}
                y={coord.y + (coord.labelPos === 'top' ? -42 : 22)}
                width="130"
                height="24"
                rx="12"
                fill={isCurrent ? '#1e293b' : 'rgba(255, 255, 255, 0.95)'}
                stroke={isCurrent ? '#fbbf24' : '#cbd5e1'}
                strokeWidth="1.5"
                className="drop-shadow-sm"
              />
              <text
                x={coord.x}
                y={coord.y + (coord.labelPos === 'top' ? -26 : 38)}
                textAnchor="middle"
                fontSize="11"
                fontWeight="800"
                fill={isCurrent ? '#f8fafc' : '#1e293b'}
              >
                Trạm {st.id}: {st.title.split(':')[1]?.trim() || st.title}
              </text>
            </g>
          );
        })}

        {/* Current Climber Avatar position */}
        {stationCoords[currentStationId] && (
          <g
            transform={`translate(${stationCoords[currentStationId].x - 18}, ${
              stationCoords[currentStationId].y - 54
            })`}
            className="animate-float"
          >
            {/* Small student climber pin icon */}
            <circle cx="18" cy="18" r="16" fill="#0284c7" stroke="#ffffff" strokeWidth="2.5" className="drop-shadow-md" />
            <text x="18" y="23" textAnchor="middle" fontSize="14">
              {character === 'minh' ? '👦' : '👧'}
            </text>
            <polygon points="18,34 13,26 23,26" fill="#0284c7" />
          </g>
        )}
      </svg>

      {/* Quick Trail Bar underneath map */}
      <div className="bg-white/90 backdrop-blur-md px-4 py-2.5 flex items-center justify-between text-xs border-t border-emerald-100 flex-wrap gap-2">
        <div className="flex items-center gap-2">
          <span className="font-extrabold text-emerald-800 flex items-center gap-1">
            <MapPin className="w-3.5 h-3.5 text-emerald-600" />
            Lộ trình Chinh phục:
          </span>
          <span className="text-slate-600 font-semibold">
            Đã hoàn thành {completedStations.length}/5 trạm
          </span>
        </div>

        <div className="flex items-center gap-1.5">
          {stations.map(s => {
            const isDone = completedStations.includes(s.id);
            const isCur = currentStationId === s.id;
            return (
              <button
                key={s.id}
                onClick={() => onSelectStation(s.id)}
                className={`px-2.5 py-1 rounded-lg font-bold text-xs transition-all ${
                  isCur
                    ? 'bg-emerald-600 text-white shadow-xs'
                    : isDone
                    ? 'bg-emerald-100 text-emerald-800 hover:bg-emerald-200'
                    : 'bg-slate-100 text-slate-500 hover:bg-slate-200'
                }`}
              >
                Trạm {s.id} {isDone && '✓'}
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
};
