import React from 'react';
import { Link } from 'react-router-dom';
import { Shield } from 'lucide-react';
import { Button } from '@/components/ui/button';

const DesktopNavigation = () => {
  return (
    <nav className="hidden md:flex items-center space-x-4">
      <Link to="/" className="text-foreground/60 hover:text-foreground">
        Home
      </Link>
      <Link to="/verification" className="text-foreground/60 hover:text-foreground">
        <Button variant="ghost" size="sm" className="flex items-center gap-2">
          <Shield className="h-4 w-4" />
          Verify Account
        </Button>
      </Link>
      <Link to="/pricing" className="text-foreground/60 hover:text-foreground">
        Pricing
      </Link>
      <Link to="/contact" className="text-foreground/60 hover:text-foreground">
        Contact
      </Link>
    </nav>
  );
};

export default DesktopNavigation;
