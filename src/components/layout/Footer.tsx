
import React from 'react';
import { Link } from 'react-router-dom';
import Logo from './Logo';
import { useTranslation } from 'react-i18next';
import { Facebook, Twitter, Instagram, Youtube, Twitch, Github } from 'lucide-react';

const Footer: React.FC = () => {
  const { t } = useTranslation();
  
  return (
    <footer className="bg-background border-t">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="space-y-4">
            <Logo />
            <p className="text-muted-foreground text-sm">
              The Web3 Platform for Secure Adult Connections
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-muted-foreground hover:text-primary">
                <Facebook size={20} />
              </a>
              <a href="#" className="text-muted-foreground hover:text-primary">
                <Twitter size={20} />
              </a>
              <a href="#" className="text-muted-foreground hover:text-primary">
                <Instagram size={20} />
              </a>
              <a href="#" className="text-muted-foreground hover:text-primary">
                <Youtube size={20} />
              </a>
              <a href="#" className="text-muted-foreground hover:text-primary">
                <Twitch size={20} />
              </a>
            </div>
          </div>
          
          <div>
            <h3 className="font-semibold text-lg mb-4">Explore</h3>
            <ul className="space-y-2">
              <li><Link to="/escorts" className="text-muted-foreground hover:text-primary">Escorts</Link></li>
              <li><Link to="/creators" className="text-muted-foreground hover:text-primary">Creators</Link></li>
              <li><Link to="/livecams" className="text-muted-foreground hover:text-primary">Live Cams</Link></li>
              <li><Link to="/ai-companion" className="text-muted-foreground hover:text-primary">AI Companions</Link></li>
              <li><Link to="/metaverse" className="text-muted-foreground hover:text-primary">Metaverse</Link></li>
            </ul>
          </div>
          
          <div>
            <h3 className="font-semibold text-lg mb-4">Information</h3>
            <ul className="space-y-2">
              <li><Link to="/about" className="text-muted-foreground hover:text-primary">About Us</Link></li>
              <li><Link to="/safety" className="text-muted-foreground hover:text-primary">Safety Tips</Link></li>
              <li><Link to="/verification" className="text-muted-foreground hover:text-primary">Verification</Link></li>
              <li><Link to="/creator-application" className="text-muted-foreground hover:text-primary">Become a Creator</Link></li>
              <li><Link to="/contact" className="text-muted-foreground hover:text-primary">Contact Us</Link></li>
            </ul>
          </div>
          
          <div>
            <h3 className="font-semibold text-lg mb-4">Legal</h3>
            <ul className="space-y-2">
              <li><Link to="/terms" className="text-muted-foreground hover:text-primary">Terms of Service</Link></li>
              <li><Link to="/privacy" className="text-muted-foreground hover:text-primary">Privacy Policy</Link></li>
              <li><Link to="/cookies" className="text-muted-foreground hover:text-primary">Cookie Policy</Link></li>
              <li><Link to="/dmca" className="text-muted-foreground hover:text-primary">DMCA</Link></li>
              <li><Link to="/2257" className="text-muted-foreground hover:text-primary">2257 Statement</Link></li>
            </ul>
          </div>
        </div>
        
        <div className="border-t border-muted mt-8 pt-8 flex flex-col md:flex-row justify-between items-center">
          <p className="text-muted-foreground text-sm">
            &copy; {new Date().getFullYear()} UberEscorts. All rights reserved.
          </p>
          <p className="text-muted-foreground text-xs mt-2 md:mt-0">
            This site contains adult content and is intended for adults aged 18 or over.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
