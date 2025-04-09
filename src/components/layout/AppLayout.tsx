
import React, { useEffect } from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';
import Navbar from './Navbar';
import Footer from './Footer';
import { useThemeToggle } from '@/hooks/useThemeToggle';
import { cn } from '@/lib/utils';
import PageTransition from './PageTransition';

interface AppLayoutProps {
  children?: React.ReactNode;
  hideNavbar?: boolean;
  hideFooter?: boolean;
}

const AppLayout: React.FC<AppLayoutProps> = ({ 
  children, 
  hideNavbar = false, 
  hideFooter = false 
}) => {
  const { isDark, mounted } = useThemeToggle();
  const location = useLocation();
  
  // Add classes for smoother theme transitions
  useEffect(() => {
    if (mounted) {
      document.documentElement.classList.add('theme-transition');
      document.body.classList.add('transition-colors', 'duration-300');
      
      // Add fade-in animation for main content
      const mainContent = document.querySelector('main');
      if (mainContent) {
        mainContent.classList.add('opacity-0', 'scale-98');
        setTimeout(() => {
          mainContent.classList.remove('opacity-0', 'scale-98');
          mainContent.classList.add('opacity-100', 'scale-100', 'transition-all', 'duration-300');
        }, 50);
      }
    }
    
    return () => {
      document.documentElement.classList.remove('theme-transition');
      document.body.classList.remove('transition-colors', 'duration-300');
    };
  }, [mounted]);
  
  // Scroll to top when route changes
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location.pathname]);
  
  return (
    <div className={cn(
      "flex flex-col min-h-screen bg-background text-foreground",
      "transition-colors duration-300"
    )}>
      {!hideNavbar && <Navbar />}
      <AnimatePresence mode="wait">
        <PageTransition key={location.pathname} className="flex-1 w-full max-w-full">
          <main className="flex-1 w-full max-w-full transition-all duration-300">
            {children || <Outlet />}
          </main>
        </PageTransition>
      </AnimatePresence>
      {!hideFooter && <Footer />}
    </div>
  );
};

export default AppLayout;
