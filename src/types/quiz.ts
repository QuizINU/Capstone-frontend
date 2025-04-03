export interface QuizItem {
  question: string;
  choices: string[];
  answer: string;
}

export interface QuizResultItem {
  id: number;
  question: string;
  correctAnswer: string;
  userAnswer: string;
  isCorrect: boolean;
}
