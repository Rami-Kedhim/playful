
import React, { useEffect } from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';
import Navbar from './Navbar';
import Footer from './Footer';
import { useThemeToggle } from '@/hooks/useThemeToggle';
import { Toaster } from '@/components/ui/toaster';
import { cn } from '@/lib/utils';
import PageTransition from './PageTransition';

interface EnhancedAppLayoutProps {
  children?: React.ReactNode;
}

const EnhancedAppLayout: React.FC<EnhancedAppLayoutProps> = ({ children }) => {
  const { isDark, mounted } = useThemeToggle();
  const location = useLocation();
  
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
    
    return () => {
      // Clean up classes on unmount
      document.body.classList.remove('transition-colors', 'duration-300');
    };
  }, [mounted]);
  
  return (
    <div className={cn(
      "flex flex-col min-h-screen bg-background text-foreground",
      "transition-colors duration-300"
    )}>
      <Navbar />
      <AnimatePresence mode="wait">
        <PageTransition key={location.pathname} className="flex-1 w-full max-w-full">
          <main className="flex-1 w-full max-w-full transition-opacity duration-300">
            {children || <Outlet />}
          </main>
        </PageTransition>
      </AnimatePresence>
      <Footer />
      <Toaster />
    </div>
  );
};

export default EnhancedAppLayout;
