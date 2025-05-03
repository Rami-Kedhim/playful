
import React, { ReactNode } from 'react';
import Navbar from '@/components/navigation/Navbar';
import { Toaster } from '@/components/ui/toaster';
import { Breadcrumbs } from '@/components/navigation/Breadcrumbs';

interface LayoutProps {
  children: ReactNode;
  title?: string;
  description?: string;
  showBreadcrumbs?: boolean;
  hideNavbar?: boolean;
  hideFooter?: boolean;
  fullWidth?: boolean;
  className?: string;
}

export const UnifiedLayout: React.FC<LayoutProps> = ({ 
  children, 
  title,
  description,
  showBreadcrumbs = false,
  hideNavbar = false,
  hideFooter = false,
  fullWidth = false,
  className = ""
}) => {
  return (
    <div className="flex flex-col min-h-screen">
      {!hideNavbar && <Navbar />}
      
      <main className={`flex-1 ${fullWidth ? 'w-full' : 'container mx-auto px-4'} py-6 ${className}`}>
        {(title || description) && (
          <div className="mb-6">
            {title && <h1 className="text-2xl md:text-3xl font-bold">{title}</h1>}
            {description && <p className="text-muted-foreground mt-1">{description}</p>}
          </div>
        )}
        
        {showBreadcrumbs && (
          <div className="mb-4">
            <Breadcrumbs />
          </div>
        )}
        
        {children}
      </main>
      
      {!hideFooter && (
        <footer className="py-4 border-t text-center text-sm text-muted-foreground">
          <div className="container mx-auto">
            <p>© {new Date().getFullYear()} UberEscorts. All rights reserved.</p>
          </div>
        </footer>
      )}
      
      <Toaster />
    </div>
  );
};

export default UnifiedLayout;
