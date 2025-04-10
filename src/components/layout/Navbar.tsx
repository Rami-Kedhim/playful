
import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '@/hooks/auth/useAuthContext';
import { Button } from '@/components/ui/button';
import { useRole } from '@/hooks/auth/useRole';
import UserMenu from '@/components/layout/UserMenu';
import { ModeToggle } from '@/components/ui/mode-toggle';

const Navbar: React.FC = () => {
  const { isAuthenticated, isLoading } = useAuth();
  const { canAccessAdminFeatures, isEscort } = useRole();
  
  return (
    <nav className="border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center justify-between">
        <div className="flex items-center gap-6 md:gap-10">
          <Link to="/" className="flex items-center space-x-2">
            <span className="font-bold text-xl">UberEscorts</span>
          </Link>
          
          <div className="hidden md:flex gap-6">
            <Link to="/" className="text-sm font-medium transition-colors hover:text-primary">
              Home
            </Link>
            
            {isEscort() && (
              <Link to="/escort-dashboard" className="text-sm font-medium transition-colors hover:text-primary">
                Dashboard
              </Link>
            )}
            
            {canAccessAdminFeatures() && (
              <Link to="/brainhub" className="text-sm font-medium transition-colors hover:text-primary">
                BrainHub
              </Link>
            )}
          </div>
        </div>
        
        <div className="flex items-center gap-4">
          <ModeToggle />
          
          {isAuthenticated ? (
            <UserMenu />
          ) : (
            <div className="flex items-center gap-2">
              <Link to="/auth">
                <Button variant="ghost" size="sm">Login</Button>
              </Link>
              <Link to="/auth">
                <Button size="sm">Sign Up</Button>
              </Link>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
