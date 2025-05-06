
import React from 'react';
import { Outlet } from 'react-router-dom';
import Header from '@/components/navigation/Header';
import Footer from '@/components/navigation/Footer';
import { cn } from '@/lib/utils';
import Breadcrumbs from '@/components/navigation/Breadcrumbs';

export interface LayoutProps {
  children?: React.ReactNode;
  title?: string;
  description?: string;
  hideHeader?: boolean;
  hideNavbar?: boolean;
  hideFooter?: boolean;
  showBreadcrumbs?: boolean;
  containerClass?: string;
  fullWidth?: boolean;
  className?: string;
  requireAuth?: boolean;
  showAuthButton?: boolean;
  simplified?: boolean;
}

/**
 * Unified Layout component that serves as the main layout across the UberEscorts platform.
 * This component provides a consistent structure for all pages in the application.
 */
const Layout: React.FC<LayoutProps> = ({
  children,
  title,
  description,
  hideHeader = false,
  hideNavbar = false,
  hideFooter = false,
  showBreadcrumbs = false,
  containerClass = "container mx-auto px-4 py-6",
  fullWidth = false,
  className,
  simplified = false,
}) => {
  return (
    <div className={cn("flex min-h-screen flex-col bg-background theme-transition", className)}>
      {!hideHeader && !hideNavbar && <Header simplified={simplified} />}
      
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
        {children || <Outlet />}
      </main>
      
      {!hideFooter && <Footer simplified={simplified} />}
    </div>
  );
};

export default Layout;
