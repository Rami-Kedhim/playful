
import React, { useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import Navbar from '@/components/layout/Navbar';
import { useAuth } from '@/hooks/auth';

interface LayoutProps {
  children: React.ReactNode;
  hideNavbar?: boolean;
  requireAuth?: boolean;
}

const Layout: React.FC<LayoutProps> = ({ 
  children, 
  hideNavbar = false,
  requireAuth = false
}) => {
  const { isLoading, isAuthenticated } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    // If authentication is required and user is not authenticated,
    // redirect to login page
    if (requireAuth && !isLoading && !isAuthenticated) {
      navigate('/auth', { 
        state: { from: location.pathname },
        replace: true
      });
    }
  }, [requireAuth, isLoading, isAuthenticated, navigate, location.pathname]);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="animate-spin rounded-full h-10 w-10 border-t-2 border-b-2 border-primary"></div>
      </div>
    );
  }

  // If requireAuth is true and the user isn't authenticated yet, don't render anything
  // The useEffect will handle the redirect
  if (requireAuth && !isAuthenticated) {
    return null;
  }

  return (
    <div className="min-h-screen flex flex-col bg-background">
      {!hideNavbar && <Navbar />}
      <main className="flex-grow">
        {children}
      </main>
    </div>
  );
};

export default Layout;
