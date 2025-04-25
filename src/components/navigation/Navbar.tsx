
import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '@/hooks/auth';
import { Button } from '@/components/ui/button';
import NavItems from './NavItems';
import UserMenu from './UserMenu';
import MobileMenu from './MobileMenu';
import { cn } from '@/lib/utils';

interface NavbarProps {
  className?: string;
}

const Navbar: React.FC<NavbarProps> = ({ className }) => {
  const { isAuthenticated } = useAuth();

  return (
    <header className={cn("border-b sticky top-0 z-50 bg-background", className)}>
      <div className="container mx-auto px-4">
        <div className="h-16 flex items-center justify-between">
          <div className="flex items-center gap-6">
            <Link to="/" className="font-semibold text-xl">
              Your App
            </Link>
            <div className="hidden md:flex">
              <NavItems />
            </div>
          </div>

          <div className="flex items-center gap-4">
            <div className="hidden md:flex items-center gap-4">
              {!isAuthenticated && (
                <>
                  <Button asChild variant="ghost">
                    <Link to="/auth?mode=login">Sign In</Link>
                  </Button>
                  <Button asChild>
                    <Link to="/auth?mode=register">Sign Up</Link>
                  </Button>
                </>
              )}
              {isAuthenticated && <UserMenu />}
            </div>
            <MobileMenu className="md:hidden" />
          </div>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
