
import React from "react";
import { NavLink } from "react-router-dom";
import { useAuth } from "@/hooks/auth";
import { useLanguage } from "@/contexts/LanguageContext";
import { useTranslation } from "react-i18next";

const DesktopNavigation: React.FC = () => {
  const { isAuthenticated, userRoles = [] } = useAuth();
  const { currentLanguage } = useLanguage();
  const { t } = useTranslation();
  
  const isAdmin = userRoles?.some(role => ['admin', 'moderator'].includes(role));
  
  const navItems = [
    { name: t('nav.escorts'), path: `/escorts`, auth: false },
    { name: t('nav.creators'), path: `/creators`, auth: false },
    { name: t('nav.metaverse'), path: `/metaverse`, auth: true },
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
                to={`/${currentLanguage}${item.path}`}
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
