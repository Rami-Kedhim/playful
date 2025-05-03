
import React, { ReactNode } from 'react';
import MainNavigation from '@/components/navigation/MainNavigation';
import Footer from '@/components/navigation/Footer';
import { cn } from '@/lib/utils';
import Breadcrumbs from '@/components/navigation/Breadcrumbs';

interface MainLayoutProps {
  children: ReactNode;
  title?: string;
  description?: string;
  containerClass?: string;
  hideNavbar?: boolean;
  hideFooter?: boolean;
  fullWidth?: boolean;
  className?: string;
  showBreadcrumbs?: boolean;
}

/**
 * Main application layout component that provides consistent structure across all pages
 */
const MainLayout: React.FC<MainLayoutProps> = ({
  children,
  title,
  description,
  containerClass = "container mx-auto px-4 py-6",
  hideNavbar = false,
  hideFooter = false,
  fullWidth = false,
  className,
  showBreadcrumbs = false
}) => {
  return (
    <div className={cn("flex min-h-screen flex-col bg-background", className)}>
      {!hideNavbar && <MainNavigation />}
      
      {(title || description) && (
        <header className="bg-background border-b border-border">
          <div className="container mx-auto px-4 py-6">
            {title && <h1 className="text-2xl md:text-3xl font-bold">{title}</h1>}
            {description && <p className="text-muted-foreground mt-1">{description}</p>}
          </div>
        </header>
      )}
      
      {showBreadcrumbs && (
        <div className="container mx-auto px-4 py-2">
          <Breadcrumbs />
        </div>
      )}
      
      <main className={cn("flex-grow", !fullWidth && containerClass)}>
        {children}
      </main>
      
      {!hideFooter && <Footer />}
    </div>
  );
};

export default MainLayout;
