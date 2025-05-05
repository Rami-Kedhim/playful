
import Layout from '@/layouts/Layout';
import type { LayoutProps } from '@/layouts/Layout';

// This component exists for backward compatibility
// It forwards to the main Layout component
const UnifiedLayout: React.FC<LayoutProps> = (props) => {
  return <Layout {...props} />;
};

export default UnifiedLayout;
