
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '@/hooks/auth';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { Button } from '@/components/ui/button';
import { Menu, X } from 'lucide-react';
import { cn } from '@/lib/utils';

export interface MobileMenuProps {
  className?: string;
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
}

const MobileMenu: React.FC<MobileMenuProps> = ({ 
  className,
  open: controlledOpen,
  onOpenChange
}) => {
  const [internalOpen, setInternalOpen] = useState(false);
  const isControlled = controlledOpen !== undefined && onOpenChange !== undefined;
  const isOpen = isControlled ? controlledOpen : internalOpen;
  
  const setOpen = (value: boolean) => {
    if (isControlled) {
      onOpenChange?.(value);
    } else {
      setInternalOpen(value);
    }
  };

  const { isAuthenticated, logout } = useAuth();
  
  return (
    <Sheet open={isOpen} onOpenChange={setOpen}>
      <SheetTrigger asChild>
        <Button 
          variant="ghost" 
          size="icon" 
          className={cn("md:hidden", className)}
        >
          <Menu className="h-5 w-5" />
          <span className="sr-only">Open menu</span>
        </Button>
      </SheetTrigger>
      <SheetContent side="right" className="w-[280px] sm:w-[350px] p-0">
        <div className="flex justify-between items-center border-b p-4">
          <div className="font-semibold">Menu</div>
          <Button variant="ghost" size="icon" onClick={() => setOpen(false)}>
            <X className="h-5 w-5" />
            <span className="sr-only">Close menu</span>
          </Button>
        </div>
        
        <div className="p-4 space-y-4">
          <nav className="flex flex-col gap-2">
            <Link 
              to="/" 
              onClick={() => setOpen(false)} 
              className="px-2 py-1.5 hover:bg-muted rounded-md transition-colors"
            >
              Home
            </Link>
            <Link 
              to="/search" 
              onClick={() => setOpen(false)} 
              className="px-2 py-1.5 hover:bg-muted rounded-md transition-colors"
            >
              Search
            </Link>
            <Link 
              to="/verification" 
              onClick={() => setOpen(false)} 
              className="px-2 py-1.5 hover:bg-muted rounded-md transition-colors"
            >
              Verify Account
            </Link>
            
            {isAuthenticated ? (
              <>
                <Link 
                  to="/profile" 
                  onClick={() => setOpen(false)} 
                  className="px-2 py-1.5 hover:bg-muted rounded-md transition-colors"
                >
                  Profile
                </Link>
                <Link 
                  to="/wallet" 
                  onClick={() => setOpen(false)} 
                  className="px-2 py-1.5 hover:bg-muted rounded-md transition-colors"
                >
                  Wallet
                </Link>
                <Link 
                  to="/messages" 
                  onClick={() => setOpen(false)} 
                  className="px-2 py-1.5 hover:bg-muted rounded-md transition-colors"
                >
                  Messages
                </Link>
                <Link 
                  to="/settings" 
                  onClick={() => setOpen(false)} 
                  className="px-2 py-1.5 hover:bg-muted rounded-md transition-colors"
                >
                  Settings
                </Link>
                <button
                  onClick={() => {
                    logout();
                    setOpen(false);
                  }}
                  className="px-2 py-1.5 text-left hover:bg-muted rounded-md text-destructive transition-colors"
                >
                  Sign Out
                </button>
              </>
            ) : (
              <>
                <Link 
                  to="/auth?mode=login" 
                  onClick={() => setOpen(false)} 
                  className="px-2 py-1.5 hover:bg-muted rounded-md transition-colors"
                >
                  Sign In
                </Link>
                <Link 
                  to="/auth?mode=register" 
                  onClick={() => setOpen(false)} 
                  className="px-2 py-1.5 hover:bg-primary/10 rounded-md font-medium text-primary transition-colors"
                >
                  Sign Up
                </Link>
              </>
            )}
          </nav>
        </div>
      </SheetContent>
    </Sheet>
  );
};

export default MobileMenu;
