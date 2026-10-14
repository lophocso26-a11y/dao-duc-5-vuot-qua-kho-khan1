export type Appropriateness = 'optimal' | 'acceptable_with_growth' | 'learning_opportunity';

export type CharacterEmotion = 'thoughtful' | 'happy' | 'empathetic' | 'collaborative' | 'proud';

export interface FourPillars {
  acknowledge: string; // 1. Ghi nhận suy nghĩ
  explanation: string; // 2. Giải thích nguyên nhân & hệ quả
  suggestion: string;  // 3. Gợi mở cách cải thiện
  encouragement: string; // 4. Khích lệ và tiếp tục
}

export interface StationOption {
  id: string;
  label: 'A' | 'B' | 'C' | 'D';
  text: string;
  appropriateness: Appropriateness;
  fourPillars: FourPillars;
  fullSpeech: string;
  characterEmotion: CharacterEmotion;
  visualIllustration: {
    type: 'lightbulb' | 'friends_collaborate' | 'breathe_relax' | 'checklist_steps' | 'comfort_cheer' | 'stop_pause';
    title: string;
    description: string;
  };
  nextActionLabel: string;
  resilienceInsight: string;
}

export interface Station {
  id: number;
  title: string;
  subtitle: string;
  mountainLocation: string; // e.g. "Chân núi (Độ cao 200m)"
  competencyFocus: string; // e.g. "Nhận diện khó khăn & Thấu hiểu cảm xúc"
  scenario: {
    character: string;
    situationTitle: string;
    situationDescription: string;
    dilemma: string;
  };
  options: StationOption[];
  stationBadge: {
    name: string;
    icon: string;
    meaning: string;
  };
}

export interface PlayerProfile {
  name: string;
  character: 'minh' | 'an';
  completedStations: number[];
  selectedOptions: Record<number, string>; // stationId -> optionId
  collectedInsights: Array<{
    stationId: number;
    stationTitle: string;
    insight: string;
  }>;
  audioEnabled: boolean;
}
