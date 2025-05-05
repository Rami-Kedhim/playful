
import React from 'react';
import { Outlet } from 'react-router-dom';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import { cn } from '@/lib/utils';

export interface LayoutProps {
  children?: React.ReactNode;
  hideHeader?: boolean;
  hideFooter?: boolean;
  title?: string;
  description?: string;
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
 */
const Layout: React.FC<LayoutProps> = ({
  children,
  title,
  description,
  hideHeader = false,
  hideFooter = false,
  showBreadcrumbs = false,
  containerClass = "container mx-auto px-4 py-6",
  fullWidth = false,
  className,
  simplified = false,
}) => {
  return (
    <div className={cn("flex min-h-screen flex-col bg-background", className)}>
      {!hideHeader && <Header simplified={simplified} />}
      
      {(title || description || showBreadcrumbs) && (
        <div className="bg-background border-b border-border">
          <div className="container mx-auto px-4 py-6">
            <div className="flex justify-between items-center">
              <div>
                {showBreadcrumbs && (
                  <div className="mb-2 text-sm text-muted-foreground">
                    {/* Breadcrumbs would be rendered here */}
                  </div>
                )}
                {title && <h1 className="text-2xl md:text-3xl font-bold">{title}</h1>}
                {description && <p className="text-muted-foreground mt-1">{description}</p>}
              </div>
            </div>
          </div>
        </div>
      )}
      
      <main className={cn("flex-grow", !fullWidth && containerClass)}>
        {children || <Outlet />}
      </main>
      
      {!hideFooter && <Footer simplified={simplified} />}
    </div>
  );
};

export default Layout;
