import { Link, useLocation } from "react-router-dom";

const NavBar = () => {
  const location = useLocation();

  const navItems = [
    { path: "/", label: "홈" },
    { path: "/upload", label: "PDF 업로드" },
    { path: "/quiz", label: "퀴즈 풀기" },
    { path: "/mypage", label: "나의 문제집" },
    { path: "/login", label: "로그인" },
  ];

  return (
    <nav className="bg-white shadow border-b">
      <div className="flex items-center gap-6 max-w-6xl mx-auto px-4 py-4">
        {navItems.map((item) => (
          <Link
            key={item.path}
            to={item.path}
            className={`font-medium ${
              location.pathname === item.path
                ? "text-blue-600 font-bold"
                : "text-gray-700 hover:text-blue-400"
            }`}
          >
            {item.label}
          </Link>
        ))}
      </div>
    </nav>
  );
};

export default NavBar;
