
import React from 'react';
import { Link } from 'react-router-dom';

const Footer: React.FC = () => {
  return (
    <footer className="bg-background border-t border-border py-8">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <h3 className="text-lg font-semibold mb-4">About UberPersona</h3>
            <ul className="space-y-2 text-muted-foreground">
              <li><Link to="/about">About Us</Link></li>
              <li><Link to="/terms">Terms of Service</Link></li>
              <li><Link to="/privacy">Privacy Policy</Link></li>
              <li><Link to="/contact">Contact Us</Link></li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-lg font-semibold mb-4">Services</h3>
            <ul className="space-y-2 text-muted-foreground">
              <li><Link to="/escorts">Escorts</Link></li>
              <li><Link to="/ai-companions">AI Companions</Link></li>
              <li><Link to="/creators">Creators</Link></li>
              <li><Link to="/livecams">Livecams</Link></li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-lg font-semibold mb-4">UBX Ecosystem</h3>
            <ul className="space-y-2 text-muted-foreground">
              <li><Link to="/wallet">UBX Wallet</Link></li>
              <li><Link to="/pulse-boost">Pulse Boost</Link></li>
              <li><Link to="/brain-hub">Brain Hub</Link></li>
              <li><Link to="/metaverse">Metaverse</Link></li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-lg font-semibold mb-4">Support</h3>
            <ul className="space-y-2 text-muted-foreground">
              <li><Link to="/support">Help Center</Link></li>
              <li><Link to="/verification">Verification</Link></li>
              <li><Link to="/safety">Safety & Privacy</Link></li>
              <li><Link to="/faq">FAQ</Link></li>
            </ul>
          </div>
        </div>
        
        <div className="border-t border-border mt-8 pt-8 text-center text-muted-foreground">
          <p>© {new Date().getFullYear()} UberPersona. All rights reserved.</p>
          <p className="text-sm mt-2">Powered by UberCore™ Neural Engine</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
