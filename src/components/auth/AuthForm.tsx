// 로그인/회원가입 공통 UI

interface Props {
  mode: "login" | "signup";
}

export const AuthForm = ({ mode }: Props) => {
  return (
    <div className="p-4">
      <h2 className="text-xl font-bold mb-4">
        {mode === "login" ? "로그인" : "회원가입"}
      </h2>
      {/* 폼 요소는 여기 공통 */}
    </div>
  );
};
