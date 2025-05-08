
import React from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import { cn } from '@/lib/utils';
import { AppPaths } from '@/routes/routeConfig';
import { useAuth } from '@/hooks/auth/useAuthContext';
import { useRole } from '@/hooks/auth/useRole';
import { 
  Home, 
  Users, 
  Brain, 
  Shield, 
  MessageSquare,
  Heart,
  Wallet,
  Settings,
  User,
  Search
} from 'lucide-react';

// Map of icons to use for each route
const iconMap: Record<string, React.ReactNode> = {
  '/': <Home className="w-4 h-4" />,
  '/escorts': <Users className="w-4 h-4" />,
  '/neural/monitor': <Brain className="w-4 h-4" />,
  '/neural/analytics': <Brain className="w-4 h-4" />,
  '/brain-hub': <Brain className="w-4 h-4" />,
  '/messages': <MessageSquare className="w-4 h-4" />,
  '/favorites': <Heart className="w-4 h-4" />,
  '/profile': <User className="w-4 h-4" />,
  '/wallet': <Wallet className="w-4 h-4" />,
  '/settings': <Settings className="w-4 h-4" />,
  '/admin': <Shield className="w-4 h-4" />,
  '/moderation': <Shield className="w-4 h-4" />,
  '/safety': <Shield className="w-4 h-4" />,
  '/seo': <Search className="w-4 h-4" />,
  '/share': <Shield className="w-4 h-4" />
};

export type RouteCategory = 
  'core' | 
  'escort' | 
  'client' | 
  'creator' | 
  'metaverse' | 
  'neural' | 
  'admin' | 
  'auth' | 
  'safety' | 
  'wallet' | 
  'settings';

interface RouteType {
  path: string;
  title: string;
  requireAuth?: boolean;
  roles?: string[];
}

interface AppNavigationProps {
  showCategories?: RouteCategory[];
  className?: string;
  onItemClick?: () => void;
}

// Simple implementation of getRoutesByCategory function
const getRoutesByCategory = (category: RouteCategory): RouteType[] => {
  // This is a simplified implementation - in a real app, you'd probably have more complex logic
  switch (category) {
    case 'core':
      return [
        { path: '/', title: 'Home' },
        { path: '/escorts', title: 'Escorts' }
      ];
    case 'escort':
      return [{ path: '/escorts', title: 'Escorts' }];
    case 'neural':
      return [
        { path: '/neural/monitor', title: 'Neural Monitor' },
        { path: '/neural/analytics', title: 'Neural Analytics' },
        { path: '/brain-hub', title: 'Brain Hub' }
      ];
    case 'safety':
      return [{ path: '/safety', title: 'Safety Center' }];
    case 'admin':
      return [{ path: '/admin', title: 'Admin Dashboard', requireAuth: true, roles: ['admin'] }];
    default:
      return [];
  }
};

const AppNavigation: React.FC<AppNavigationProps> = ({ 
  showCategories = ['core', 'escort', 'neural', 'safety'],
  className = "",
  onItemClick
}) => {
  const location = useLocation();
  const { isAuthenticated } = useAuth();
  const { isAdmin, isModerator } = useRole();
  
  // Function to check if a route is active
  const isActive = (path: string): boolean => {
    if (path === '/' && location.pathname === '/') {
      return true;
    }
    return path !== '/' && location.pathname.startsWith(path);
  };

  // Get routes for each category
  const routesToShow = showCategories.flatMap(category => 
    getRoutesByCategory(category)
      // Filter out auth-required routes if not authenticated
      .filter(route => !route.requireAuth || isAuthenticated)
      // Filter out role-restricted routes
      .filter(route => {
        if (!route.roles) return true;
        if (route.roles.includes('admin') && isAdmin) return true;
        if (route.roles.includes('moderator') && isModerator) return true;
        return false;
      })
  );

  return (
    <nav className={cn("space-y-1", className)}>
      {routesToShow.map((route) => (
        <NavLink
          key={route.path}
          to={route.path}
          className={({ isActive }) =>
            cn(
              "flex items-center px-4 py-2 text-sm rounded-md",
              isActive
                ? "bg-primary/10 text-primary font-medium"
                : "text-muted-foreground hover:text-foreground hover:bg-accent/50"
            )
          }
          onClick={onItemClick}
        >
          {iconMap[route.path] || <div className="w-4 h-4" />}
          <span className="ml-3">{route.title}</span>
        </NavLink>
      ))}
    </nav>
  );
};

export default AppNavigation;
