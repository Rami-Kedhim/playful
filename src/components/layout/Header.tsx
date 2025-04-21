
import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '@/hooks/auth/useAuth';
import { EnhancedButton } from '@/components/ui/enhanced-button';
import { NotificationsPanel } from './NotificationsPanel';
import MainNav from './MainNav';
import { UserNav } from './UserNav';
import { MobileMenu } from './MobileMenu';

const Header = () => {
  const { isAuthenticated } = useAuth();

  return (
    <header className="border-b bg-background sticky top-0 z-50">
      <div className="container flex h-16 items-center justify-between px-4 md:px-6">
        <div className="flex items-center">
          <Link to="/" className="text-xl font-bold mr-6">
            VeriNet
          </Link>
          <MainNav className="hidden md:flex" />
        </div>
        
        <div className="flex items-center gap-4">
          {isAuthenticated ? (
            <>
              <NotificationsPanel />
              <UserNav />
            </>
          ) : (
            <div className="flex items-center gap-2">
              <EnhancedButton variant="ghost" asChild>
                <Link to="/auth?mode=login">Sign In</Link>
              </EnhancedButton>
              <EnhancedButton asChild>
                <Link to="/auth?mode=register">Sign Up</Link>
              </EnhancedButton>
            </div>
          )}
          <MobileMenu className="md:hidden" />
        </div>
      </div>
    </header>
  );
};

export default Header;
