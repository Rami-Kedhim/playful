
import { Link, useLocation } from "react-router-dom";
import { Heart, Video } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useFavorites } from "@/contexts/FavoritesContext";

interface NavLinkProps {
  to: string;
  label: string;
  isActive: boolean;
}

export const NavLink = ({ to, label, isActive }: NavLinkProps) => (
  <Link 
    to={to} 
    className={`transition-colors hover:text-primary ${
      isActive ? "text-primary font-medium" : ""
    }`}
  >
    {label}
  </Link>
);

export const DesktopNav = () => {
  const location = useLocation();
  const { favorites } = useFavorites();
  
  return (
    <nav className="hidden md:flex items-center space-x-6">
      <NavLink to="/" label="Home" isActive={location.pathname === "/"} />
      <NavLink to="/escorts" label="Escorts" isActive={location.pathname.startsWith("/escorts")} />
      <NavLink to="/creators" label="Creators" isActive={location.pathname.startsWith("/creators")} />
      <NavLink to="/livecams" label="Live Cams" isActive={location.pathname.startsWith("/livecams")} />
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
    </nav>
  );
};

export default DesktopNav;
