import { useEffect, useState } from "react";
import axios from "axios";
import { QuizResultItem } from "../types/quiz";

const ReviewPage = () => {
  const [notes, setNotes] = useState<QuizResultItem[]>([]);
  const [newMemoContent, setNewMemoContent] = useState("");
  const [selectedNoteId, setSelectedNoteId] = useState<number | null>(null);

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

  const handleDeleteNote = async (id: number) => {
    try {
      await axios.delete(`http://localhost:8080/api/notes/${id}`, {
        withCredentials: true,
      });
      setNotes((prev) => prev.filter((note) => note.id !== id));
    } catch (err) {
      console.error("오답 삭제 실패", err);
    }
  };

  const handleAddMemo = async (noteId: number) => {
    try {
      const response = await axios.post(
        `http://localhost:8080/api/notes/${noteId}/memos`,
        { content: newMemoContent },
        { withCredentials: true }
      );
      setNotes((prev) =>
        prev.map((n) =>
          n.id === noteId
            ? { ...n, memos: [...(n.memos || []), response.data] }
            : n
        )
      );
      setNewMemoContent("");
      setSelectedNoteId(null);
    } catch (error) {
      console.error("메모 추가 실패", error);
    }
  };

  const handleDeleteMemo = async (memoId: number, noteId: number) => {
    try {
      await axios.delete(`http://localhost:8080/api/notes/memos/${memoId}`, {
        withCredentials: true,
      });
      setNotes((prev) =>
        prev.map((note) =>
          note.id === noteId
            ? {
                ...note,
                memos: note.memos?.filter((m) => m.id !== memoId) || [],
              }
            : note
        )
      );
    } catch (error) {
      console.error("메모 삭제 실패", error);
    }
  };

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold">📘 나의 오답노트</h1>

      {notes.length === 0 ? (
        <p className="text-gray-500">저장된 오답노트가 없습니다.</p>
      ) : (
        notes.map((note, idx) => (
          <div key={note.id} className="bg-white p-4 rounded shadow space-y-2">
            <p className="font-semibold">
              {idx + 1}. {note.question}
            </p>
            <p className="text-red-500">❌ 정답: {note.correctAnswer}</p>
            <p>내 답변: {note.userAnswer}</p>

            {note.memos?.map((memo) => (
              <div
                key={memo.id}
                className="text-sm bg-yellow-100 rounded px-2 py-1"
              >
                📝 {memo.content}
                <button
                  onClick={() => handleDeleteMemo(memo.id!, note.id)}
                  className="ml-2 text-red-500 text-xs"
                >
                  삭제
                </button>
              </div>
            ))}

            {selectedNoteId === note.id ? (
              <div className="space-x-2 mt-2">
                <input
                  type="text"
                  className="border px-2 py-1 text-sm"
                  placeholder="메모 입력"
                  value={newMemoContent}
                  onChange={(e) => setNewMemoContent(e.target.value)}
                />
                <button
                  onClick={() => handleAddMemo(note.id)}
                  className="text-blue-600 text-sm"
                >
                  추가
                </button>
                <button
                  onClick={() => {
                    setNewMemoContent("");
                    setSelectedNoteId(null);
                  }}
                  className="text-gray-400 text-sm"
                >
                  취소
                </button>
              </div>
            ) : (
              <button
                onClick={() => setSelectedNoteId(note.id)}
                className="text-sm text-blue-500 underline hover:text-blue-700"
              >
                ✍️ 메모 추가
              </button>
            )}

            <button
              onClick={() => handleDeleteNote(note.id)}
              className="text-sm text-red-600 underline hover:text-red-800 block mt-2"
            >
              🗑️ 삭제하기
            </button>
          </div>
        ))
      )}
    </div>
  );
};

export default ReviewPage;
