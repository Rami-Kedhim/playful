
import React, { ReactNode } from 'react';
import { Link } from 'react-router-dom';
import MainNavigation from '@/components/navigation/MainNavigation';
import Footer from '@/components/navigation/Footer';
import { Breadcrumb } from '@/components/ui/breadcrumb';

interface MainLayoutProps {
  children: ReactNode;
  title?: string;
  description?: string;
  showNavigation?: boolean;
  requireAuth?: boolean;
  showHeader?: boolean;
  hideNavbar?: boolean;
  hideFooter?: boolean;
  containerClass?: string;
  fullWidth?: boolean;
  showBreadcrumbs?: boolean;
}

const MainLayout: React.FC<MainLayoutProps> = ({ 
  children, 
  title,
  description, 
  showNavigation = true,
  showHeader = true,
  hideNavbar = false,
  hideFooter = false,
  containerClass = "container mx-auto px-4 py-6",
  fullWidth = false,
  showBreadcrumbs = false
}) => {
  return (
    <div className="min-h-screen flex flex-col bg-background">
      {!hideNavbar && (
        <MainNavigation showFullMenu={true} />
      )}
      
      {showHeader && (
        <header className="bg-background border-b border-border">
          <div className="container mx-auto px-4 py-6">
            <div className="flex flex-col space-y-2">
              {showBreadcrumbs && <Breadcrumb />}
              {title && <h1 className="text-2xl md:text-3xl font-bold">{title}</h1>}
              {description && <p className="text-muted-foreground">{description}</p>}
            </div>
          </div>
        </header>
      )}
      
      <main className={`flex-grow ${!fullWidth ? containerClass : "w-full"}`}>
        {children}
      </main>
      
      {!hideFooter && (
        <Footer />
      )}
    </div>
  );
};

export default MainLayout;
