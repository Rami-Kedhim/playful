
import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';

const Header: React.FC = () => {
  const { user, logout } = useAuth();

  return (
    <header className="border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto px-4 py-3 flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <Link to="/" className="text-xl font-bold">UberEscorts</Link>
          <nav className="hidden md:flex">
            <ul className="flex space-x-4">
              <li>
                <Link to="/escorts" className="text-sm hover:text-primary transition-colors">
                  Escorts
                </Link>
              </li>
              <li>
                <Link to="/creators" className="text-sm hover:text-primary transition-colors">
                  Creators
                </Link>
              </li>
              <li>
                <Link to="/livecams" className="text-sm hover:text-primary transition-colors">
                  Live Cams
                </Link>
              </li>
            </ul>
          </nav>
        </div>
        
        <div className="flex items-center space-x-4">
          {user ? (
            <>
              <Link to="/messages" className="text-sm hover:text-primary transition-colors">
                Messages
              </Link>
              <Link to="/profile" className="text-sm hover:text-primary transition-colors">
                Profile
              </Link>
              <button 
                onClick={() => logout()} 
                className="text-sm hover:text-primary transition-colors"
              >
                Logout
              </button>
            </>
          ) : (
            <>
              <Link to="/auth" className="text-sm hover:text-primary transition-colors">
                Login
              </Link>
              <Link to="/auth?tab=register" className="text-sm hover:text-primary transition-colors">
                Register
              </Link>
            </>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;
