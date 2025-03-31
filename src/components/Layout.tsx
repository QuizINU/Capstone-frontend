import { ReactNode } from "react";
import NavBar from "./NavBar";

interface Props {
  children: ReactNode;
}

const Layout = ({ children }: Props) => {
  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <NavBar />
      <main className="flex-1 flex justify-center px-6 py-8">
        <div className="w-full max-w-6xl">{children}</div>
      </main>
    </div>
  );
};

export default Layout;
