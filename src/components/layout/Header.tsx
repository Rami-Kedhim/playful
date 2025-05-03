
import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';
import NavItems from '@/components/navigation/NavItems';
import { Laptop, Menu, X } from 'lucide-react';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { useState } from 'react';

const Header: React.FC = () => {
  const { user, logout, isAuthenticated } = useAuth();
  const [menuOpen, setMenuOpen] = useState(false);

  const handleLogout = async () => {
    await logout();
  };

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto px-4 h-16 flex items-center justify-between">
        <div className="flex items-center">
          <Link to="/" className="font-bold text-xl flex items-center">
            <Laptop className="w-5 h-5 mr-2" />
            <span>UberEscorts</span>
          </Link>
        </div>
        
        <div className="hidden md:flex items-center space-x-6">
          <NavItems />
        </div>
        
        <div className="hidden md:flex items-center space-x-4">
          {isAuthenticated ? (
            <>
              <span className="text-sm">
                {user?.name || user?.email || 'User'}
              </span>
              <Button variant="outline" onClick={handleLogout} size="sm">
                Logout
              </Button>
            </>
          ) : (
            <>
              <Link to="/auth?tab=login">
                <Button variant="ghost" size="sm">Login</Button>
              </Link>
              <Link to="/auth?tab=register">
                <Button size="sm">Sign Up</Button>
              </Link>
            </>
          )}
        </div>
        
        {/* Mobile menu */}
        <Sheet open={menuOpen} onOpenChange={setMenuOpen}>
          <SheetTrigger asChild className="md:hidden">
            <Button variant="ghost" size="icon">
              <Menu className="h-5 w-5" />
              <span className="sr-only">Toggle menu</span>
            </Button>
          </SheetTrigger>
          <SheetContent side="right">
            <div className="flex flex-col h-full">
              <div className="flex justify-between items-center pb-4 border-b">
                <Link to="/" className="font-bold" onClick={() => setMenuOpen(false)}>
                  UberEscorts
                </Link>
                <Button variant="ghost" size="icon" onClick={() => setMenuOpen(false)}>
                  <X className="h-5 w-5" />
                </Button>
              </div>
              
              <nav className="flex flex-col space-y-4 mt-6">
                <Link to="/" className="text-sm" onClick={() => setMenuOpen(false)}>
                  Home
                </Link>
                <Link to="/escorts" className="text-sm" onClick={() => setMenuOpen(false)}>
                  Escorts
                </Link>
                <Link to="/neural/monitor" className="text-sm" onClick={() => setMenuOpen(false)}>
                  Neural Monitor
                </Link>
                <Link to="/brain-hub" className="text-sm" onClick={() => setMenuOpen(false)}>
                  Brain Hub
                </Link>
                {isAuthenticated && (
                  <>
                    <Link to="/profile" className="text-sm" onClick={() => setMenuOpen(false)}>
                      Profile
                    </Link>
                    <Link to="/messages" className="text-sm" onClick={() => setMenuOpen(false)}>
                      Messages
                    </Link>
                    <Link to="/wallet" className="text-sm" onClick={() => setMenuOpen(false)}>
                      Wallet
                    </Link>
                  </>
                )}
              </nav>
              
              <div className="mt-auto pt-4 border-t">
                {isAuthenticated ? (
                  <Button variant="outline" className="w-full" onClick={() => { handleLogout(); setMenuOpen(false); }}>
                    Logout
                  </Button>
                ) : (
                  <div className="flex flex-col space-y-2">
                    <Link to="/auth?tab=login" onClick={() => setMenuOpen(false)}>
                      <Button variant="outline" className="w-full">Login</Button>
                    </Link>
                    <Link to="/auth?tab=register" onClick={() => setMenuOpen(false)}>
                      <Button className="w-full">Sign Up</Button>
                    </Link>
                  </div>
                )}
              </div>
            </div>
          </SheetContent>
        </Sheet>
      </div>
    </header>
  );
};

export default Header;
