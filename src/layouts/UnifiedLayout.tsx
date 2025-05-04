
import React from 'react';
import { Outlet, useNavigate } from 'react-router-dom';
import Header from '@/components/navigation/MainNavigation';
import Footer from '@/components/navigation/Footer';
import { cn } from '@/lib/utils';
import Breadcrumbs from '@/components/navigation/Breadcrumbs';
import { useAuth } from '@/hooks/auth';
import { Button } from '@/components/ui/button';

export interface UnifiedLayoutProps {
  children?: React.ReactNode;
  title?: string;
  description?: string;
  hideHeader?: boolean;
  hideFooter?: boolean;
  showBreadcrumbs?: boolean;
  containerClass?: string;
  fullWidth?: boolean;
  className?: string;
  requireAuth?: boolean;
  showAuthButton?: boolean;
}

/**
 * UnifiedLayout serves as the main layout component across the UberEscorts platform.
 * It provides consistent header, footer, and content structure.
 */
const UnifiedLayout: React.FC<UnifiedLayoutProps> = ({
  children,
  title,
  description,
  hideHeader = false,
  hideFooter = false,
  showBreadcrumbs = false,
  containerClass = "container mx-auto px-4 py-6",
  fullWidth = false,
  className,
  requireAuth = false,
  showAuthButton = true
}) => {
  const { isAuthenticated, user } = useAuth();
  const navigate = useNavigate();

  // Check if authentication is required
  React.useEffect(() => {
    if (requireAuth && !isAuthenticated) {
      navigate('/auth', { replace: true });
    }
  }, [requireAuth, isAuthenticated, navigate]);

  return (
    <div className={cn("flex min-h-screen flex-col bg-background", className)}>
      {!hideHeader && <Header />}
      
      {(title || description || showBreadcrumbs) && (
        <div className="bg-background border-b border-border">
          <div className="container mx-auto px-4 py-6">
            <div className="flex justify-between items-center">
              <div>
                {showBreadcrumbs && <Breadcrumbs className="mb-4" />}
                {title && <h1 className="text-2xl md:text-3xl font-bold">{title}</h1>}
                {description && <p className="text-muted-foreground mt-1">{description}</p>}
              </div>
              
              {showAuthButton && !isAuthenticated && (
                <Button onClick={() => navigate('/auth')} className="bg-primary">
                  Sign In
                </Button>
              )}
            </div>
          </div>
        </div>
      )}
      
      <main className={cn("flex-grow", !fullWidth && containerClass)}>
        {children || <Outlet />}
      </main>
      
      {!hideFooter && <Footer />}
    </div>
  );
};

export default UnifiedLayout;
