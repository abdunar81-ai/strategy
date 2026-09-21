export type Language = 'kz' | 'ru';

export interface QuizState {
  revenue: string;
  teamSize: string;
  bottleneck: string;
  readiness: string;
  name: string;
  phone: string;
}

export interface QuestionOption {
  label: string;
  value: string;
}

export interface Question {
  id: keyof Omit<QuizState, 'name' | 'phone'>;
  number: number;
  question: string;
  options: string[];
}

