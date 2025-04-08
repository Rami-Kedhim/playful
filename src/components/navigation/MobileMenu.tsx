
import React from "react";
import { NavLink } from "react-router-dom";
import { useAuth } from "@/hooks/auth/useAuthContext";
import { useTranslation } from "react-i18next";
import { Sheet, SheetContent, SheetHeader, SheetTitle } from "@/components/ui/sheet";
import { AppRoutes } from "@/utils/navigation";

interface MobileMenuProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const MobileMenu: React.FC<MobileMenuProps> = ({ open, onOpenChange }) => {
  const { isAuthenticated, checkRole } = useAuth();
  const { t } = useTranslation();
  
  const isAdmin = checkRole('admin') || checkRole('moderator');
  
  const navItems = [
    { name: t('nav.home'), path: '/', auth: false },
    { name: t('nav.escorts'), path: '/escorts', auth: false },
    { name: t('nav.creators'), path: '/creators', auth: false },
    { name: t('nav.metaverse'), path: '/metaverse', auth: true },
    { name: t('nav.brainHub'), path: AppRoutes.BRAIN_HUB, auth: true }, // Added Brain Hub link
  ];
  
  // Add admin routes if user has admin access
  if (isAdmin) {
    navItems.push({ name: 'SEO', path: '/seo', auth: true });
  }
  
  // Add account-related routes if authenticated
  if (isAuthenticated) {
    navItems.push(
      { name: t('nav.profile'), path: '/profile', auth: true },
      { name: t('nav.favorites'), path: '/favorites', auth: true },
      { name: t('nav.messages'), path: '/messages', auth: true }
    );
  }
  
  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent side="right" className="w-[80%] sm:w-[350px] pt-10">
        <SheetHeader className="mb-6">
          <SheetTitle className="text-xl">{t('nav.menu')}</SheetTitle>
        </SheetHeader>
        <nav className="space-y-6">
          <div className="space-y-2">
            {navItems.map((item) => {
              // Skip auth-required items if not authenticated
              if (item.auth && !isAuthenticated) return null;
              
              return (
                <NavLink
                  key={item.path}
                  to={item.path}
                  onClick={() => onOpenChange(false)}
                  className={({ isActive }) =>
                    `block py-2 px-4 text-base rounded-md transition-colors ${
                      isActive
                        ? "bg-primary/10 text-primary font-medium"
                        : "hover:bg-muted"
                    }`
                  }
                >
                  {item.name}
                </NavLink>
              );
            })}
          </div>
          
          {!isAuthenticated && (
            <div className="pt-4 border-t border-border">
              <NavLink
                to="/auth"
                onClick={() => onOpenChange(false)}
                className="block w-full py-2.5 px-4 bg-primary text-primary-foreground text-center rounded-md font-medium"
              >
                {t('auth.login')}
              </NavLink>
            </div>
          )}
        </nav>
      </SheetContent>
    </Sheet>
  );
};

export default MobileMenu;
