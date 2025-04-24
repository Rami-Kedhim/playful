
import React from 'react';
import { NavLink, Outlet } from 'react-router-dom';
import { useAuth } from '@/hooks/auth/useAuthContext';
import { useRole } from '@/hooks/auth/useRole';
import { 
  Home, 
  Calendar, 
  MessageSquare, 
  User, 
  Settings, 
  CreditCard,
  Users,
  LayoutDashboard,
  Shield,
  FileText,
  Video,
  Camera
} from 'lucide-react';
import { cn } from '@/lib/utils';

const DashboardLayout: React.FC = () => {
  const { isAuthenticated, user } = useAuth();
  const { isAdmin, isCreator, isEscort } = useRole();

  if (!isAuthenticated || !user) {
    return <div>Loading...</div>;
  }

  const displayName = user.username || user.name || user.email?.split('@')[0] || 'User';

  return (
    <div className="flex h-screen overflow-hidden">
      {/* Sidebar */}
      <div className="hidden md:flex w-64 flex-col bg-card dark:bg-card border-r">
        <div className="p-4 border-b">
          <h2 className="text-xl font-bold">Dashboard</h2>
          <p className="text-sm text-muted-foreground">Welcome, {displayName}</p>
        </div>
        
        <div className="flex flex-col flex-1 overflow-y-auto py-4">
          <nav className="px-3 space-y-1">
            <NavLink 
              to="/dashboard" 
              end
              className={({ isActive }) => 
                cn("flex items-center px-3 py-2 rounded-md text-sm",
                   isActive ? "bg-accent text-accent-foreground font-medium" : "text-muted-foreground hover:text-foreground hover:bg-accent/50")
              }
            >
              <Home className="mr-3 h-4 w-4" />
              Overview
            </NavLink>
            
            {isAdmin && (
              <NavLink 
                to="/dashboard/admin" 
                className={({ isActive }) => 
                  cn("flex items-center px-3 py-2 rounded-md text-sm",
                     isActive ? "bg-accent text-accent-foreground font-medium" : "text-muted-foreground hover:text-foreground hover:bg-accent/50")
                }
              >
                <LayoutDashboard className="mr-3 h-4 w-4" />
                Admin Panel
              </NavLink>
            )}
            
            {isCreator && (
              <NavLink 
                to="/dashboard/creator" 
                className={({ isActive }) => 
                  cn("flex items-center px-3 py-2 rounded-md text-sm",
                     isActive ? "bg-accent text-accent-foreground font-medium" : "text-muted-foreground hover:text-foreground hover:bg-accent/50")
                }
              >
                <FileText className="mr-3 h-4 w-4" />
                Creator Dashboard
              </NavLink>
            )}
            
            {isEscort && (
              <NavLink 
                to="/dashboard/escort" 
                className={({ isActive }) => 
                  cn("flex items-center px-3 py-2 rounded-md text-sm",
                     isActive ? "bg-accent text-accent-foreground font-medium" : "text-muted-foreground hover:text-foreground hover:bg-accent/50")
                }
              >
                <Calendar className="mr-3 h-4 w-4" />
                Escort Dashboard
              </NavLink>
            )}
            
            <NavLink 
              to="/dashboard/bookings" 
              className={({ isActive }) => 
                cn("flex items-center px-3 py-2 rounded-md text-sm",
                   isActive ? "bg-accent text-accent-foreground font-medium" : "text-muted-foreground hover:text-foreground hover:bg-accent/50")
              }
            >
              <Calendar className="mr-3 h-4 w-4" />
              My Bookings
            </NavLink>
            
            <NavLink 
              to="/dashboard/messages" 
              className={({ isActive }) => 
                cn("flex items-center px-3 py-2 rounded-md text-sm",
                   isActive ? "bg-accent text-accent-foreground font-medium" : "text-muted-foreground hover:text-foreground hover:bg-accent/50")
              }
            >
              <MessageSquare className="mr-3 h-4 w-4" />
              Messages
            </NavLink>
            
            <NavLink 
              to="/dashboard/profile" 
              className={({ isActive }) => 
                cn("flex items-center px-3 py-2 rounded-md text-sm",
                   isActive ? "bg-accent text-accent-foreground font-medium" : "text-muted-foreground hover:text-foreground hover:bg-accent/50")
              }
            >
              <User className="mr-3 h-4 w-4" />
              My Profile
            </NavLink>
            
            <NavLink 
              to="/dashboard/payments" 
              className={({ isActive }) => 
                cn("flex items-center px-3 py-2 rounded-md text-sm",
                   isActive ? "bg-accent text-accent-foreground font-medium" : "text-muted-foreground hover:text-foreground hover:bg-accent/50")
              }
            >
              <CreditCard className="mr-3 h-4 w-4" />
              Payments
            </NavLink>
            
            <NavLink 
              to="/dashboard/settings" 
              className={({ isActive }) => 
                cn("flex items-center px-3 py-2 rounded-md text-sm",
                   isActive ? "bg-accent text-accent-foreground font-medium" : "text-muted-foreground hover:text-foreground hover:bg-accent/50")
              }
            >
              <Settings className="mr-3 h-4 w-4" />
              Settings
            </NavLink>
            
            <NavLink 
              to="/dashboard/verification" 
              className={({ isActive }) => 
                cn("flex items-center px-3 py-2 rounded-md text-sm",
                   isActive ? "bg-accent text-accent-foreground font-medium" : "text-muted-foreground hover:text-foreground hover:bg-accent/50")
              }
            >
              <Shield className="mr-3 h-4 w-4" />
              Verification
            </NavLink>
          </nav>
        </div>
      </div>
      
      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        <main className="flex-1 overflow-y-auto p-6 bg-background">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default DashboardLayout;
