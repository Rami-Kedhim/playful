
import React, { ReactNode } from 'react';
import { Link } from 'react-router-dom';

interface MainLayoutProps {
  children: ReactNode;
  title?: string; // Make title optional
  description?: string;
  showNavigation?: boolean;
  requireAuth?: boolean;
  showHeader?: boolean;
  hideNavbar?: boolean;
  hideFooter?: boolean;
  containerClass?: string;
  fullWidth?: boolean;
}

const MainLayout: React.FC<MainLayoutProps> = ({ 
  children, 
  title,
  description, 
  showNavigation = true,
  requireAuth, // We're not using this in the component but accepting it as a prop
  showHeader = true,
  hideNavbar = false,
  hideFooter = false,
  containerClass = "container mx-auto px-4 py-4",
  fullWidth = false
}) => {
  return (
    <div className="min-h-screen bg-background">
      {!hideNavbar && (
        <header className="border-b border-border bg-card">
          <div className="container mx-auto px-4 py-4 flex items-center justify-between">
            <div>
              {title && <h1 className="text-xl font-semibold">{title}</h1>}
              {description && <p className="text-sm text-muted-foreground">{description}</p>}
            </div>
            {showNavigation && (
              <nav>
                <ul className="flex items-center space-x-4">
                  <li>
                    <Link 
                      to="/neural-analytics"
                      className="text-sm font-medium hover:text-primary transition-colors"
                    >
                      Analytics
                    </Link>
                  </li>
                  <li>
                    <Link 
                      to="/neural-monitoring"
                      className="text-sm font-medium hover:text-primary transition-colors"
                    >
                      Monitoring
                    </Link>
                  </li>
                  <li>
                    <Link 
                      to="/brain-hub"
                      className="text-sm font-medium hover:text-primary transition-colors"
                    >
                      Brain Hub
                    </Link>
                  </li>
                </ul>
              </nav>
            )}
          </div>
        </header>
      )}
      <main className={fullWidth ? "w-full" : containerClass}>
        {children}
      </main>
      {!hideFooter && (
        <footer className="border-t border-border mt-10">
          <div className="container mx-auto px-4 py-4">
            <p className="text-sm text-muted-foreground text-center">
              Neural Analytics Dashboard © {new Date().getFullYear()}
            </p>
          </div>
        </footer>
      )}
    </div>
  );
};

export default MainLayout;
