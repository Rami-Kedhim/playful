
import React from "react";
import { NavLink } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Search, Heart, MessageSquare, Bell } from "lucide-react";
import UserDropdown from "@/components/navigation/UserDropdown";
import { useAuth } from "@/contexts/AuthContext";
import { useFavorites } from "@/contexts/FavoritesContext";

const DesktopNav: React.FC = () => {
  const { user, logout } = useAuth();
  const { count: favoriteCount } = useFavorites();
  
  const handleLogout = () => {
    logout();
  };
  
  return (
    <div className="hidden md:flex items-center gap-1">
      <NavLink to="/escorts">
        <Button variant="ghost">Escorts</Button>
      </NavLink>
      
      <NavLink to="/creators">
        <Button variant="ghost">Creators</Button>
      </NavLink>
      
      <NavLink to="/livecams">
        <Button variant="ghost">Livecams</Button>
      </NavLink>
      
      <div className="ml-4 flex items-center gap-1">
        <Button variant="ghost" size="icon" className="relative">
          <Search className="h-[1.2rem] w-[1.2rem]" />
        </Button>
        
        <NavLink to="/favorites">
          <Button variant="ghost" size="icon" className="relative">
            <Heart className="h-[1.2rem] w-[1.2rem]" />
            {favoriteCount > 0 && (
              <span className="absolute -top-1 -right-1 bg-primary text-primary-foreground text-xs rounded-full px-1.5 py-0.5">
                {favoriteCount}
              </span>
            )}
          </Button>
        </NavLink>
        
        <NavLink to="/messages">
          <Button variant="ghost" size="icon">
            <MessageSquare className="h-[1.2rem] w-[1.2rem]" />
          </Button>
        </NavLink>
        
        <Button variant="ghost" size="icon">
          <Bell className="h-[1.2rem] w-[1.2rem]" />
        </Button>
        
        {user && <UserDropdown user={user} handleLogout={handleLogout} />}
      </div>
    </div>
  );
};

export default DesktopNav;
