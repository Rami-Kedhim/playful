
import React from 'react';
import { Link } from 'react-router-dom';
import { Shield, Brain, MessageSquare, Github } from 'lucide-react';

const Footer = () => {
  const currentYear = new Date().getFullYear();
  
  return (
    <footer className="border-t border-border/40 bg-background">
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <h3 className="font-bold text-lg mb-4">UberPlatform</h3>
            <p className="text-muted-foreground">
              The premier Web3 platform for secure, verified connections and services.
            </p>
          </div>
          
          <div>
            <h3 className="font-medium mb-4">Platform</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/" className="text-muted-foreground hover:text-foreground transition-colors">
                  Home
                </Link>
              </li>
              <li>
                <Link to="/escorts" className="text-muted-foreground hover:text-foreground transition-colors">
                  Explore
                </Link>
              </li>
              <li>
                <Link to="/wallet" className="text-muted-foreground hover:text-foreground transition-colors">
                  Wallet
                </Link>
              </li>
              <li>
                <Link to="/profile" className="text-muted-foreground hover:text-foreground transition-colors">
                  Profile
                </Link>
              </li>
            </ul>
          </div>
          
          <div>
            <h3 className="font-medium mb-4">Features</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/safety" className="text-muted-foreground hover:text-foreground transition-colors flex items-center gap-2">
                  <Shield className="h-4 w-4" /> Safety
                </Link>
              </li>
              <li>
                <Link to="/neural/monitor" className="text-muted-foreground hover:text-foreground transition-colors flex items-center gap-2">
                  <Brain className="h-4 w-4" /> Neural Monitor
                </Link>
              </li>
              <li>
                <Link to="/messages" className="text-muted-foreground hover:text-foreground transition-colors flex items-center gap-2">
                  <MessageSquare className="h-4 w-4" /> Messaging
                </Link>
              </li>
            </ul>
          </div>
          
          <div>
            <h3 className="font-medium mb-4">Legal</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/terms" className="text-muted-foreground hover:text-foreground transition-colors">
                  Terms of Service
                </Link>
              </li>
              <li>
                <Link to="/privacy" className="text-muted-foreground hover:text-foreground transition-colors">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link to="/guidelines" className="text-muted-foreground hover:text-foreground transition-colors">
                  Community Guidelines
                </Link>
              </li>
            </ul>
          </div>
        </div>
        
        <div className="border-t border-border mt-8 pt-6 flex flex-col md:flex-row justify-between items-center">
          <p className="text-sm text-muted-foreground">
            &copy; {currentYear} UberPlatform. All rights reserved.
          </p>
          <div className="flex items-center space-x-4 mt-4 md:mt-0">
            <a href="https://github.com" className="text-muted-foreground hover:text-foreground" target="_blank" rel="noreferrer">
              <Github className="h-5 w-5" />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
