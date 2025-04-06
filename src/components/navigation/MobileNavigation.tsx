
import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { 
  Home, 
  User, 
  Users, 
  Heart, 
  Video, 
  MessageSquare, 
  Search, 
  Menu, 
  LogIn, 
  UserPlus
} from "lucide-react";
import { useAuth } from "@/hooks/auth/useAuth";
import { useTranslation } from "react-i18next";
import { ThemeToggle } from "@/components/ui/theme-toggle";
import Logo from "@/components/layout/Logo";

const MobileNavigation: React.FC = () => {
  const [open, setOpen] = useState(false);
  const { isAuthenticated, user } = useAuth();
  const { t } = useTranslation();
  
  const menuItems = [
    { icon: Home, label: t('home'), path: "/" },
    { icon: Users, label: t('escorts'), path: "/escorts" },
    { icon: User, label: t('creators'), path: "/creators" },
    { icon: Video, label: t('livecams'), path: "/livecams" },
    { icon: Heart, label: t('ai_companions'), path: "/ai-companion" },
  ];
  
  const authenticatedItems = [
    { icon: MessageSquare, label: t('messages'), path: "/messages" },
    { icon: Heart, label: t('favorites'), path: "/favorites" },
    { icon: User, label: t('profile'), path: "/profile" },
  ];

  return (
    <div className="md:hidden">
      <Sheet open={open} onOpenChange={setOpen}>
        <SheetTrigger asChild>
          <Button variant="ghost" size="icon" className="md:hidden">
            <Menu className="h-5 w-5" />
            <span className="sr-only">Menu</span>
          </Button>
        </SheetTrigger>
        <SheetContent side="left" className="w-[280px]">
          <SheetHeader className="border-b pb-4 mb-4">
            <SheetTitle className="flex items-center justify-center">
              <Logo />
            </SheetTitle>
          </SheetHeader>
          
          <div className="flex flex-col space-y-1">
            {menuItems.map((item) => (
              <SheetClose asChild key={item.path}>
                <Link 
                  to={item.path} 
                  className="flex items-center p-3 rounded-md hover:bg-accent text-foreground"
                  onClick={() => setOpen(false)}
                >
                  <item.icon className="h-5 w-5 mr-3" />
                  {item.label}
                </Link>
              </SheetClose>
            ))}
            
            {isAuthenticated ? (
              <>
                <div className="border-t my-2 pt-2"></div>
                {authenticatedItems.map((item) => (
                  <SheetClose asChild key={item.path}>
                    <Link 
                      to={item.path} 
                      className="flex items-center p-3 rounded-md hover:bg-accent text-foreground"
                      onClick={() => setOpen(false)}
                    >
                      <item.icon className="h-5 w-5 mr-3" />
                      {item.label}
                    </Link>
                  </SheetClose>
                ))}
              </>
            ) : (
              <>
                <div className="border-t my-2 pt-2"></div>
                <SheetClose asChild>
                  <Link 
                    to="/login" 
                    className="flex items-center p-3 rounded-md hover:bg-accent text-foreground"
                    onClick={() => setOpen(false)}
                  >
                    <LogIn className="h-5 w-5 mr-3" />
                    {t('login')}
                  </Link>
                </SheetClose>
                <SheetClose asChild>
                  <Link 
                    to="/register" 
                    className="flex items-center p-3 rounded-md hover:bg-accent text-foreground"
                    onClick={() => setOpen(false)}
                  >
                    <UserPlus className="h-5 w-5 mr-3" />
                    {t('register')}
                  </Link>
                </SheetClose>
              </>
            )}
          </div>
          
          <div className="absolute bottom-4 left-4 right-4 flex justify-between items-center">
            <div className="text-xs text-muted-foreground">
              {isAuthenticated && user ? `${t('logged_in_as')}: ${user.email}` : t('guest')}
            </div>
            <ThemeToggle />
          </div>
        </SheetContent>
      </Sheet>
    </div>
  );
};

export default MobileNavigation;
