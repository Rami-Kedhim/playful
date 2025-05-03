
import React from 'react';
import { Outlet } from 'react-router-dom';
import Header from './Header';
import Footer from './Footer';

export interface UnifiedLayoutProps {
  children?: React.ReactNode;
  hideHeader?: boolean;
  hideFooter?: boolean;
  title?: string;
  description?: string;
  showBreadcrumbs?: boolean;
}

const UnifiedLayout: React.FC<UnifiedLayoutProps> = ({ 
  children, 
  hideHeader = false,
  hideFooter = false,
  title,
  description,
  showBreadcrumbs
}) => {
  return (
    <div className="flex flex-col min-h-screen">
      {!hideHeader && <Header />}
      
      {(title || description || showBreadcrumbs) && (
        <div className="border-b border-border/20 bg-muted/30 py-4">
          <div className="container mx-auto px-4">
            {showBreadcrumbs && (
              <div className="mb-2 text-sm text-muted-foreground">
                {/* Breadcrumbs could be added here */}
              </div>
            )}
            {title && <h1 className="text-2xl font-bold">{title}</h1>}
            {description && <p className="text-muted-foreground mt-1">{description}</p>}
          </div>
        </div>
      )}
      
      <main className="flex-grow">
        {children || <Outlet />}
      </main>
      
      {!hideFooter && <Footer />}
    </div>
  );
};

export { UnifiedLayout };
export default UnifiedLayout;
