
import React from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import { cn } from '@/lib/utils';
import Layout from './Layout';
import { useUberEcosystem } from '@/contexts/UberEcosystemContext';
import { useTitle } from '@/hooks/useTitle';
import { Loader2 } from 'lucide-react';

interface AppLayoutProps {
  children?: React.ReactNode;
  fullWidth?: boolean;
  title?: string;
  hideHeader?: boolean;
  hideFooter?: boolean;
  requireAuth?: boolean;
  className?: string;
  containerClass?: string;
}

/**
 * Enhanced Application Layout that integrates with the UberEcosystem
 * This layout should be used for all main application pages
 */
const AppLayout: React.FC<AppLayoutProps> = ({
  children,
  fullWidth = false,
  title,
  hideHeader = false,
  hideFooter = false,
  requireAuth = false,
  className,
  containerClass
}) => {
  const { isAuthenticated, loading, state } = useUberEcosystem();
  const location = useLocation();
  
  // Set dynamic page title
  useTitle(title ? `${title} | UberEscorts` : 'UberEscorts');
  
  // Check if the ecosystem is initialized
  const isInitialized = state.initialized;
  
  // If authentication is required and user is not authenticated, redirect to login
  if (requireAuth && !loading && !isAuthenticated) {
    // In a real implementation, this would use a proper router navigation
    // For now, we'll just render a message
    return (
      <Layout hideHeader={true} hideFooter={true}>
        <div className="flex flex-col items-center justify-center h-[80vh]">
          <h2 className="text-2xl font-bold mb-4">Authentication Required</h2>
          <p className="mb-6 text-muted-foreground">Please log in to access this page</p>
          <a href="/auth" className="bg-primary text-white px-4 py-2 rounded-md">
            Go to Login
          </a>
        </div>
      </Layout>
    );
  }
  
  // Show loading state when initializing
  if (!isInitialized || loading) {
    return (
      <Layout hideHeader={hideHeader} hideFooter={hideFooter}>
        <div className="flex flex-col items-center justify-center h-[80vh]">
          <Loader2 className="h-12 w-12 animate-spin text-primary mb-4" />
          <p className="text-muted-foreground">Initializing UberEscorts ecosystem...</p>
        </div>
      </Layout>
    );
  }
  
  return (
    <Layout 
      hideHeader={hideHeader} 
      hideFooter={hideFooter}
      fullWidth={fullWidth}
      className={className}
      containerClass={containerClass}
    >
      {children || <Outlet />}
    </Layout>
  );
};

export default AppLayout;
