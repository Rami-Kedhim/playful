import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Github, Twitter, Instagram } from "lucide-react";

const Footer = () => {
  return (
    <footer className="bg-background/80 backdrop-blur-md border-t border-border mt-16">
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="col-span-1 md:col-span-1">
            <h2 className="text-xl font-bold bg-gradient-to-r from-primary to-lucoin bg-clip-text text-transparent mb-4">
              UberEscorts
            </h2>
            <p className="text-gray-400 mb-4">
              Next-generation Web3 adult platform with escort directories and metaverse integration.
            </p>
            <div className="flex space-x-4">
              <Button variant="ghost" size="icon">
                <Twitter size={20} />
              </Button>
              <Button variant="ghost" size="icon">
                <Instagram size={20} />
              </Button>
              <Button variant="ghost" size="icon">
                <Github size={20} />
              </Button>
            </div>
          </div>
          
          <div>
            <h3 className="font-medium text-gray-200 mb-4">Platform</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/escorts" className="text-gray-400 hover:text-primary">
                  Escorts
                </Link>
              </li>
              <li>
                <Link to="/messages" className="text-gray-400 hover:text-primary">
                  Messages
                </Link>
              </li>
              <li>
                <Link to="/metaverse" className="text-gray-400 hover:text-primary">
                  Metaverse
                </Link>
              </li>
            </ul>
          </div>
          
          <div>
            <h3 className="font-medium text-gray-200 mb-4">Lucoin</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/wallet" className="text-gray-400 hover:text-primary">
                  Wallet
                </Link>
              </li>
              <li>
                <Link to="/buy" className="text-gray-400 hover:text-primary">
                  Buy Tokens
                </Link>
              </li>
              <li>
                <Link to="/faucet" className="text-gray-400 hover:text-primary">
                  Free Faucet
                </Link>
              </li>
              <li>
                <Link to="/bridge" className="text-gray-400 hover:text-primary">
                  Fantom Bridge
                </Link>
              </li>
            </ul>
          </div>
          
          <div>
            <h3 className="font-medium text-gray-200 mb-4">Info</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/about" className="text-gray-400 hover:text-primary">
                  About
                </Link>
              </li>
              <li>
                <Link to="/privacy" className="text-gray-400 hover:text-primary">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link to="/terms" className="text-gray-400 hover:text-primary">
                  Terms of Service
                </Link>
              </li>
              <li>
                <Link to="/contact" className="text-gray-400 hover:text-primary">
                  Contact
                </Link>
              </li>
            </ul>
          </div>
        </div>
        
        <div className="border-t border-border mt-8 pt-8 text-gray-400 text-sm">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p>© {new Date().getFullYear()} UberEscorts. All rights reserved.</p>
            <p className="mt-2 md:mt-0">
              Powered by Lucoin on Fantom Network
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
