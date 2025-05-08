
import React from 'react';
import { Outlet } from 'react-router-dom';
import Navigation from '@/components/navigation/Navigation';
import Footer from '@/components/navigation/Footer';
import { cn } from '@/lib/utils';
import LucieAIAssistant from '@/components/ai/LucieAIAssistant';

export interface LayoutProps {
  children?: React.ReactNode;
  fullWidth?: boolean;
  hideHeader?: boolean;
  hideFooter?: boolean;
  className?: string;
  containerClass?: string;
}

const Layout: React.FC<LayoutProps> = ({ 
  children, 
  fullWidth = false, 
  hideHeader = false,
  hideFooter = false,
  className,
  containerClass
}) => {
  return (
    <div className="min-h-screen flex flex-col">
      {!hideHeader && <Navigation />}
      
      <main className={cn(
        "flex-1",
        !fullWidth && (containerClass || "container mx-auto px-4"),
        className
      )}>
        {children || <Outlet />}
      </main>
      
      {!hideFooter && <Footer />}
      
      {/* AI Assistant always available */}
      <LucieAIAssistant />
    </div>
  );
};

export default Layout;
