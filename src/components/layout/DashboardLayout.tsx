
import React, { useState } from 'react';
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import {
  CreditCard,
  Home,
  Menu,
  PanelLeft,
  Settings,
  ShieldCheck,
  Users,
  X,
  User,
  Camera,
  Calendar,
  MessageSquare,
  LogOut,
  Bell,
  Shield,
} from "lucide-react";
import { Link, useLocation, Outlet } from "react-router-dom";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { useAuth } from "@/hooks/auth/useAuthContext";
import { useRole } from "@/hooks/auth/useRole";

interface NavItemProps {
  icon: React.ReactNode;
  title: string;
  href: string;
  isActive?: boolean;
  alert?: boolean;
  collapsed?: boolean;
}

const sidebarLinks = [
  {
    title: "Home",
    icon: <Home className="h-5 w-5" />,
    href: "/dashboard",
    roles: ["user", "creator", "escort", "admin", "moderator"],
  },
  {
    title: "Profile",
    icon: <User className="h-5 w-5" />,
    href: "/profile",
    roles: ["user", "creator", "escort"],
  },
  {
    title: "Content",
    icon: <Camera className="h-5 w-5" />,
    href: "/content",
    roles: ["creator", "escort"],
  },
  {
    title: "Bookings",
    icon: <Calendar className="h-5 w-5" />,
    href: "/bookings",
    roles: ["escort"],
  },
  {
    title: "Messages",
    icon: <MessageSquare className="h-5 w-5" />,
    href: "/messages",
    roles: ["user", "creator", "escort"],
  },
  {
    title: "Users",
    icon: <Users className="h-5 w-5" />,
    href: "/admin/users",
    roles: ["admin", "moderator"],
  },
  {
    title: "Verification",
    icon: <ShieldCheck className="h-5 w-5" />,
    href: "/admin/verification",
    roles: ["admin", "moderator"],
  },
  {
    title: "Settings",
    icon: <Settings className="h-5 w-5" />,
    href: "/settings",
    roles: ["user", "creator", "escort", "admin", "moderator"],
  },
];

export default function DashboardLayout() {
  const [collapsed, setCollapsed] = useState(false);
  const { user } = useAuth();
  const { hasRole, isAdmin } = useRole();
  const location = useLocation();

  const isActive = (href: string): boolean => {
    return location.pathname === href || location.pathname.startsWith(`${href}/`);
  };

  const filteredLinks = sidebarLinks.filter((link) => {
    if (isAdmin) return true;
    if (link.roles) return link.roles.some(role => hasRole(role));
    return true;
  });

  const NavItem: React.FC<NavItemProps> = ({
    icon,
    title,
    href,
    isActive = false,
    alert = false,
    collapsed = false,
  }) => {
    return (
      <Link
        to={href}
        className={cn(
          "flex items-center gap-2 rounded-md px-3 py-2 text-sm transition-colors",
          isActive
            ? "bg-accent text-accent-foreground"
            : "hover:bg-accent/50 hover:text-accent-foreground"
        )}
      >
        <div className="relative">
          {icon}
          {alert && (
            <span className="absolute -right-1 -top-1 block h-2 w-2 rounded-full bg-destructive" />
          )}
        </div>
        {!collapsed && <span>{title}</span>}
      </Link>
    );
  };

  return (
    <div className="grid min-h-screen w-full lg:grid-cols-[auto_1fr]">
      <div
        className={cn(
          "hidden border-r bg-card lg:block",
          collapsed ? "lg:w-[80px]" : "lg:w-[280px]"
        )}
      >
        <div className="flex h-full flex-col gap-2">
          <div className="flex h-14 items-center justify-between border-b px-3">
            <Link
              to="/"
              className={cn(
                "flex items-center gap-2 font-semibold",
                collapsed && "justify-center w-full"
              )}
            >
              <Shield className="h-6 w-6" />
              {!collapsed && <span>Escort Dashboard</span>}
            </Link>
            <Button
              size="icon"
              variant="ghost"
              onClick={() => setCollapsed(!collapsed)}
              className="hidden lg:flex"
            >
              <PanelLeft className="h-5 w-5" />
            </Button>
          </div>
          <ScrollArea className="flex-1 py-2">
            <nav className="grid gap-1 px-3">
              {filteredLinks.map((link) => (
                <NavItem
                  key={link.href}
                  icon={link.icon}
                  title={link.title}
                  href={link.href}
                  isActive={isActive(link.href)}
                  collapsed={collapsed}
                />
              ))}
            </nav>
          </ScrollArea>
          <div className="mt-auto border-t p-3">
            <div className="flex items-center gap-3">
              <Avatar className="h-10 w-10">
                <AvatarImage src={user?.profileImageUrl || ""} />
                <AvatarFallback>
                  {user?.username?.substring(0, 2).toUpperCase() || "U"}
                </AvatarFallback>
              </Avatar>
              {!collapsed && (
                <div className="flex flex-col">
                  <span className="text-sm font-medium">{user?.username}</span>
                  <Link to="/profile" className="text-xs text-muted-foreground">
                    View Profile
                  </Link>
                </div>
              )}
              {!collapsed && (
                <Button size="icon" variant="ghost" className="ml-auto">
                  <LogOut className="h-5 w-5" />
                  <span className="sr-only">Log Out</span>
                </Button>
              )}
            </div>
          </div>
        </div>
      </div>
      <div className="flex flex-col">
        <header className="sticky top-0 z-10 flex h-14 items-center gap-4 border-b bg-background px-4 lg:px-6">
          <Sheet>
            <SheetTrigger asChild>
              <Button size="icon" variant="outline" className="lg:hidden">
                <Menu className="h-5 w-5" />
                <span className="sr-only">Toggle Menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="left" className="w-[240px] sm:w-[280px]">
              <div className="flex h-full flex-col gap-2">
                <div className="flex h-14 items-center justify-between border-b px-3">
                  <Link to="/" className="flex items-center gap-2 font-semibold">
                    <Shield className="h-6 w-6" />
                    <span>Escort Dashboard</span>
                  </Link>
                  <SheetTrigger asChild>
                    <Button size="icon" variant="ghost">
                      <X className="h-5 w-5" />
                    </Button>
                  </SheetTrigger>
                </div>
                <ScrollArea className="flex-1 py-2">
                  <nav className="grid gap-1 px-3">
                    {filteredLinks.map((link) => (
                      <Link
                        key={link.href}
                        to={link.href}
                        className={cn(
                          "flex items-center gap-2 rounded-md px-3 py-2 text-sm transition-colors",
                          isActive(link.href)
                            ? "bg-accent text-accent-foreground"
                            : "hover:bg-accent/50 hover:text-accent-foreground"
                        )}
                      >
                        {link.icon}
                        <span>{link.title}</span>
                      </Link>
                    ))}
                  </nav>
                </ScrollArea>
                <div className="mt-auto border-t p-3">
                  <div className="flex items-center gap-3">
                    <Avatar className="h-10 w-10">
                      <AvatarImage src={user?.profileImageUrl || ""} />
                      <AvatarFallback>
                        {user?.username?.substring(0, 2).toUpperCase() || "U"}
                      </AvatarFallback>
                    </Avatar>
                    <div className="flex flex-col">
                      <span className="text-sm font-medium">
                        {user?.username}
                      </span>
                      <Link
                        to="/profile"
                        className="text-xs text-muted-foreground"
                      >
                        View Profile
                      </Link>
                    </div>
                    <Button size="icon" variant="ghost" className="ml-auto">
                      <LogOut className="h-5 w-5" />
                      <span className="sr-only">Log Out</span>
                    </Button>
                  </div>
                </div>
              </div>
            </SheetContent>
          </Sheet>
          <div className="flex-1">
            <h1 className="text-lg font-semibold">Dashboard</h1>
          </div>
          <div className="flex items-center gap-4">
            <Button size="icon" variant="outline">
              <Bell className="h-5 w-5" />
              <span className="sr-only">Notifications</span>
            </Button>
            <Avatar className="h-8 w-8 lg:hidden">
              <AvatarImage src={user?.profileImageUrl || ""} />
              <AvatarFallback>
                {user?.username?.substring(0, 2).toUpperCase() || "U"}
              </AvatarFallback>
            </Avatar>
          </div>
        </header>
        <main className="flex-1 p-4 lg:p-6">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
