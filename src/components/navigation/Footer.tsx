
import React from 'react';
import { Link } from 'react-router-dom';

const Footer = () => {
  const currentYear = new Date().getFullYear();
  
  return (
    <footer className="border-t py-6 bg-background">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="mb-4 md:mb-0">
            <p className="text-sm text-muted-foreground">
              © {currentYear} Your App. All rights reserved.
            </p>
          </div>
          
          <nav className="flex flex-wrap gap-4 md:gap-6">
            <Link to="/" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
              Home
            </Link>
            <Link to="/search" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
              Search
            </Link>
            <Link to="/wallet" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
              Wallet
            </Link>
            <Link to="/settings" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
              Settings
            </Link>
          </nav>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
