
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { 
  Menu, X, User, Search, Bell, Wallet, MessagesSquare
} from 'lucide-react';

const Navbar: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  
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
              <Link to="/escorts" className="px-3 py-2 text-sm font-medium">
                Escorts
              </Link>
              <Link to="/ai-companions" className="px-3 py-2 text-sm font-medium">
                AI Companions
              </Link>
              <Link to="/creators" className="px-3 py-2 text-sm font-medium">
                Creators
              </Link>
              <Link to="/metaverse" className="px-3 py-2 text-sm font-medium">
                Metaverse
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
            <Link to="/profile">
              <Button variant="ghost" size="icon">
                <Bell className="h-5 w-5" />
              </Button>
            </Link>
            <Link to="/profile">
              <Button>
                <User className="h-4 w-4 mr-2" />
                Profile
              </Button>
            </Link>
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
              to="/ai-companions" 
              className="px-3 py-2 text-sm font-medium rounded-md hover:bg-accent"
              onClick={() => setIsMenuOpen(false)}
            >
              AI Companions
            </Link>
            <Link 
              to="/creators" 
              className="px-3 py-2 text-sm font-medium rounded-md hover:bg-accent"
              onClick={() => setIsMenuOpen(false)}
            >
              Creators
            </Link>
            <Link 
              to="/metaverse" 
              className="px-3 py-2 text-sm font-medium rounded-md hover:bg-accent"
              onClick={() => setIsMenuOpen(false)}
            >
              Metaverse
            </Link>
            <div className="border-t border-border pt-3 flex justify-around">
              <Link to="/search" onClick={() => setIsMenuOpen(false)}>
                <Button variant="ghost" size="icon">
                  <Search className="h-5 w-5" />
                </Button>
              </Link>
              <Link to="/messages" onClick={() => setIsMenuOpen(false)}>
                <Button variant="ghost" size="icon">
                  <MessagesSquare className="h-5 w-5" />
                </Button>
              </Link>
              <Link to="/wallet" onClick={() => setIsMenuOpen(false)}>
                <Button variant="ghost" size="icon">
                  <Wallet className="h-5 w-5" />
                </Button>
              </Link>
              <Link to="/profile" onClick={() => setIsMenuOpen(false)}>
                <Button variant="ghost" size="icon">
                  <User className="h-5 w-5" />
                </Button>
              </Link>
            </div>
          </nav>
        </div>
      )}
    </header>
  );
};

export default Navbar;
