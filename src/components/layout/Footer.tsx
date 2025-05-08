
import React from 'react';
import { Link } from 'react-router-dom';

const Footer: React.FC = () => {
  return (
    <footer className="border-t py-6 px-4">
      <div className="container mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="mb-4 md:mb-0">
            <h3 className="font-bold text-lg">UberEscorts</h3>
            <p className="text-sm text-muted-foreground">© 2025 UberEscorts. All rights reserved.</p>
          </div>
          
          <nav className="flex gap-6">
            <Link to="/about" className="text-sm hover:underline">About</Link>
            <Link to="/terms" className="text-sm hover:underline">Terms</Link>
            <Link to="/privacy" className="text-sm hover:underline">Privacy</Link>
            <Link to="/contact" className="text-sm hover:underline">Contact</Link>
          </nav>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
