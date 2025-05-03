
import React from 'react';
import { Link } from 'react-router-dom';
import { AppPaths } from '@/routes/routeConfig';
import { Brain, Shield, Heart } from 'lucide-react';

const Footer = () => {
  const currentYear = new Date().getFullYear();
  
  return (
    <footer className="border-t border-border mt-auto">
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <h3 className="font-semibold text-lg mb-4">UberEscorts</h3>
            <p className="text-sm text-muted-foreground mb-4">
              The next generation platform unifying human escorts, creators, 
              AI companions, and live performers.
            </p>
            <div className="flex items-center gap-4">
              {/* Social icons would go here */}
            </div>
          </div>
          
          <div>
            <h3 className="font-semibold mb-4">Services</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link to={AppPaths.ESCORTS} className="text-muted-foreground hover:text-foreground transition-colors">
                  Escorts
                </Link>
              </li>
              <li>
                <Link to={AppPaths.AI_COMPANION} className="text-muted-foreground hover:text-foreground transition-colors">
                  AI Companions
                </Link>
              </li>
              <li>
                <Link to="/metaverse" className="text-muted-foreground hover:text-foreground transition-colors">
                  Metaverse
                </Link>
              </li>
            </ul>
          </div>
          
          <div>
            <h3 className="font-semibold mb-4">Resources</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link to={AppPaths.SAFETY} className="flex items-center gap-1.5 text-muted-foreground hover:text-foreground transition-colors">
                  <Shield className="w-4 h-4" /> Safety Center
                </Link>
              </li>
              <li>
                <Link to={AppPaths.BRAIN_HUB} className="flex items-center gap-1.5 text-muted-foreground hover:text-foreground transition-colors">
                  <Brain className="w-4 h-4" /> Brain Hub
                </Link>
              </li>
              <li>
                <Link to="/favorites" className="flex items-center gap-1.5 text-muted-foreground hover:text-foreground transition-colors">
                  <Heart className="w-4 h-4" /> Favorites
                </Link>
              </li>
            </ul>
          </div>
          
          <div>
            <h3 className="font-semibold mb-4">Legal</h3>
            <ul className="space-y-2 text-sm">
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
                <Link to="/cookies" className="text-muted-foreground hover:text-foreground transition-colors">
                  Cookie Policy
                </Link>
              </li>
            </ul>
          </div>
        </div>
        
        <div className="border-t border-border mt-8 pt-4 flex flex-col md:flex-row justify-between items-center">
          <p className="text-sm text-muted-foreground">
            © {currentYear} UberEscorts. All rights reserved.
          </p>
          
          <div className="flex gap-4 mt-4 md:mt-0">
            <Link to="/help" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
              Help
            </Link>
            <Link to="/contact" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
              Contact
            </Link>
            <Link to="/sitemap" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
              Sitemap
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
