
import React from 'react';
import Header from './Header';
import Footer from './Footer';

export interface UnifiedLayoutProps {
  children: React.ReactNode;
  hideHeader?: boolean;
  hideFooter?: boolean;
}

export const UnifiedLayout: React.FC<UnifiedLayoutProps> = ({ 
  children, 
  hideHeader = false,
  hideFooter = false 
}) => {
  return (
    <div className="flex flex-col min-h-screen">
      {!hideHeader && <Header />}
      <main className="flex-grow">
        {children}
      </main>
      {!hideFooter && <Footer />}
    </div>
  );
};
