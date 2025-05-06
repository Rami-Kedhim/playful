
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '@/hooks/auth';
import { Button } from '@/components/ui/button';
import { 
  Laptop, 
  Menu, 
  X, 
  User, 
  LogOut, 
  Settings 
} from 'lucide-react';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import MobileMenu from '@/components/navigation/MobileMenu';
import NavLinks from '@/components/navigation/NavLinks';

interface HeaderProps {
  simplified?: boolean;
}

const Header: React.FC<HeaderProps> = ({ simplified = false }) => {
  const { user, isAuthenticated, logout } = useAuth();
  const [menuOpen, setMenuOpen] = useState(false);

  const handleLogout = async () => {
    await logout();
    setMenuOpen(false);
  };

  // Get user initials for avatar fallback
  const getUserInitials = () => {
    if (user?.name) {
      return user.name.substring(0, 1).toUpperCase();
    }
    if (user?.email) {
      return user.email.substring(0, 1).toUpperCase();
    }
    return "U";
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
        
        {!simplified && (
          <div className="hidden md:flex items-center space-x-6">
            <NavLinks />
          </div>
        )}
        
        <div className="hidden md:flex items-center space-x-4">
          {isAuthenticated ? (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="relative h-8 w-8 rounded-full">
                  <Avatar className="h-8 w-8">
                    <AvatarImage src={user?.avatarUrl} alt={user?.email || 'User'} />
                    <AvatarFallback>{getUserInitials()}</AvatarFallback>
                  </Avatar>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-56">
                <DropdownMenuItem asChild>
                  <Link to="/profile" className="w-full flex items-center">
                    <User className="mr-2 h-4 w-4" />
                    Profile
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <Link to="/settings" className="w-full flex items-center">
                    <Settings className="mr-2 h-4 w-4" />
                    Settings
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={handleLogout} className="flex items-center">
                  <LogOut className="mr-2 h-4 w-4" />
                  Logout
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
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
            <div className="flex justify-between items-center pb-4 border-b mb-4">
              <Link to="/" className="font-bold" onClick={() => setMenuOpen(false)}>
                UberEscorts
              </Link>
              <Button variant="ghost" size="icon" onClick={() => setMenuOpen(false)}>
                <X className="h-5 w-5" />
              </Button>
            </div>
            <MobileMenu onClose={() => setMenuOpen(false)} />
          </SheetContent>
        </Sheet>
      </div>
    </header>
  );
};

export default Header;
