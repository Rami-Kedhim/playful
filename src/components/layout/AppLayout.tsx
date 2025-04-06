
import React, { useEffect } from 'react';
import { Outlet } from 'react-router-dom';
import Navbar from './Navbar';
import Footer from './Footer';
import { useThemeToggle } from '@/hooks/useThemeToggle';

interface AppLayoutProps {
  children?: React.ReactNode;
}

const AppLayout: React.FC<AppLayoutProps> = ({ children }) => {
  const { isDark, mounted } = useThemeToggle();
  
  // Add a class to the body for smoother theme transitions
  useEffect(() => {
    if (mounted) {
      document.body.classList.add('transition-colors', 'duration-300');
    }
  }, [mounted]);
  
  return (
    <div className="flex flex-col min-h-screen bg-background text-foreground transition-colors duration-300">
      <Navbar />
      <main className="flex-1 w-full max-w-full">
        {children || <Outlet />}
      </main>
      <Footer />
    </div>
  );
};

export default AppLayout;
