
import React, { ReactNode } from 'react';
import { cn } from '@/lib/utils';

export interface LayoutProps {
  children: ReactNode;
  className?: string;
  containerClass?: string;
  hideHeader?: boolean;
  hideFooter?: boolean;
  hideNavbar?: boolean; // Added for LivecamDetailLayout
  fullWidth?: boolean;
  title?: string; // Added these properties for pages using them
  description?: string;
  showBreadcrumbs?: boolean;
}

const Layout: React.FC<LayoutProps> = ({
  children,
  className,
  containerClass,
  hideHeader = false,
  hideFooter = false,
  hideNavbar = false, // Added with default
  fullWidth = false,
  // New props don't need to be used in this component
  title,
  description,
  showBreadcrumbs
}) => {
  return (
    <div className={cn('min-h-screen flex flex-col', className)}>
      {!hideHeader && !hideNavbar && (
        <header className="border-b">
          <div className="container mx-auto p-4">
            Header Placeholder
          </div>
        </header>
      )}
      
      <main className={cn('flex-grow', containerClass)}>
        {fullWidth ? (
          <>{children}</>
        ) : (
          <div className="container mx-auto p-4">{children}</div>
        )}
      </main>
      
      {!hideFooter && (
        <footer className="border-t">
          <div className="container mx-auto p-4 text-center text-sm text-muted-foreground">
            &copy; {new Date().getFullYear()} Footer Placeholder
          </div>
        </footer>
      )}
    </div>
  );
};

export default Layout;
