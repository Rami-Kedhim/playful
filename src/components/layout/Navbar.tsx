
import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { Heart, Menu, X, LogOut } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/contexts/AuthContext";
import DesktopNav from "./DesktopNav";
import MobileNav from "./MobileNav";
import UserMenu from "./UserMenu";

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const location = useLocation();
  const { signOut } = useAuth();
  
  // Handle scroll event to change navbar appearance
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);
  
  // Close mobile menu when route changes
  useEffect(() => {
    setIsMenuOpen(false);
  }, [location.pathname]);

  const handleSignOut = async () => {
    try {
      await signOut();
    } catch (error) {
      console.error("Sign out error:", error);
    }
  };
  
  return (
    <header 
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled || isMenuOpen ? "bg-background/80 backdrop-blur-md shadow-md" : "bg-transparent"
      }`}
    >
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center">
            <span className="text-xl font-bold">LuxLife</span>
          </Link>
          
          {/* Desktop navigation */}
          <DesktopNav />
          
          {/* Desktop user menu */}
          <div className="hidden md:flex items-center space-x-4">
            <UserMenu handleSignOut={handleSignOut} />
          </div>
          
          {/* Mobile menu button */}
          <button 
            className="md:hidden p-2 rounded-md"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            aria-label={isMenuOpen ? "Close menu" : "Open menu"}
          >
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
        
        {/* Mobile navigation */}
        {isMenuOpen && <MobileNav handleSignOut={handleSignOut} />}
      </div>
    </header>
  );
};

export default Navbar;
