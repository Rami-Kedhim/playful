
import React, { ReactNode } from 'react';
import { Link } from 'react-router-dom';
import MainNavigation from '@/components/navigation/MainNavigation';
import Footer from '@/components/navigation/Footer';
import { Breadcrumb } from '@/components/ui/breadcrumb';
import { getBreadcrumbsFromPath } from '@/utils/navigationHelpers';
import { useLocation } from 'react-router-dom';

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
  const location = useLocation();
  const breadcrumbs = getBreadcrumbsFromPath(location.pathname);

  return (
    <div className="min-h-screen flex flex-col bg-background">
      {!hideNavbar && (
        <MainNavigation showFullMenu={true} />
      )}
      
      {showHeader && (title || description || showBreadcrumbs) && (
        <header className="bg-background border-b border-border">
          <div className="container mx-auto px-4 py-6">
            <div className="flex flex-col space-y-2">
              {showBreadcrumbs && breadcrumbs.length > 1 && (
                <nav className="flex text-sm text-muted-foreground">
                  {breadcrumbs.map((crumb, index) => (
                    <React.Fragment key={crumb.path}>
                      {index > 0 && <span className="mx-2">/</span>}
                      {index === breadcrumbs.length - 1 ? (
                        <span className="text-foreground">{crumb.label}</span>
                      ) : (
                        <Link to={crumb.path} className="hover:text-foreground">
                          {crumb.label}
                        </Link>
                      )}
                    </React.Fragment>
                  ))}
                </nav>
              )}
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
