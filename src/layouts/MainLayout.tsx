
import React from 'react';
import { UnifiedHeader } from '@/components/layout';
import { UnifiedFooter } from '@/components/layout';
import { cn } from '@/lib/utils';

export interface MainLayoutProps {
  children: React.ReactNode;
  containerClass?: string;
  hideNavbar?: boolean;
  hideFooter?: boolean;
}

const MainLayout: React.FC<MainLayoutProps> = ({
  children,
  containerClass,
  hideNavbar = false,
  hideFooter = false,
}) => {
  return (
    <div className="flex min-h-screen flex-col">
      {!hideNavbar && <UnifiedHeader />}
      
      <main className={cn("flex-1", containerClass)}>
        {children}
      </main>
      
      {!hideFooter && <UnifiedFooter />}
    </div>
  );
};

export default MainLayout;
