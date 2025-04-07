
import React from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/hooks/auth";

interface MainLayoutProps {
  children: React.ReactNode;
  title?: string;
  containerClass?: string;
}

const MainLayout: React.FC<MainLayoutProps> = ({ 
  children, 
  title, 
  containerClass = "container mx-auto px-4 py-6" 
}) => {
  const { user, isAuthenticated, logout } = useAuth();

  return (
    <div className="min-h-screen flex flex-col">
      {/* Navigation Bar */}
      <header className="bg-background border-b border-border sticky top-0 z-10">
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center">
              <Link to="/" className="text-xl font-bold">
                YourSite
              </Link>
              <nav className="hidden md:flex ml-10 space-x-4">
                <Link to="/" className="px-3 py-2 hover:text-primary">Home</Link>
                <Link to="/escorts" className="px-3 py-2 hover:text-primary">Escorts</Link>
                <Link to="/creators" className="px-3 py-2 hover:text-primary">Creators</Link>
              </nav>
            </div>
            <div className="flex items-center space-x-2">
              {isAuthenticated ? (
                <>
                  <span className="text-sm mr-2">Hi, {user?.username || 'User'}</span>
                  <Button variant="outline" size="sm" onClick={() => logout()}>
                    Logout
                  </Button>
                </>
              ) : (
                <>
                  <Link to="/login">
                    <Button variant="outline" size="sm">Login</Button>
                  </Link>
                  <Link to="/register">
                    <Button size="sm">Register</Button>
                  </Link>
                </>
              )}
            </div>
          </div>
        </div>
      </header>
      
      {/* Page Title */}
      {title && (
        <div className="bg-muted py-4">
          <div className="container mx-auto px-4">
            <h1 className="text-2xl font-bold">{title}</h1>
          </div>
        </div>
      )}
      
      {/* Main Content */}
      <main className={`flex-grow ${containerClass}`}>
        {children}
      </main>
      
      {/* Footer */}
      <footer className="bg-background border-t border-border py-6">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="mb-4 md:mb-0">
              <p className="text-sm text-muted-foreground">
                © {new Date().getFullYear()} YourSite. All rights reserved.
              </p>
            </div>
            <div className="flex space-x-4">
              <Link to="/terms" className="text-sm text-muted-foreground hover:text-foreground">
                Terms of Service
              </Link>
              <Link to="/privacy" className="text-sm text-muted-foreground hover:text-foreground">
                Privacy Policy
              </Link>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default MainLayout;
