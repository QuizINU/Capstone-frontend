import { useEffect, useState } from "react";
import axios from "axios";
import { QuizResultItem } from "../types/quiz";

const ReviewPage = () => {
  const [notes, setNotes] = useState<QuizResultItem[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchNotes = async () => {
      try {
        const res = await axios.get("http://localhost:8080/api/notes");
        setNotes(res.data);
      } catch (err) {
        console.error("오답노트 불러오기 실패:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchNotes();
  }, []);

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold">📘 나의 오답노트</h1>

      {loading && <p>불러오는 중...</p>}

      {!loading && notes.length === 0 && (
        <p className="text-gray-500">저장된 오답이 없습니다.</p>
      )}

      {notes.map((item, idx) => (
        <div key={idx} className="bg-white p-4 rounded shadow space-y-2">
          <p className="font-semibold">
            {idx + 1}. {item.question}
          </p>
          <p className="text-red-500">❌ 정답: {item.correctAnswer}</p>
          <p className="text-gray-600">내 답변: {item.userAnswer}</p>
        </div>
      ))}
    </div>
  );
};

export default ReviewPage;
