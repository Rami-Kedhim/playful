
import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, Bell, Search, User, MessageSquare, Heart, Laptop, Video, Home, Shield, Brain, Users, Wallet } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { AppPaths } from '@/routes/routeConfig';
import { isActivePath } from '@/utils/navigationHelpers';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { DropdownMenu, DropdownMenuTrigger, DropdownMenuContent, DropdownMenuItem, DropdownMenuSeparator } from '@/components/ui/dropdown-menu';

interface MainNavigationProps {
  showFullMenu?: boolean;
}

const MainNavigation: React.FC<MainNavigationProps> = ({ showFullMenu = true }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();

  // In a real app, this would come from a context or auth service
  const isLoggedIn = false;
  const unreadMessages = 3;
  const unreadNotifications = 2;

  const navigationItems = [
    { path: AppPaths.HOME, label: 'Home', icon: <Home className="h-4 w-4" /> },
    { path: AppPaths.ESCORTS, label: 'Escorts', icon: <Users className="h-4 w-4" /> },
    { path: AppPaths.SAFETY, label: 'Safety', icon: <Shield className="h-4 w-4" /> },
    { path: AppPaths.AI_COMPANION, label: 'AI Companions', icon: <Brain className="h-4 w-4" /> },
    { path: AppPaths.MESSAGES, label: 'Messages', icon: <MessageSquare className="h-4 w-4" /> },
    { path: AppPaths.FAVORITES, label: 'Favorites', icon: <Heart className="h-4 w-4" /> },
    { path: '/creators', label: 'Creators', icon: <Video className="h-4 w-4" /> },
    { path: '/livecams', label: 'Livecams', icon: <Video className="h-4 w-4" /> }
  ];

  const NavLink = ({ path, label, icon }: { path: string; label: string; icon: React.ReactNode }) => {
    const isActive = isActivePath(location.pathname, path);
    
    return (
      <Link 
        to={path} 
        className={`flex items-center space-x-2 px-3 py-2 rounded-md transition-colors ${
          isActive 
            ? 'bg-primary/10 text-primary font-medium' 
            : 'hover:bg-accent hover:text-accent-foreground'
        }`}
      >
        {icon}
        <span>{label}</span>
      </Link>
    );
  };

  return (
    <header className="sticky top-0 z-40 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto px-4">
        <div className="flex h-16 items-center justify-between">
          {/* Logo and Brand */}
          <div className="flex items-center">
            <Link to="/" className="flex items-center space-x-2">
              <Laptop className="w-5 h-5 text-primary" />
              <span className="text-xl font-bold">UberEscorts</span>
            </Link>
          </div>
          
          {/* Desktop Navigation */}
          {showFullMenu && (
            <nav className="mx-6 hidden md:flex md:items-center md:space-x-1 lg:space-x-2">
              {navigationItems.slice(0, 5).map((item) => (
                <NavLink key={item.path} {...item} />
              ))}
            </nav>
          )}
          
          {/* Right side controls */}
          <div className="flex items-center space-x-2">
            {/* Search button */}
            <Button variant="ghost" size="icon" asChild>
              <Link to={AppPaths.SEARCH}>
                <Search className="h-5 w-5" />
                <span className="sr-only">Search</span>
              </Link>
            </Button>
            
            {/* Favorites */}
            <Button variant="ghost" size="icon" asChild className="hidden sm:flex">
              <Link to={AppPaths.FAVORITES}>
                <Heart className="h-5 w-5" />
                <span className="sr-only">Favorites</span>
              </Link>
            </Button>
            
            {/* Notifications */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="icon" className="relative">
                  <Bell className="h-5 w-5" />
                  {unreadNotifications > 0 && (
                    <Badge className="absolute -top-1 -right-1 h-4 w-4 p-0 flex items-center justify-center text-[10px]">
                      {unreadNotifications}
                    </Badge>
                  )}
                  <span className="sr-only">Notifications</span>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-80">
                <div className="p-2 font-medium">Notifications</div>
                <DropdownMenuSeparator />
                <div className="p-4 text-center text-muted-foreground">
                  No new notifications
                </div>
              </DropdownMenuContent>
            </DropdownMenu>
            
            {/* Messages */}
            <Button variant="ghost" size="icon" asChild className="relative hidden sm:flex">
              <Link to={AppPaths.MESSAGES}>
                <MessageSquare className="h-5 w-5" />
                {unreadMessages > 0 && (
                  <Badge className="absolute -top-1 -right-1 h-4 w-4 p-0 flex items-center justify-center text-[10px]">
                    {unreadMessages}
                  </Badge>
                )}
                <span className="sr-only">Messages</span>
              </Link>
            </Button>
            
            {/* Wallet */}
            <Button variant="ghost" size="icon" asChild className="hidden sm:flex">
              <Link to={AppPaths.WALLET}>
                <Wallet className="h-5 w-5" />
                <span className="sr-only">Wallet</span>
              </Link>
            </Button>
            
            {/* User Profile */}
            {isLoggedIn ? (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" size="icon" className="rounded-full">
                    <Avatar className="h-8 w-8">
                      <AvatarImage src="https://i.pravatar.cc/300" alt="User" />
                      <AvatarFallback>U</AvatarFallback>
                    </Avatar>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuItem asChild>
                    <Link to={AppPaths.PROFILE}>Profile</Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem asChild>
                    <Link to={AppPaths.SETTINGS}>Settings</Link>
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem>Logout</DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            ) : (
              <Button variant="default" size="sm" asChild>
                <Link to="/auth">Sign In</Link>
              </Button>
            )}
            
            {/* Mobile menu */}
            <Sheet open={isMenuOpen} onOpenChange={setIsMenuOpen}>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon" className="md:hidden">
                  <Menu className="h-5 w-5" />
                  <span className="sr-only">Menu</span>
                </Button>
              </SheetTrigger>
              <SheetContent side="left" className="sm:max-w-xs">
                <div className="px-2 py-6">
                  <Link to="/" className="flex items-center space-x-2 mb-6" onClick={() => setIsMenuOpen(false)}>
                    <Laptop className="w-5 h-5 text-primary" />
                    <span className="text-xl font-bold">UberEscorts</span>
                  </Link>
                  <nav className="flex flex-col space-y-1">
                    {navigationItems.map((item) => (
                      <Link 
                        key={item.path}
                        to={item.path}
                        className={`flex items-center space-x-2 px-3 py-2 rounded-md transition-colors ${
                          isActivePath(location.pathname, item.path)
                            ? 'bg-primary/10 text-primary font-medium'
                            : 'hover:bg-accent hover:text-accent-foreground'
                        }`}
                        onClick={() => setIsMenuOpen(false)}
                      >
                        {item.icon}
                        <span>{item.label}</span>
                        {item.label === 'Messages' && unreadMessages > 0 && (
                          <Badge className="ml-auto">{unreadMessages}</Badge>
                        )}
                      </Link>
                    ))}
                  </nav>

                  <div className="mt-6 pt-6 border-t">
                    <div className="space-y-2">
                      {!isLoggedIn ? (
                        <>
                          <Button asChild variant="outline" className="w-full justify-start">
                            <Link to="/auth?mode=login" onClick={() => setIsMenuOpen(false)}>
                              <User className="mr-2 h-4 w-4" /> Sign In
                            </Link>
                          </Button>
                          <Button asChild variant="default" className="w-full justify-start">
                            <Link to="/auth?mode=register" onClick={() => setIsMenuOpen(false)}>
                              <User className="mr-2 h-4 w-4" /> Create Account
                            </Link>
                          </Button>
                        </>
                      ) : (
                        <>
                          <Button asChild variant="outline" className="w-full justify-start">
                            <Link to={AppPaths.PROFILE} onClick={() => setIsMenuOpen(false)}>
                              <User className="mr-2 h-4 w-4" /> Profile
                            </Link>
                          </Button>
                          <Button asChild variant="outline" className="w-full justify-start">
                            <Link to={AppPaths.WALLET} onClick={() => setIsMenuOpen(false)}>
                              <Wallet className="mr-2 h-4 w-4" /> Wallet
                            </Link>
                          </Button>
                          <Button variant="destructive" className="w-full justify-start">
                            Logout
                          </Button>
                        </>
                      )}
                    </div>
                  </div>
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
    </header>
  );
};

export default MainNavigation;
