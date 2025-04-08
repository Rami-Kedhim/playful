
import React from "react";
import { NavLink } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { AppRoutes } from "@/utils/navigation";

const ServiceTypeMenu: React.FC = () => {
  const { t } = useTranslation();
  
  const serviceNavItems = [
    { name: t('services.livecams'), path: AppRoutes.LIVECAMS },
    { name: t('services.aiCompanions'), path: AppRoutes.AI_COMPANION },
    { name: t('services.brainHub'), path: AppRoutes.BRAIN_HUB },
  ];
  
  return (
    <nav className="hidden md:flex items-center">
      <div className="pl-4 ml-4 border-l-2 border-muted">
        <ul className="flex space-x-6">
          {serviceNavItems.map((item) => (
            <li key={item.path}>
              <NavLink
                to={item.path}
                className={({ isActive }) =>
                  `text-sm font-medium transition-colors ${
                    isActive
                      ? "text-primary"
                      : "text-muted-foreground hover:text-foreground"
                  }`
                }
              >
                {item.name}
              </NavLink>
            </li>
          ))}
        </ul>
      </div>
    </nav>
  );
};

export default ServiceTypeMenu;
