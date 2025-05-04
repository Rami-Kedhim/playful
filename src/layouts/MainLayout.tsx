
import React, { ReactNode } from 'react';
import UnifiedHeader from '@/components/layout/UnifiedHeader';
import UnifiedFooter from '@/components/layout/UnifiedFooter';
import { cn } from '@/lib/utils';
import Breadcrumbs from '@/components/navigation/Breadcrumbs';

interface MainLayoutProps {
  children: ReactNode;
  title?: string;
  description?: string;
  containerClass?: string;
  hideHeader?: boolean;
  hideFooter?: boolean;
  fullWidth?: boolean;
  className?: string;
  showBreadcrumbs?: boolean;
  simplified?: boolean;
}

/**
 * Main application layout component that provides consistent structure across all pages
 */
const MainLayout: React.FC<MainLayoutProps> = ({
  children,
  title,
  description,
  containerClass = "container mx-auto px-4 py-6",
  hideHeader = false,
  hideFooter = false,
  fullWidth = false,
  className,
  showBreadcrumbs = false,
  simplified = false
}) => {
  return (
    <div className={cn("flex min-h-screen flex-col bg-background", className)}>
      {!hideHeader && <UnifiedHeader />}
      
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
      
      {!hideFooter && <UnifiedFooter simplified={simplified} />}
    </div>
  );
};

export default MainLayout;
