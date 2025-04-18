
import React from 'react';
import EnhancedAppLayout from './EnhancedAppLayout';

interface AppLayoutProps {
  children?: React.ReactNode;
  hideNavbar?: boolean;
  hideFooter?: boolean;
}

const AppLayout: React.FC<AppLayoutProps> = ({ children, hideNavbar, hideFooter }) => {
  return (
    <EnhancedAppLayout 
      hideNavbar={hideNavbar}
      hideFooter={hideFooter}
    >
      {children}
    </EnhancedAppLayout>
  );
};

export default AppLayout;
