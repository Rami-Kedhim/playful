
import React from 'react';
import { Link } from 'react-router-dom';

const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();
  
  return (
    <footer className="border-t py-6 md:py-0">
      <div className="container flex flex-col items-center justify-between gap-4 md:h-16 md:flex-row">
        <p className="text-sm text-muted-foreground">
          &copy; {currentYear} UberEscorts. All rights reserved.
        </p>
        
        <nav className="flex gap-4 text-sm text-muted-foreground">
          <Link to="/safety" className="hover:text-foreground transition-colors">
            Safety
          </Link>
          <Link to="/seo" className="hover:text-foreground transition-colors">
            SEO Tools
          </Link>
          <Link to="/neural/monitor" className="hover:text-foreground transition-colors">
            Neural Monitor
          </Link>
        </nav>
      </div>
    </footer>
  );
};

export default Footer;
