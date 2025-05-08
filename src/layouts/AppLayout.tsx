
import React from 'react';
import { Outlet } from 'react-router-dom';
import { useUberEcosystem } from '@/contexts/UberEcosystemContext';

// Define what we'll use from the context
export interface AppLayoutProps {
  children?: React.ReactNode;
  title?: string;
  requireAuth?: boolean;
}

const AppLayout: React.FC<AppLayoutProps> = ({ children, title }) => {
  // Use the context but access only properties that are definitely available
  const ecosystem = useUberEcosystem();
  
  // Create local variables for authenticated state if they don't exist in the context
  const isAuthenticated = ecosystem.user !== undefined && ecosystem.user !== null;
  const isLoading = ecosystem.loading !== undefined ? ecosystem.loading : false;

  // Update document title if provided
  React.useEffect(() => {
    if (title) {
      document.title = `${title} | UberEscorts`;
    } else {
      document.title = 'UberEscorts';
    }
  }, [title]);
  
  return (
    <div className="min-h-screen flex flex-col">
      {/* App Header */}
      <header className="bg-background border-b">
        <div className="container mx-auto p-4 flex justify-between items-center">
          <h1 className="text-xl font-bold">UberEscorts</h1>
        </div>
      </header>
      
      {/* Main Content Area */}
      <main className="flex-1 container mx-auto p-4 md:p-6">
        {isLoading ? (
          <div className="flex justify-center items-center h-full">
            <span>Loading...</span>
          </div>
        ) : (
          children || <Outlet />
        )}
      </main>
      
      {/* App Footer */}
      <footer className="bg-background border-t py-4">
        <div className="container mx-auto px-4 text-center text-muted-foreground">
          &copy; {new Date().getFullYear()} UberEscorts. All rights reserved.
        </div>
      </footer>
    </div>
  );
};

export default AppLayout;
