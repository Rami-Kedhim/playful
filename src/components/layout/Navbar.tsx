
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '@/hooks/auth/useAuthContext';
import { Button } from '@/components/ui/button';
import { useRole } from '@/hooks/auth/useRole';
import UserMenu from '@/components/layout/UserMenu';
import { ModeToggle } from '@/components/ui/mode-toggle';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { Menu, X } from 'lucide-react';

const Navbar: React.FC = () => {
  const { isAuthenticated, isLoading } = useAuth();
  const { canAccessAdminFeatures, isEscort, isCreator } = useRole();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  
  const closeMenu = () => setIsMenuOpen(false);
  
  // Navigation links that are shown to all users
  const commonNavLinks = [
    { to: "/", label: "Home" },
    { to: "/escorts", label: "Escorts" },
    { to: "/creators", label: "Creators" },
  ];
  
  // Navigation links that are shown only to authenticated users
  const authenticatedNavLinks = [
    { to: "/profile", label: "My Profile" },
    { to: "/messages", label: "Messages" },
    { to: "/favorites", label: "Favorites" },
  ];
  
  // Role-specific navigation links
  const roleSpecificNavLinks = [
    ...(isEscort() ? [{ to: "/escort-dashboard", label: "Escort Dashboard" }] : []),
    ...(isCreator() ? [{ to: "/creator-dashboard", label: "Creator Studio" }] : []),
    ...(canAccessAdminFeatures() ? [{ to: "/brainhub", label: "BrainHub" }] : []),
  ];
  
  return (
    <nav className="border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 sticky top-0 z-50">
      <div className="container flex h-16 items-center justify-between">
        <div className="flex items-center gap-6 md:gap-8">
          <Link to="/" className="flex items-center space-x-2">
            <span className="font-bold text-xl">UberEscorts</span>
          </Link>
          
          {/* Desktop Navigation */}
          <div className="hidden md:flex gap-6">
            {commonNavLinks.map((link) => (
              <Link
                key={link.to}
                to={link.to}
                className="text-sm font-medium transition-colors hover:text-primary"
              >
                {link.label}
              </Link>
            ))}
            
            {isAuthenticated && authenticatedNavLinks.map((link) => (
              <Link
                key={link.to}
                to={link.to}
                className="text-sm font-medium transition-colors hover:text-primary"
              >
                {link.label}
              </Link>
            ))}
            
            {isAuthenticated && roleSpecificNavLinks.map((link) => (
              <Link
                key={link.to}
                to={link.to}
                className="text-sm font-medium transition-colors hover:text-primary"
              >
                {link.label}
              </Link>
            ))}
          </div>
        </div>
        
        <div className="flex items-center gap-4">
          <ModeToggle />
          
          {isAuthenticated ? (
            <UserMenu />
          ) : (
            <div className="hidden md:flex items-center gap-2">
              <Link to="/auth">
                <Button variant="ghost" size="sm">Login</Button>
              </Link>
              <Link to="/auth?tab=register">
                <Button size="sm">Sign Up</Button>
              </Link>
            </div>
          )}
          
          {/* Mobile Menu Button */}
          <Sheet open={isMenuOpen} onOpenChange={setIsMenuOpen}>
            <SheetTrigger asChild className="md:hidden">
              <Button variant="ghost" size="icon">
                <Menu className="h-5 w-5" />
                <span className="sr-only">Toggle menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-[80%] sm:w-[350px]">
              <div className="flex flex-col space-y-4 py-4">
                <div className="flex justify-between items-center mb-4">
                  <h2 className="text-lg font-semibold">Menu</h2>
                  <Button variant="ghost" size="icon" onClick={closeMenu}>
                    <X className="h-5 w-5" />
                  </Button>
                </div>
                
                {commonNavLinks.map((link) => (
                  <Link
                    key={link.to}
                    to={link.to}
                    className="py-2 text-base hover:text-primary transition-colors"
                    onClick={closeMenu}
                  >
                    {link.label}
                  </Link>
                ))}
                
                {isAuthenticated && (
                  <>
                    <div className="h-px bg-border my-2" />
                    
                    {authenticatedNavLinks.map((link) => (
                      <Link
                        key={link.to}
                        to={link.to}
                        className="py-2 text-base hover:text-primary transition-colors"
                        onClick={closeMenu}
                      >
                        {link.label}
                      </Link>
                    ))}
                    
                    {roleSpecificNavLinks.length > 0 && (
                      <>
                        <div className="h-px bg-border my-2" />
                        
                        {roleSpecificNavLinks.map((link) => (
                          <Link
                            key={link.to}
                            to={link.to}
                            className="py-2 text-base hover:text-primary transition-colors"
                            onClick={closeMenu}
                          >
                            {link.label}
                          </Link>
                        ))}
                      </>
                    )}
                  </>
                )}
                
                {!isAuthenticated && (
                  <>
                    <div className="h-px bg-border my-2" />
                    
                    <div className="flex flex-col gap-2 mt-2">
                      <Link to="/auth" onClick={closeMenu}>
                        <Button className="w-full" variant="default">Login</Button>
                      </Link>
                      <Link to="/auth?tab=register" onClick={closeMenu}>
                        <Button className="w-full" variant="outline">Sign Up</Button>
                      </Link>
                    </div>
                  </>
                )}
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
