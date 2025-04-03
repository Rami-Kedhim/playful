
import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { useAuth } from "@/hooks/useAuth";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { 
  Menu, 
  User, 
  LogOut, 
  CreditCard, 
  Bell, 
  Settings, 
  Heart, 
  Globe,
  CalendarClock,
  Video,
  MessageCircle,
  Search,
  Star
} from "lucide-react";

const Navbar = () => {
  const { user, logout } = useAuth();
  const location = useLocation();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  
  const isActive = (path: string) => {
    return location.pathname === path;
  };
  
  const handleLogout = () => {
    logout();
    setIsMobileMenuOpen(false);
  };
  
  const mainLinks = [
    { label: "Home", path: "/" },
    { label: "Escorts", path: "/escorts", icon: CalendarClock },
    { label: "Creators", path: "/creators", icon: Star },
    { label: "Live Cams", path: "/livecams", icon: Video },
    { label: "Messages", path: "/messages", icon: MessageCircle },
  ];
  
  return (
    <header className="fixed top-0 left-0 right-0 bg-background/95 backdrop-blur-sm z-50 border-b border-gray-800">
      <div className="container mx-auto px-4">
        <div className="flex h-16 items-center justify-between">
          <div className="flex items-center">
            <Link to="/" className="text-2xl font-bold mr-8">
              <span className="bg-gradient-to-r from-primary to-lucoin bg-clip-text text-transparent">
                LuCent
              </span>
            </Link>
            
            <nav className="hidden md:flex space-x-1">
              {mainLinks.map((link) => (
                <Button
                  key={link.path}
                  variant={isActive(link.path) ? "default" : "ghost"}
                  size="sm"
                  asChild
                >
                  <Link to={link.path}>{link.label}</Link>
                </Button>
              ))}
            </nav>
          </div>
          
          <div className="flex items-center space-x-2">
            <Button variant="ghost" size="icon" asChild>
              <Link to="/search">
                <Search size={20} />
              </Link>
            </Button>
            
            {user ? (
              <>
                <Button variant="ghost" size="icon" asChild>
                  <Link to="/favorites">
                    <Heart size={20} />
                  </Link>
                </Button>
                
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" size="icon" className="rounded-full">
                      <Avatar className="h-8 w-8">
                        <AvatarImage src={user.profileImageUrl} />
                        <AvatarFallback className="bg-primary/10">
                          {user.username.substring(0, 2).toUpperCase()}
                        </AvatarFallback>
                      </Avatar>
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end" className="w-56">
                    <div className="flex items-center justify-start gap-2 p-2">
                      <div className="flex flex-col space-y-0.5">
                        <p className="font-medium text-sm">{user.username}</p>
                        <p className="text-xs text-muted-foreground">{user.email}</p>
                      </div>
                    </div>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem asChild>
                      <Link to="/profile" className="cursor-pointer">
                        <User className="mr-2 h-4 w-4" />
                        <span>Profile</span>
                      </Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem asChild>
                      <Link to="/subscriptions" className="cursor-pointer">
                        <Star className="mr-2 h-4 w-4" />
                        <span>Subscriptions</span>
                      </Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem asChild>
                      <Link to="/notifications" className="cursor-pointer">
                        <Bell className="mr-2 h-4 w-4" />
                        <span>Notifications</span>
                      </Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem asChild>
                      <Link to="/wallet" className="cursor-pointer">
                        <CreditCard className="mr-2 h-4 w-4" />
                        <span>Wallet ({user.lucoinsBalance} LC)</span>
                      </Link>
                    </DropdownMenuItem>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem asChild>
                      <Link to="/settings" className="cursor-pointer">
                        <Settings className="mr-2 h-4 w-4" />
                        <span>Settings</span>
                      </Link>
                    </DropdownMenuItem>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem onClick={handleLogout} className="cursor-pointer">
                      <LogOut className="mr-2 h-4 w-4" />
                      <span>Log out</span>
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </>
            ) : (
              <Button asChild>
                <Link to="/auth">Sign In</Link>
              </Button>
            )}
            
            <Sheet open={isMobileMenuOpen} onOpenChange={setIsMobileMenuOpen}>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon" className="md:hidden">
                  <Menu />
                </Button>
              </SheetTrigger>
              <SheetContent side="right" className="w-[85vw] sm:w-[350px]">
                <div className="flex flex-col h-full py-6">
                  {user && (
                    <div className="flex items-center space-x-3 mb-6">
                      <Avatar className="h-12 w-12">
                        <AvatarImage src={user.profileImageUrl} />
                        <AvatarFallback className="bg-primary/10">
                          {user.username.substring(0, 2).toUpperCase()}
                        </AvatarFallback>
                      </Avatar>
                      <div>
                        <div className="font-medium">{user.username}</div>
                        <div className="text-sm text-muted-foreground truncate max-w-[180px]">
                          {user.email}
                        </div>
                      </div>
                    </div>
                  )}
                  
                  <nav className="space-y-1">
                    {mainLinks.map((link) => (
                      <Button
                        key={link.path}
                        variant={isActive(link.path) ? "default" : "ghost"}
                        className="w-full justify-start"
                        asChild
                        onClick={() => setIsMobileMenuOpen(false)}
                      >
                        <Link to={link.path}>
                          {link.icon && <link.icon className="mr-2 h-4 w-4" />}
                          {link.label}
                        </Link>
                      </Button>
                    ))}
                  </nav>
                  
                  {user ? (
                    <>
                      <div className="border-t border-gray-800 my-4 pt-4">
                        <div className="text-sm font-medium mb-2">Account</div>
                        <div className="space-y-1">
                          <Button
                            variant="ghost"
                            className="w-full justify-start"
                            asChild
                            onClick={() => setIsMobileMenuOpen(false)}
                          >
                            <Link to="/profile">
                              <User className="mr-2 h-4 w-4" />
                              Profile
                            </Link>
                          </Button>
                          <Button
                            variant="ghost"
                            className="w-full justify-start"
                            asChild
                            onClick={() => setIsMobileMenuOpen(false)}
                          >
                            <Link to="/subscriptions">
                              <Star className="mr-2 h-4 w-4" />
                              Subscriptions
                            </Link>
                          </Button>
                          <Button
                            variant="ghost"
                            className="w-full justify-start"
                            asChild
                            onClick={() => setIsMobileMenuOpen(false)}
                          >
                            <Link to="/wallet">
                              <CreditCard className="mr-2 h-4 w-4" />
                              Wallet ({user.lucoinsBalance} LC)
                            </Link>
                          </Button>
                          <Button
                            variant="ghost"
                            className="w-full justify-start"
                            asChild
                            onClick={() => setIsMobileMenuOpen(false)}
                          >
                            <Link to="/settings">
                              <Settings className="mr-2 h-4 w-4" />
                              Settings
                            </Link>
                          </Button>
                        </div>
                      </div>
                      
                      <div className="border-t border-gray-800 mt-4 pt-4 mt-auto">
                        <Button
                          variant="ghost"
                          className="w-full justify-start"
                          onClick={handleLogout}
                        >
                          <LogOut className="mr-2 h-4 w-4" />
                          Log out
                        </Button>
                      </div>
                    </>
                  ) : (
                    <div className="border-t border-gray-800 mt-4 pt-4 mt-auto">
                      <Button
                        className="w-full"
                        asChild
                        onClick={() => setIsMobileMenuOpen(false)}
                      >
                        <Link to="/auth">Sign In</Link>
                      </Button>
                    </div>
                  )}
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
