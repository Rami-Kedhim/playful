
import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Menu, X, Bell, Search, User, LogIn, Wallet, Settings, LogOut, CreditCard, MessageCircle, Heart, Compass } from 'lucide-react';
import { useAuth } from '@/hooks/auth/useAuth';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { AppPaths } from '@/routes/routeConfig';

const Navigation: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { user, isAuthenticated, signOut } = useAuth();
  const location = useLocation();
  
  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);
  const closeMenu = () => setIsMenuOpen(false);
  
  const handleSignOut = async () => {
    await signOut();
  };
  
  // Navigation items
  const navItems = [
    { path: AppPaths.HOME, label: 'Home' },
    { path: AppPaths.ESCORTS, label: 'Escorts' },
    { path: AppPaths.CREATORS, label: 'Creators' },
    { path: AppPaths.LIVECAMS, label: 'Livecams' },
  ];
  
  return (
    <header className="sticky top-0 z-50 w-full bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 border-b">
      <nav className="container mx-auto px-4 py-4 flex justify-between items-center">
        {/* Logo */}
        <Link to="/" className="flex items-center gap-2">
          <span className="font-bold text-xl">UberEscorts</span>
        </Link>
        
        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center space-x-1">
          {navItems.map(item => (
            <Button 
              key={item.path}
              variant={location.pathname === item.path ? "secondary" : "ghost"} 
              asChild
            >
              <Link to={item.path}>{item.label}</Link>
            </Button>
          ))}
        </div>
        
        {/* Desktop Right Navigation */}
        <div className="hidden md:flex items-center space-x-1">
          <Button variant="ghost" size="icon">
            <Search className="h-5 w-5" />
          </Button>
          {isAuthenticated ? (
            <>
              <Button variant="ghost" size="icon" asChild>
                <Link to="/messages">
                  <Bell className="h-5 w-5" />
                </Link>
              </Button>
              
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" className="relative h-8 w-8 rounded-full">
                    <Avatar className="h-8 w-8">
                      <AvatarImage src={user?.avatar || user?.photoUrl} alt={user?.name || 'User'} />
                      <AvatarFallback>{user?.name?.[0] || user?.email?.[0] || 'U'}</AvatarFallback>
                    </Avatar>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="w-56" align="end" forceMount>
                  <DropdownMenuLabel className="font-normal">
                    <div className="flex flex-col space-y-1">
                      <p className="text-sm font-medium leading-none">{user?.name || user?.email}</p>
                      <p className="text-xs leading-none text-muted-foreground">
                        {user?.email}
                      </p>
                    </div>
                  </DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuGroup>
                    <DropdownMenuItem asChild>
                      <Link to={AppPaths.USER_PROFILE} className="cursor-pointer w-full">
                        <User className="mr-2 h-4 w-4" />
                        <span>Profile</span>
                      </Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem asChild>
                      <Link to={AppPaths.WALLET} className="cursor-pointer w-full">
                        <Wallet className="mr-2 h-4 w-4" />
                        <span>Wallet</span>
                      </Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem asChild>
                      <Link to={AppPaths.FAVORITES} className="cursor-pointer w-full">
                        <Heart className="mr-2 h-4 w-4" />
                        <span>Favorites</span>
                      </Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem asChild>
                      <Link to={AppPaths.MESSAGES} className="cursor-pointer w-full">
                        <MessageCircle className="mr-2 h-4 w-4" />
                        <span>Messages</span>
                      </Link>
                    </DropdownMenuItem>
                  </DropdownMenuGroup>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem asChild>
                    <Link to={AppPaths.BOOKINGS} className="cursor-pointer w-full">
                      <CreditCard className="mr-2 h-4 w-4" />
                      <span>Bookings</span>
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem asChild>
                    <Link to={AppPaths.SETTINGS} className="cursor-pointer w-full">
                      <Settings className="mr-2 h-4 w-4" />
                      <span>Settings</span>
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem onClick={handleSignOut}>
                    <LogOut className="mr-2 h-4 w-4" />
                    <span>Log out</span>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </>
          ) : (
            <Button asChild>
              <Link to="/auth">
                <LogIn className="h-4 w-4 mr-2" />
                Sign In
              </Link>
            </Button>
          )}
        </div>
        
        {/* Mobile Menu Button */}
        <div className="md:hidden flex items-center">
          <Button variant="ghost" size="icon" onClick={toggleMenu}>
            {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </Button>
        </div>
      </nav>
      
      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="md:hidden px-4 py-2 space-y-4 bg-background border-t">
          {/* Mobile Navigation Items */}
          <div className="flex flex-col space-y-2">
            {navItems.map(item => (
              <Button 
                key={item.path}
                variant={location.pathname === item.path ? "secondary" : "ghost"} 
                className="justify-start"
                asChild
                onClick={closeMenu}
              >
                <Link to={item.path}>{item.label}</Link>
              </Button>
            ))}
          </div>
          
          {/* Mobile Authentication */}
          <div className="flex flex-col space-y-2 pt-2 border-t">
            {isAuthenticated ? (
              <>
                <div className="flex items-center p-2">
                  <Avatar className="h-10 w-10 mr-3">
                    <AvatarImage src={user?.avatar || user?.photoUrl} alt={user?.name || 'User'} />
                    <AvatarFallback>{user?.name?.[0] || user?.email?.[0] || 'U'}</AvatarFallback>
                  </Avatar>
                  <div>
                    <p className="font-medium">{user?.name || 'User'}</p>
                    <p className="text-sm text-muted-foreground">{user?.email}</p>
                  </div>
                </div>
                
                <Button variant="ghost" className="justify-start" asChild onClick={closeMenu}>
                  <Link to={AppPaths.USER_PROFILE}>
                    <User className="mr-2 h-4 w-4" />
                    Profile
                  </Link>
                </Button>
                
                <Button variant="ghost" className="justify-start" asChild onClick={closeMenu}>
                  <Link to={AppPaths.WALLET}>
                    <Wallet className="mr-2 h-4 w-4" />
                    Wallet
                  </Link>
                </Button>
                
                <Button variant="ghost" className="justify-start" asChild onClick={closeMenu}>
                  <Link to={AppPaths.SETTINGS}>
                    <Settings className="mr-2 h-4 w-4" />
                    Settings
                  </Link>
                </Button>
                
                <Button variant="ghost" className="justify-start" onClick={handleSignOut}>
                  <LogOut className="mr-2 h-4 w-4" />
                  Log Out
                </Button>
              </>
            ) : (
              <Button className="w-full" asChild onClick={closeMenu}>
                <Link to="/auth">
                  <LogIn className="mr-2 h-4 w-4" />
                  Sign In
                </Link>
              </Button>
            )}
          </div>
        </div>
      )}
    </header>
  );
};

export default Navigation;
