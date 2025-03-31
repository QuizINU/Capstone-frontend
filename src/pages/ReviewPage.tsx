import { useRecoilValue } from "recoil";
import { wrongAnswersAtom } from "../recoil/wrongAnswerAtom";

const ReviewPage = () => {
  const wrongAnswers = useRecoilValue(wrongAnswersAtom);

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold">📚 오답 복습</h1>

      {wrongAnswers.length === 0 ? (
        <p className="text-gray-600">
          저장된 오답이 없습니다. 퀴즈를 풀고 다시 확인해보세요.
        </p>
      ) : (
        wrongAnswers.map((item, idx) => (
          <div key={idx} className="bg-white p-4 rounded shadow space-y-2">
            <p className="font-semibold">
              {idx + 1}. {item.question}
            </p>
            <p className="text-red-600">내 답변: {item.userAnswer}</p>
            <p className="text-green-600">정답: {item.correctAnswer}</p>
          </div>
        ))
      )}
    </div>
  );
};

export default ReviewPage;
