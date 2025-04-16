
import React from 'react';
import { Link } from 'react-router-dom';
import { cn } from '@/lib/utils';
import { useAuth } from '@/hooks/auth/useAuthContext';

interface MainNavProps {
  className?: string;
}

export const MainNav: React.FC<MainNavProps> = ({ className }) => {
  const { isAuthenticated } = useAuth();
  
  return (
    <nav className={cn("flex items-center space-x-4 lg:space-x-6", className)}>
      <Link
        to="/"
        className="text-sm font-medium transition-colors hover:text-primary"
      >
        Home
      </Link>
      <Link
        to="/escorts"
        className="text-sm font-medium text-muted-foreground transition-colors hover:text-primary"
      >
        Escorts
      </Link>
      {isAuthenticated ? (
        <>
          <Link
            to="/bookings"
            className="text-sm font-medium text-muted-foreground transition-colors hover:text-primary"
          >
            Bookings
          </Link>
          <Link
            to="/messages"
            className="text-sm font-medium text-muted-foreground transition-colors hover:text-primary"
          >
            Messages
          </Link>
        </>
      ) : (
        <Link
          to="/about"
          className="text-sm font-medium text-muted-foreground transition-colors hover:text-primary"
        >
          About
        </Link>
      )}
    </nav>
  );
};

export default MainNav;
