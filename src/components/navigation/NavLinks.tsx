
import React from 'react';
import { NavLink } from 'react-router-dom';
import { APP_PATHS } from '@/routes/routeConfig';
import { cn } from '@/lib/utils';
import { 
  Home, 
  Users, 
  Brain, 
  Shield, 
  MessageSquare,
  Search
} from 'lucide-react';

interface NavLinksProps {
  className?: string;
}

const NavLinks: React.FC<NavLinksProps> = ({ className }) => {
  return (
    <nav className={cn("flex items-center space-x-4", className)}>
      <NavLink 
        to={APP_PATHS.HOME}
        className={({ isActive }) => 
          cn("text-sm flex items-center gap-1.5", isActive ? "font-bold text-primary" : "text-muted-foreground hover:text-foreground")
        }
      >
        <Home className="w-4 h-4" /> Home
      </NavLink>
      
      <NavLink 
        to={APP_PATHS.ESCORTS}
        className={({ isActive }) => 
          cn("text-sm flex items-center gap-1.5", isActive ? "font-bold text-primary" : "text-muted-foreground hover:text-foreground")
        }
      >
        <Users className="w-4 h-4" /> Escorts
      </NavLink>
      
      <NavLink 
        to={APP_PATHS.NEURAL_MONITOR}
        className={({ isActive }) => 
          cn("text-sm flex items-center gap-1.5", isActive ? "font-bold text-primary" : "text-muted-foreground hover:text-foreground")
        }
      >
        <Brain className="w-4 h-4" /> Neural Monitor
      </NavLink>
      
      <NavLink 
        to={APP_PATHS.MESSAGES}
        className={({ isActive }) => 
          cn("text-sm flex items-center gap-1.5", isActive ? "font-bold text-primary" : "text-muted-foreground hover:text-foreground")
        }
      >
        <MessageSquare className="w-4 h-4" /> Messages
      </NavLink>
      
      <NavLink 
        to={APP_PATHS.SAFETY}
        className={({ isActive }) => 
          cn("text-sm flex items-center gap-1.5", isActive ? "font-bold text-primary" : "text-muted-foreground hover:text-foreground")
        }
      >
        <Shield className="w-4 h-4" /> Safety
      </NavLink>

      <NavLink 
        to={APP_PATHS.SEO}
        className={({ isActive }) => 
          cn("text-sm flex items-center gap-1.5", isActive ? "font-bold text-primary" : "text-muted-foreground hover:text-foreground")
        }
      >
        <Search className="w-4 h-4" /> SEO
      </NavLink>
    </nav>
  );
};

export default NavLinks;
