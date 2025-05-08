
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
  title?: string;
  description?: string;
  containerClassName?: string;
  contentClassName?: string;
  containerClass?: string; // For backward compatibility
  hideNavbar?: boolean; // For backward compatibility
  hideFooter?: boolean; // For backward compatibility
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
  contentClassName = '',
  containerClass = '', // For backward compatibility
  hideNavbar = false, // For backward compatibility
  hideFooter = false // For backward compatibility
}) => {
  // Convert legacy props to new format
  const shouldShowNav = showNavigationBar && !hideNavbar;
  const shouldShowFooter = showFooter && !hideFooter;
  const finalContainerClassName = containerClassName || containerClass || '';

  return (
    <div className={`min-h-screen flex flex-col ${className}`}>
      {shouldShowNav && <NavigationBar />}

      <div className={`flex flex-1 ${finalContainerClassName}`}>
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

      {shouldShowFooter && <Footer />}
    </div>
  );
};

export default MainLayout;
