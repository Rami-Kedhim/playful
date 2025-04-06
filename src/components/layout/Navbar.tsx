
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { ThemeToggle } from '@/components/ThemeToggle';
import { useAuth } from '@/hooks/useAuth';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { LogOut, User, Settings, MessageSquare, Heart, Menu, X } from 'lucide-react';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';

const Navbar: React.FC = () => {
  const { user, isAuthenticated, logout } = useAuth();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const handleLogout = async () => {
    try {
      await logout();
    } catch (error) {
      console.error('Error logging out:', error);
    }
  };

  const getInitials = (name: string | undefined) => {
    if (!name) return 'U';
    return name
      .split(' ')
      .map(part => part[0])
      .join('')
      .toUpperCase()
      .substring(0, 2);
  };

  const navLinks = [
    { href: '/', label: 'Home' },
    { href: '/escorts', label: 'Escorts' },
    { href: '/creators', label: 'Creators' },
    { href: '/livecams', label: 'Livecams' },
  ];

  const userNavLinks = [
    { href: '/profile', label: 'Profile', icon: <User className="h-4 w-4 mr-2" /> },
    { href: '/messages', label: 'Messages', icon: <MessageSquare className="h-4 w-4 mr-2" /> },
    { href: '/favorites', label: 'Favorites', icon: <Heart className="h-4 w-4 mr-2" /> },
    { href: '/settings', label: 'Settings', icon: <Settings className="h-4 w-4 mr-2" /> },
  ];

  const AuthButtons = () => (
    <div className="flex items-center gap-2">
      <Button asChild variant="ghost" size="sm">
        <Link to="/auth">Log In</Link>
      </Button>
      <Button asChild size="sm">
        <Link to="/auth?tab=register">Sign Up</Link>
      </Button>
    </div>
  );

  const UserMenu = () => (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" className="relative h-8 w-8 rounded-full">
          <Avatar className="h-8 w-8">
            <AvatarImage 
              src={user?.profileImageUrl || user?.avatarUrl || undefined} 
              alt={user?.username || "User"} 
            />
            <AvatarFallback>{getInitials(user?.username || user?.email)}</AvatarFallback>
          </Avatar>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56" align="end" forceMount>
        <DropdownMenuLabel className="font-normal">
          <div className="flex flex-col space-y-1">
            <p className="text-sm font-medium leading-none">{user?.username || 'User'}</p>
            <p className="text-xs leading-none text-muted-foreground">{user?.email}</p>
          </div>
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuGroup>
          {userNavLinks.map((link) => (
            <DropdownMenuItem key={link.href} asChild>
              <Link to={link.href} className="w-full cursor-pointer flex items-center">
                {link.icon}
                {link.label}
              </Link>
            </DropdownMenuItem>
          ))}
        </DropdownMenuGroup>
        <DropdownMenuSeparator />
        <DropdownMenuItem className="cursor-pointer" onClick={handleLogout}>
          <LogOut className="h-4 w-4 mr-2" />
          Log out
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );

  const MobileMenu = () => (
    <Sheet open={mobileMenuOpen} onOpenChange={setMobileMenuOpen}>
      <SheetTrigger asChild>
        <Button variant="ghost" size="icon" className="md:hidden">
          <Menu />
        </Button>
      </SheetTrigger>
      <SheetContent side="left" className="w-[80%] sm:w-[350px]">
        <div className="flex flex-col h-full">
          <div className="flex items-center justify-between pb-4 border-b">
            <Link to="/" className="text-xl font-bold">AppName</Link>
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setMobileMenuOpen(false)}
            >
              <X />
            </Button>
          </div>
          <div className="py-4 flex-1">
            <nav className="flex flex-col space-y-1">
              {navLinks.map((link) => (
                <Button
                  key={link.href}
                  variant="ghost"
                  className="justify-start"
                  asChild
                  onClick={() => setMobileMenuOpen(false)}
                >
                  <Link to={link.href}>{link.label}</Link>
                </Button>
              ))}
            </nav>
            
            {isAuthenticated && (
              <div className="mt-6">
                <p className="px-3 mb-2 text-sm font-medium">Account</p>
                <nav className="flex flex-col space-y-1">
                  {userNavLinks.map((link) => (
                    <Button
                      key={link.href}
                      variant="ghost"
                      className="justify-start"
                      asChild
                      onClick={() => setMobileMenuOpen(false)}
                    >
                      <Link to={link.href}>
                        {link.icon}
                        {link.label}
                      </Link>
                    </Button>
                  ))}
                  <Button
                    variant="ghost"
                    className="justify-start text-destructive hover:text-destructive"
                    onClick={() => {
                      handleLogout();
                      setMobileMenuOpen(false);
                    }}
                  >
                    <LogOut className="h-4 w-4 mr-2" />
                    Log out
                  </Button>
                </nav>
              </div>
            )}
          </div>
          
          {!isAuthenticated && (
            <div className="border-t pt-4 flex flex-col gap-2">
              <Button asChild onClick={() => setMobileMenuOpen(false)}>
                <Link to="/auth">Log In</Link>
              </Button>
              <Button asChild variant="outline" onClick={() => setMobileMenuOpen(false)}>
                <Link to="/auth?tab=register">Sign Up</Link>
              </Button>
            </div>
          )}
        </div>
      </SheetContent>
    </Sheet>
  );

  return (
    <header className="sticky top-0 z-40 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-14 items-center">
        <MobileMenu />
        
        <div className="flex md:hidden">
          <Link to="/" className="flex items-center mr-6">
            <span className="font-bold text-lg">AppName</span>
          </Link>
        </div>
        
        <div className="hidden md:flex">
          <Link to="/" className="flex items-center mr-6">
            <span className="font-bold text-lg">AppName</span>
          </Link>
          <nav className="flex items-center space-x-4 lg:space-x-6">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                to={link.href}
                className="text-sm font-medium transition-colors hover:text-primary"
              >
                {link.label}
              </Link>
            ))}
          </nav>
        </div>
        
        <div className="flex flex-1 items-center justify-end space-x-2">
          <ThemeToggle />
          {isAuthenticated ? <UserMenu /> : <AuthButtons />}
        </div>
      </div>
    </header>
  );
};

export default Navbar;
