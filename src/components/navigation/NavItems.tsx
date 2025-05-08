import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { cn } from '@/lib/utils';
import { APP_PATHS } from '@/routes/routeConfig';
import { useAuth } from '@/contexts/AuthContext';
import { useRole } from '@/hooks/auth/useRole';
import { Brain, ShieldCheck, Sparkles, Wallet, User, MessageSquare } from 'lucide-react';

const NavItems = () => {
  const { isAdmin, isModerator } = useRole();
  const { isAuthenticated } = useAuth();
  const location = useLocation();
  
  // Function to check if a link is active
  const isActive = (path: string) => {
    return location.pathname === path || 
           (path !== '/' && location.pathname.startsWith(path));
  };

  return (
    <nav className="flex items-center space-x-4">
      <Link 
        to={APP_PATHS.HOME} 
        className={cn(
          "text-sm font-medium transition-colors hover:text-primary flex items-center",
          isActive(APP_PATHS.HOME) && "text-primary"
        )}
      >
        Home
      </Link>
      
      {isAuthenticated && (
        <>
          <Link 
            to="/profile" 
            className={cn(
              "text-sm font-medium transition-colors hover:text-primary flex items-center",
              isActive('/profile') && "text-primary"
            )}
          >
            <User className="h-4 w-4 mr-1" />
            Profile
          </Link>
          
          <Link 
            to="/messages" 
            className={cn(
              "text-sm font-medium transition-colors hover:text-primary flex items-center",
              isActive('/messages') && "text-primary"
            )}
          >
            <MessageSquare className="h-4 w-4 mr-1" />
            Messages
          </Link>
          
          <Link 
            to={APP_PATHS.WALLET} 
            className={cn(
              "text-sm font-medium transition-colors hover:text-primary flex items-center",
              isActive(APP_PATHS.WALLET) && "text-primary"
            )}
          >
            <Wallet className="h-4 w-4 mr-1" />
            Wallet
          </Link>
        </>
      )}
      
      <Link 
        to="/neural/monitor" 
        className={cn(
          "text-sm font-medium transition-colors hover:text-primary flex items-center",
          isActive('/neural/monitor') && "text-primary"
        )}
      >
        <Brain className="h-4 w-4 mr-1" />
        Neural Monitor
      </Link>
      
      <Link 
        to={APP_PATHS.BRAIN_HUB} 
        className={cn(
          "text-sm font-medium transition-colors hover:text-primary flex items-center",
          isActive(APP_PATHS.BRAIN_HUB) && "text-primary"
        )}
      >
        <Brain className="h-4 w-4 mr-1" />
        Brain Hub
      </Link>
      
      {isAdmin && (
        <Link 
          to="/admin" 
          className={cn(
            "text-sm font-medium transition-colors hover:text-primary flex items-center",
            isActive('/admin') && "text-primary"
          )}
        >
          <ShieldCheck className="h-4 w-4 mr-1" />
          Admin
        </Link>
      )}
      
      {isModerator && (
        <Link 
          to="/moderation" 
          className={cn(
            "text-sm font-medium transition-colors hover:text-primary flex items-center",
            isActive('/moderation') && "text-primary"
          )}
        >
          <ShieldCheck className="h-4 w-4 mr-1" />
          Moderation
        </Link>
      )}
      
      <Link 
        to={APP_PATHS.PULSE_BOOST} 
        className={cn(
          "text-sm font-medium transition-colors hover:text-primary flex items-center",
          isActive(APP_PATHS.PULSE_BOOST) && "text-primary"
        )}
      >
        <Sparkles className="h-4 w-4 mr-1" />
        Boost
      </Link>
    </nav>
  );
};

export default NavItems;
