
import React from 'react';
import Navbar from '@/components/layout/Navbar';
import { useAuth } from '@/hooks/auth/useAuthContext';

interface LayoutProps {
  children: React.ReactNode;
  hideNavbar?: boolean;
}

const Layout: React.FC<LayoutProps> = ({ children, hideNavbar = false }) => {
  const { isLoading } = useAuth();

  if (isLoading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="animate-spin rounded-full h-10 w-10 border-t-2 border-b-2 border-primary"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col bg-background">
      {!hideNavbar && <Navbar />}
      <main className="flex-grow">
        {children}
      </main>
      <footer className="py-6 border-t bg-background">
        <div className="container mx-auto px-4 text-center text-muted-foreground text-sm">
          © {new Date().getFullYear()} UberEscorts. All rights reserved.
        </div>
      </footer>
    </div>
  );
};

export default Layout;
