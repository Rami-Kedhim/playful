
import React from "react";
import { Link } from "react-router-dom";
import {
  Sheet,
  SheetContent,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  Menu,
  User,
  LogOut,
  CreditCard,
  Settings,
  MessageCircle,
  Home,
  Users,
  Video,
  Search,
} from "lucide-react";
import { AuthUser } from "@/types/auth";

interface MobileMenuProps {
  user: AuthUser | null;
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
  handleLogout: () => void;
  hasAdminAccess?: boolean;
}

const MobileMenu = ({ user, isOpen, setIsOpen, handleLogout, hasAdminAccess = false }: MobileMenuProps) => {
  const mainLinks = [
    { label: "Home", path: "/", icon: Home },
    { label: "Escorts", path: "/escorts", icon: Users },
    { label: "Creators", path: "/creators", icon: Users },
    { label: "Messages", path: "/messages", icon: MessageCircle },
    { label: "Metaverse", path: "/metaverse", icon: Video },
  ];

  // Add SEO link only for admin users
  if (hasAdminAccess) {
    mainLinks.push({ label: "SEO Dashboard", path: "/seo", icon: Search });
  }

  return (
    <Sheet open={isOpen} onOpenChange={setIsOpen}>
      <SheetTrigger asChild>
        <Button variant="ghost" size="icon" className="md:hidden">
          <Menu />
        </Button>
      </SheetTrigger>
      <SheetContent side="right" className="w-[85vw] sm:w-[350px]">
        <div className="flex flex-col h-full py-6">
          {user && (
            <div className="flex items-center space-x-3 mb-6">
              <Avatar className="h-12 w-12">
                <AvatarImage src={user.profileImageUrl} />
                <AvatarFallback className="bg-primary/10">
                  {user.username ? user.username.substring(0, 2).toUpperCase() : "U"}
                </AvatarFallback>
              </Avatar>
              <div>
                <div className="font-medium">{user.username}</div>
                <div className="text-sm text-muted-foreground truncate max-w-[180px]">
                  {user.email}
                </div>
              </div>
            </div>
          )}
          
          <nav className="space-y-1">
            {mainLinks.map((link) => (
              <Button
                key={link.path}
                variant="ghost"
                className="w-full justify-start"
                asChild
                onClick={() => setIsOpen(false)}
              >
                <Link to={link.path}>
                  {link.icon && <link.icon className="mr-2 h-4 w-4" />}
                  {link.label}
                </Link>
              </Button>
            ))}
          </nav>
          
          {user ? (
            <>
              <div className="border-t border-gray-800 my-4 pt-4">
                <div className="text-sm font-medium mb-2">Account</div>
                <div className="space-y-1">
                  <Button
                    variant="ghost"
                    className="w-full justify-start"
                    asChild
                    onClick={() => setIsOpen(false)}
                  >
                    <Link to="/profile">
                      <User className="mr-2 h-4 w-4" />
                      Profile
                    </Link>
                  </Button>
                  <Button
                    variant="ghost"
                    className="w-full justify-start"
                    asChild
                    onClick={() => setIsOpen(false)}
                  >
                    <Link to="/wallet">
                      <CreditCard className="mr-2 h-4 w-4" />
                      Wallet {user.lucoinsBalance ? `(${user.lucoinsBalance} LC)` : ''}
                    </Link>
                  </Button>
                  <Button
                    variant="ghost"
                    className="w-full justify-start"
                    asChild
                    onClick={() => setIsOpen(false)}
                  >
                    <Link to="/settings">
                      <Settings className="mr-2 h-4 w-4" />
                      Settings
                    </Link>
                  </Button>
                </div>
              </div>
              
              <div className="border-t border-gray-800 mt-4 pt-4 mt-auto">
                <Button
                  variant="ghost"
                  className="w-full justify-start"
                  onClick={handleLogout}
                >
                  <LogOut className="mr-2 h-4 w-4" />
                  Log out
                </Button>
              </div>
            </>
          ) : (
            <div className="border-t border-gray-800 mt-4 pt-4 mt-auto">
              <Button
                className="w-full"
                asChild
                onClick={() => setIsOpen(false)}
              >
                <Link to="/auth">Sign In</Link>
              </Button>
            </div>
          )}
        </div>
      </SheetContent>
    </Sheet>
  );
};

export default MobileMenu;
