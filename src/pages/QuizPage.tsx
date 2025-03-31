import { useLocation, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { QuizItem } from "../types/quiz";

const QuizPage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const passedQuiz = location.state?.quiz as QuizItem[] | undefined;
  const [quiz, setQuiz] = useState<QuizItem[]>([]);
  const [userAnswers, setUserAnswers] = useState<string[]>([]);
  const [showResult, setShowResult] = useState(false);

  useEffect(() => {
    if (!passedQuiz) {
      alert("잘못된 접근입니다. 다시 업로드 해주세요.");
      navigate("/upload");
    } else {
      setQuiz(passedQuiz);
      setUserAnswers(Array(passedQuiz.length).fill("")); // 초기화
    }
  }, [passedQuiz, navigate]);

  const handleSelect = (qIndex: number, choice: string) => {
    const updatedAnswers = [...userAnswers];
    updatedAnswers[qIndex] = choice;
    setUserAnswers(updatedAnswers);
  };

  const handleSubmit = () => {
    const result = quiz.map((q, i) => ({
      question: q.question,
      correctAnswer: q.answer,
      userAnswer: userAnswers[i],
      isCorrect: q.answer === userAnswers[i],
    }));

    navigate("/result", { state: { result } });
  };

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold">🧠 퀴즈 풀기</h1>

      {quiz.map((q, idx) => (
        <div key={idx} className="bg-white p-4 rounded shadow space-y-2">
          <p className="font-semibold">
            {idx + 1}. {q.question}
          </p>
          <div className="flex flex-col gap-1">
            {q.choices.map((choice) => (
              <button
                key={choice}
                onClick={() => handleSelect(idx, choice)}
                className={`text-left px-3 py-2 rounded border ${
                  userAnswers[idx] === choice
                    ? "bg-blue-100 border-blue-500"
                    : "bg-gray-100 hover:bg-gray-200"
                }`}
              >
                {choice}
              </button>
            ))}
          </div>
          {showResult && (
            <p
              className={`text-sm ${
                userAnswers[idx] === q.answer
                  ? "text-green-600"
                  : "text-red-500"
              }`}
            >
              {userAnswers[idx] === q.answer
                ? "✅ 정답입니다!"
                : `❌ 정답: ${q.answer}`}
            </p>
          )}
        </div>
      ))}

      {!showResult && (
        <button
          onClick={handleSubmit}
          className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700"
        >
          제출하고 결과 확인
        </button>
      )}
    </div>
  );
};

export default QuizPage;
