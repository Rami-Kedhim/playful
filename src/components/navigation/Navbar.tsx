
import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { 
  Menu, X, User, Search, Bell, Wallet, MessagesSquare, Brain, Shield
} from 'lucide-react';
import { useAuth } from '@/hooks/auth';

const Navbar: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { user, logout } = useAuth();
  const location = useLocation();
  
  const handleLogout = async () => {
    await logout();
  };
  
  // Check if a path is active
  const isActive = (path: string) => {
    return location.pathname === path || 
      (path !== '/' && location.pathname.startsWith(path));
  };
  
  return (
    <header className="bg-background border-b border-border sticky top-0 z-40">
      <div className="container mx-auto px-4">
        <div className="flex h-16 items-center justify-between">
          {/* Logo and Brand */}
          <div className="flex items-center">
            <Link to="/" className="flex items-center">
              <span className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-purple-500 to-pink-500">
                UberPersona
              </span>
            </Link>
            
            {/* Desktop Navigation */}
            <nav className="ml-8 hidden md:flex space-x-4">
              <Link 
                to="/escorts" 
                className={`px-3 py-2 text-sm font-medium ${isActive('/escorts') ? 'text-primary' : ''}`}
              >
                Escorts
              </Link>
              <Link 
                to="/ai-companion" 
                className={`px-3 py-2 text-sm font-medium ${isActive('/ai-companion') ? 'text-primary' : ''}`}
              >
                AI Companions
              </Link>
              <Link 
                to="/neural/monitor" 
                className={`px-3 py-2 text-sm font-medium ${isActive('/neural') ? 'text-primary' : ''}`}
              >
                Neural
              </Link>
              <Link 
                to="/safety" 
                className={`px-3 py-2 text-sm font-medium ${isActive('/safety') ? 'text-primary' : ''}`}
              >
                Safety
              </Link>
            </nav>
          </div>
          
          {/* Desktop Actions */}
          <div className="hidden md:flex items-center space-x-2">
            <Link to="/search">
              <Button variant="ghost" size="icon">
                <Search className="h-5 w-5" />
              </Button>
            </Link>
            <Link to="/messages">
              <Button variant="ghost" size="icon">
                <MessagesSquare className="h-5 w-5" />
              </Button>
            </Link>
            <Link to="/wallet">
              <Button variant="ghost" size="icon">
                <Wallet className="h-5 w-5" />
              </Button>
            </Link>
            <Link to="/notifications">
              <Button variant="ghost" size="icon">
                <Bell className="h-5 w-5" />
              </Button>
            </Link>
            {user ? (
              <div className="flex items-center gap-2">
                <Link to="/profile">
                  <Button variant="ghost">
                    <User className="h-4 w-4 mr-2" />
                    Profile
                  </Button>
                </Link>
                <Button variant="outline" onClick={handleLogout}>
                  Logout
                </Button>
              </div>
            ) : (
              <Link to="/auth">
                <Button>
                  <User className="h-4 w-4 mr-2" />
                  Login
                </Button>
              </Link>
            )}
          </div>
          
          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <Button 
              variant="ghost" 
              size="icon" 
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </Button>
          </div>
        </div>
      </div>
      
      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="md:hidden p-4 pb-6 pt-2 border-b border-border">
          <nav className="flex flex-col space-y-3">
            <Link 
              to="/escorts" 
              className="px-3 py-2 text-sm font-medium rounded-md hover:bg-accent"
              onClick={() => setIsMenuOpen(false)}
            >
              Escorts
            </Link>
            <Link 
              to="/ai-companion" 
              className="px-3 py-2 text-sm font-medium rounded-md hover:bg-accent"
              onClick={() => setIsMenuOpen(false)}
            >
              AI Companions
            </Link>
            <Link 
              to="/neural/monitor" 
              className="px-3 py-2 text-sm font-medium rounded-md hover:bg-accent"
              onClick={() => setIsMenuOpen(false)}
            >
              Neural Monitor
            </Link>
            <Link 
              to="/safety" 
              className="px-3 py-2 text-sm font-medium rounded-md hover:bg-accent"
              onClick={() => setIsMenuOpen(false)}
            >
              Safety
            </Link>
            <Link 
              to="/wallet" 
              className="px-3 py-2 text-sm font-medium rounded-md hover:bg-accent"
              onClick={() => setIsMenuOpen(false)}
            >
              Wallet
            </Link>
            <Link 
              to="/profile" 
              className="px-3 py-2 text-sm font-medium rounded-md hover:bg-accent"
              onClick={() => setIsMenuOpen(false)}
            >
              Profile
            </Link>
            {user ? (
              <Button 
                variant="outline" 
                onClick={() => {
                  handleLogout();
                  setIsMenuOpen(false);
                }}
                className="mt-2"
              >
                Logout
              </Button>
            ) : (
              <Link 
                to="/auth" 
                onClick={() => setIsMenuOpen(false)}
                className="w-full"
              >
                <Button className="w-full mt-2">Login</Button>
              </Link>
            )}
          </nav>
        </div>
      )}
    </header>
  );
};

export default Navbar;
