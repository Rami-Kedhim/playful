
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '@/hooks/auth';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { 
  Menu,
  X,
  User,
  MessageSquare, 
  Heart,
  Wallet,
  LogOut,
  Settings,
  ChevronDown,
  Shield,
  Brain,
  Video
} from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { cn } from '@/lib/utils';
import { AppPaths } from '@/routes/routeConfig';

interface UnifiedHeaderProps {
  className?: string;
}

const UnifiedHeader: React.FC<UnifiedHeaderProps> = ({ className }) => {
  const { user, isAuthenticated, logout } = useAuth();
  const navigate = useNavigate();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const handleLogout = async () => {
    await logout();
    navigate('/');
  };

  // Get user initials for avatar fallback
  const getUserInitials = () => {
    if (user?.email) {
      return user.email.substring(0, 1).toUpperCase();
    }
    if (user?.name) {
      return user.name.substring(0, 1).toUpperCase();
    }
    return 'U';
  };

  const mainNavItems = [
    { label: 'Home', path: AppPaths.HOME },
    { label: 'Escorts', path: AppPaths.ESCORTS },
    { label: 'Creators', path: AppPaths.CREATORS },
    { label: 'Livecams', path: AppPaths.LIVECAMS },
    { label: 'Safety', path: AppPaths.SAFETY, icon: <Shield className="h-4 w-4 mr-2" /> }
  ];

  const userNavItems = [
    { label: 'Profile', path: AppPaths.PROFILE, icon: <User className="h-4 w-4 mr-2" /> },
    { label: 'Messages', path: AppPaths.MESSAGES, icon: <MessageSquare className="h-4 w-4 mr-2" /> },
    { label: 'Favorites', path: AppPaths.FAVORITES, icon: <Heart className="h-4 w-4 mr-2" /> },
    { label: 'Wallet', path: AppPaths.WALLET, icon: <Wallet className="h-4 w-4 mr-2" /> },
    { label: 'Settings', path: AppPaths.SETTINGS, icon: <Settings className="h-4 w-4 mr-2" /> }
  ];

  const specialNavItems = [
    { label: 'Neural Monitor', path: AppPaths.NEURAL_MONITOR, icon: <Brain className="h-4 w-4 mr-2" /> },
    { label: 'AI Companions', path: AppPaths.AI_COMPANION, icon: <Brain className="h-4 w-4 mr-2" /> },
    { label: 'Brain Hub', path: AppPaths.BRAIN_HUB, icon: <Brain className="h-4 w-4 mr-2" /> }
  ];

  return (
    <header className={cn(
      "sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60",
      className
    )}>
      <div className="container mx-auto px-4 h-16 flex items-center justify-between">
        {/* Logo */}
        <Link to="/" className="font-bold text-xl flex items-center">
          <Video className="w-5 h-5 mr-2 text-primary" />
          <span>UberEscorts</span>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center space-x-6">
          {mainNavItems.map((item) => (
            <Link 
              key={item.path}
              to={item.path}
              className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors flex items-center"
            >
              {item.icon && item.icon}
              {item.label}
            </Link>
          ))}
          
          {/* Special Features Dropdown */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="sm" className="flex items-center">
                <span>Features</span>
                <ChevronDown className="ml-1 h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              {specialNavItems.map((item) => (
                <DropdownMenuItem key={item.path} asChild>
                  <Link to={item.path} className="flex items-center w-full">
                    {item.icon}
                    {item.label}
                  </Link>
                </DropdownMenuItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>
        </nav>

        {/* User Account Section */}
        <div className="hidden md:flex items-center space-x-4">
          {isAuthenticated ? (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="relative h-8 w-8 rounded-full" aria-label="User menu">
                  <Avatar className="h-8 w-8">
                    <AvatarImage src={user?.avatarUrl} alt={user?.name || user?.email || 'User'} />
                    <AvatarFallback>{getUserInitials()}</AvatarFallback>
                  </Avatar>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-56">
                <div className="flex flex-col space-y-1 p-2">
                  <p className="text-sm font-medium">{user?.name || user?.email}</p>
                  {user?.email && (
                    <p className="text-xs text-muted-foreground">{user.email}</p>
                  )}
                </div>
                <DropdownMenuSeparator />
                
                {userNavItems.map((item) => (
                  <DropdownMenuItem key={item.path} asChild>
                    <Link to={item.path} className="flex items-center w-full">
                      {item.icon}
                      {item.label}
                    </Link>
                  </DropdownMenuItem>
                ))}
                
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={handleLogout} className="flex items-center text-destructive">
                  <LogOut className="mr-2 h-4 w-4" />
                  Logout
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          ) : (
            <>
              <Button variant="ghost" asChild>
                <Link to="/auth?tab=login">Login</Link>
              </Button>
              <Button asChild>
                <Link to="/auth?tab=register">Sign Up</Link>
              </Button>
            </>
          )}
        </div>

        {/* Mobile menu button */}
        <Sheet open={mobileMenuOpen} onOpenChange={setMobileMenuOpen}>
          <SheetTrigger asChild className="md:hidden">
            <Button variant="ghost" size="icon">
              <Menu className="h-5 w-5" />
              <span className="sr-only">Open menu</span>
            </Button>
          </SheetTrigger>
          <SheetContent side="right" className="w-72">
            <div className="flex flex-col h-full">
              <div className="flex justify-between items-center pb-4 border-b">
                <Link 
                  to="/" 
                  className="font-bold flex items-center" 
                  onClick={() => setMobileMenuOpen(false)}
                >
                  <Video className="w-5 h-5 mr-2 text-primary" />
                  <span>UberEscorts</span>
                </Link>
                <Button 
                  variant="ghost" 
                  size="icon" 
                  onClick={() => setMobileMenuOpen(false)}
                >
                  <X className="h-5 w-5" />
                </Button>
              </div>
              
              <nav className="flex flex-col space-y-1 mt-6">
                {mainNavItems.map((item) => (
                  <Link
                    key={item.path}
                    to={item.path}
                    className="flex items-center py-2 px-3 rounded-md hover:bg-accent text-sm"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    {item.icon && item.icon}
                    {item.label}
                  </Link>
                ))}
                
                <div className="pt-2 pb-2 border-t border-b">
                  <p className="px-3 py-2 text-xs font-semibold text-muted-foreground">Features</p>
                  {specialNavItems.map((item) => (
                    <Link
                      key={item.path}
                      to={item.path}
                      className="flex items-center py-2 px-3 rounded-md hover:bg-accent text-sm"
                      onClick={() => setMobileMenuOpen(false)}
                    >
                      {item.icon && item.icon}
                      {item.label}
                    </Link>
                  ))}
                </div>
                
                {isAuthenticated ? (
                  <>
                    <div className="pt-2">
                      <p className="px-3 py-1 text-xs font-semibold text-muted-foreground">Account</p>
                      {userNavItems.map((item) => (
                        <Link
                          key={item.path}
                          to={item.path}
                          className="flex items-center py-2 px-3 rounded-md hover:bg-accent text-sm"
                          onClick={() => setMobileMenuOpen(false)}
                        >
                          {item.icon}
                          {item.label}
                        </Link>
                      ))}
                    </div>
                    <Button 
                      variant="destructive" 
                      onClick={() => {
                        handleLogout();
                        setMobileMenuOpen(false);
                      }}
                      className="mt-auto"
                    >
                      <LogOut className="mr-2 h-4 w-4" />
                      Logout
                    </Button>
                  </>
                ) : (
                  <div className="mt-auto grid grid-cols-2 gap-2">
                    <Button variant="outline" asChild>
                      <Link to="/auth?tab=login" onClick={() => setMobileMenuOpen(false)}>
                        Login
                      </Link>
                    </Button>
                    <Button asChild>
                      <Link to="/auth?tab=register" onClick={() => setMobileMenuOpen(false)}>
                        Sign Up
                      </Link>
                    </Button>
                  </div>
                )}
              </nav>
            </div>
          </SheetContent>
        </Sheet>
      </div>
    </header>
  );
};

export default UnifiedHeader;
