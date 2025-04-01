import { useLocation, useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { QuizResultItem } from "../types/quiz";
import { useSetRecoilState } from "recoil";
import { personalNoteAtom } from "../recoil/personalNoteAtom";

const ResultPage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const result = location.state?.result as QuizResultItem[] | undefined;

  const setPersonalNote = useSetRecoilState(personalNoteAtom);

  useEffect(() => {
    if (!result) {
      alert("결과 데이터가 없습니다. 다시 퀴즈를 풀어주세요.");
      navigate("/quiz");
    }
  }, [result, navigate]);

  if (!result) return null;

  const correctCount = result.filter((r) => r.isCorrect).length;

  const handleSaveToNote = (item: QuizResultItem) => {
    setPersonalNote((prev) => {
      // 중복 저장 방지
      const isAlreadySaved = prev.some((p) => p.question === item.question);
      return isAlreadySaved ? prev : [...prev, item];
    });
  };

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold">✅ 퀴즈 결과</h1>
      <p className="text-lg font-medium">
        맞힌 개수: {correctCount} / {result.length}
      </p>

      {result.map((item, idx) => (
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
            className="text-sm text-blue-600 underline hover:text-blue-800"
          >
            📌 오답노트에 저장
          </button>
        </div>
      ))}
    </div>
  );
};

export default ResultPage;
