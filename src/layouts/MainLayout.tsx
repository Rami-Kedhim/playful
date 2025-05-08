
import React, { ReactNode } from 'react';
import MainNavigation from '@/components/navigation/MainNavigation';

interface MainLayoutProps {
  children: ReactNode;
  showNavigation?: boolean;
  fullWidth?: boolean;
  containerClass?: string; // Add this prop to fix the type error
  hideNavbar?: boolean;    // Add compatibility with other layouts
  hideFooter?: boolean;    // Add compatibility with other layouts
}

/**
 * Main application layout component
 */
const MainLayout: React.FC<MainLayoutProps> = ({ 
  children, 
  showNavigation = true,
  fullWidth = false,
  containerClass = '',
  hideNavbar = false,
  hideFooter = false
}) => {
  return (
    <div className="flex flex-col min-h-screen">
      {showNavigation && !hideNavbar && <MainNavigation />}
      
      <main className={`flex-1 ${fullWidth ? '' : 'container'} mx-auto py-6 ${containerClass}`}>
        {children}
      </main>
      
      {!hideFooter && (
        <footer className="border-t p-4 text-center text-sm text-muted-foreground">
          <p>© {new Date().getFullYear()} UberEscorts. All rights reserved.</p>
        </footer>
      )}
    </div>
  );
};

export default MainLayout;
