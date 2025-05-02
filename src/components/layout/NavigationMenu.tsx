
import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { cn } from '@/lib/utils';
import { useAuth } from '@/hooks/auth/useAuthContext';
import { Button } from '@/components/ui/button';
import {
  Search,
  MessageSquare,
  User,
  Heart,
  Menu,
  X,
  Users,
  Home,
  Image,
  Brain
} from 'lucide-react';

export function NavigationMenu() {
  const [isOpen, setIsOpen] = React.useState(false);
  const { user } = useAuth();
  const location = useLocation();
  
  const toggleMenu = () => setIsOpen(!isOpen);
  
  const isActivePath = (path: string): boolean => {
    if (path === '/' && location.pathname === '/') {
      return true;
    }
    // For non-home routes, check if pathname starts with path
    return path !== '/' && location.pathname.startsWith(path);
  };
  
  const NavItem = ({ to, icon, label }: { to: string; icon: React.ReactNode; label: string }) => (
    <Link
      to={to}
      className={cn(
        "flex items-center gap-2 px-4 py-2 rounded-md transition-colors hover:bg-accent",
        isActivePath(to) && "bg-accent text-accent-foreground font-medium"
      )}
      onClick={() => setIsOpen(false)}
    >
      {icon}
      <span>{label}</span>
    </Link>
  );
  
  return (
    <>
      {/* Mobile Toggle Button */}
      <div className="lg:hidden">
        <Button variant="ghost" size="icon" onClick={toggleMenu}>
          {isOpen ? <X /> : <Menu />}
        </Button>
      </div>
      
      {/* Navigation Links - Desktop */}
      <nav className="hidden lg:flex items-center gap-1">
        <NavItem to="/" icon={<Home size={18} />} label="Home" />
        <NavItem to="/escorts" icon={<Users size={18} />} label="Escorts" />
        <NavItem to="/search" icon={<Search size={18} />} label="Search" />
        <NavItem to="/neural/monitor" icon={<Brain size={18} />} label="Neural Monitor" />
        
        {user && (
          <>
            <NavItem to="/messages" icon={<MessageSquare size={18} />} label="Messages" />
            <NavItem to="/favorites" icon={<Heart size={18} />} label="Favorites" />
            <NavItem to="/content" icon={<Image size={18} />} label="Content" />
            <NavItem to="/profile" icon={<User size={18} />} label="Profile" />
          </>
        )}
      </nav>
      
      {/* Navigation Links - Mobile */}
      {isOpen && (
        <div className="lg:hidden fixed inset-0 z-50 bg-background pt-16 px-4">
          <nav className="flex flex-col gap-2">
            <NavItem to="/" icon={<Home size={18} />} label="Home" />
            <NavItem to="/escorts" icon={<Users size={18} />} label="Escorts" />
            <NavItem to="/search" icon={<Search size={18} />} label="Search" />
            <NavItem to="/neural/monitor" icon={<Brain size={18} />} label="Neural Monitor" />
            
            {user && (
              <>
                <NavItem to="/messages" icon={<MessageSquare size={18} />} label="Messages" />
                <NavItem to="/favorites" icon={<Heart size={18} />} label="Favorites" />
                <NavItem to="/content" icon={<Image size={18} />} label="Content" />
                <NavItem to="/profile" icon={<User size={18} />} label="Profile" />
              </>
            )}
          </nav>
        </div>
      )}
    </>
  );
}
