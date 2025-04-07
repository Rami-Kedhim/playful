
import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import {
  ChevronLeft,
  ChevronRight,
  Menu,
  Settings,
  LayoutDashboard,
  Users,
  Store,
  BarChart4,
  MessageSquare,
  Bell,
  ShieldCheck,
  Search,
  HelpCircle,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Separator } from '@/components/ui/separator';
import { useRole } from '@/hooks/auth/useRole';
import { useAuth } from '@/hooks/auth/useAuth';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import {
  Sheet,
  SheetContent,
  SheetTrigger,
} from '@/components/ui/sheet';

interface DashboardLayoutProps {
  children: React.ReactNode;
}

const DashboardLayout: React.FC<DashboardLayoutProps> = ({ children }) => {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const location = useLocation();
  const { isAdmin, isModerator, isCreator } = useRole();
  const { user } = useAuth();
  
  const isActive = (path: string) => location.pathname.startsWith(path);
  
  // Navigation items - dynamic based on user role
  const navigationItems = [
    {
      title: 'Dashboard',
      href: '/dashboard',
      icon: <LayoutDashboard className="h-4 w-4" />,
      show: true,
    },
    {
      title: 'Analytics',
      href: '/dashboard/analytics',
      icon: <BarChart4 className="h-4 w-4" />,
      show: isCreator() || isAdmin(),
    },
    {
      title: 'Content',
      href: '/dashboard/content',
      icon: <Store className="h-4 w-4" />,
      show: isCreator() || isAdmin(),
    },
    {
      title: 'Messages',
      href: '/dashboard/messages',
      icon: <MessageSquare className="h-4 w-4" />,
      show: true,
    },
    {
      title: 'Users',
      href: '/dashboard/users',
      icon: <Users className="h-4 w-4" />,
      show: isAdmin() || isModerator(),
    },
    {
      title: 'Moderation',
      href: '/dashboard/moderation',
      icon: <ShieldCheck className="h-4 w-4" />,
      show: isAdmin() || isModerator(),
    },
    {
      title: 'Settings',
      href: '/dashboard/settings',
      icon: <Settings className="h-4 w-4" />,
      show: true,
    },
    {
      title: 'Help',
      href: '/dashboard/help',
      icon: <HelpCircle className="h-4 w-4" />,
      show: true,
    },
  ];
  
  // Filter items based on user role
  const filteredItems = navigationItems.filter(item => item.show);
  
  const Sidebar = (
    <div className={`flex flex-col border-r bg-background/60 backdrop-blur-sm ${sidebarCollapsed ? 'w-[70px]' : 'w-[240px]'}`}>
      <div className="flex h-14 items-center px-4">
        {!sidebarCollapsed && (
          <Link to="/" className="flex items-center gap-2 font-semibold">
            <div className="h-6 w-6 rounded-md bg-primary flex items-center justify-center text-white">A</div>
            <span>Admin Panel</span>
          </Link>
        )}
        {sidebarCollapsed && (
          <Link to="/" className="mx-auto">
            <div className="h-6 w-6 rounded-md bg-primary flex items-center justify-center text-white">A</div>
          </Link>
        )}
      </div>
      <div className={`flex-1 ${sidebarCollapsed ? 'px-2' : 'px-4'} py-4`}>
        <nav className="grid gap-1">
          {filteredItems.map((item) => (
            <Button
              key={item.href}
              variant={isActive(item.href) ? 'secondary' : 'ghost'}
              size={sidebarCollapsed ? 'icon' : 'sm'}
              asChild
              className={`${sidebarCollapsed ? 'justify-center' : 'justify-start'}`}
            >
              <Link to={item.href} className={`${sidebarCollapsed ? '' : 'flex items-center gap-3'}`}>
                {item.icon}
                {!sidebarCollapsed && <span>{item.title}</span>}
              </Link>
            </Button>
          ))}
        </nav>
      </div>
      <div className="mt-auto p-4">
        <Button
          variant="ghost"
          size="icon"
          onClick={() => setSidebarCollapsed(!sidebarCollapsed)}
          className="mx-auto"
        >
          {sidebarCollapsed ? <ChevronRight className="h-4 w-4" /> : <ChevronLeft className="h-4 w-4" />}
        </Button>
      </div>
    </div>
  );
  
  return (
    <div className="flex min-h-screen">
      {/* Desktop Sidebar - hidden on mobile */}
      <div className="hidden lg:block">
        {Sidebar}
      </div>
      
      <div className="flex flex-col flex-1">
        {/* Top bar */}
        <header className="flex h-14 lg:h-16 items-center gap-4 border-b bg-background px-4 lg:px-6">
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="outline" size="icon" className="lg:hidden">
                <Menu className="h-4 w-4" />
                <span className="sr-only">Toggle Menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="left" className="w-[240px] p-0">
              <ScrollArea className="h-full">
                {Sidebar}
              </ScrollArea>
            </SheetContent>
          </Sheet>
          
          <div className="hidden md:flex gap-2 ml-auto items-center">
            <div className="flex items-center gap-4">
              <Button variant="ghost" size="icon">
                <Bell className="h-4 w-4" />
              </Button>
              <Separator orientation="vertical" className="h-6" />
              <div className="flex items-center gap-4">
                <Avatar className="h-8 w-8">
                  <AvatarImage src={user?.profileImageUrl || ''} />
                  <AvatarFallback>
                    {user?.username?.substring(0, 2).toUpperCase() || 'U'}
                  </AvatarFallback>
                </Avatar>
                <div className="hidden lg:block">
                  <p className="text-sm font-medium">{user?.username}</p>
                  <p className="text-xs text-muted-foreground">{user?.email}</p>
                </div>
              </div>
            </div>
          </div>
        </header>
        
        {/* Main content */}
        <main className="flex-1 overflow-auto">
          <div className="container py-6 md:py-8 lg:py-10">
            {children}
          </div>
        </main>
      </div>
    </div>
  );
};

export default DashboardLayout;
