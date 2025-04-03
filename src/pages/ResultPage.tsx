import { useLocation, useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { QuizResultItem } from "../types/quiz";
import { useRecoilState } from "recoil";
import { personalNoteAtom } from "../recoil/personalNoteAtom";
import axios from "axios";

const ResultPage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const result = location.state?.result as QuizResultItem[] | undefined;

  const [personalNote, setPersonalNote] = useRecoilState(personalNoteAtom);

  useEffect(() => {
    if (!result) {
      alert("결과 데이터가 없습니다. 다시 퀴즈를 풀어주세요.");
      navigate("/upload");
    }
  }, [result, navigate]);

  if (!result) return null;

  const correctCount = result.filter((r) => r.isCorrect).length;

  const handleToggleNote = async (item: QuizResultItem) => {
    const exists = personalNote.some((p) => p.question === item.question);

    if (exists) {
      const noteToDelete = personalNote.find(
        (p) => p.question === item.question
      );
      if (!noteToDelete || !noteToDelete.id) return;

      try {
        await axios.delete(
          `http://localhost:8080/api/notes/${noteToDelete.id}`
        );
        const updated = personalNote.filter((p) => p.id !== noteToDelete.id);
        setPersonalNote(updated);
        console.log("오답노트에서 제거됨:", noteToDelete.id);
      } catch (err) {
        console.error("삭제 실패", err);
      }
    } else {
      try {
        const res = await axios.post("http://localhost:8080/api/notes", item);
        setPersonalNote((prev) => [...prev, res.data]);
        console.log("오답노트에 저장됨:", res.data);
      } catch (err) {
        console.error("저장 실패", err);
      }
    }
  };

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold">✅ 퀴즈 결과</h1>
      <p className="text-lg font-medium">
        맞힌 개수: {correctCount} / {result.length}
      </p>

      {result.map((item, idx) => {
        const isAlreadySaved = personalNote.some(
          (p) => p.question === item.question
        );

        return (
          <div key={idx} className="bg-white p-4 rounded shadow space-y-2">
            <p className="font-semibold">
              {idx + 1}. {item.question}
            </p>
            <p className={item.isCorrect ? "text-green-600" : "text-red-500"}>
              {item.isCorrect
                ? "✅ 정답"
                : `❌ 오답 (정답: ${item.correctAnswer})`}
            </p>
            <p>내 답변: {item.userAnswer}</p>

            <button
              onClick={() => handleToggleNote(item)}
              className={`text-sm underline ${
                isAlreadySaved
                  ? "text-red-500 hover:text-red-700"
                  : "text-blue-600 hover:text-blue-800"
              }`}
            >
              {isAlreadySaved ? "🗑️ 오답노트에서 삭제" : "📌 오답노트에 저장"}
            </button>
          </div>
        );
      })}
    </div>
  );
};

export default ResultPage;
