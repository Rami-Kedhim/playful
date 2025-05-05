
import React from 'react';
import { Outlet } from 'react-router-dom';
import MainLayout, { MainLayoutProps } from './MainLayout';

export interface LayoutProps extends Omit<MainLayoutProps, 'children'> {
  children?: React.ReactNode;
}

/**
 * Unified Layout component that serves as the main layout across the UberEscorts platform.
 * This component wraps MainLayout for compatibility with both direct children and Outlet usage.
 */
const Layout: React.FC<LayoutProps> = (props) => {
  const { children, ...rest } = props;
  
  return (
    <MainLayout {...rest}>
      {children || <Outlet />}
    </MainLayout>
  );
};

export default Layout;
