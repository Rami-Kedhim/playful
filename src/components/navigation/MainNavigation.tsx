
import React from 'react';
import { NavLink } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { 
  Home, 
  Search, 
  MessageSquare, 
  User, 
  Compass,
  Bell,
  Brain
} from 'lucide-react';
import ThemeToggle from '@/components/ThemeToggle';

interface MainNavigationProps {
  showFullMenu?: boolean;
}

const MainNavigation: React.FC<MainNavigationProps> = ({ showFullMenu = true }) => {
  // Mock authentication status - would come from auth context
  const isAuthenticated = false;
  
  return (
    <div className={`flex ${showFullMenu ? 'justify-between' : 'justify-center'} items-center w-full px-4 py-1 bg-background border-b`}>
      {/* Logo and Primary Nav */}
      <div className="flex items-center">
        <NavLink to="/" className="font-bold text-xl mr-8 text-primary">
          UberEscorts
        </NavLink>
        
        {showFullMenu && (
          <nav className="hidden md:flex items-center space-x-6">
            <NavLink to="/" className="flex items-center gap-1.5 text-muted-foreground hover:text-foreground transition-colors">
              <Home className="w-4 h-4" />
              <span>Home</span>
            </NavLink>
            <NavLink to="/escorts" className="flex items-center gap-1.5 text-muted-foreground hover:text-foreground transition-colors">
              <Search className="w-4 h-4" />
              <span>Find</span>
            </NavLink>
            <NavLink to="/messages" className="flex items-center gap-1.5 text-muted-foreground hover:text-foreground transition-colors">
              <MessageSquare className="w-4 h-4" />
              <span>Messages</span>
            </NavLink>
            <NavLink to="/metaverse" className="flex items-center gap-1.5 text-muted-foreground hover:text-foreground transition-colors">
              <Compass className="w-4 h-4" />
              <span>Metaverse</span>
            </NavLink>
            <NavLink to="/neural/monitor" className="flex items-center gap-1.5 text-muted-foreground hover:text-foreground transition-colors">
              <Brain className="w-4 h-4" />
              <span>Neural Monitor</span>
            </NavLink>
          </nav>
        )}
      </div>
      
      {/* Right Side (Account, Theme, etc) */}
      {showFullMenu && (
        <div className="flex items-center space-x-4">
          <ThemeToggle />
          
          <NavLink to="/notifications" className="relative">
            <Bell className="w-5 h-5 text-muted-foreground hover:text-foreground transition-colors" />
            <span className="absolute top-0 right-0 w-2 h-2 bg-red-500 rounded-full"></span>
          </NavLink>
          
          {isAuthenticated ? (
            <NavLink to="/account">
              <div className="flex items-center space-x-2">
                <div className="w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center">
                  <User className="w-4 h-4" />
                </div>
                <span className="hidden lg:inline-block">Account</span>
              </div>
            </NavLink>
          ) : (
            <div className="flex space-x-2">
              <NavLink to="/login">
                <Button variant="outline" size="sm">Log in</Button>
              </NavLink>
              <NavLink to="/signup">
                <Button size="sm">Sign up</Button>
              </NavLink>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default MainNavigation;
