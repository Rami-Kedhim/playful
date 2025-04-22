
import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '@/hooks/auth/useAuthContext';
import { Button } from '@/components/ui/button';

const Navbar = () => {
  const { isAuthenticated } = useAuth();

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center justify-between">
        <div className="flex items-center gap-4">
          <Link to="/" className="flex items-center gap-2">
            <span className="text-xl font-bold">UberEscorts</span>
          </Link>
          
          <nav className="hidden md:flex items-center gap-6">
            <Link to="/" className="text-sm font-medium transition-colors hover:text-primary">
              Home
            </Link>
            <Link to="/escorts" className="text-sm font-medium transition-colors hover:text-primary">
              Escorts
            </Link>
            <Link to="/livecams" className="text-sm font-medium transition-colors hover:text-primary">
              LiveCams
            </Link>
            {isAuthenticated && (
              <>
                <Link to="/metaverse" className="text-sm font-medium transition-colors hover:text-primary">
                  Metaverse
                </Link>
                <Link to="/ai-companions" className="text-sm font-medium transition-colors hover:text-primary">
                  AI Companions
                </Link>
              </>
            )}
          </nav>
        </div>

        <div className="flex items-center gap-4">
          {!isAuthenticated ? (
            <div className="flex items-center gap-2">
              <Button variant="outline" asChild size="sm">
                <Link to="/auth">Login</Link>
              </Button>
              <Button asChild size="sm">
                <Link to="/auth?tab=register">Sign Up</Link>
              </Button>
            </div>
          ) : (
            <div className="flex items-center gap-2">
              <Button variant="outline" asChild size="sm">
                <Link to="/profile">Profile</Link>
              </Button>
              <Button variant="outline" asChild size="sm">
                <Link to="/wallet">Wallet</Link>
              </Button>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};

export default Navbar;
