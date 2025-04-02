
import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { Heart, Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useFavorites } from "@/contexts/FavoritesContext";

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const location = useLocation();
  const { favorites } = useFavorites();
  
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
          <nav className="hidden md:flex items-center space-x-6">
            <NavLink to="/" label="Home" isActive={location.pathname === "/"} />
            <NavLink to="/escorts" label="Escorts" isActive={location.pathname.startsWith("/escorts")} />
            <NavLink to="/creators" label="Creators" isActive={location.pathname.startsWith("/creators")} />
            <Link to="/favorites" className="relative group">
              <Button variant="ghost" size="icon" className={location.pathname === "/favorites" ? "bg-primary/10 text-primary" : ""}>
                <Heart size={20} className="transition-colors group-hover:text-primary" fill={favorites.length > 0 ? "currentColor" : "none"} />
              </Button>
              {favorites.length > 0 && (
                <span className="absolute -top-1 -right-1 bg-primary text-white text-xs rounded-full w-4 h-4 flex items-center justify-center">
                  {favorites.length > 9 ? '9+' : favorites.length}
                </span>
              )}
            </Link>
            
            <Link to="/login">
              <Button variant="ghost" size="sm">Login</Button>
            </Link>
            
            <Link to="/signup">
              <Button size="sm">Sign Up</Button>
            </Link>
          </nav>
          
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
        {isMenuOpen && (
          <nav className="md:hidden py-4 space-y-3">
            <MobileNavLink to="/" label="Home" />
            <MobileNavLink to="/escorts" label="Escorts" />
            <MobileNavLink to="/creators" label="Creators" />
            <MobileNavLink to="/favorites" label="Favorites" icon={<Heart size={18} className="mr-2" fill={favorites.length > 0 ? "currentColor" : "none"} />} />
            <div className="pt-4 grid grid-cols-2 gap-2">
              <Link to="/login" className="w-full">
                <Button variant="outline" className="w-full">Login</Button>
              </Link>
              <Link to="/signup" className="w-full">
                <Button className="w-full">Sign Up</Button>
              </Link>
            </div>
          </nav>
        )}
      </div>
    </header>
  );
};

interface NavLinkProps {
  to: string;
  label: string;
  isActive: boolean;
}

const NavLink = ({ to, label, isActive }: NavLinkProps) => (
  <Link 
    to={to} 
    className={`transition-colors hover:text-primary ${
      isActive ? "text-primary font-medium" : ""
    }`}
  >
    {label}
  </Link>
);

interface MobileNavLinkProps {
  to: string;
  label: string;
  icon?: React.ReactNode;
}

const MobileNavLink = ({ to, label, icon }: MobileNavLinkProps) => (
  <Link to={to} className="block px-2 py-2 hover:bg-gray-800 rounded flex items-center">
    {icon}
    {label}
  </Link>
);

export default Navbar;
