
import React, { ReactNode } from 'react';
import { Outlet } from 'react-router-dom';
import { Header } from '@/components/navigation/Header';
import { Footer } from '@/components/layout/Footer';

export interface LayoutProps {
  children?: ReactNode;
  title?: string;
  description?: string;
  showNavigation?: boolean;
  requireAuth?: boolean;
  showHeader?: boolean;
  hideNavbar?: boolean;
  hideFooter?: boolean;
  containerClass?: string;
  fullWidth?: boolean;
  sidebar?: ReactNode;
  sidebarPosition?: 'left' | 'right';
  headerAction?: ReactNode;
  headerContent?: ReactNode;
  footerContent?: ReactNode;
}

/**
 * Main application layout component
 * This is the consolidated layout that all other layout components use
 */
const Layout: React.FC<LayoutProps> = ({ 
  children, 
  title,
  description,
  showNavigation = true,
  requireAuth, // Not used directly but kept for prop consistency
  showHeader = true,
  hideNavbar = false,
  hideFooter = false,
  containerClass = "container mx-auto px-4 py-4",
  fullWidth = false,
  sidebar,
  sidebarPosition = 'right',
  headerAction,
  headerContent,
  footerContent
}) => {
  return (
    <div className="min-h-screen bg-background flex flex-col">
      {showHeader && !hideNavbar && (
        <Header simplified={!showNavigation} />
      )}
      
      <main className={`flex-1 ${fullWidth ? "w-full" : containerClass}`}>
        {title && (
          <div className="mb-6">
            <h1 className="text-2xl font-bold tracking-tight">{title}</h1>
            {description && <p className="text-muted-foreground">{description}</p>}
            {headerContent}
          </div>
        )}
        
        <div className={`flex ${sidebar ? (sidebarPosition === 'left' ? 'flex-row-reverse' : 'flex-row') : 'flex-col'} gap-6`}>
          {sidebar && (
            <aside className="w-full lg:w-64 flex-shrink-0">
              {sidebar}
            </aside>
          )}
          
          <div className={`flex-1 ${sidebar ? "lg:max-w-[calc(100%-16rem)]" : "w-full"}`}>
            {children || <Outlet />}
          </div>
        </div>
        
        {footerContent && (
          <div className="mt-6">
            {footerContent}
          </div>
        )}
      </main>

      {!hideFooter && (
        <Footer />
      )}
    </div>
  );
};

export default Layout;
