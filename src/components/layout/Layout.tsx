
import React, { ReactNode } from 'react';
import MainNavigation from '@/components/navigation/MainNavigation';
import Footer from '@/components/navigation/Footer';
import { cn } from '@/lib/utils';

interface LayoutProps {
  children: ReactNode;
  containerClass?: string;
  hideNavbar?: boolean;
  hideFooter?: boolean;
  fullWidth?: boolean;
}

/**
 * Unified Layout component that maintains consistent structure across all pages
 */
const Layout: React.FC<LayoutProps> = ({
  children,
  containerClass = "container mx-auto px-4 py-6",
  hideNavbar = false,
  hideFooter = false,
  fullWidth = false
}) => {
  return (
    <div className="flex min-h-screen flex-col bg-background">
      {!hideNavbar && <MainNavigation />}
      
      <main className={cn("flex-grow", !fullWidth && containerClass)}>
        {children}
      </main>
      
      {!hideFooter && <Footer />}
    </div>
  );
};

export default Layout;
