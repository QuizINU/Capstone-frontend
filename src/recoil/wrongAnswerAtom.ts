// recoil/wrongAnswerAtom.ts
import { atom } from "recoil";
import { QuizResultItem } from "../types/quiz";

export const wrongAnswersAtom = atom<QuizResultItem[]>({
  key: "wrongAnswers",
  default: [],
});
