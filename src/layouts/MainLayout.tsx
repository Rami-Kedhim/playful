
import React from 'react';
import { cn } from '@/lib/utils';
import NavigationBar from '@/components/navigation/NavigationBar';
import Sidebar from '@/components/navigation/Sidebar';
import Footer from '@/components/layout/Footer';

export interface MainLayoutProps {
  children: React.ReactNode;
  containerClassName?: string;
  showNavigationBar?: boolean;
  showSidebar?: boolean;
  showFooter?: boolean;
}

const MainLayout: React.FC<MainLayoutProps> = ({
  children,
  containerClassName,
  showNavigationBar = true,
  showSidebar = false,
  showFooter = true
}) => {
  return (
    <div className="min-h-screen flex flex-col">
      {showNavigationBar && <NavigationBar />}
      
      <div className="flex-1 flex">
        {showSidebar && <Sidebar />}
        
        <main className={cn("flex-1", containerClassName)}>
          {children}
        </main>
      </div>
      
      {showFooter && <Footer />}
    </div>
  );
};

export default MainLayout;
