import { atom } from "recoil";
import { QuizResultItem } from "../types/quiz";

export const personalNoteAtom = atom<QuizResultItem[]>({
  key: "personalNote",
  default: [],
});
