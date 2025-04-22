
import React from 'react';
import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer className="border-t bg-background">
      <div className="container py-8 px-4 md:px-6">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          <div>
            <h3 className="text-lg font-semibold mb-4">UberEscorts</h3>
            <p className="text-sm text-muted-foreground">
              Real • Virtual • Intelligent — Explore the UberPersona Multiverse
            </p>
          </div>
          
          <div>
            <h4 className="text-sm font-semibold mb-4">Resources</h4>
            <ul className="space-y-2">
              <li>
                <Link to="/about" className="text-sm text-muted-foreground hover:text-foreground transition">
                  About Us
                </Link>
              </li>
              <li>
                <Link to="/faq" className="text-sm text-muted-foreground hover:text-foreground transition">
                  FAQ
                </Link>
              </li>
              <li>
                <Link to="/support" className="text-sm text-muted-foreground hover:text-foreground transition">
                  Support
                </Link>
              </li>
            </ul>
          </div>
          
          <div>
            <h4 className="text-sm font-semibold mb-4">For Creators</h4>
            <ul className="space-y-2">
              <li>
                <Link to="/creator-signup" className="text-sm text-muted-foreground hover:text-foreground transition">
                  Become a Creator
                </Link>
              </li>
              <li>
                <Link to="/creator-login" className="text-sm text-muted-foreground hover:text-foreground transition">
                  Creator Login
                </Link>
              </li>
              <li>
                <Link to="/creator-resources" className="text-sm text-muted-foreground hover:text-foreground transition">
                  Resources
                </Link>
              </li>
            </ul>
          </div>
          
          <div>
            <h4 className="text-sm font-semibold mb-4">Legal</h4>
            <ul className="space-y-2">
              <li>
                <Link to="/terms" className="text-sm text-muted-foreground hover:text-foreground transition">
                  Terms of Service
                </Link>
              </li>
              <li>
                <Link to="/privacy" className="text-sm text-muted-foreground hover:text-foreground transition">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link to="/compliance" className="text-sm text-muted-foreground hover:text-foreground transition">
                  Compliance
                </Link>
              </li>
            </ul>
          </div>
        </div>
        
        <div className="flex flex-col md:flex-row justify-between items-center mt-8 pt-8 border-t">
          <p className="text-xs text-muted-foreground">
            © {new Date().getFullYear()} UberEscorts. All rights reserved.
          </p>
          <div className="flex items-center gap-4 mt-4 md:mt-0">
            <Link to="/terms" className="text-xs text-muted-foreground hover:text-foreground transition">Terms</Link>
            <Link to="/privacy" className="text-xs text-muted-foreground hover:text-foreground transition">Privacy</Link>
            <Link to="/cookies" className="text-xs text-muted-foreground hover:text-foreground transition">Cookies</Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
