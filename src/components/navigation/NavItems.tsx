
import React from 'react';
import { Link } from 'react-router-dom';
import { cn } from '@/lib/utils';
import { AppRoutes } from '@/utils/navigation';
import { useRole } from '@/hooks/auth/useRole';
import RoleBasedContent from '@/components/auth/RoleBasedContent';
import { Brain, ShieldCheck, Sparkles, Wallet } from 'lucide-react';

const NavItems = () => {
  const { isAdmin, isModerator } = useRole();

  return (
    <nav className="flex items-center space-x-4">
      <Link to={AppRoutes.HOME} className={cn("text-sm font-medium transition-colors hover:text-primary flex items-center")}>
        Home
      </Link>
      
      <RoleBasedContent allowedRoles={['admin']}>
        <Link to="/admin" className={cn("text-sm font-medium transition-colors hover:text-primary flex items-center")}>
          <ShieldCheck className="h-4 w-4 mr-1" />
          Admin
        </Link>
      </RoleBasedContent>

      <RoleBasedContent allowedRoles={['admin', 'moderator']}>
        <Link to="/moderation" className={cn("text-sm font-medium transition-colors hover:text-primary flex items-center")}>
          <ShieldCheck className="h-4 w-4 mr-1" />
          Moderation
        </Link>
      </RoleBasedContent>

      <Link to={AppRoutes.SEARCH} className={cn("text-sm font-medium transition-colors hover:text-primary flex items-center")}>
        Search
      </Link>
      
      <Link to="/profile" className={cn("text-sm font-medium transition-colors hover:text-primary flex items-center")}>
        Profile
      </Link>

      <Link to={AppRoutes.WALLET} className={cn("text-sm font-medium transition-colors hover:text-primary flex items-center")}>
        <Wallet className="h-4 w-4 mr-1" />
        Wallet
      </Link>
      
      <Link to={AppRoutes.PULSE_BOOST} className={cn("text-sm font-medium transition-colors hover:text-primary flex items-center")}>
        <Sparkles className="h-4 w-4 mr-1" />
        Boost
      </Link>
      
      <Link to={AppRoutes.PERSONAS} className={cn("text-sm font-medium transition-colors hover:text-primary flex items-center")}>
        UberPersonas
      </Link>
      
      <Link to={AppRoutes.BRAIN_HUB} className={cn("text-sm font-medium transition-colors hover:text-primary flex items-center")}>
        <Brain className="h-4 w-4 mr-1" />
        Brain Hub
      </Link>
    </nav>
  );
};

export default NavItems;
