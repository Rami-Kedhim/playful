
import React from 'react';
import { Link } from 'react-router-dom';
import { cn } from '@/lib/utils';

interface MainNavProps {
  className?: string;
}

export const MainNav = ({ className }: MainNavProps) => {
  return (
    <nav className={cn("flex items-center gap-6", className)}>
      <Link to="/" className="text-sm font-medium transition-colors hover:text-primary">
        Home
      </Link>
      <Link to="/escorts" className="text-sm font-medium transition-colors hover:text-primary">
        Escorts
      </Link>
      <Link to="/creators" className="text-sm font-medium transition-colors hover:text-primary">
        Creators
      </Link>
    </nav>
  );
};
