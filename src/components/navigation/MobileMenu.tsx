
import React from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { Sheet, SheetContent, SheetHeader, SheetTitle } from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { User, Settings, LogOut } from 'lucide-react';
import { useAuth } from '@/hooks/auth/useAuth';
import { AnimatedContainer } from '@/components/ui/animated-container';
import { Separator } from '@/components/ui/separator';
import MobileNavigation from './MobileNavigation';
import { ThemeToggle } from '@/components/ui/theme-toggle';

interface MobileMenuProps {
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
}

const MobileMenu = ({ open = false, onOpenChange }: MobileMenuProps) => {
  const { t } = useTranslation();
  const { user, isAuthenticated, logout } = useAuth();
  
  const handleLogout = () => {
    if (logout) {
      logout();
    }
    if (onOpenChange) {
      onOpenChange(false);
    }
  };
  
  const handleNavItemClick = () => {
    if (onOpenChange) {
      onOpenChange(false);
    }
  };
  
  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent side="right" className="w-[85%] sm:w-[350px] pt-10">
        <SheetHeader className="mb-6">
          <SheetTitle className="flex items-center justify-between">
            <span>{t('menu')}</span>
            <ThemeToggle />
          </SheetTitle>
        </SheetHeader>
        
        <MobileNavigation onItemClick={handleNavItemClick} />
        
        <Separator className="my-6" />
        
        <div>
          {isAuthenticated ? (
            <>
              <div className="flex items-center gap-3 mb-4 px-2">
                <div className="h-10 w-10 rounded-full bg-primary flex items-center justify-center">
                  <span className="text-primary-foreground font-medium text-lg">
                    {user?.email?.charAt(0).toUpperCase() || 'U'}
                  </span>
                </div>
                <div>
                  <p className="font-medium">{user?.username || user?.email}</p>
                </div>
              </div>
              
              <div className="flex flex-col gap-2">
                <AnimatedContainer delay={0.1} animation="fade">
                  <Button
                    variant="ghost"
                    className="w-full justify-start gap-2"
                    asChild
                    onClick={handleNavItemClick}
                  >
                    <Link to="/profile">
                      <User className="h-5 w-5" />
                      {t('profile')}
                    </Link>
                  </Button>
                </AnimatedContainer>
                
                <AnimatedContainer delay={0.15} animation="fade">
                  <Button
                    variant="ghost"
                    className="w-full justify-start gap-2"
                    asChild
                    onClick={handleNavItemClick}
                  >
                    <Link to="/settings">
                      <Settings className="h-5 w-5" />
                      {t('settings')}
                    </Link>
                  </Button>
                </AnimatedContainer>
                
                <AnimatedContainer delay={0.2} animation="fade">
                  <Button
                    variant="ghost"
                    className="w-full justify-start gap-2 text-destructive"
                    onClick={handleLogout}
                  >
                    <LogOut className="h-5 w-5" />
                    {t('logout')}
                  </Button>
                </AnimatedContainer>
              </div>
            </>
          ) : (
            <div className="flex flex-col gap-2">
              <Button 
                className="w-full" 
                asChild
                onClick={handleNavItemClick}
              >
                <Link to="/login">{t('login')}</Link>
              </Button>
              <Button 
                variant="outline" 
                className="w-full" 
                asChild
                onClick={handleNavItemClick}
              >
                <Link to="/register">{t('register')}</Link>
              </Button>
            </div>
          )}
        </div>
      </SheetContent>
    </Sheet>
  );
};

export default MobileMenu;
