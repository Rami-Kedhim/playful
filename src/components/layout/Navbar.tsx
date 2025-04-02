
import { useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import {
  Menu,
  Search,
  Sparkles,
  Wallet,
  LogIn,
  X,
  Globe,
  MessageSquare,
  Video,
  ShoppingBag,
  Menu as MenuIcon
} from "lucide-react";
import { useIsMobile } from "@/hooks/use-mobile";

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const isMobile = useIsMobile();

  const navLinks = [
    { name: "Escorts", path: "/escorts", icon: <Globe size={18} /> },
    { name: "Creators", path: "/creators", icon: <Sparkles size={18} /> },
    { name: "Livecams", path: "/livecams", icon: <Video size={18} /> },
    { name: "Shop", path: "/shop", icon: <ShoppingBag size={18} /> },
    { name: "Messages", path: "/messages", icon: <MessageSquare size={18} /> },
  ];

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-md border-b border-border">
      <div className="container mx-auto px-4 flex items-center justify-between h-16">
        {/* Logo */}
        <Link to="/" className="flex items-center">
          <h1 className="text-2xl font-bold bg-gradient-to-r from-primary to-lucoin bg-clip-text text-transparent">
            UberEscorts
          </h1>
        </Link>

        {/* Desktop Navigation */}
        {!isMobile && (
          <nav className="hidden md:flex items-center space-x-1">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className="px-3 py-2 rounded-md text-sm font-medium text-gray-300 hover:bg-secondary hover:text-white flex items-center space-x-1"
              >
                {link.icon}
                <span>{link.name}</span>
              </Link>
            ))}
          </nav>
        )}

        {/* Action buttons */}
        <div className="flex items-center space-x-2">
          <Button variant="ghost" size="icon" className="text-gray-300">
            <Search size={20} />
          </Button>
          
          <Button variant="ghost" size="icon" className="text-gray-300">
            <Wallet size={20} />
            <span className="absolute top-0 right-0 h-3 w-3 rounded-full bg-primary"></span>
          </Button>
          
          <Link to="/login">
            <Button variant="outline" size="sm" className="hidden sm:flex gap-2">
              <LogIn size={16} />
              <span>Login</span>
            </Button>
          </Link>
          
          <Link to="/register">
            <Button 
              size="sm" 
              className="hidden sm:inline-flex bg-primary hover:bg-primary/90 text-primary-foreground"
            >
              Register
            </Button>
          </Link>

          {/* Mobile menu button */}
          {isMobile && (
            <Button 
              variant="ghost" 
              size="icon" 
              onClick={toggleMenu}
              className="md:hidden text-gray-300"
            >
              {isMenuOpen ? <X size={20} /> : <MenuIcon size={20} />}
            </Button>
          )}
        </div>
      </div>

      {/* Mobile menu */}
      {isMobile && isMenuOpen && (
        <div className="md:hidden bg-background border-b border-border">
          <div className="container mx-auto px-4 py-3 space-y-1">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className="block px-3 py-2 rounded-md text-base font-medium text-gray-300 hover:bg-secondary hover:text-white flex items-center space-x-2"
                onClick={() => setIsMenuOpen(false)}
              >
                {link.icon}
                <span>{link.name}</span>
              </Link>
            ))}
            <div className="flex gap-2 mt-4">
              <Link to="/login" className="flex-1">
                <Button variant="outline" className="w-full gap-2">
                  <LogIn size={16} />
                  <span>Login</span>
                </Button>
              </Link>
              <Link to="/register" className="flex-1">
                <Button className="w-full">Register</Button>
              </Link>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};

export default Navbar;
