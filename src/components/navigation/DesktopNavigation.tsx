
import React from "react";
import { NavLink } from "react-router-dom";
import { useAuth } from "@/hooks/auth/useAuthContext";
import { useTranslation } from "react-i18next";
import { AppRoutes } from "@/utils/navigation";

const DesktopNavigation: React.FC = () => {
  const { isAuthenticated, checkRole } = useAuth();
  const { t } = useTranslation();
  
  const isAdmin = checkRole('admin') || checkRole('moderator');
  
  const navItems = [
    { name: t('nav.escorts'), path: `/escorts`, auth: false },
    { name: t('nav.creators'), path: `/creators`, auth: false },
    { name: t('nav.metaverse'), path: `/metaverse`, auth: true },
    { name: t('nav.brainHub'), path: AppRoutes.BRAIN_HUB, auth: true }, // Added Brain Hub link
  ];
  
  // Add admin routes if user has admin access
  if (isAdmin) {
    navItems.push({ name: 'SEO', path: `/seo`, auth: true });
  }
  
  return (
    <nav className="hidden md:block">
      <ul className="flex space-x-8">
        {navItems.map((item) => {
          // Skip auth-required items if not authenticated
          if (item.auth && !isAuthenticated) return null;
          
          return (
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
          );
        })}
      </ul>
    </nav>
  );
};

export default DesktopNavigation;
