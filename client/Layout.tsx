import { ReactNode } from "react";
import Header from "./app/components/Header";
import Footer from "./app/components/Footer";
interface LayoutProps {
  children: ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <>
      <Header />
      <main style={{ minHeight: "100vh" }}> {children}</main>
      <Footer />
    </>
  );
};

export default Layout;