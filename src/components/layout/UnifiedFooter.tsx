import React from 'react';
import { Link } from 'react-router-dom';
import { APP_PATHS } from '@/routes/routeConfig';
import { 
  Twitter, 
  Instagram, 
  Facebook, 
  Github,
  Shield
} from 'lucide-react';

interface UnifiedFooterProps {
  className?: string;
  showSocialLinks?: boolean;
  showLegalLinks?: boolean;
  showAppLinks?: boolean;
}

const UnifiedFooter: React.FC<UnifiedFooterProps> = ({ 
  className = '', 
  showSocialLinks = true,
  showLegalLinks = true,
  showAppLinks = true
}) => {
  const currentYear = new Date().getFullYear();

  // Legal links
  const legalLinks = [
    { label: 'Terms', path: APP_PATHS.TERMS },
    { label: 'Privacy', path: APP_PATHS.PRIVACY },
    { label: 'Safety', path: APP_PATHS.SAFETY },
    { label: 'Contact', path: APP_PATHS.CONTACT }
  ];
  
  // App section links
  const appLinks = [
    { label: 'Escorts', path: APP_PATHS.ESCORTS },
    { label: 'Creators', path: APP_PATHS.CREATORS },
    { label: 'Livecams', path: APP_PATHS.LIVECAMS },
    { label: 'Metaverse', path: APP_PATHS.METAVERSE }
  ];
  
  // Social media links
  const socialLinks = [
    { 
      label: 'Twitter', 
      icon: <Twitter size={18} />, 
      url: 'https://twitter.com/uberescorts' 
    },
    { 
      label: 'Instagram', 
      icon: <Instagram size={18} />, 
      url: 'https://instagram.com/uberescorts' 
    },
    { 
      label: 'Facebook', 
      icon: <Facebook size={18} />, 
      url: 'https://facebook.com/uberescorts' 
    },
    { 
      label: 'Github', 
      icon: <Github size={18} />, 
      url: 'https://github.com/uberecosystem' 
    }
  ];

  return (
    <footer className={`bg-background border-t border-border mt-auto ${className}`}>
      <div className="container mx-auto py-8 px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Brand column */}
          <div>
            <h3 className="text-lg font-semibold mb-4">UberEscorts</h3>
            <p className="text-sm text-muted-foreground mb-4">
              Premium companion experiences with advanced technology integration.
            </p>
            
            {/* Safety badge */}
            <Link 
              to={APP_PATHS.SAFETY}
              className="inline-flex items-center rounded-full bg-primary/10 border border-primary/20 px-3 py-1 text-sm text-primary hover:bg-primary/20 transition-colors"
            >
              <Shield className="w-3.5 h-3.5 mr-1.5" />
              Safety Verified
            </Link>
          </div>
          
          {/* App links column */}
          {showAppLinks && (
            <div>
              <h3 className="text-lg font-semibold mb-4">Explore</h3>
              <ul className="space-y-2">
                {appLinks.map(link => (
                  <li key={link.path}>
                    <Link 
                      to={link.path} 
                      className="text-sm text-muted-foreground hover:text-foreground"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          )}
          
          {/* Legal links column */}
          {showLegalLinks && (
            <div>
              <h3 className="text-lg font-semibold mb-4">Legal</h3>
              <ul className="space-y-2">
                {legalLinks.map(link => (
                  <li key={link.path}>
                    <Link 
                      to={link.path} 
                      className="text-sm text-muted-foreground hover:text-foreground"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          )}
          
          {/* Social links column */}
          {showSocialLinks && (
            <div>
              <h3 className="text-lg font-semibold mb-4">Connect</h3>
              <div className="flex space-x-3">
                {socialLinks.map(social => (
                  <a 
                    key={social.label}
                    href={social.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-2 rounded-full bg-accent hover:bg-accent/80 text-muted-foreground hover:text-foreground transition-colors"
                    aria-label={social.label}
                  >
                    {social.icon}
                  </a>
                ))}
              </div>
            </div>
          )}
        </div>
        
        <div className="mt-8 pt-6 border-t border-border text-center">
          <p className="text-sm text-muted-foreground">
            © {currentYear} UberEscorts. All rights reserved. <Link to={APP_PATHS.SAFETY} className="underline">Safety Information</Link>
          </p>
        </div>
      </div>
    </footer>
  );
};

export default UnifiedFooter;
