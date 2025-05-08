
import React from 'react';
import { Breadcrumb } from '@/components/ui/breadcrumb';
import { NavigationBar } from '@/components/navigation/NavigationBar';
import { Sidebar } from '@/components/navigation/Sidebar';
import { Footer } from '@/components/layout/Footer';

export interface MainLayoutProps {
  children: React.ReactNode;
  showBreadcrumbs?: boolean;
  showNavigationBar?: boolean;
  showSidebar?: boolean;
  showFooter?: boolean;
  className?: string;
  title?: string; // Add missing property
  description?: string; // Add missing property
  containerClassName?: string;
  contentClassName?: string;
}

const MainLayout: React.FC<MainLayoutProps> = ({
  children,
  showBreadcrumbs = false,
  showNavigationBar = true,
  showSidebar = true,
  showFooter = true,
  className = '',
  title,
  description,
  containerClassName = '',
  contentClassName = ''
}) => {
  return (
    <div className={`min-h-screen flex flex-col ${className}`}>
      {showNavigationBar && <NavigationBar />}

      <div className={`flex flex-1 ${containerClassName}`}>
        {showSidebar && <Sidebar />}

        <main className={`flex-1 p-4 md:p-6 ${contentClassName}`}>
          {showBreadcrumbs && <Breadcrumb className="mb-4" />}
          
          {(title || description) && (
            <div className="mb-6">
              {title && <h1 className="text-2xl font-bold">{title}</h1>}
              {description && <p className="text-muted-foreground mt-1">{description}</p>}
            </div>
          )}
          
          {children}
        </main>
      </div>

      {showFooter && <Footer />}
    </div>
  );
};

export default MainLayout;
