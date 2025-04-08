
import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { useAuth } from "@/hooks/auth/useAuthContext";
import { Sheet, SheetContent, SheetHeader, SheetTitle } from "@/components/ui/sheet";
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";
import { AppRoutes } from "@/utils/navigation";
import { X, LogOut, User, Heart, MessageSquare, Settings } from "lucide-react";
import ServiceTypeMenu from "./ServiceTypeMenu";

interface MobileMenuProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const MobileMenu: React.FC<MobileMenuProps> = ({ open, onOpenChange }) => {
  const { t } = useTranslation();
  const { isAuthenticated, logout, checkRole } = useAuth();
  const isAdmin = checkRole('admin') || checkRole('moderator');

  const handleLogout = async () => {
    await logout();
    onOpenChange(false);
  };

  const closeMenu = () => {
    onOpenChange(false);
  };

  const navItems = [
    { name: t('nav.home'), path: '/', auth: false },
    { name: t('nav.escorts'), path: '/escorts', auth: false },
    { name: t('nav.creators'), path: '/creators', auth: false },
    { name: t('nav.metaverse'), path: '/metaverse', auth: true },
  ];

  // Admin-only routes
  if (isAdmin) {
    navItems.push({ name: t('nav.brainHub'), path: AppRoutes.BRAIN_HUB, auth: true });
    navItems.push({ name: 'SEO', path: '/seo', auth: true });
  }

  const userNavItems = [
    { name: t('nav.profile'), path: '/profile', icon: <User className="h-4 w-4 mr-2" /> },
    { name: t('nav.favorites'), path: '/favorites', icon: <Heart className="h-4 w-4 mr-2" /> },
    { name: t('nav.messages'), path: '/messages', icon: <MessageSquare className="h-4 w-4 mr-2" /> },
  ];

  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent side="left" className="flex flex-col w-[70vw] sm:w-[350px] px-2">
        <SheetHeader className="text-left px-4 py-2">
          <div className="flex justify-between items-center">
            <SheetTitle>{t('nav.menu')}</SheetTitle>
            <Button variant="ghost" size="icon" onClick={closeMenu} className="rounded-full">
              <X className="h-5 w-5" />
            </Button>
          </div>
        </SheetHeader>
        
        <Separator className="my-2" />
        
        <div className="flex-1 overflow-auto py-2 px-4">
          {/* Main navigation */}
          <nav className="space-y-1">
            {navItems.map((item) => {
              // Skip auth-required items if not authenticated
              if (item.auth && !isAuthenticated) return null;
              
              return (
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
                  onClick={closeMenu}
                >
                  {item.name}
                </NavLink>
              );
            })}
          </nav>

          {/* Service type menu */}
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
                onClick={closeMenu}
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
                onClick={closeMenu}
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
                onClick={closeMenu}
              >
                {t('services.brainHub')}
              </NavLink>
            </div>
          </div>

          {/* User section - only show when authenticated */}
          {isAuthenticated && (
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
                    onClick={closeMenu}
                  >
                    {item.icon}
                    {item.name}
                  </NavLink>
                ))}
                
                {/* Logout button */}
                <button
                  className="flex items-center w-full px-2 py-3 rounded-md text-sm text-muted-foreground hover:text-foreground hover:bg-accent/50"
                  onClick={handleLogout}
                >
                  <LogOut className="h-4 w-4 mr-2" />
                  {t('auth.logout')}
                </button>
              </div>
            </div>
          )}
          
          {/* Login/Register buttons - only show when not authenticated */}
          {!isAuthenticated && (
            <div className="mt-6 space-y-2">
              <Button
                variant="default"
                className="w-full"
                onClick={() => {
                  closeMenu();
                  // Navigate to login page
                  window.location.href = '/auth';
                }}
              >
                {t('auth.login')}
              </Button>
              <Button
                variant="outline"
                className="w-full"
                onClick={() => {
                  closeMenu();
                  // Navigate to register page
                  window.location.href = '/auth?tab=register';
                }}
              >
                {t('auth.register')}
              </Button>
            </div>
          )}
        </div>
      </SheetContent>
    </Sheet>
  );
};

export default MobileMenu;
