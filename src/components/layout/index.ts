
// Export the main layout components
export { default as UnifiedHeader } from './UnifiedHeader';
export { default as UnifiedFooter } from './UnifiedFooter';

// Re-export from layouts for backward compatibility
export { UnifiedLayout } from '@/layouts';
export type { UnifiedLayoutProps } from '@/layouts';
export { default as MainLayout } from '@/layouts/MainLayout';

// Export legacy components for backward compatibility
// These components should eventually be removed or refactored
export { default as Layout } from './Layout';
export { default as AppLayout } from './AppLayout';
export { default as MobileMenu } from './MobileMenu';
