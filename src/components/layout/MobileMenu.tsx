
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { Link } from 'react-router-dom';
import { Menu, Brain } from 'lucide-react';
import { useAuth } from '@/hooks/auth/useAuthContext';
import { cn } from '@/lib/utils';
import { AppRoutes } from '@/utils/navigation';

interface MobileMenuProps {
  className?: string;
}

export const MobileMenu: React.FC<MobileMenuProps> = ({ className }) => {
  const [open, setOpen] = useState(false);
  const { isAuthenticated, logout } = useAuth();

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>
        <Button variant="ghost" size="icon" className={cn("md:hidden", className)}>
          <Menu className="h-5 w-5" />
        </Button>
      </SheetTrigger>
      <SheetContent side="right" className="w-[300px] sm:w-[400px]">
        <nav className="flex flex-col gap-4 mt-6">
          <Link to={AppRoutes.HOME} onClick={() => setOpen(false)} className="px-2 py-1 hover:underline">
            Home
          </Link>
          <Link to={AppRoutes.ESCORTS} onClick={() => setOpen(false)} className="px-2 py-1 hover:underline">
            Escorts
          </Link>
          <Link to={AppRoutes.CREATORS} onClick={() => setOpen(false)} className="px-2 py-1 hover:underline">
            Creators
          </Link>
          <Link to={AppRoutes.LIVECAMS} onClick={() => setOpen(false)} className="px-2 py-1 hover:underline">
            Live Cams
          </Link>
          <Link to="/neural/monitor" onClick={() => setOpen(false)} className="px-2 py-1 hover:underline flex items-center gap-2">
            <Brain className="h-4 w-4" />
            Neural Monitor
          </Link>
          {isAuthenticated ? (
            <>
              <Link to="/bookings" onClick={() => setOpen(false)} className="px-2 py-1 hover:underline">
                Bookings
              </Link>
              <Link to={AppRoutes.MESSAGES} onClick={() => setOpen(false)} className="px-2 py-1 hover:underline">
                Messages
              </Link>
              <Link to="/dashboard" onClick={() => setOpen(false)} className="px-2 py-1 hover:underline">
                Dashboard
              </Link>
              <Link to={AppRoutes.PROFILE} onClick={() => setOpen(false)} className="px-2 py-1 hover:underline">
                Profile
              </Link>
              <Link to="/settings" onClick={() => setOpen(false)} className="px-2 py-1 hover:underline">
                Settings
              </Link>
              <Button
                variant="ghost"
                className="justify-start px-2"
                onClick={async () => {
                  await logout();
                  setOpen(false);
                }}
              >
                Log out
              </Button>
            </>
          ) : (
            <>
              <Link to="/about" onClick={() => setOpen(false)} className="px-2 py-1 hover:underline">
                About
              </Link>
              <Link to="/auth?mode=login" onClick={() => setOpen(false)} className="px-2 py-1 hover:underline">
                Sign In
              </Link>
              <Link to="/auth?mode=register" onClick={() => setOpen(false)} className="px-2 py-1 hover:underline">
                Sign Up
              </Link>
            </>
          )}
        </nav>
      </SheetContent>
    </Sheet>
  );
};

export default MobileMenu;
