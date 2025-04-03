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

  const handleSaveToNote = async (item: QuizResultItem) => {
    const isAlreadySaved = personalNote.some(
      (p) => p.question === item.question
    );
    if (isAlreadySaved) return;

    try {
      const res = await axios.post("http://localhost:8080/api/notes", item);
      const saved = res.data;
      const updated = [...personalNote, saved];
      setPersonalNote(updated);

      console.log("오답노트에 저장됨:", saved);
    } catch (err) {
      console.error("오답노트 저장 실패:", err);
      alert("오답노트 저장 중 오류가 발생했습니다.");
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
              onClick={() => handleSaveToNote(item)}
              disabled={isAlreadySaved}
              className={`text-sm underline ${
                isAlreadySaved
                  ? "text-gray-400 cursor-not-allowed"
                  : "text-blue-600 hover:text-blue-800"
              }`}
            >
              {isAlreadySaved ? "✔️ 저장됨" : "📌 오답노트에 저장"}
            </button>
          </div>
        );
      })}
    </div>
  );
};

export default ResultPage;
