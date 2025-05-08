
import React from 'react';
import Layout, { AppLayoutProps } from '@/layouts/AppLayout';

/**
 * This component exists for backward compatibility
 * It forwards all props to the main Layout component
 */
const AppLayout: React.FC<AppLayoutProps> = (props) => {
  return <Layout {...props} />;
};

export default AppLayout;
