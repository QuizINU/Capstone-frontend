import { useRecoilValue } from "recoil";
import { personalNoteAtom } from "../recoil/personalNoteAtom";
import { QuizResultItem } from "../types/quiz";

const ReviewPage = () => {
  const personalNote = useRecoilValue(personalNoteAtom);

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold">📚 나의 오답노트</h1>

      {personalNote.length === 0 ? (
        <p className="text-gray-500">저장된 오답노트가 없습니다.</p>
      ) : (
        personalNote.map((item: QuizResultItem, idx: number) => (
          <div key={idx} className="bg-white p-4 rounded shadow space-y-2">
            <p className="font-semibold">
              {idx + 1}. {item.question}
            </p>
            <p className="text-red-500">❌ 내 답변: {item.userAnswer}</p>
            <p className="text-green-600">✅ 정답: {item.correctAnswer}</p>
          </div>
        ))
      )}
    </div>
  );
};

export default ReviewPage;
