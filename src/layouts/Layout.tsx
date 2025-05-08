
import React from 'react';
import { Outlet } from 'react-router-dom';
import Navigation from '@/components/navigation/Navigation';
import Footer from '@/components/navigation/Footer';
import { cn } from '@/lib/utils';

export interface LayoutProps {
  children?: React.ReactNode;
  fullWidth?: boolean;
  hideHeader?: boolean;
  hideFooter?: boolean;
  className?: string;
}

const Layout: React.FC<LayoutProps> = ({ 
  children, 
  fullWidth = false, 
  hideHeader = false,
  hideFooter = false,
  className 
}) => {
  return (
    <div className="min-h-screen flex flex-col">
      {!hideHeader && <Navigation />}
      
      <main className={cn(
        "flex-1",
        !fullWidth && "container mx-auto px-4",
        className
      )}>
        {children || <Outlet />}
      </main>
      
      {!hideFooter && <Footer />}
    </div>
  );
};

export default Layout;
