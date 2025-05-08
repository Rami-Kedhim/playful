
import React, { useState } from 'react';
import { Link, useLocation, NavLink } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { 
  Menu, 
  Search, 
  Bell, 
  Heart, 
  Wallet, 
  LogOut, 
  User, 
  Settings, 
  ChevronDown,
  Home,
  LogIn
} from 'lucide-react';
import { 
  DropdownMenu, 
  DropdownMenuContent, 
  DropdownMenuGroup, 
  DropdownMenuItem, 
  DropdownMenuLabel, 
  DropdownMenuSeparator, 
  DropdownMenuTrigger 
} from '@/components/ui/dropdown-menu';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { cn } from '@/lib/utils';
import { useWallet } from '@/contexts/WalletContext';

// Mock user data - this would come from an auth context in a real app
const mockUser = {
  id: 'user123',
  name: 'Jane Smith',
  email: 'jane@example.com',
  avatarUrl: 'https://i.pravatar.cc/150?img=37',
  isLoggedIn: true,
  notificationCount: 3
};

const Navigation: React.FC = () => {
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const location = useLocation();
  const { balance } = useWallet();
  const user = mockUser; // This would be from useAuth() in a real app
  
  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    // Implement search functionality
    console.log('Searching for:', searchQuery);
  };
  
  const handleLogout = () => {
    // Implement logout functionality
    console.log('Logging out');
  };
  
  // Navigation links
  const navLinks = [
    { name: 'Home', path: '/', icon: <Home className="h-4 w-4" /> },
    { name: 'Escorts', path: '/escorts', icon: <User className="h-4 w-4" /> },
    { name: 'Creators', path: '/creators', icon: <User className="h-4 w-4" /> },
    { name: 'Live Cams', path: '/livecams', icon: <User className="h-4 w-4" /> }
  ];
  
  return (
    <header className="sticky top-0 z-40 w-full border-b bg-background/95 backdrop-blur">
      <div className="container flex h-16 items-center">
        {/* Mobile Menu Button */}
        <Sheet>
          <SheetTrigger asChild>
            <Button variant="ghost" size="icon" className="md:hidden">
              <Menu className="h-5 w-5" />
              <span className="sr-only">Toggle menu</span>
            </Button>
          </SheetTrigger>
          <SheetContent side="left" className="w-72">
            <div className="flex flex-col space-y-4 py-4">
              <Link to="/" className="flex items-center space-x-2 px-2">
                <span className="font-bold text-xl">UberEscorts</span>
              </Link>
              <div className="space-y-1">
                {navLinks.map((link) => (
                  <NavLink 
                    key={link.path}
                    to={link.path} 
                    className={({ isActive }) => cn(
                      "flex items-center gap-2 px-2 py-1 rounded-md text-sm transition-colors hover:bg-accent",
                      isActive ? "bg-accent text-accent-foreground" : "text-muted-foreground"
                    )}
                  >
                    {link.icon}
                    {link.name}
                  </NavLink>
                ))}
              </div>
              
              <div className="space-y-1">
                <p className="px-2 text-xs text-muted-foreground uppercase">Account</p>
                {user.isLoggedIn ? (
                  <>
                    <NavLink
                      to="/profile"
                      className={({ isActive }) => cn(
                        "flex items-center gap-2 px-2 py-1 rounded-md text-sm transition-colors hover:bg-accent",
                        isActive ? "bg-accent text-accent-foreground" : "text-muted-foreground"
                      )}
                    >
                      <User className="h-4 w-4" />
                      Profile
                    </NavLink>
                    <NavLink
                      to="/wallet"
                      className={({ isActive }) => cn(
                        "flex items-center gap-2 px-2 py-1 rounded-md text-sm transition-colors hover:bg-accent",
                        isActive ? "bg-accent text-accent-foreground" : "text-muted-foreground"
                      )}
                    >
                      <Wallet className="h-4 w-4" />
                      Wallet
                    </NavLink>
                    <NavLink
                      to="/favorites"
                      className={({ isActive }) => cn(
                        "flex items-center gap-2 px-2 py-1 rounded-md text-sm transition-colors hover:bg-accent",
                        isActive ? "bg-accent text-accent-foreground" : "text-muted-foreground"
                      )}
                    >
                      <Heart className="h-4 w-4" />
                      Favorites
                    </NavLink>
                    <NavLink
                      to="/settings"
                      className={({ isActive }) => cn(
                        "flex items-center gap-2 px-2 py-1 rounded-md text-sm transition-colors hover:bg-accent",
                        isActive ? "bg-accent text-accent-foreground" : "text-muted-foreground"
                      )}
                    >
                      <Settings className="h-4 w-4" />
                      Settings
                    </NavLink>
                    <div 
                      className="flex items-center gap-2 px-2 py-1 rounded-md text-sm transition-colors hover:bg-accent text-muted-foreground cursor-pointer"
                      onClick={handleLogout}
                    >
                      <LogOut className="h-4 w-4" />
                      Logout
                    </div>
                  </>
                ) : (
                  <NavLink
                    to="/login"
                    className={({ isActive }) => cn(
                      "flex items-center gap-2 px-2 py-1 rounded-md text-sm transition-colors hover:bg-accent",
                      isActive ? "bg-accent text-accent-foreground" : "text-muted-foreground"
                    )}
                  >
                    <LogIn className="h-4 w-4" />
                    Login / Register
                  </NavLink>
                )}
              </div>
            </div>
          </SheetContent>
        </Sheet>
        
        {/* Logo */}
        <Link to="/" className="flex items-center space-x-2 mr-6">
          <span className="hidden font-bold sm:inline-block">UberEscorts</span>
        </Link>
        
        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center space-x-4 lg:space-x-6 mx-6">
          {navLinks.map((link) => (
            <NavLink
              key={link.path}
              to={link.path}
              className={({ isActive }) => cn(
                "text-sm transition-colors hover:text-primary",
                isActive ? "text-foreground font-medium" : "text-muted-foreground"
              )}
            >
              {link.name}
            </NavLink>
          ))}
        </nav>
        
        {/* Search */}
        <div className="flex-1 flex justify-center">
          <form 
            onSubmit={handleSearch}
            className={cn(
              "relative w-full max-w-md",
              isSearchOpen ? "block" : "hidden md:block"
            )}
          >
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              type="search"
              placeholder="Search escorts, creators..."
              className="w-full pl-8 md:w-[300px] lg:w-[400px]"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </form>
        </div>
        
        {/* Mobile Search Button */}
        <Button
          variant="ghost"
          size="icon"
          className="md:hidden"
          onClick={() => setIsSearchOpen(!isSearchOpen)}
        >
          <Search className="h-5 w-5" />
          <span className="sr-only">Search</span>
        </Button>
        
        {/* User Menu */}
        <div className="flex items-center space-x-1 ml-auto">
          {user.isLoggedIn ? (
            <>
              {/* Wallet Button */}
              <NavLink 
                to="/wallet"
                className={({ isActive }) => cn(
                  "hidden md:flex items-center text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring disabled:opacity-50 border border-input hover:bg-accent hover:text-accent-foreground rounded-md px-3 py-2 relative",
                  isActive ? "bg-accent text-accent-foreground" : "bg-transparent"
                )}
              >
                <Wallet className="h-4 w-4 mr-1" />
                <span>${balance}</span>
              </NavLink>
              
              {/* Favorites Button */}
              <NavLink
                to="/favorites"
                className={({ isActive }) => cn(
                  "hidden md:flex h-9 w-9 items-center justify-center rounded-md hover:bg-accent hover:text-accent-foreground",
                  isActive ? "bg-accent text-accent-foreground" : "bg-transparent"
                )}
              >
                <Heart className="h-5 w-5" />
              </NavLink>
              
              {/* Notifications Button */}
              <NavLink
                to="/notifications"
                className="hidden md:flex relative h-9 w-9 items-center justify-center rounded-md hover:bg-accent hover:text-accent-foreground"
              >
                <Bell className="h-5 w-5" />
                {user.notificationCount > 0 && (
                  <Badge 
                    variant="destructive" 
                    className="absolute -top-1 -right-1 h-5 w-5 flex items-center justify-center p-0"
                  >
                    {user.notificationCount}
                  </Badge>
                )}
              </NavLink>
              
              {/* User Dropdown */}
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button 
                    variant="ghost" 
                    className="relative h-9 w-9 rounded-full"
                  >
                    <Avatar className="h-9 w-9">
                      <AvatarImage src={user.avatarUrl} alt={user.name} />
                      <AvatarFallback>{user.name[0]}</AvatarFallback>
                    </Avatar>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="w-56" align="end" forceMount>
                  <DropdownMenuLabel className="font-normal">
                    <div className="flex flex-col space-y-1">
                      <p className="text-sm font-medium leading-none">{user.name}</p>
                      <p className="text-xs leading-none text-muted-foreground">{user.email}</p>
                    </div>
                  </DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuGroup>
                    <DropdownMenuItem asChild>
                      <Link to="/profile">
                        <User className="mr-2 h-4 w-4" />
                        <span>Profile</span>
                      </Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem asChild>
                      <Link to="/wallet">
                        <Wallet className="mr-2 h-4 w-4" />
                        <span>Wallet</span>
                      </Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem asChild>
                      <Link to="/favorites">
                        <Heart className="mr-2 h-4 w-4" />
                        <span>Favorites</span>
                      </Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem asChild>
                      <Link to="/settings">
                        <Settings className="mr-2 h-4 w-4" />
                        <span>Settings</span>
                      </Link>
                    </DropdownMenuItem>
                  </DropdownMenuGroup>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem onClick={handleLogout}>
                    <LogOut className="mr-2 h-4 w-4" />
                    <span>Log out</span>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </>
          ) : (
            <div className="flex items-center space-x-2">
              <Button asChild variant="ghost" className="hidden md:flex">
                <Link to="/login">Log in</Link>
              </Button>
              <Button asChild>
                <Link to="/login">Create account</Link>
              </Button>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};

export default Navigation;
