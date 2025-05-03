
import React, { ReactNode } from 'react';
import { Link } from 'react-router-dom';
import { cn } from '@/lib/utils';
import { Breadcrumbs } from '@/components/navigation/Breadcrumbs';
import Navbar from '@/components/navigation/Navbar';
import MobileMenu from '@/components/layout/MobileMenu';
import { Brain } from 'lucide-react';

export interface UnifiedLayoutProps {
  children: ReactNode;
  title?: string;
  description?: string;
  showNavigation?: boolean;
  requireAuth?: boolean;
  showHeader?: boolean;
  hideNavbar?: boolean;
  hideFooter?: boolean;
  containerClass?: string;
  headerAction?: ReactNode;
  fullWidth?: boolean;
  showBreadcrumbs?: boolean;
  className?: string;
  sidebar?: ReactNode;
  sidebarPosition?: 'left' | 'right';
}

/**
 * UnifiedLayout - A consolidated layout component that replaces 
 * the multiple layout components previously scattered throughout the app.
 */
const UnifiedLayout: React.FC<UnifiedLayoutProps> = ({
  children,
  title,
  description,
  showNavigation = true,
  requireAuth,
  showHeader = true,
  hideNavbar = false,
  hideFooter = false,
  containerClass,
  headerAction,
  fullWidth = false,
  showBreadcrumbs = false,
  className,
  sidebar,
  sidebarPosition = 'right'
}) => {
  const containerClasses = containerClass || cn(
    "container mx-auto px-4 py-6",
    fullWidth ? "max-w-none px-0" : ""
  );

  return (
    <div className="min-h-screen flex flex-col bg-background">
      {/* Navigation Bar */}
      {!hideNavbar && <Navbar />}
      
      {/* Main Content */}
      <div className="flex-1">
        {/* Optional Header with Title & Description */}
        {showHeader && (title || description) && (
          <header className={cn("bg-card border-b border-border", showBreadcrumbs ? "py-2" : "py-4")}>
            <div className={cn("container mx-auto px-4 flex items-center justify-between")}>
              <div className="space-y-1">
                {title && <h1 className="text-xl font-semibold">{title}</h1>}
                {description && <p className="text-sm text-muted-foreground">{description}</p>}
              </div>
              
              {headerAction && (
                <div>{headerAction}</div>
              )}
            </div>
            
            {showBreadcrumbs && (
              <div className="container mx-auto px-4 mt-1 mb-1">
                <Breadcrumbs />
              </div>
            )}
          </header>
        )}

        {/* Main Content Area with Optional Sidebar */}
        <main className="flex-1">
          {sidebar ? (
            <div className={cn(
              "flex flex-col lg:flex-row",
              containerClasses,
              className
            )}>
              {/* Left sidebar position */}
              {sidebarPosition === 'left' && (
                <aside className="w-full lg:w-64 flex-shrink-0 mb-6 lg:mb-0 lg:mr-6">
                  {sidebar}
                </aside>
              )}
              
              {/* Main content */}
              <div className="flex-1">
                {children}
              </div>
              
              {/* Right sidebar position */}
              {sidebarPosition === 'right' && (
                <aside className="w-full lg:w-64 flex-shrink-0 mt-6 lg:mt-0 lg:ml-6">
                  {sidebar}
                </aside>
              )}
            </div>
          ) : (
            <div className={cn(containerClasses, className)}>
              {children}
            </div>
          )}
        </main>
      </div>
      
      {/* Footer */}
      {!hideFooter && (
        <footer className="border-t border-border mt-auto">
          <div className="container mx-auto px-4 py-4 flex justify-between items-center">
            <p className="text-sm text-muted-foreground">
              © {new Date().getFullYear()} UberEscorts
            </p>
            
            {/* Neural System Link */}
            <Link 
              to="/neural/monitor"
              className="flex items-center space-x-1 text-sm text-muted-foreground hover:text-primary transition-colors"
            >
              <Brain className="h-4 w-4" />
              <span>Neural Monitor</span>
            </Link>
          </div>
        </footer>
      )}
    </div>
  );
};

export default UnifiedLayout;
