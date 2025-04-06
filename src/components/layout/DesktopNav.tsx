
import React from "react";
import { NavLink } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Search, Heart, MessageSquare } from "lucide-react";
import UserDropdown from "@/components/navigation/UserDropdown";
import NotificationBadge from "@/components/notifications/NotificationBadge";
import { useAuth } from "@/hooks/auth/useAuth";
import { useFavorites } from "@/contexts/FavoritesContext";
import { useNotifications } from "@/hooks/useNotifications";
import ServiceTypeMenu from "@/components/navigation/ServiceTypeMenu";

const DesktopNav: React.FC = () => {
  const { user, logout } = useAuth();
  const { count: favoriteCount } = useFavorites();
  const { 
    notifications, 
    unreadCount, 
    markAsRead, 
    markAllAsRead 
  } = useNotifications();
  
  // Convert logout to async to match the expected Promise<void> type
  const handleLogout = async () => {
    await logout();
  };

  const handleNotificationClick = (id: string) => {
    markAsRead(id);
    // Additional logic can be added here like navigation based on notification type
  };
  
  return (
    <div className="hidden md:flex items-center gap-2">
      <ServiceTypeMenu />
      
      <div className="ml-4 flex items-center gap-2">
        <Button variant="ghost" size="icon" className="relative" asChild>
          <NavLink to="/search">
            <Search className="h-[1.2rem] w-[1.2rem]" />
          </NavLink>
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
        
        {user && (
          <NotificationBadge 
            count={unreadCount}
            notifications={notifications}
            onMarkAllRead={markAllAsRead}
            onNotificationClick={handleNotificationClick}
          />
        )}
        
        {user && <UserDropdown user={user} handleLogout={handleLogout} />}
      </div>
    </div>
  );
};

export default DesktopNav;
