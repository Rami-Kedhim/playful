
import React from 'react';
import { Link } from 'react-router-dom';
import { cn } from '@/lib/utils';
import { AppRoutes } from '@/utils/navigation';

const NavItems = () => {
  return (
    <nav className="flex items-center space-x-4">
      <Link to={AppRoutes.HOME} className={cn("text-sm font-medium transition-colors hover:text-primary")}>
        Home
      </Link>
      <Link to={AppRoutes.SEARCH} className={cn("text-sm font-medium transition-colors hover:text-primary")}>
        Search
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
