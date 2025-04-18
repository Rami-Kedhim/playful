
import React, { useEffect } from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';
import Header from './Header';
import Navbar from './Navbar';
import Footer from './Footer';
import { useThemeToggle } from '@/hooks/useThemeToggle';
import { cn } from '@/lib/utils';
import PageTransition from './PageTransition';
import '@/styles/reveal-animations.css';

interface EnhancedAppLayoutProps {
  children?: React.ReactNode;
  hideNavbar?: boolean;
  hideFooter?: boolean;
  useHeader?: boolean;
}

const EnhancedAppLayout: React.FC<EnhancedAppLayoutProps> = ({ 
  children, 
  hideNavbar = false, 
  hideFooter = false,
  useHeader = false
}) => {
  const { isDark, mounted } = useThemeToggle();
  const location = useLocation();
  
  // Add a class to the body for smoother theme transitions
  useEffect(() => {
    if (mounted) {
      document.body.classList.add('transition-colors', 'duration-300');
      document.documentElement.classList.add('theme-transition');
      
      // Add a fade-in animation on initial load with a slight scale effect
      const mainContent = document.querySelector('main');
      if (mainContent) {
        mainContent.classList.add('opacity-0', 'transform', 'scale-98');
        setTimeout(() => {
          mainContent.classList.remove('opacity-0', 'scale-98');
          mainContent.classList.add('transition-all', 'duration-500', 'opacity-100', 'scale-100');
        }, 50);
      }
    }
    
    return () => {
      // Clean up classes on unmount
      document.body.classList.remove('transition-colors', 'duration-300');
      document.documentElement.classList.remove('theme-transition');
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
      {useHeader ? 
        (!hideNavbar && <Header />) :
        (!hideNavbar && <Navbar />)
      }
      
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

export default EnhancedAppLayout;
