
import React from 'react';
import { Link } from 'react-router-dom';
import { 
  Shield, 
  Brain, 
  MessageSquare, 
  Github, 
  Laptop, 
  AlertTriangle, 
  Heart, 
  Info,
  Headphones,
  Video,
  Users
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

interface FooterProps {
  className?: string;
  simplified?: boolean;
}

const Footer: React.FC<FooterProps> = ({ className, simplified = false }) => {
  const currentYear = new Date().getFullYear();
  
  // If simplified is true, return a simpler version
  if (simplified) {
    return (
      <footer className={cn("border-t py-6 md:py-0", className)}>
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
  }
  
  // Full footer
  return (
    <footer className={cn("border-t border-border/40 bg-background", className)}>
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <h3 className="font-bold text-lg mb-4 flex items-center">
              <Laptop className="h-5 w-5 mr-2 text-primary" />
              UberEscorts
            </h3>
            <p className="text-muted-foreground">
              The premier platform for secure, verified connections and premium services.
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
                  Escorts
                </Link>
              </li>
              <li>
                <Link to="/creators" className="text-muted-foreground hover:text-foreground transition-colors">
                  Creators
                </Link>
              </li>
              <li>
                <Link to="/livecams" className="text-muted-foreground hover:text-foreground transition-colors">
                  Livecams
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
              <li>
                <Link to="/favorites" className="text-muted-foreground hover:text-foreground transition-colors flex items-center gap-2">
                  <Heart className="h-4 w-4" /> Favorites
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
              <li>
                <Link to="/compliance" className="text-muted-foreground hover:text-foreground transition-colors flex items-center gap-2">
                  <AlertTriangle className="h-4 w-4" /> Compliance Center
                </Link>
              </li>
            </ul>
          </div>
        </div>
        
        <div className="border-t border-border mt-8 pt-6 flex flex-col md:flex-row justify-between items-center">
          <p className="text-sm text-muted-foreground">
            &copy; {currentYear} UberEscorts. All rights reserved.
          </p>
          <div className="flex items-center space-x-4 mt-4 md:mt-0">
            <Link to="/about" className="text-muted-foreground hover:text-foreground">About</Link>
            <Link to="/contact" className="text-muted-foreground hover:text-foreground">Contact</Link>
            <Link to="/faq" className="text-muted-foreground hover:text-foreground">FAQ</Link>
            <a href="#" className="text-muted-foreground hover:text-foreground" aria-label="Project Repository">
              <Github className="h-5 w-5" />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
