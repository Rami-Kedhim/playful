
import React from 'react';
import { Link } from 'react-router-dom';
import { cn } from '@/lib/utils';

interface NavItemProps {
  to: string;
  children: React.ReactNode;
  className?: string;
}

const NavItem: React.FC<NavItemProps> = ({ to, children, className }) => (
  <Link 
    to={to} 
    className={cn(
      "px-3 py-2 text-sm font-medium transition-colors hover:text-primary", 
      className
    )}
  >
    {children}
  </Link>
);

const NavItems = () => {
  return (
    <nav className="flex items-center space-x-2">
      <NavItem to="/">Home</NavItem>
      <NavItem to="/search">Search</NavItem>
      <NavItem to="/verification">Verification</NavItem>
    </nav>
  );
};

export default NavItems;
