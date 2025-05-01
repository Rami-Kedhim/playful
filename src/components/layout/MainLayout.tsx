
import React, { ReactNode } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import Navbar from '@/components/navigation/Navbar';
import Footer from '@/components/navigation/Footer';
import { useAuth } from '@/hooks/auth';
import { cn } from '@/lib/utils';
import { hermes } from '@/core/Hermes';
import { uberCore } from '@/core/UberCore';

interface MainLayoutProps {
  children: ReactNode;
  title?: string;
  description?: string;
  showHeader?: boolean;
  hideNavbar?: boolean;
  hideFooter?: boolean;
  requireAuth?: boolean;
  className?: string;
  containerClass?: string;
}

const MainLayout: React.FC<MainLayoutProps> = ({
  children,
  title,
  description,
  showHeader = true,
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
    // Log page view with Hermes
    hermes.connect({
      system: 'Layout',
      connectionId: `layout-${Date.now()}`,
      metadata: {
        path: location.pathname,
        component: 'MainLayout',
        hasAuth: requireAuth,
        timestamp: new Date().toISOString()
      }
    });

    // Verify system integrity on layout mount
    const checkSystemIntegrity = async () => {
      const result = uberCore.checkSystemIntegrity();
      if (!result.isValid) {
        console.warn('System integrity check warning:', result.message);
      }
    };
    
    checkSystemIntegrity();
  }, [location.pathname]);

  React.useEffect(() => {
    if (requireAuth && !isLoading && !isAuthenticated) {
      navigate('/login', {
        state: { from: location.pathname },
        replace: true
      });
    }
  }, [requireAuth, isLoading, isAuthenticated, navigate, location.pathname]);

  if (isLoading && requireAuth) {
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
        {(title || description) && showHeader && (
          <header className={containerClass}>
            {title && <h1 className="text-3xl font-bold tracking-tight">{title}</h1>}
            {description && <p className="text-muted-foreground mt-2">{description}</p>}
          </header>
        )}
        
        <div className={containerClass}>
          {children}
        </div>
      </main>
      
      {!hideFooter && <Footer />}
    </div>
  );
};

export default MainLayout;
