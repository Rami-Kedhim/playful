
import { UnifiedRoutes } from '@/routes/unifiedRoutes';
import { APP_PATHS } from '@/routes/routeConfig';
import { Orus } from '@/core/Orus';

type ApprovedPageMap = Record<string, boolean>;

/**
 * Validates that all routes in the application match the approved list
 * from uberescorts_rules.json
 */
export function validateRoutes(approvedPages: string[]): { valid: boolean; issues: string[] } {
  const issues: string[] = [];
  const pageMap: ApprovedPageMap = {};
  
  // Convert approved pages to a map for quick lookup
  approvedPages.forEach(page => {
    pageMap[page] = true;
  });
  
  // Check if all APP_PATHS are valid according to our unified routes
  const appPathsKeys = Object.keys(APP_PATHS);
  const unifiedRoutesFlat = flattenRoutes(UnifiedRoutes);
  
  appPathsKeys.forEach(key => {
    const path = APP_PATHS[key];
    
    // Skip paths with dynamic segments (:id)
    if (!path.includes(':')) {
      if (!unifiedRoutesFlat.includes(path)) {
        issues.push(`Route ${path} in APP_PATHS is not defined in UnifiedRoutes`);
      }
    }
  });
  
  // Check if we have any duplicate paths
  const uniquePaths = new Set<string>();
  const allPaths = [...Object.values(APP_PATHS), ...unifiedRoutesFlat];
  
  allPaths.forEach(path => {
    // Skip dynamic paths
    if (!path.includes(':') && uniquePaths.has(path)) {
      issues.push(`Duplicate path detected: ${path}`);
    }
    uniquePaths.add(path);
  });
  
  // Check system integrity via Orus
  const orus = new Orus();
  orus.checkIntegrity().then(result => {
    if (!result.valid) {
      issues.push(`System integrity check failed: ${result.warnings.join(', ')}`);
    }
  });
  
  return { 
    valid: issues.length === 0, 
    issues 
  };
}

/**
 * Flatten the nested UnifiedRoutes object into a simple array of paths
 */
function flattenRoutes(routes: Record<string, any>, prefix = ''): string[] {
  let result: string[] = [];
  
  Object.entries(routes).forEach(([key, value]) => {
    if (typeof value === 'string') {
      result.push(value);
    } else if (typeof value === 'object') {
      result = [...result, ...flattenRoutes(value, `${prefix}${key}/`)];
    }
  });
  
  return result;
}
