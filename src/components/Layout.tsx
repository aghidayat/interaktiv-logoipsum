import React, { ReactNode } from "react";
import { Footer } from ".";

interface LayoutProps {
  children: ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <div>
      <main className="main-content">{children}</main>
      <Footer />
    </div>
  );
};

export default Layout;
