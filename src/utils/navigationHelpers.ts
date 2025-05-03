
import { AppPaths } from '@/routes/routeConfig';

/**
 * Centralized navigation helper utilities for the UberEscorts ecosystem
 */

/**
 * Get breadcrumb data from a path
 */
export function getBreadcrumbsFromPath(path: string) {
  const parts = path.split('/').filter(p => p);
  const breadcrumbs = [
    { label: 'Home', path: '/' }
  ];

  if (parts.length === 0) {
    return breadcrumbs;
  }

  let currentPath = '';

  for (let i = 0; i < parts.length; i++) {
    const part = parts[i];
    currentPath += `/${part}`;
    
    // Skip ID parts in the breadcrumb
    if (i < parts.length - 1 && parts[i+1].match(/^[0-9a-f]{8}-?[0-9a-f]{4}-?[0-9a-f]{4}-?[0-9a-f]{4}-?[0-9a-f]{12}$/i)) {
      continue;
    }
    
    // Format the label for better display
    let label = part.charAt(0).toUpperCase() + part.slice(1).replace(/-/g, ' ');
    
    // Handle special cases
    if (part === 'ai-companions') {
      label = 'AI Companions';
    } else if (part === 'brain-hub') {
      label = 'Brain Hub';
    } else if (part === 'route-share' && parts[i-1] === 'safety') {
      label = 'Route Sharing';
    }
    
    breadcrumbs.push({
      label,
      path: currentPath
    });
  }

  return breadcrumbs;
}

/**
 * Check if current path matches a link path
 */
export function isActivePath(currentPath: string, linkPath: string): boolean {
  if (linkPath === '/') {
    return currentPath === '/';
  }
  // For non-home routes, check if pathname starts with path
  return linkPath !== '/' && currentPath.startsWith(linkPath);
}

/**
 * Get route title from path
 */
export function getRouteTitle(path: string): string {
  // Find the matching AppPath
  const matchingPath = Object.entries(AppPaths).find(([_, value]) => value === path);
  if (matchingPath) {
    // Convert KEY_NAME to "Key Name"
    return matchingPath[0].replace(/_/g, ' ').replace(/\b\w/g, char => char.toUpperCase());
  }
  
  // If no match, format the last part of the path
  const parts = path.split('/');
  const lastPart = parts[parts.length - 1] || 'Home';
  return lastPart.charAt(0).toUpperCase() + lastPart.slice(1).replace(/-/g, ' ');
}

/**
 * Track navigation with analytics
 */
export function trackPageNavigation(from: string, to: string, userId: string = 'anonymous') {
  console.info(`Navigation: ${from} → ${to} (${userId})`);
  // Integration point for Hermes analytics
}
