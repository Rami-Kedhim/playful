
import React from 'react';
import { Link } from 'react-router-dom';

const Footer = () => {
  const currentYear = new Date().getFullYear();
  
  return (
    <footer className="bg-background border-t">
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <h3 className="text-lg font-semibold mb-4">UberEscorts</h3>
            <p className="text-sm text-muted-foreground">
              The premium platform for escorts, content creators, and live cams powered by AI.
            </p>
          </div>
          
          <div>
            <h3 className="text-lg font-semibold mb-4">Services</h3>
            <ul className="space-y-2">
              <li><Link to="/escorts" className="text-sm hover:text-primary">Escorts</Link></li>
              <li><Link to="/creators" className="text-sm hover:text-primary">Content Creators</Link></li>
              <li><Link to="/livecams" className="text-sm hover:text-primary">Live Cams</Link></li>
              <li><Link to="/media-generation" className="text-sm hover:text-primary">AI Media Generation</Link></li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-lg font-semibold mb-4">Company</h3>
            <ul className="space-y-2">
              <li><Link to="/about" className="text-sm hover:text-primary">About Us</Link></li>
              <li><Link to="/privacy" className="text-sm hover:text-primary">Privacy Policy</Link></li>
              <li><Link to="/terms" className="text-sm hover:text-primary">Terms of Service</Link></li>
              <li><Link to="/contact" className="text-sm hover:text-primary">Contact Us</Link></li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-lg font-semibold mb-4">Safety</h3>
            <ul className="space-y-2">
              <li><Link to="/safety" className="text-sm hover:text-primary">Safety Center</Link></li>
              <li><Link to="/safety/route-share" className="text-sm hover:text-primary">Route Sharing</Link></li>
              <li><Link to="/neural-monitor" className="text-sm hover:text-primary">Neural Hub</Link></li>
            </ul>
          </div>
        </div>
        
        <div className="border-t mt-8 pt-6 flex flex-col md:flex-row justify-between items-center">
          <p className="text-sm text-muted-foreground">
            © {currentYear} UberEscorts. All rights reserved.
          </p>
          <div className="flex gap-4 mt-4 md:mt-0">
            <Link to="#" className="text-sm text-muted-foreground hover:text-primary">
              Instagram
            </Link>
            <Link to="#" className="text-sm text-muted-foreground hover:text-primary">
              Twitter
            </Link>
            <Link to="#" className="text-sm text-muted-foreground hover:text-primary">
              Facebook
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
