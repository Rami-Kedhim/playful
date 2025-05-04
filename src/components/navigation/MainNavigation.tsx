
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '@/hooks/auth';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { 
  Avatar, 
  AvatarFallback, 
  AvatarImage 
} from '@/components/ui/avatar';
import { 
  Laptop, 
  Menu, 
  X, 
  User, 
  LogOut, 
  Settings, 
  MessageSquare,
  Heart,
  Wallet,
  Brain,
  Shield
} from 'lucide-react';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { Badge } from '@/components/ui/badge';
import { AppPaths } from '@/routes/routeConfig';
import WalletConnect from '@/components/solana/WalletConnect';

const MainNavigation = () => {
  const { user, logout, isAuthenticated } = useAuth();
  const [menuOpen, setMenuOpen] = useState(false);
  const navigate = useNavigate();

  const handleLogout = async () => {
    await logout();
    navigate('/');
  };

  // Get user initials for avatar fallback
  const getUserInitials = () => {
    if (user?.name) {
      return user.name.substring(0, 1).toUpperCase();
    } else if (user?.email) {
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
        
        <div className="hidden md:flex items-center space-x-6">
          <Link to={AppPaths.ESCORTS} className="text-sm font-medium hover:text-primary transition-colors">
            Escorts
          </Link>
          <Link to={AppPaths.CREATORS} className="text-sm font-medium hover:text-primary transition-colors">
            Creators
          </Link>
          <Link to={AppPaths.LIVECAMS} className="text-sm font-medium hover:text-primary transition-colors">
            Livecams
          </Link>
          <Link to={AppPaths.NEURAL_MONITOR} className="text-sm font-medium hover:text-primary transition-colors flex items-center">
            <Brain className="w-3 h-3 mr-1" />
            <span>Neural</span>
            <Badge className="ml-2 bg-primary text-[10px] py-0 px-1.5">New</Badge>
          </Link>
          <Link to={AppPaths.SAFETY} className="text-sm font-medium hover:text-primary transition-colors">
            <Shield className="w-3 h-3 inline mr-1" />
            <span>Safety</span>
          </Link>
        </div>
        
        <div className="hidden md:flex items-center space-x-4">
          {isAuthenticated ? (
            <>
              <WalletConnect />
              
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" className="relative h-8 w-8 rounded-full">
                    <Avatar className="h-8 w-8">
                      <AvatarImage src={user?.avatarUrl} alt={user?.name || user?.email || 'User'} />
                      <AvatarFallback>{getUserInitials()}</AvatarFallback>
                    </Avatar>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-56">
                  <DropdownMenuItem asChild>
                    <Link to="/profile" className="flex items-center w-full">
                      <User className="mr-2 h-4 w-4" />
                      Profile
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem asChild>
                    <Link to="/messages" className="flex items-center w-full">
                      <MessageSquare className="mr-2 h-4 w-4" />
                      Messages
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem asChild>
                    <Link to="/favorites" className="flex items-center w-full">
                      <Heart className="mr-2 h-4 w-4" />
                      Favorites
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem asChild>
                    <Link to="/wallet" className="flex items-center w-full">
                      <Wallet className="mr-2 h-4 w-4" />
                      Wallet
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem asChild>
                    <Link to="/settings" className="flex items-center w-full">
                      <Settings className="mr-2 h-4 w-4" />
                      Settings
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem onClick={handleLogout} className="flex items-center w-full">
                    <LogOut className="mr-2 h-4 w-4" />
                    Logout
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
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
                <Link to="/creators" className="text-sm" onClick={() => setMenuOpen(false)}>
                  Creators
                </Link>
                <Link to="/livecams" className="text-sm" onClick={() => setMenuOpen(false)}>
                  Livecams
                </Link>
                <Link to="/neural/monitor" className="text-sm flex items-center" onClick={() => setMenuOpen(false)}>
                  <Brain className="w-3 h-3 mr-1" />
                  Neural Monitor
                  <Badge className="ml-2 bg-primary text-[10px] py-0 px-1.5">New</Badge>
                </Link>
                <Link to="/brain-hub" className="text-sm" onClick={() => setMenuOpen(false)}>
                  Brain Hub
                </Link>
                <Link to="/safety" className="text-sm flex items-center" onClick={() => setMenuOpen(false)}>
                  <Shield className="w-3 h-3 mr-1" />
                  Safety
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
                    <Link to="/favorites" className="text-sm" onClick={() => setMenuOpen(false)}>
                      Favorites
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

export default MainNavigation;
