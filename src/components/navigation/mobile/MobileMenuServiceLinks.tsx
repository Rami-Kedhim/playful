
import React from "react";
import { NavLink } from "react-router-dom";
import { AppRoutes } from "@/utils/navigation";

interface MobileMenuServiceLinksProps {
  onItemClick: () => void;
  t: (key: string) => string;
}

const MobileMenuServiceLinks: React.FC<MobileMenuServiceLinksProps> = ({ onItemClick, t }) => {
  return (
    <div className="mt-4">
      <p className="px-2 text-xs font-medium text-muted-foreground uppercase tracking-wider mb-2">
        {t('services')}
      </p>
      <div className="space-y-1">
        <NavLink
          to={AppRoutes.LIVECAMS}
          className={({ isActive }) =>
            `flex items-center px-2 py-3 rounded-md text-sm ${
              isActive
                ? "bg-primary/10 text-primary font-medium"
                : "text-muted-foreground hover:text-foreground hover:bg-accent/50"
            }`
          }
          onClick={onItemClick}
        >
          {t('services.livecams')}
        </NavLink>
        
        <NavLink
          to={AppRoutes.AI_COMPANION}
          className={({ isActive }) =>
            `flex items-center px-2 py-3 rounded-md text-sm ${
              isActive
                ? "bg-primary/10 text-primary font-medium"
                : "text-muted-foreground hover:text-foreground hover:bg-accent/50"
            }`
          }
          onClick={onItemClick}
        >
          {t('services.aiCompanions')}
        </NavLink>
        
        <NavLink
          to={AppRoutes.BRAIN_HUB}
          className={({ isActive }) =>
            `flex items-center px-2 py-3 rounded-md text-sm ${
              isActive
                ? "bg-primary/10 text-primary font-medium"
                : "text-muted-foreground hover:text-foreground hover:bg-accent/50"
            }`
          }
          onClick={onItemClick}
        >
          {t('services.brainHub')}
        </NavLink>
      </div>
    </div>
  );
};

export default MobileMenuServiceLinks;
