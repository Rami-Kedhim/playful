
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { 
  Menu, 
  Search, 
  User, 
  Heart, 
  MessageSquare, 
  Wallet,
  Settings,
  Video,
  Play,
  ImageIcon
} from 'lucide-react';
import { 
  Sheet, 
  SheetContent, 
  SheetTrigger 
} from '@/components/ui/sheet';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';
import { Input } from '@/components/ui/input';
import { useAuth } from '@/hooks/auth';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

const Navigation = () => {
  const { isAuthenticated, user, logout } = useAuth();
  const [searchQuery, setSearchQuery] = useState('');
  
  return (
    <header className="border-b">
      <div className="container mx-auto px-4 py-3">
        <div className="flex items-center justify-between">
          {/* Mobile Menu */}
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon" className="md:hidden">
                <Menu />
              </Button>
            </SheetTrigger>
            <SheetContent side="left" className="w-72">
              <nav className="flex flex-col gap-4 mt-8">
                <Link to="/" className="px-4 py-2 rounded-md hover:bg-accent">Home</Link>
                <Link to="/escorts" className="px-4 py-2 rounded-md hover:bg-accent">Escorts</Link>
                <Link to="/creators" className="px-4 py-2 rounded-md hover:bg-accent">Creators</Link>
                <Link to="/livecams" className="px-4 py-2 rounded-md hover:bg-accent">Live Cams</Link>
                <Link to="/media-generation" className="px-4 py-2 rounded-md hover:bg-accent">AI Media Generator</Link>
                {isAuthenticated && (
                  <>
                    <Link to="/profile" className="px-4 py-2 rounded-md hover:bg-accent">My Profile</Link>
                    <Link to="/messages" className="px-4 py-2 rounded-md hover:bg-accent">Messages</Link>
                    <Link to="/favorites" className="px-4 py-2 rounded-md hover:bg-accent">Favorites</Link>
                    <Link to="/wallet" className="px-4 py-2 rounded-md hover:bg-accent">Wallet</Link>
                    <Link to="/settings" className="px-4 py-2 rounded-md hover:bg-accent">Settings</Link>
                    <Button 
                      variant="destructive" 
                      onClick={logout} 
                      className="mt-4"
                    >
                      Logout
                    </Button>
                  </>
                )}
              </nav>
            </SheetContent>
          </Sheet>

          {/* Logo */}
          <Link to="/" className="text-2xl font-bold">
            UberEscorts
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-6">
            <Link to="/escorts" className="text-sm font-medium hover:text-primary">Escorts</Link>
            <Link to="/creators" className="text-sm font-medium hover:text-primary">Creators</Link>
            <Link to="/livecams" className="text-sm font-medium hover:text-primary">Live Cams</Link>
            
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="h-8 w-8 p-0">
                  <span className="sr-only">AI Tools</span>
                  <ImageIcon className="h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem>
                  <Link to="/media-generation" className="flex items-center">
                    <ImageIcon className="h-4 w-4 mr-2" />
                    AI Media Generator
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <Link to="/nsfw-generator" className="flex items-center">
                    <ImageIcon className="h-4 w-4 mr-2" />
                    NSFW Generator
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem>
                  <Link to="/lucie" className="flex items-center">
                    <ImageIcon className="h-4 w-4 mr-2" />
                    Lucie AI
                  </Link>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </nav>

          {/* Search Bar */}
          <div className="hidden md:block max-w-md w-full mx-4">
            <div className="relative">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                type="search"
                placeholder="Search..."
                className="w-full pl-8"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
          </div>

          {/* User Actions */}
          <div className="flex items-center gap-2">
            {isAuthenticated ? (
              <>
                <Button variant="ghost" size="icon" asChild className="hidden md:flex">
                  <Link to="/messages">
                    <MessageSquare className="h-5 w-5" />
                  </Link>
                </Button>
                
                <Button variant="ghost" size="icon" asChild className="hidden md:flex">
                  <Link to="/favorites">
                    <Heart className="h-5 w-5" />
                  </Link>
                </Button>
                
                <Button variant="ghost" size="icon" asChild className="hidden md:flex">
                  <Link to="/wallet">
                    <Wallet className="h-5 w-5" />
                  </Link>
                </Button>
                
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" className="h-8 w-8 p-0">
                      <span className="sr-only">Open user menu</span>
                      <Avatar className="h-8 w-8">
                        <AvatarImage src={user?.avatar || ''} alt="User avatar" />
                        <AvatarFallback>
                          <User className="h-4 w-4" />
                        </AvatarFallback>
                      </Avatar>
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuItem>
                      <Link to="/profile" className="flex items-center">
                        <User className="h-4 w-4 mr-2" />
                        Profile
                      </Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem>
                      <Link to="/settings" className="flex items-center">
                        <Settings className="h-4 w-4 mr-2" />
                        Settings
                      </Link>
                    </DropdownMenuItem>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem onClick={logout}>
                      Logout
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </>
            ) : (
              <Button asChild>
                <Link to="/auth">Sign In</Link>
              </Button>
            )}
          </div>
        </div>
      </div>
      
      {/* Mobile Search */}
      <div className="md:hidden px-4 pb-3">
        <div className="relative">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            type="search"
            placeholder="Search..."
            className="w-full pl-8"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
      </div>
    </header>
  );
};

export default Navigation;
