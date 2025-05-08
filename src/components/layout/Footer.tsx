
import React from 'react';
import { Link } from 'react-router-dom';
import { AppPaths } from '@/routes/routeConfig';

export const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();
  
  return (
    <footer className="border-t border-border mt-auto bg-background">
      <div className="container mx-auto px-4 py-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <h3 className="font-medium mb-3">UberEscorts</h3>
            <p className="text-sm text-muted-foreground">
              Providing premium services and experiences.
            </p>
          </div>
          
          <div>
            <h3 className="font-medium mb-3">Quick Links</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link to={AppPaths.HOME} className="text-muted-foreground hover:text-foreground">
                  Home
                </Link>
              </li>
              <li>
                <Link to={AppPaths.ESCORTS} className="text-muted-foreground hover:text-foreground">
                  Escorts
                </Link>
              </li>
              <li>
                <Link to={AppPaths.NEURAL_MONITOR} className="text-muted-foreground hover:text-foreground">
                  Neural Monitor
                </Link>
              </li>
              <li>
                <Link to={AppPaths.SEO} className="text-muted-foreground hover:text-foreground">
                  SEO Tools
                </Link>
              </li>
            </ul>
          </div>
          
          <div>
            <h3 className="font-medium mb-3">Legal</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link to={AppPaths.PRIVACY} className="text-muted-foreground hover:text-foreground">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link to={AppPaths.TERMS} className="text-muted-foreground hover:text-foreground">
                  Terms of Service
                </Link>
              </li>
              <li>
                <Link to={AppPaths.COMPLIANCE} className="text-muted-foreground hover:text-foreground">
                  Compliance Center
                </Link>
              </li>
            </ul>
          </div>
        </div>
        
        <div className="border-t border-border mt-6 pt-6 text-center text-sm text-muted-foreground">
          © {currentYear} UberEscorts. All rights reserved.
        </div>
      </div>
    </footer>
  );
};

export default Footer;
