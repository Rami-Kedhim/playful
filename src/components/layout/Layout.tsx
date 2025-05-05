
import React from 'react';
import Layout from '@/layouts/Layout';

// This component exists for backward compatibility
const LegacyLayout: React.FC<React.ComponentProps<typeof Layout>> = (props) => {
  return <Layout {...props} />;
};

export default LegacyLayout;
