
import React, { ReactNode } from 'react';
import Navbar from '../navigation/Navbar';
import Footer from '../navigation/Footer';

interface MainLayoutProps {
  children: ReactNode;
  showHeader?: boolean;
  showFooter?: boolean;
  containerClass?: string;
}

const MainLayout = ({ 
  children, 
  showHeader = true, 
  showFooter = true,
  containerClass
}: MainLayoutProps) => {
  return (
    <div className="min-h-screen flex flex-col">
      {showHeader && <Navbar />}
      
      <main className={`flex-grow ${containerClass || ''}`}>
        {children}
      </main>
      
      {showFooter && <Footer />}
    </div>
  );
};

export default MainLayout;
