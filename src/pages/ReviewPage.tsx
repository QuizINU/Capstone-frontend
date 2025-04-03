import { useEffect, useState } from "react";
import axios from "axios";
import { QuizResultItem } from "../types/quiz";

const ReviewPage = () => {
  const [notes, setNotes] = useState<QuizResultItem[]>([]);

  useEffect(() => {
    const fetchNotes = async () => {
      try {
        const res = await axios.get("http://localhost:8080/api/notes", {
          withCredentials: true,
        });
        setNotes(res.data);
      } catch (err) {
        console.error("오답노트 조회 실패", err);
      }
    };

    fetchNotes();
  }, []);

  const handleDelete = async (id: number) => {
    try {
      await axios.delete(`http://localhost:8080/api/notes/${id}`, {
        withCredentials: true,
      });
      setNotes((prev) => prev.filter((note) => note.id !== id));
      console.log("삭제 완료:", id);
    } catch (err) {
      console.error("오답 삭제 실패", err);
    }
  };

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold">📘 나의 오답노트</h1>

      {notes.length === 0 && (
        <p className="text-gray-500">저장된 오답노트가 없습니다.</p>
      )}

      {notes.map((note, idx) => (
        <div key={note.id} className="bg-white p-4 rounded shadow space-y-2">
          <p className="font-semibold">
            {idx + 1}. {note.question}
          </p>
          <p className="text-red-500">❌ 정답: {note.correctAnswer}</p>
          <p>내 답변: {note.userAnswer}</p>

          <button
            onClick={() => handleDelete(note.id)}
            className="text-sm text-red-600 underline hover:text-red-800"
          >
            🗑️ 삭제하기
          </button>
        </div>
      ))}
    </div>
  );
};

export default ReviewPage;
