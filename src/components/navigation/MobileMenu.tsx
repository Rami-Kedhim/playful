
import React from "react";
import { useAuth } from "@/hooks/auth/useAuthContext";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { Separator } from "@/components/ui/separator";
import { User, Heart, MessageSquare } from "lucide-react";
import { AppRoutes } from "@/utils/navigation";

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
    { name: 'Home', path: AppRoutes.HOME },
    { name: 'Escorts', path: AppRoutes.ESCORTS },
    { name: 'Creators', path: AppRoutes.CREATORS },
  ];

  if (isAuthenticated) {
    navItems.push({ name: 'Metaverse', path: AppRoutes.METAVERSE });
  }

  if (isAdmin) {
    navItems.push({ name: 'Brain Hub', path: AppRoutes.BRAIN_HUB });
    navItems.push({ name: 'SEO', path: '/seo' });
  }

  const userNavItems = [
    { name: 'Profile', path: AppRoutes.PROFILE, icon: <User className="h-4 w-4 mr-2" /> },
    { name: 'Favorites', path: AppRoutes.FAVORITES, icon: <Heart className="h-4 w-4 mr-2" /> },
    { name: 'Messages', path: AppRoutes.MESSAGES, icon: <MessageSquare className="h-4 w-4 mr-2" /> },
  ];

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent 
        className="left-0 right-auto h-full w-[70vw] sm:w-[350px] p-0" 
        hideCloseButton={true}
      >
        <MobileMenuHeader 
          title="Menu" 
          onClose={closeMenu} 
        />
        
        <Separator className="my-2" />
        
        <div className="flex-1 overflow-auto py-2 px-6">
          <MobileMenuNavLinks 
            items={navItems} 
            onItemClick={closeMenu} 
          />

          <MobileMenuServiceLinks 
            onItemClick={closeMenu} 
            t={(key: string) => key} 
          />

          <MobileMenuUserSection 
            isAuthenticated={isAuthenticated}
            userNavItems={userNavItems}
            onItemClick={closeMenu}
            onLogout={handleLogout}
            t={(key: string) => key}
          />

          <MobileMenuAuthButtons 
            isAuthenticated={isAuthenticated}
            onClose={closeMenu}
            t={(key: string) => key}
          />
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default MobileMenu;
