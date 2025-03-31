import { useState } from "react";
import axios from "axios";

const UploadPage = () => {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [summary, setSummary] = useState("");
  const [quiz, setQuiz] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setSelectedFile(e.target.files[0]);
    }
  };

  const handleUpload = async () => {
    if (!selectedFile) return alert("PDF 파일을 선택해주세요.");

    const formData = new FormData();
    formData.append("file", selectedFile);

    const apiUrl = import.meta.env.VITE_API_BASE_URL;

    try {
      setLoading(true);
      const res = await axios.post(`${apiUrl}/process-pdf/`, formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      setSummary(res.data.summary);
      setQuiz(res.data.quiz);
    } catch (err) {
      alert("파일 업로드 또는 요약/퀴즈 생성 실패");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold">📤 PDF 업로드</h1>

      <input type="file" accept="application/pdf" onChange={handleFileChange} />
      <button
        onClick={handleUpload}
        disabled={loading}
        className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 disabled:opacity-50"
      >
        {loading ? "업로드 중..." : "업로드 및 분석 시작"}
      </button>

      {summary && (
        <div className="bg-white p-4 rounded shadow">
          <h2 className="text-lg font-semibold mb-2">🧠 요약 결과</h2>
          <p className="whitespace-pre-wrap">{summary}</p>
        </div>
      )}

      {quiz.length > 0 && (
        <div className="bg-white p-4 rounded shadow">
          <h2 className="text-lg font-semibold mb-2">📝 퀴즈 목록</h2>
          {quiz.map((q, idx) => (
            <div key={idx} className="mb-4">
              <p className="font-medium">
                {idx + 1}. {q.question}
              </p>
              <ul className="list-disc list-inside">
                {q.choices.map((choice: string, cIdx: number) => (
                  <li key={cIdx}>{choice}</li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default UploadPage;
