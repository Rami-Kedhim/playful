
import React from 'react';
import { UnifiedLayout } from '@/layouts';
import { UnifiedLayoutProps } from '@/layouts/UnifiedLayout';

// This file exists for backward compatibility
// Components importing from AppLayout will use the UnifiedLayout
const AppLayout: React.FC<UnifiedLayoutProps> = (props) => {
  return <UnifiedLayout {...props} />;
};

export default AppLayout;
