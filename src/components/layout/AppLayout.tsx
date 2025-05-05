
import React from 'react';
import Layout from '@/layouts/Layout';
import type { LayoutProps } from '@/layouts/Layout';

// This file exists for backward compatibility
// Components importing from AppLayout will use the Layout
const AppLayout: React.FC<LayoutProps> = (props) => {
  return <Layout {...props} />;
};

export default AppLayout;
