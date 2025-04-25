
import React from 'react';
import { Menu } from 'lucide-react';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { Button } from '@/components/ui/button';
import { useAuth } from '@/hooks/auth';
import { Link } from 'react-router-dom';
import NavItems from './NavItems';

interface MobileMenuProps {
  className?: string;
}

const MobileMenu: React.FC<MobileMenuProps> = ({ className }) => {
  const { isAuthenticated, user, logout } = useAuth();

  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant="ghost" size="icon" className={className}>
          <Menu className="h-5 w-5" />
        </Button>
      </SheetTrigger>
      <SheetContent side="right">
        <div className="flex flex-col h-full">
          <div className="py-4 border-b">
            <h2 className="text-lg font-semibold">Menu</h2>
          </div>
          
          <div className="flex flex-col space-y-4 py-4">
            <NavItems />
          </div>
          
          <div className="mt-auto py-4 border-t">
            {isAuthenticated ? (
              <div className="space-y-4">
                <div className="text-sm font-medium">
                  {user?.email || 'Logged in user'}
                </div>
                <div className="space-y-2">
                  <Button asChild variant="ghost" className="w-full justify-start">
                    <Link to="/profile">Profile</Link>
                  </Button>
                  <Button asChild variant="ghost" className="w-full justify-start">
                    <Link to="/settings">Settings</Link>
                  </Button>
                  <Button variant="ghost" className="w-full justify-start" onClick={() => logout()}>
                    Logout
                  </Button>
                </div>
              </div>
            ) : (
              <div className="space-y-2">
                <Button asChild variant="default" className="w-full">
                  <Link to="/auth?mode=login">Sign In</Link>
                </Button>
                <Button asChild variant="outline" className="w-full">
                  <Link to="/auth?mode=register">Sign Up</Link>
                </Button>
              </div>
            )}
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
};

export default MobileMenu;
