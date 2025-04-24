
import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import Navbar from '@/components/navigation/Navbar';
import Footer from '@/components/navigation/Footer';
import { useAuth } from '@/hooks/auth';
import { cn } from '@/lib/utils';

interface LayoutProps {
  children: React.ReactNode;
  hideNavbar?: boolean;
  hideFooter?: boolean;
  requireAuth?: boolean;
  className?: string;
  containerClass?: string;
}

const Layout: React.FC<LayoutProps> = ({
  children,
  hideNavbar = false,
  hideFooter = false,
  requireAuth = false,
  className,
  containerClass = "container mx-auto px-4 py-8"
}) => {
  const { isLoading, isAuthenticated } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  React.useEffect(() => {
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
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
      </div>
    );
  }

  return (
    <div className={cn("min-h-screen flex flex-col bg-background", className)}>
      {!hideNavbar && <Navbar />}
      <main className="flex-grow">
        <div className={containerClass}>
          {children}
        </div>
      </main>
      {!hideFooter && <Footer />}
    </div>
  );
};

export default Layout;
