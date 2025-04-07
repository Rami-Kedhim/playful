
import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { Menu, Search } from 'lucide-react';
import { Button } from '@/components/ui/button';
import Logo from './Logo';
import LanguageSwitcher from '../language/LanguageSwitcher';
import { useAuth } from '@/hooks/auth/useAuth';
import { ThemeToggle } from "@/components/ui/theme-toggle";
import MobileMenu from '../navigation/MobileMenu';
import useMobileMenu from '@/hooks/useMobileMenu';
import DesktopNavigation from '../navigation/DesktopNavigation';
import UserDropdown from '../navigation/UserDropdown';
import ServiceTypeMenu from '../navigation/ServiceTypeMenu';

const Navbar: React.FC = () => {
  const { t } = useTranslation();
  const { user, isAuthenticated, userRoles = [], logout } = useAuth();
  const { isMobileMenuOpen, setIsMobileMenuOpen, toggleMobileMenu } = useMobileMenu();
  const navigate = useNavigate();
  
  const handleLogout = async () => {
    try {
      await logout();
    } catch (error) {
      console.error('Error logging out:', error);
    }
  };

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 transition-colors duration-300">
      <div className="container flex h-16 items-center">
        {/* Logo */}
        <div className="mr-4 flex items-center">
          <Link to="/" className="flex items-center space-x-2">
            <Logo />
          </Link>
        </div>
        
        {/* Desktop Navigation */}
        <div className="hidden md:flex md:space-x-4">
          <DesktopNavigation />
          <ServiceTypeMenu />
        </div>
        
        {/* Right-sided items */}
        <div className="flex flex-1 items-center justify-end space-x-2">
          {/* Search button */}
          <Link to="/search" aria-label={t('search')}>
            <Button variant="ghost" size="icon" className="rounded-full">
              <Search className="h-5 w-5" />
              <span className="sr-only">{t('search')}</span>
            </Button>
          </Link>
          
          {/* Language switcher */}
          <LanguageSwitcher />
          
          {/* Theme toggle */}
          <ThemeToggle />
          
          {/* Mobile menu toggle - only visible on mobile */}
          <Button 
            variant="ghost" 
            size="icon" 
            className="md:hidden rounded-full"
            onClick={toggleMobileMenu}
            aria-label="Toggle menu"
          >
            <Menu className="h-5 w-5" />
          </Button>
          
          {/* Mobile menu */}
          <MobileMenu open={isMobileMenuOpen} onOpenChange={setIsMobileMenuOpen} />
          
          {/* User menu - only visible on desktop */}
          <div className="hidden md:block">
            {isAuthenticated ? (
              <UserDropdown user={user} handleLogout={handleLogout} />
            ) : (
              <div className="flex items-center gap-2">
                <Button variant="outline" size="sm" asChild>
                  <Link to="/login">{t('login')}</Link>
                </Button>
                <Button size="sm" asChild>
                  <Link to="/register">{t('register')}</Link>
                </Button>
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
