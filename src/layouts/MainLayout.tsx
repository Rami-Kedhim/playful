
import React from 'react';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import { cn } from '@/lib/utils';

export interface MainLayoutProps {
  children: React.ReactNode;
  containerClass?: string;
  hideNavbar?: boolean;
  hideFooter?: boolean;
  title?: string;
  description?: string;
  showBreadcrumbs?: boolean;
  showNavigation?: boolean;
  fullWidth?: boolean;
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
  title,
  description,
  showBreadcrumbs = false,
  showNavigation = true,
  fullWidth = false,
  simplified = false,
}) => {
  return (
    <div className="flex min-h-screen flex-col">
      {!hideNavbar && <Header simplified={simplified} />}
      
      {(title || description || showBreadcrumbs) && (
        <div className="bg-muted/20 border-b border-border">
          <div className="container mx-auto px-4 py-4">
            {showBreadcrumbs && (
              <div className="mb-2 text-sm text-muted-foreground">
                {/* Breadcrumbs would be rendered here */}
              </div>
            )}
            {title && <h1 className="text-2xl font-bold">{title}</h1>}
            {description && <p className="text-muted-foreground mt-1">{description}</p>}
          </div>
        </div>
      )}
      
      <main className={cn("flex-1", !fullWidth && containerClass)}>
        {children}
      </main>
      
      {!hideFooter && <Footer simplified={simplified} />}
    </div>
  );
};

export default MainLayout;
