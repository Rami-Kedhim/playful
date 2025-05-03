
import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { Menu, X } from 'lucide-react';
import { useAuth } from '@/hooks/auth';

interface MobileMenuProps {
  onClose?: () => void;
}

const MobileMenu: React.FC<MobileMenuProps> = ({ onClose }) => {
  const { isAuthenticated, logout } = useAuth();
  
  const handleLogout = async () => {
    await logout();
    onClose?.();
  };
  
  const handleLinkClick = () => {
    onClose?.();
  };
  
  return (
    <div className="flex flex-col gap-4 py-4">
      <Link to="/" className="px-2 py-1 hover:text-primary" onClick={handleLinkClick}>
        Home
      </Link>
      <Link to="/neural/monitor" className="px-2 py-1 hover:text-primary" onClick={handleLinkClick}>
        Neural Monitor
      </Link>
      <Link to="/neural/analytics" className="px-2 py-1 hover:text-primary" onClick={handleLinkClick}>
        Neural Analytics
      </Link>
      <Link to="/brain-hub" className="px-2 py-1 hover:text-primary" onClick={handleLinkClick}>
        Brain Hub
      </Link>
      <Link to="/safety" className="px-2 py-1 hover:text-primary" onClick={handleLinkClick}>
        Safety
      </Link>

      <div className="border-t pt-4 mt-2">
        {isAuthenticated ? (
          <Button variant="outline" className="w-full" onClick={handleLogout}>
            Sign Out
          </Button>
        ) : (
          <div className="flex flex-col gap-2">
            <Link to="/auth?tab=login" onClick={handleLinkClick}>
              <Button variant="outline" className="w-full">Sign In</Button>
            </Link>
            <Link to="/auth?tab=register" onClick={handleLinkClick}>
              <Button className="w-full">Sign Up</Button>
            </Link>
          </div>
        )}
      </div>
    </div>
  );
};

export default MobileMenu;
