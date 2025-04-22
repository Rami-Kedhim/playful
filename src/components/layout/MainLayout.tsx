
import React, { ReactNode } from 'react';
import Navbar from '../navigation/Navbar';
import Footer from '../navigation/Footer';

interface MainLayoutProps {
  children: ReactNode;
  showHeader?: boolean;
  showFooter?: boolean;
  containerClass?: string;
  title?: string; // Added title prop
}

const MainLayout = ({ 
  children, 
  showHeader = true, 
  showFooter = true,
  containerClass,
  title
}: MainLayoutProps) => {
  return (
    <div className="min-h-screen flex flex-col">
      {showHeader && <Navbar />}
      
      <main className={`flex-grow ${containerClass || ''}`}>
        {/* Add title rendering if provided */}
        {title && (
          <div className="bg-muted py-4">
            <div className="container mx-auto px-4">
              <h1 className="text-2xl font-bold">{title}</h1>
            </div>
          </div>
        )}
        {children}
      </main>
      
      {showFooter && <Footer />}
    </div>
  );
};

export default MainLayout;
