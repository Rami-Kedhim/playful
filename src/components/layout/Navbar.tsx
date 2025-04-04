
import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "@/hooks/useAuth";
import { Button } from "@/components/ui/button";
import { Search, Heart } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import DesktopNavigation from "@/components/navigation/DesktopNavigation";
import UserDropdown from "@/components/navigation/UserDropdown";
import MobileMenu from "@/components/navigation/MobileMenu";

const Navbar = () => {
  const { user, logout } = useAuth();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  
  const handleLogout = () => {
    logout();
    setIsMobileMenuOpen(false);
  };
  
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
            
            <DesktopNavigation />
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
                
                <UserDropdown 
                  user={user} 
                  handleLogout={handleLogout} 
                />
              </>
            ) : (
              <Button asChild>
                <Link to="/auth">Sign In</Link>
              </Button>
            )}
            
            <MobileMenu
              user={user}
              isOpen={isMobileMenuOpen}
              setIsOpen={setIsMobileMenuOpen}
              handleLogout={handleLogout}
            />
          </div>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
