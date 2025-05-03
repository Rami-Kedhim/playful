
import React from 'react';

// Export all navigation components for easy importing
export { default as Navbar } from './Navbar';
export { default as Breadcrumbs } from './Breadcrumbs';
export { default as NavItems } from './NavItems';
export { default as MainNavigation } from './MainNavigation';
export { default as DesktopNavigation } from './DesktopNavigation';
export { default as MobileNavigation } from './MobileNavigation';

// Import MobileMenu directly from layout instead of creating a circular dependency
// This fixes the circular import issues
