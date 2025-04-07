
import React from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { Sheet, SheetContent, SheetHeader, SheetTitle } from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { Home, Heart, Video, MessageCircle, User, Settings, LogOut } from 'lucide-react';
import { useAuth } from '@/hooks/auth/useAuth';
import { AnimatedContainer } from '@/components/ui/animated-container';

interface MobileMenuProps {
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
}

const MobileMenu = ({ open = false, onOpenChange }: MobileMenuProps) => {
  const { t } = useTranslation();
  const { user, isAuthenticated, logout } = useAuth();
  
  const navItems = [
    { icon: Home, label: t('home'), href: '/' },
    { icon: Heart, label: t('favorites'), href: '/favorites' },
    { icon: Video, label: t('livecams'), href: '/livecams' },
    { icon: MessageCircle, label: t('messages'), href: '/messages' },
  ];

  const handleLogout = () => {
    if (logout) {
      logout();
    }
    if (onOpenChange) {
      onOpenChange(false);
    }
  };
  
  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent side="right" className="w-[85%] sm:w-[350px] pt-10">
        <SheetHeader className="mb-6">
          <SheetTitle>{t('menu')}</SheetTitle>
        </SheetHeader>
        
        <div className="flex flex-col gap-3">
          {navItems.map((item, index) => (
            <AnimatedContainer key={item.href} delay={0.05 * index} animation="slide-right">
              <Button
                variant="ghost"
                className="w-full justify-start gap-2 text-lg"
                asChild
                onClick={() => onOpenChange && onOpenChange(false)}
              >
                <Link to={item.href}>
                  <item.icon className="h-5 w-5" />
                  {item.label}
                </Link>
              </Button>
            </AnimatedContainer>
          ))}
        </div>
        
        <div className="border-t mt-6 pt-6">
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
                    onClick={() => onOpenChange && onOpenChange(false)}
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
                    onClick={() => onOpenChange && onOpenChange(false)}
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
                onClick={() => onOpenChange && onOpenChange(false)}
              >
                <Link to="/login">{t('login')}</Link>
              </Button>
              <Button 
                variant="outline" 
                className="w-full" 
                asChild
                onClick={() => onOpenChange && onOpenChange(false)}
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
