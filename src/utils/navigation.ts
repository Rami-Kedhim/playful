
import { NavigateFunction } from 'react-router-dom';

/**
 * Central utility for application navigation
 */
export const navigateToPage = (navigate: NavigateFunction, path: string): void => {
  navigate(path);
};

/**
 * Mapping of route names to paths for consistent navigation
 */
export const AppRoutes = {
  HOME: '/',
  LIVECAMS: '/livecams',
  LIVECAM_DETAIL: (id: string) => `/livecams/${id}`,
  AI_PROFILES: '/ai-profiles',
  AI_COMPANION: '/ai-companions',
  BRAIN_HUB: '/brain-hub',
  ESCORT_STREAMS: '/escort-streams',
  METAVERSE: '/metaverse',
  ADMIN: '/admin'
};

/**
 * Check if the current path matches a target route
 */
export const isActiveRoute = (currentPath: string, targetPath: string): boolean => {
  return currentPath === targetPath || currentPath.startsWith(`${targetPath}/`);
};

/**
 * Create breadcrumbs data from the current path
 */
export const getBreadcrumbsFromPath = (path: string): { label: string, path: string }[] => {
  const segments = path.split('/').filter(Boolean);
  const breadcrumbs = [{ label: 'Home', path: '/' }];
  
  let currentPath = '';
  
  segments.forEach(segment => {
    currentPath += `/${segment}`;
    
    // Format the segment name for display
    const formattedName = segment
      .replace(/-/g, ' ')
      .replace(/\b\w/g, l => l.toUpperCase());
    
    breadcrumbs.push({ 
      label: formattedName, 
      path: currentPath 
    });
  });
  
  return breadcrumbs;
};
