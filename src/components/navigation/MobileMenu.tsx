
import React from "react";
import { Link } from "react-router-dom";
import { ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { Separator } from "@/components/ui/separator";
import { useTranslation } from "react-i18next";
import { useLanguage } from "@/contexts/LanguageContext";

interface MobileMenuProps {
  user: any;
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
  handleLogout: () => void;
  hasAdminAccess: boolean;
}

const MobileMenu: React.FC<MobileMenuProps> = ({
  user,
  isOpen,
  setIsOpen,
  handleLogout,
  hasAdminAccess,
}) => {
  const { t } = useTranslation();
  const { currentLanguage } = useLanguage();
  const isAuthenticated = !!user;

  const closeMenu = () => setIsOpen(false);

  const navItems = [
    { name: t('nav.home'), path: `/${currentLanguage}`, auth: false },
    { name: t('nav.escorts'), path: `/${currentLanguage}/escorts`, auth: false },
    { name: t('nav.creators'), path: `/${currentLanguage}/creators`, auth: false },
    { name: t('nav.search'), path: `/${currentLanguage}/search`, auth: false },
    { name: t('nav.metaverse'), path: `/${currentLanguage}/metaverse`, auth: true },
    { name: t('nav.favorites'), path: `/${currentLanguage}/favorites`, auth: true },
    { name: t('nav.messages'), path: `/${currentLanguage}/messages`, auth: true },
    { name: t('nav.profile'), path: `/${currentLanguage}/profile`, auth: true },
  ];

  // Add admin routes if user has admin access
  if (hasAdminAccess) {
    navItems.push({ name: 'SEO', path: `/${currentLanguage}/seo`, auth: true });
  }

  return (
    <div className="md:hidden">
      <Sheet open={isOpen} onOpenChange={setIsOpen}>
        <SheetTrigger asChild>
          <Button variant="ghost" size="icon">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="lucide lucide-menu"
            >
              <line x1="4" x2="20" y1="12" y2="12"></line>
              <line x1="4" x2="20" y1="6" y2="6"></line>
              <line x1="4" x2="20" y1="18" y2="18"></line>
            </svg>
            <span className="sr-only">Toggle menu</span>
          </Button>
        </SheetTrigger>
        <SheetContent side="right" className="w-[300px]">
          <SheetHeader>
            <SheetTitle className="text-left">Menu</SheetTitle>
          </SheetHeader>
          <Separator className="my-4" />
          <nav>
            <ul className="space-y-3 mt-6">
              {navItems.map((item) => {
                // Skip auth-required items if not authenticated
                if (item.auth && !isAuthenticated) return null;
                
                return (
                  <li key={item.path}>
                    <Button
                      variant="ghost"
                      size="sm"
                      className="w-full justify-start"
                      asChild
                      onClick={closeMenu}
                    >
                      <Link to={item.path} className="flex items-center">
                        <span className="flex-grow text-left">{item.name}</span>
                        <ChevronRight size={16} />
                      </Link>
                    </Button>
                  </li>
                );
              })}
            </ul>
          </nav>
          <Separator className="my-6" />
          {isAuthenticated ? (
            <div className="flex flex-col gap-2">
              <div className="text-sm text-muted-foreground">
                {t('common.welcomeBack')}, {user?.username || 'User'}
              </div>
              <Button variant="ghost" size="sm" onClick={() => { handleLogout(); closeMenu(); }}>
                {t('profile.logout')}
              </Button>
            </div>
          ) : (
            <Button className="w-full" asChild onClick={closeMenu}>
              <Link to={`/${currentLanguage}/auth`}>{t('nav.signIn')}</Link>
            </Button>
          )}
        </SheetContent>
      </Sheet>
    </div>
  );
};

export default MobileMenu;
