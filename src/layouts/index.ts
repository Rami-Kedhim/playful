
import MainLayout from '@/layouts/MainLayout';
import UnifiedLayout from './UnifiedLayout';
import type { UnifiedLayoutProps } from './UnifiedLayout';

export { MainLayout, UnifiedLayout };
export type { UnifiedLayoutProps };

// Export a default Layout that aligns with MainLayout for easier imports
export const Layout = MainLayout;

export default MainLayout;
