
import React, { ReactNode } from 'react';
import { Link } from 'react-router-dom';

interface MainLayoutProps {
  children: ReactNode;
  title: string;
  description?: string;
}

const MainLayout: React.FC<MainLayoutProps> = ({ children, title, description }) => {
  return (
    <div className="min-h-screen bg-background">
      <header className="border-b border-border bg-card">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div>
            <h1 className="text-xl font-semibold">{title}</h1>
            {description && <p className="text-sm text-muted-foreground">{description}</p>}
          </div>
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
        </div>
      </header>
      <main className="container mx-auto px-4 py-6">
        {children}
      </main>
      <footer className="border-t border-border mt-10">
        <div className="container mx-auto px-4 py-4">
          <p className="text-sm text-muted-foreground text-center">
            Neural Analytics Dashboard © {new Date().getFullYear()}
          </p>
        </div>
      </footer>
    </div>
  );
};

export default MainLayout;
