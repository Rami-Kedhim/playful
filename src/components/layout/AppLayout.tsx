
import React, { useEffect } from 'react';
import { Outlet } from 'react-router-dom';
import Navbar from './Navbar';
import Footer from './Footer';
import { useThemeToggle } from '@/hooks/useThemeToggle';
import { Toaster } from '@/components/ui/toaster';

interface AppLayoutProps {
  children?: React.ReactNode;
}

const AppLayout: React.FC<AppLayoutProps> = ({ children }) => {
  const { isDark, mounted } = useThemeToggle();
  
  // Add a class to the body for smoother theme transitions
  useEffect(() => {
    if (mounted) {
      document.body.classList.add('transition-colors', 'duration-300');
      
      // Add a fade-in animation on initial load
      const mainContent = document.querySelector('main');
      if (mainContent) {
        mainContent.classList.add('opacity-0');
        setTimeout(() => {
          mainContent.classList.remove('opacity-0');
          mainContent.classList.add('transition-opacity', 'duration-500', 'opacity-100');
        }, 50);
      }
    }
  }, [mounted]);
  
  return (
    <div className="flex flex-col min-h-screen bg-background text-foreground transition-colors duration-300">
      <Navbar />
      <main className="flex-1 w-full max-w-full transition-opacity duration-300">
        {children || <Outlet />}
      </main>
      <Footer />
      <Toaster />
    </div>
  );
};

export default AppLayout;
