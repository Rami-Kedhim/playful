
import React from 'react';
import { Link } from 'react-router-dom';
import { cn } from '@/lib/utils';
import { AppRoutes } from '@/utils/navigation';
import { useRole } from '@/hooks/auth/useRole';
import RoleBasedContent from '@/components/auth/RoleBasedContent';

const NavItems = () => {
  const { isAdmin, isModerator } = useRole();

  return (
    <nav className="flex items-center space-x-4">
      <Link to={AppRoutes.HOME} className={cn("text-sm font-medium transition-colors hover:text-primary")}>
        Home
      </Link>
      
      <RoleBasedContent allowedRoles={['admin']}>
        <Link to="/admin-dashboard" className={cn("text-sm font-medium transition-colors hover:text-primary")}>
          Admin
        </Link>
      </RoleBasedContent>

      <RoleBasedContent allowedRoles={['admin', 'moderator']}>
        <Link to="/moderation" className={cn("text-sm font-medium transition-colors hover:text-primary")}>
          Moderation
        </Link>
      </RoleBasedContent>

      <Link to={AppRoutes.SEARCH} className={cn("text-sm font-medium transition-colors hover:text-primary")}>
        Search
      </Link>
      
      <Link to="/profile" className={cn("text-sm font-medium transition-colors hover:text-primary")}>
        Profile
      </Link>

      <Link to={AppRoutes.WALLET} className={cn("text-sm font-medium transition-colors hover:text-primary")}>
        Wallet
      </Link>
      
      <Link to={AppRoutes.PULSE_BOOST} className={cn("text-sm font-medium transition-colors hover:text-primary")}>
        Boost
      </Link>
    </nav>
  );
};

export default NavItems;
