
// Re-export from unified layout components
export { default as Header } from './Header';
export { default as Footer } from './Footer';
export { default as Layout } from '@/layouts/Layout';
export type { LayoutProps } from '@/layouts/Layout';

// Helper components
export { default as MobileMenu } from '@/components/navigation/MobileMenu';

// For backward compatibility
export { default as UnifiedLayout } from './UnifiedLayout';
export type { LayoutProps as UnifiedLayoutProps } from '@/layouts/Layout';
