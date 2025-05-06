
// Re-export navigation components
export * from '@/components/navigation';

// Re-export layout from main layout
export { Layout, MainLayout } from '@/layouts';
export type { LayoutProps } from '@/layouts/Layout';

// For backward compatibility
export { default as UnifiedLayout } from './UnifiedLayout';
export type { LayoutProps as UnifiedLayoutProps } from '@/layouts/Layout';
