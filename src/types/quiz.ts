export interface QuizItem {
  question: string;
  choices: string[];
  answer: string;
}

export interface QuizResultItem {
  question: string;
  correctAnswer: string;
  userAnswer: string;
  isCorrect: boolean;
}
