
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { cn } from '@/lib/utils';
import { Menu } from 'lucide-react';

interface MobileMenuProps {
  className?: string;
}

export const MobileMenu = ({ className }: MobileMenuProps) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className={cn(className)}>
      <button 
        className="p-2" 
        onClick={() => setIsOpen(!isOpen)}
      >
        <Menu className="h-5 w-5" />
      </button>
      
      {isOpen && (
        <div className="absolute top-16 right-0 w-64 bg-background border shadow-lg p-4 z-50">
          <div className="flex flex-col space-y-3">
            <Link 
              to="/" 
              className="text-sm font-medium hover:text-primary"
              onClick={() => setIsOpen(false)}
            >
              Home
            </Link>
            <Link 
              to="/escorts" 
              className="text-sm font-medium hover:text-primary"
              onClick={() => setIsOpen(false)}
            >
              Escorts
            </Link>
            <Link 
              to="/creators" 
              className="text-sm font-medium hover:text-primary"
              onClick={() => setIsOpen(false)}
            >
              Creators
            </Link>
          </div>
        </div>
      )}
    </div>
  );
};
