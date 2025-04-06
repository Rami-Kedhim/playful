
import React from "react";
import { Link } from "react-router-dom";
import { useAuth } from "@/hooks/auth/useAuth";
import { Button } from "@/components/ui/button";
import { Search, Heart } from "lucide-react";
import DesktopNavigation from "@/components/navigation/DesktopNavigation";
import UserDropdown from "@/components/navigation/UserDropdown";
import MobileMenu from "@/components/navigation/MobileMenu";
import { ThemeToggle } from "@/components/ui/theme-toggle";
import LanguageSwitcher from "@/components/language/LanguageSwitcher";
import { useTranslation } from "react-i18next";
import { useLanguage } from "@/contexts/LanguageContext";

const Navbar = () => {
  const { user, logout, isAuthenticated, userRoles = [] } = useAuth();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = React.useState(false);
  const { t } = useTranslation();
  const { currentLanguage } = useLanguage();
  
  const handleLogout = async () => {
    await logout();
    setIsMobileMenuOpen(false);
  };
  
  const hasAdminAccess = userRoles.some(role => ['admin', 'moderator'].includes(role));
  
  return (
    <header className="fixed top-0 left-0 right-0 bg-background/95 backdrop-blur-sm z-50 border-b border-gray-800">
      <div className="container mx-auto px-4">
        <div className="flex h-16 items-center justify-between">
          <div className="flex items-center">
            <Link to={`/${currentLanguage}`} className="text-2xl font-bold mr-8">
              <span className="bg-gradient-to-r from-primary to-lucoin bg-clip-text text-transparent">
                {t('app.name')}
              </span>
            </Link>
            
            <DesktopNavigation />
          </div>
          
          <div className="flex items-center space-x-2">
            <ThemeToggle />
            <LanguageSwitcher />
            
            <Button variant="ghost" size="icon" asChild>
              <Link to={`/${currentLanguage}/search`}>
                <Search size={20} />
              </Link>
            </Button>
            
            {isAuthenticated && user ? (
              <>
                <Button variant="ghost" size="icon" asChild>
                  <Link to={`/${currentLanguage}/favorites`}>
                    <Heart size={20} />
                  </Link>
                </Button>
                
                <UserDropdown 
                  user={user}
                  handleLogout={handleLogout} 
                />
              </>
            ) : (
              <Button asChild>
                <Link to={`/${currentLanguage}/auth`}>{t('nav.signIn')}</Link>
              </Button>
            )}
            
            <MobileMenu
              user={user}
              isOpen={isMobileMenuOpen}
              setIsOpen={setIsMobileMenuOpen}
              handleLogout={handleLogout}
              hasAdminAccess={hasAdminAccess}
            />
          </div>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
