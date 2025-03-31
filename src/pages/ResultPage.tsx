import { useLocation, useNavigate } from "react-router-dom";
import { useSetRecoilState } from "recoil";
import { wrongAnswersAtom } from "../recoil/wrongAnswerAtom";

const ResultPage = () => {
  const location = useLocation();
  const result = location.state?.result;

  if (!result) return <p>결과 데이터가 없습니다.</p>;

  const correctCount = result.filter((r: any) => r.isCorrect).length;
  const wrongAnswers = result.filter((r: any) => !r.isCorrect);

  const setWrongAnswers = useSetRecoilState(wrongAnswersAtom);
  setWrongAnswers(wrongAnswers);

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold">✅ 결과</h1>
      <p className="text-lg font-medium">
        맞힌 개수: {correctCount} / {result.length}
      </p>

      {result.map((item: any, idx: number) => (
        <div key={idx} className="bg-white p-4 rounded shadow">
          <p className="font-semibold">
            {idx + 1}. {item.question}
          </p>
          <p className={item.isCorrect ? "text-green-600" : "text-red-500"}>
            {item.isCorrect
              ? "✅ 정답"
              : `❌ 오답 (정답: ${item.correctAnswer})`}
          </p>
          <p>내 답변: {item.userAnswer}</p>
        </div>
      ))}
    </div>
  );
};

export default ResultPage;
