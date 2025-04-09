
import React from "react";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Menu } from "lucide-react";
import { useTranslation } from "react-i18next";
import { useAuth } from "@/hooks/useAuth";
import MobileMenuHeader from "@/components/navigation/mobile/MobileMenuHeader";
import MobileMenuNavLinks from "@/components/navigation/mobile/MobileMenuNavLinks";
import MobileMenuUserSection from "@/components/navigation/mobile/MobileMenuUserSection";
import MobileMenuAuthButtons from "@/components/navigation/mobile/MobileMenuAuthButtons";

const EscortMobileMenu: React.FC = () => {
  const [open, setOpen] = React.useState(false);
  const { t } = useTranslation();
  const { isAuthenticated, user } = useAuth();

  const handleClose = () => setOpen(false);

  const navItems = [
    {
      name: t('escorts.browse'),
      path: '/escorts',
      icon: null
    },
    {
      name: t('escorts.featured'),
      path: '/escorts/featured',
      icon: null
    },
    {
      name: t('escorts.verified'),
      path: '/escorts/verified',
      icon: null
    },
    {
      name: t('escorts.categories'),
      path: '/escorts/categories',
      icon: null
    }
  ];

  const userNavItems = [
    {
      name: t('user.favorites'),
      path: '/favorites',
      icon: <span className="i-lucide-heart h-4 w-4" />
    },
    {
      name: t('user.bookings'),
      path: '/bookings',
      icon: <span className="i-lucide-calendar h-4 w-4" />
    }
  ];

  const handleLogout = () => {
    handleClose();
    // Call logout function from auth context
  };

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>
        <Button variant="ghost" size="icon" aria-label="Menu">
          <Menu className="h-5 w-5" />
        </Button>
      </SheetTrigger>
      <SheetContent side="left" className="p-0 w-80">
        <div className="flex flex-col h-full">
          <MobileMenuHeader title={t('escorts.title')} onClose={handleClose} />
          
          <div className="flex-1 overflow-y-auto py-2">
            <MobileMenuNavLinks items={navItems} onItemClick={handleClose} />
            
            <div className="mt-6 px-6">
              <h3 className="text-sm font-semibold mb-3">{t('escorts.filters')}</h3>
              <div className="grid grid-cols-2 gap-2">
                <Button variant="outline" size="sm" className="justify-start">
                  {t('escorts.location')}
                </Button>
                <Button variant="outline" size="sm" className="justify-start">
                  {t('escorts.services')}
                </Button>
                <Button variant="outline" size="sm" className="justify-start">
                  {t('escorts.price')}
                </Button>
                <Button variant="outline" size="sm" className="justify-start">
                  {t('escorts.availability')}
                </Button>
              </div>
            </div>
            
            <MobileMenuUserSection 
              isAuthenticated={isAuthenticated}
              userNavItems={userNavItems}
              onItemClick={handleClose}
              onLogout={handleLogout}
              t={t}
            />
          </div>
          
          <div className="p-4 border-t">
            <MobileMenuAuthButtons 
              isAuthenticated={isAuthenticated}
              onClose={handleClose}
              t={t}
            />
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
};

export default EscortMobileMenu;
