
import React from "react";
import { NavLink } from "react-router-dom";
import { LogOut } from "lucide-react";

interface UserNavItem {
  name: string;
  path: string;
  icon: React.ReactNode;
}

interface MobileMenuUserSectionProps {
  isAuthenticated: boolean;
  userNavItems: UserNavItem[];
  onItemClick: () => void;
  onLogout: () => void;
  t: (key: string) => string;
}

const MobileMenuUserSection: React.FC<MobileMenuUserSectionProps> = ({ 
  isAuthenticated, 
  userNavItems, 
  onItemClick, 
  onLogout,
  t
}) => {
  if (!isAuthenticated) return null;
  
  return (
    <div className="mt-6">
      <p className="px-2 text-xs font-medium text-muted-foreground uppercase tracking-wider mb-2">
        {t('nav.user')}
      </p>
      <div className="space-y-1">
        {userNavItems.map((item) => (
          <NavLink
            key={item.path}
            to={item.path}
            className={({ isActive }) =>
              `flex items-center px-2 py-3 rounded-md text-sm ${
                isActive
                  ? "bg-primary/10 text-primary font-medium"
                  : "text-muted-foreground hover:text-foreground hover:bg-accent/50"
              }`
            }
            onClick={onItemClick}
          >
            {item.icon}
            {item.name}
          </NavLink>
        ))}
        
        <button
          className="flex items-center w-full px-2 py-3 rounded-md text-sm text-muted-foreground hover:text-foreground hover:bg-accent/50"
          onClick={onLogout}
        >
          <LogOut className="h-4 w-4 mr-2" />
          {t('auth.logout')}
        </button>
      </div>
    </div>
  );
};

export default MobileMenuUserSection;
