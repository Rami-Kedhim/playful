
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
  title?: string;
  description?: string;
}

/**
 * Unified Layout component that maintains consistent structure across all pages
 */
const Layout: React.FC<LayoutProps> = ({
  children,
  containerClass = "container mx-auto px-4 py-6",
  hideNavbar = false,
  hideFooter = false,
  fullWidth = false,
  title,
  description
}) => {
  return (
    <div className="flex min-h-screen flex-col bg-background">
      {!hideNavbar && <MainNavigation />}
      
      {(title || description) && (
        <header className="bg-background border-b border-border">
          <div className="container mx-auto px-4 py-6">
            {title && <h1 className="text-2xl md:text-3xl font-bold">{title}</h1>}
            {description && <p className="text-muted-foreground mt-1">{description}</p>}
          </div>
        </header>
      )}
      
      <main className={cn("flex-grow", !fullWidth && containerClass)}>
        {children}
      </main>
      
      {!hideFooter && <Footer />}
    </div>
  );
};

export default Layout;
