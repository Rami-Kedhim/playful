
import React from "react";
import Navbar from "../navigation/Navbar";
import Footer from "../navigation/Footer";

export interface MainLayoutProps {
  children: React.ReactNode;
  showHeader?: boolean;
  containerClass?: string;
  hideNavbar?: boolean;
  hideFooter?: boolean;
  title?: string;
  description?: string;
}

const MainLayout: React.FC<MainLayoutProps> = ({
  children,
  showHeader = true,
  containerClass = "container mx-auto px-4 py-8",
  hideNavbar = false,
  hideFooter = false,
  title,
  description
}) => {
  return (
    <div className="min-h-screen flex flex-col">
      {!hideNavbar && <Navbar />}
      
      {showHeader && title && (
        <div className="bg-muted/50 py-8">
          <div className="container mx-auto px-4">
            <h1 className="text-3xl font-bold">{title}</h1>
            {description && <p className="text-muted-foreground mt-2">{description}</p>}
          </div>
        </div>
      )}
      
      <main className="flex-grow">
        <div className={containerClass}>
          {children}
        </div>
      </main>

      {!hideFooter && <Footer />}
    </div>
  );
};

export default MainLayout;
