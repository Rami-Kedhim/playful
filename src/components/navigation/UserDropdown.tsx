
import React from "react";
import { Link } from "react-router-dom";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  User,
  LogOut,
  CreditCard,
  Bell,
  Settings,
} from "lucide-react";
import { AuthUser } from "@/types/auth";

interface UserDropdownProps {
  user: AuthUser;
  handleLogout: () => void;
  isMobile?: boolean; // Added to support MobileNav usage
  onClose?: () => void; // Added to support MobileNav usage
}

const UserDropdown = ({ user, handleLogout, isMobile, onClose }: UserDropdownProps) => {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="icon" className="rounded-full">
          <Avatar className="h-8 w-8">
            <AvatarImage src={user.profileImageUrl} />
            <AvatarFallback className="bg-primary/10">
              {user.username.substring(0, 2).toUpperCase()}
            </AvatarFallback>
          </Avatar>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-56">
        <div className="flex items-center justify-start gap-2 p-2">
          <div className="flex flex-col space-y-0.5">
            <p className="font-medium text-sm">{user.username}</p>
            <p className="text-xs text-muted-foreground">{user.email}</p>
          </div>
        </div>
        <DropdownMenuSeparator />
        <DropdownMenuItem asChild>
          <Link 
            to="/profile" 
            className="cursor-pointer" 
            onClick={isMobile && onClose ? onClose : undefined}
          >
            <User className="mr-2 h-4 w-4" />
            <span>Profile</span>
          </Link>
        </DropdownMenuItem>
        <DropdownMenuItem asChild>
          <Link 
            to="/notifications" 
            className="cursor-pointer"
            onClick={isMobile && onClose ? onClose : undefined}
          >
            <Bell className="mr-2 h-4 w-4" />
            <span>Notifications</span>
          </Link>
        </DropdownMenuItem>
        <DropdownMenuItem asChild>
          <Link 
            to="/wallet" 
            className="cursor-pointer"
            onClick={isMobile && onClose ? onClose : undefined}
          >
            <CreditCard className="mr-2 h-4 w-4" />
            <span>Wallet ({user.lucoinsBalance} LC)</span>
          </Link>
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem asChild>
          <Link 
            to="/settings" 
            className="cursor-pointer"
            onClick={isMobile && onClose ? onClose : undefined}
          >
            <Settings className="mr-2 h-4 w-4" />
            <span>Settings</span>
          </Link>
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem 
          onClick={() => {
            handleLogout();
            if (isMobile && onClose) onClose();
          }} 
          className="cursor-pointer"
        >
          <LogOut className="mr-2 h-4 w-4" />
          <span>Log out</span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default UserDropdown;
