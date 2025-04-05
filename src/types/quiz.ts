import { Memo } from "./memo";

export interface QuizItem {
  question: string;
  choices: string[];
  answer: string;
}

export interface QuizResultItem {
  id: number;
  question: string;
  userAnswer: string;
  correctAnswer: string;
  isCorrect: boolean;
  memos?: Memo[];
}
