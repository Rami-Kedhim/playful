
import React from 'react';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import { cn } from '@/lib/utils';
import Breadcrumbs from '@/components/navigation/Breadcrumbs';

export interface MainLayoutProps {
  children: React.ReactNode;
  title?: string;
  description?: string;
  hideHeader?: boolean;
  hideNavbar?: boolean;
  hideFooter?: boolean;
  showBreadcrumbs?: boolean;
  containerClass?: string;
  fullWidth?: boolean;
  className?: string;
  simplified?: boolean;
}

/**
 * Main application layout component that provides consistent structure
 */
const MainLayout: React.FC<MainLayoutProps> = ({
  children,
  containerClass = "container mx-auto px-4 py-6",
  hideNavbar = false,
  hideFooter = false,
  hideHeader = false,
  title,
  description,
  showBreadcrumbs = false,
  fullWidth = false,
  className,
  simplified = false,
}) => {
  return (
    <div className={cn("flex min-h-screen flex-col bg-background", className)}>
      {!hideNavbar && !hideHeader && <Header simplified={simplified} />}
      
      {(title || description || showBreadcrumbs) && (
        <div className="bg-gradient-to-r from-background to-background/80 border-b border-border/40 backdrop-blur-sm">
          <div className="container mx-auto px-4 py-6">
            <div className="space-y-2">
              {showBreadcrumbs && (
                <div className="mb-2 text-sm text-muted-foreground">
                  <Breadcrumbs />
                </div>
              )}
              {title && <h1 className="text-2xl md:text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-foreground to-foreground/80">{title}</h1>}
              {description && <p className="text-muted-foreground">{description}</p>}
            </div>
          </div>
        </div>
      )}
      
      <main className={cn("flex-1 animate-fade-in", !fullWidth && containerClass)}>
        {children}
      </main>
      
      {!hideFooter && <Footer simplified={simplified} />}
    </div>
  );
};

export default MainLayout;
