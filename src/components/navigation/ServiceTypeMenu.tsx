
import React from "react";
import { NavLink } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { AppRoutes } from "@/utils/navigation";
import { useAuth } from "@/hooks/auth/useAuthContext";

const ServiceTypeMenu: React.FC = () => {
  const { t } = useTranslation();
  const { isAuthenticated, checkRole } = useAuth();
  
  const isAdmin = checkRole('admin') || checkRole('moderator');
  
  // Only show Brain Hub in the service menu if user has admin access
  const serviceNavItems = [
    { name: t('services.livecams'), path: AppRoutes.LIVECAMS, auth: false },
    { name: t('services.aiCompanions'), path: AppRoutes.AI_COMPANION, auth: false },
    { name: t('services.brainHub'), path: AppRoutes.BRAIN_HUB, auth: true, adminOnly: true },
  ];
  
  // Filter items based on auth status and admin role
  const filteredItems = serviceNavItems.filter(item => {
    // Skip auth-required items if not authenticated
    if (item.auth && !isAuthenticated) return false;
    
    // Skip admin-only items if not admin
    if (item.adminOnly && !isAdmin) return false;
    
    return true;
  });
  
  // Don't render the menu if there are no items to show
  if (filteredItems.length === 0) return null;
  
  return (
    <nav className="hidden md:flex items-center">
      <div className="pl-4 ml-4 border-l-2 border-muted">
        <ul className="flex space-x-6">
          {filteredItems.map((item) => (
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
