
import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Search, Menu, X, Heart, MessageSquare, Bell, Home, Users, Video } from "lucide-react";
import UserDropdown from "@/components/navigation/UserDropdown";
import { useAuth } from "@/contexts/AuthContext";
import { useFavorites } from "@/contexts/FavoritesContext";

const MobileNav: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { user, logout } = useAuth();
  const { count: favoriteCount } = useFavorites();
  
  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };
  
  // Convert logout to async to match the expected Promise<void> type
  const handleLogout = async () => {
    await logout();
    setIsOpen(false);
  };
  
  const handleCloseMenu = () => {
    setIsOpen(false);
  };
  
  return (
    <>
      <div className="flex md:hidden items-center gap-1">
        <Button variant="ghost" size="icon" className="flex md:hidden">
          <Search className="h-5 w-5" />
        </Button>
        
        <NavLink to="/favorites">
          <Button variant="ghost" size="icon" className="relative">
            <Heart className="h-5 w-5" />
            {favoriteCount > 0 && (
              <span className="absolute -top-1 -right-1 bg-primary text-primary-foreground text-xs rounded-full px-1.5 py-0.5">
                {favoriteCount}
              </span>
            )}
          </Button>
        </NavLink>
        
        <Button onClick={toggleMenu} variant="ghost" size="icon" className="flex md:hidden">
          {isOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </Button>
      </div>
      
      {isOpen && (
        <div className="fixed inset-0 z-50 bg-background/95 backdrop-blur-sm md:hidden animate-fade-in">
          <div className="container px-4 py-8">
            <div className="flex justify-between items-center mb-8">
              <h2 className="text-2xl font-bold">Menu</h2>
              <Button onClick={toggleMenu} variant="ghost" size="icon">
                <X className="h-6 w-6" />
              </Button>
            </div>
            
            <div className="space-y-6">
              <NavLink to="/" onClick={toggleMenu}>
                <Button variant="ghost" className="w-full justify-start text-xl px-2" size="lg">
                  <Home className="mr-4 h-5 w-5" /> Home
                </Button>
              </NavLink>
              
              <NavLink to="/escorts" onClick={toggleMenu}>
                <Button variant="ghost" className="w-full justify-start text-xl px-2" size="lg">
                  <Users className="mr-4 h-5 w-5" /> Escorts
                </Button>
              </NavLink>
              
              <NavLink to="/creators" onClick={toggleMenu}>
                <Button variant="ghost" className="w-full justify-start text-xl px-2" size="lg">
                  <Users className="mr-4 h-5 w-5" /> Creators
                </Button>
              </NavLink>
              
              <NavLink to="/livecams" onClick={toggleMenu}>
                <Button variant="ghost" className="w-full justify-start text-xl px-2" size="lg">
                  <Video className="mr-4 h-5 w-5" /> Livecams
                </Button>
              </NavLink>
              
              <NavLink to="/favorites" onClick={toggleMenu}>
                <Button variant="ghost" className="w-full justify-start text-xl px-2" size="lg">
                  <Heart className="mr-4 h-5 w-5" /> Favorites
                  {favoriteCount > 0 && (
                    <span className="ml-2 bg-primary text-primary-foreground text-xs rounded-full px-2 py-0.5">
                      {favoriteCount}
                    </span>
                  )}
                </Button>
              </NavLink>
              
              <NavLink to="/messages" onClick={toggleMenu}>
                <Button variant="ghost" className="w-full justify-start text-xl px-2" size="lg">
                  <MessageSquare className="mr-4 h-5 w-5" /> Messages
                </Button>
              </NavLink>
              
              <div className="pt-6 border-t border-border">
                {user && (
                  <UserDropdown 
                    user={user} 
                    handleLogout={handleLogout} 
                    isMobile={true} 
                    onClose={handleCloseMenu} 
                  />
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default MobileNav;
