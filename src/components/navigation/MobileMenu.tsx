
import React from "react";
import { useTranslation } from "react-i18next";
import { useAuth } from "@/hooks/auth/useAuthContext";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { Separator } from "@/components/ui/separator";
import { User, Heart, MessageSquare } from "lucide-react";
import { AppRoutes } from "@/utils/navigation";

// Import our new components
import MobileMenuHeader from "./mobile/MobileMenuHeader";
import MobileMenuNavLinks from "./mobile/MobileMenuNavLinks";
import MobileMenuServiceLinks from "./mobile/MobileMenuServiceLinks";
import MobileMenuUserSection from "./mobile/MobileMenuUserSection";
import MobileMenuAuthButtons from "./mobile/MobileMenuAuthButtons";

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

  // Main navigation items
  const navItems = [
    { name: t('nav.home'), path: '/' },
    { name: t('nav.escorts'), path: '/escorts' },
    { name: t('nav.creators'), path: '/creators' },
  ];

  // Add protected routes
  if (isAuthenticated) {
    navItems.push({ name: t('nav.metaverse'), path: '/metaverse' });
  }

  // Admin-only routes
  if (isAdmin) {
    navItems.push({ name: t('nav.brainHub'), path: AppRoutes.BRAIN_HUB });
    navItems.push({ name: 'SEO', path: '/seo' });
  }

  // User navigation items
  const userNavItems = [
    { name: t('nav.profile'), path: '/profile', icon: <User className="h-4 w-4 mr-2" /> },
    { name: t('nav.favorites'), path: '/favorites', icon: <Heart className="h-4 w-4 mr-2" /> },
    { name: t('nav.messages'), path: '/messages', icon: <MessageSquare className="h-4 w-4 mr-2" /> },
  ];

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent 
        className="left-0 right-auto h-full w-[70vw] sm:w-[350px] p-0" 
        hideCloseButton={true}
      >
        <MobileMenuHeader 
          title={t('nav.menu')} 
          onClose={closeMenu} 
        />
        
        <Separator className="my-2" />
        
        <div className="flex-1 overflow-auto py-2 px-6">
          {/* Main navigation */}
          <MobileMenuNavLinks 
            items={navItems} 
            onItemClick={closeMenu} 
          />

          {/* Service type menu */}
          <MobileMenuServiceLinks 
            onItemClick={closeMenu} 
            t={t} 
          />

          {/* User section - only show when authenticated */}
          <MobileMenuUserSection 
            isAuthenticated={isAuthenticated}
            userNavItems={userNavItems}
            onItemClick={closeMenu}
            onLogout={handleLogout}
            t={t}
          />
          
          {/* Login/Register buttons - only show when not authenticated */}
          <MobileMenuAuthButtons 
            isAuthenticated={isAuthenticated}
            onClose={closeMenu}
            t={t}
          />
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default MobileMenu;
