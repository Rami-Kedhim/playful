
import React from 'react';
import MainLayout from '@/layouts/MainLayout';

// This component exists for backward compatibility
// It should simply re-export the MainLayout from the layouts directory
const Layout: React.FC<React.ComponentProps<typeof MainLayout>> = (props) => {
  return <MainLayout {...props} />;
};

export default Layout;
