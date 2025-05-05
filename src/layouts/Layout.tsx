
import React from 'react';
import { Outlet } from 'react-router-dom';
import MainLayout from './MainLayout';
import { cn } from '@/lib/utils';

export interface LayoutProps {
  children?: React.ReactNode;
  title?: string;
  description?: string;
  hideHeader?: boolean;
  hideNavbar?: boolean;
  hideFooter?: boolean;
  showBreadcrumbs?: boolean;
  containerClass?: string;
  fullWidth?: boolean;
  className?: string;
  requireAuth?: boolean;
  showAuthButton?: boolean;
  simplified?: boolean;
}

/**
 * Unified Layout component that serves as the main layout across the UberEscorts platform.
 * This component provides a consistent structure for all pages in the application.
 */
const Layout: React.FC<LayoutProps> = (props) => {
  const { children, ...rest } = props;
  
  return (
    <MainLayout {...rest} className={cn("theme-transition", props.className)}>
      {children || <Outlet />}
    </MainLayout>
  );
};

export default Layout;
