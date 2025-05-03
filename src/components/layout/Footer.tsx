
import React from 'react';
import { Link } from 'react-router-dom';

const Footer: React.FC = () => {
  return (
    <footer className="border-t border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto px-4 py-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <h3 className="font-semibold mb-4">UberEscorts</h3>
            <p className="text-sm text-muted-foreground">
              The premium platform for quality companionship.
            </p>
          </div>
          
          <div>
            <h3 className="font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/safety" className="text-sm hover:text-primary transition-colors">
                  Safety
                </Link>
              </li>
              <li>
                <Link to="/ai-companion" className="text-sm hover:text-primary transition-colors">
                  AI Companions
                </Link>
              </li>
              <li>
                <Link to="/brain-hub" className="text-sm hover:text-primary transition-colors">
                  Brain Hub
                </Link>
              </li>
            </ul>
          </div>
          
          <div>
            <h3 className="font-semibold mb-4">Resources</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/share" className="text-sm hover:text-primary transition-colors">
                  Route Share
                </Link>
              </li>
              <li>
                <Link to="/neural/monitor" className="text-sm hover:text-primary transition-colors">
                  Neural Monitor
                </Link>
              </li>
              <li>
                <Link to="/seo" className="text-sm hover:text-primary transition-colors">
                  SEO Tools
                </Link>
              </li>
            </ul>
          </div>
        </div>
        
        <div className="mt-8 pt-4 border-t border-border/40 text-center">
          <p className="text-sm text-muted-foreground">
            © {new Date().getFullYear()} UberEscorts. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
