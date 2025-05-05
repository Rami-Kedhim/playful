
import React from 'react';
import Layout, { LayoutProps } from './Layout';

/**
 * MainLayout is now an alias for Layout
 * It exists for backward compatibility
 */
const MainLayout: React.FC<LayoutProps> = (props) => {
  return <Layout {...props} />;
};

export default MainLayout;
