
import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, Bell, Search, User, MessageSquare, Heart } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { AppPaths } from '@/routes/routeConfig';
import { isActivePath } from '@/utils/navigationHelpers';

interface MainNavigationProps {
  showFullMenu?: boolean;
}

const MainNavigation: React.FC<MainNavigationProps> = ({ showFullMenu = true }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();

  const navigationItems = [
    { path: AppPaths.HOME, label: 'Home', icon: <span>🏠</span> },
    { path: AppPaths.ESCORTS, label: 'Escorts', icon: <span>👩</span> },
    { path: AppPaths.SAFETY, label: 'Safety', icon: <span>🛡️</span> },
    { path: AppPaths.MESSAGES, label: 'Messages', icon: <MessageSquare className="h-4 w-4" /> },
    { path: AppPaths.FAVORITES, label: 'Favorites', icon: <Heart className="h-4 w-4" /> },
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
              <span className="text-xl font-bold">UberEscorts</span>
            </Link>
          </div>
          
          {/* Desktop Navigation */}
          {showFullMenu && (
            <nav className="mx-6 hidden md:flex md:items-center md:space-x-4 lg:space-x-6">
              {navigationItems.map((item) => (
                <NavLink key={item.path} {...item} />
              ))}
            </nav>
          )}
          
          {/* Right side controls */}
          <div className="flex items-center space-x-4">
            {/* Search button */}
            <Button variant="ghost" size="icon" asChild>
              <Link to={AppPaths.SEARCH}>
                <Search className="h-5 w-5" />
                <span className="sr-only">Search</span>
              </Link>
            </Button>
            
            {/* Notifications */}
            <Button variant="ghost" size="icon">
              <Bell className="h-5 w-5" />
              <span className="sr-only">Notifications</span>
            </Button>
            
            {/* User Profile */}
            <Button variant="ghost" size="icon" asChild>
              <Link to={AppPaths.PROFILE}>
                <User className="h-5 w-5" />
                <span className="sr-only">Profile</span>
              </Link>
            </Button>
            
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
                    <span className="text-xl font-bold">UberEscorts</span>
                  </Link>
                  <nav className="flex flex-col space-y-4">
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
                      </Link>
                    ))}
                  </nav>
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
