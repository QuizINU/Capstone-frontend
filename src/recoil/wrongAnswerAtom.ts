// recoil/wrongAnswerAtom.ts
import { atom } from "recoil";
import { QuizItem } from "../types/quiz";

export const wrongAnswersAtom = atom<QuizItem[]>({
  key: "wrongAnswers",
  default: [],
});
