
import { ReactNode, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { 
  LayoutDashboard, 
  Users, 
  FileText, 
  DollarSign, 
  Settings,
  ChevronRight,
  Menu,
  X
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useAuth } from "@/contexts/AuthContext";
import MainLayout from "../layout/MainLayout";

interface SidebarItemProps {
  icon: React.ElementType;
  label: string;
  href: string;
  active: boolean;
}

const SidebarItem = ({ icon: Icon, label, href, active }: SidebarItemProps) => {
  return (
    <Link to={href}>
      <Button
        variant={active ? "default" : "ghost"}
        className="w-full justify-start gap-3 mb-1"
      >
        <Icon size={18} />
        <span>{label}</span>
        {active && <ChevronRight size={16} className="ml-auto" />}
      </Button>
    </Link>
  );
};

interface DashboardLayoutProps {
  children: ReactNode;
  title: string;
  role: 'creator' | 'escort' | 'admin';
}

const DashboardLayout = ({ children, title, role }: DashboardLayoutProps) => {
  const location = useLocation();
  const { checkRole } = useAuth();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const toggleSidebar = () => setSidebarOpen(!sidebarOpen);

  const creatorNavItems = [
    {
      icon: LayoutDashboard,
      label: "Dashboard",
      href: "/creator-dashboard",
    },
    {
      icon: FileText,
      label: "Content",
      href: "/creator-dashboard/content",
    },
    {
      icon: Users,
      label: "Subscribers",
      href: "/creator-dashboard/subscribers",
    },
    {
      icon: DollarSign,
      label: "Earnings",
      href: "/creator-dashboard/earnings",
    },
    {
      icon: Settings,
      label: "Settings",
      href: "/creator-dashboard/settings",
    },
  ];

  const escortNavItems = [
    {
      icon: LayoutDashboard,
      label: "Dashboard",
      href: "/escort-dashboard",
    },
    {
      icon: Users,
      label: "Bookings",
      href: "/escort-dashboard/bookings",
    },
    {
      icon: FileText,
      label: "Profile",
      href: "/escort-dashboard/profile",
    },
    {
      icon: DollarSign,
      label: "Earnings",
      href: "/escort-dashboard/earnings",
    },
    {
      icon: Settings,
      label: "Settings",
      href: "/escort-dashboard/settings",
    },
  ];

  const adminNavItems = [
    {
      icon: LayoutDashboard,
      label: "Dashboard",
      href: "/admin",
    },
    {
      icon: Users,
      label: "Users",
      href: "/admin/users",
    },
    {
      icon: FileText,
      label: "Content",
      href: "/admin/content",
    },
    {
      icon: DollarSign,
      label: "Transactions",
      href: "/admin/transactions",
    },
    {
      icon: Settings,
      label: "Settings",
      href: "/admin/settings",
    },
  ];

  const navItems = 
    role === 'creator' ? creatorNavItems :
    role === 'escort' ? escortNavItems :
    adminNavItems;

  return (
    <MainLayout containerClass="container mx-auto px-0 py-0" showHeader={false}>
      <div className="flex h-screen overflow-hidden">
        {/* Mobile sidebar toggle */}
        <Button
          variant="ghost"
          size="icon"
          className="absolute top-4 left-4 z-50 md:hidden"
          onClick={toggleSidebar}
        >
          {sidebarOpen ? <X size={20} /> : <Menu size={20} />}
        </Button>

        {/* Sidebar */}
        <div 
          className={`fixed inset-y-0 left-0 transform md:relative md:translate-x-0 transition duration-200 ease-in-out z-40 
            ${sidebarOpen ? "translate-x-0" : "-translate-x-full md:translate-x-0"}
            bg-background border-r w-64 md:w-64`}
        >
          <div className="p-6 flex justify-between items-center border-b">
            <h2 className="text-lg font-bold">{role.charAt(0).toUpperCase() + role.slice(1)} Portal</h2>
          </div>
          <ScrollArea className="h-[calc(100vh-64px)]">
            <div className="p-4">
              {navItems.map((item) => (
                <SidebarItem
                  key={item.href}
                  icon={item.icon}
                  label={item.label}
                  href={item.href}
                  active={location.pathname === item.href}
                />
              ))}
            </div>
          </ScrollArea>
        </div>

        {/* Main content */}
        <div className="flex-1 flex flex-col overflow-hidden">
          <header className="bg-background border-b p-4">
            <div className="flex justify-between items-center">
              <h1 className="text-xl md:text-2xl font-bold">{title}</h1>
              <div className="flex space-x-2">
                {/* Dashboard actions can go here */}
              </div>
            </div>
          </header>
          <main className="flex-1 overflow-y-auto p-4 md:p-6">
            {children}
          </main>
        </div>
      </div>
    </MainLayout>
  );
};

export default DashboardLayout;
