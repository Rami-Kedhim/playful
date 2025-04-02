
import { Link } from "react-router-dom";
import { Heart, User, LogOut } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useFavorites } from "@/contexts/FavoritesContext";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useAuth } from "@/contexts/AuthContext";

interface MobileNavLinkProps {
  to: string;
  label: string;
  icon?: React.ReactNode;
}

export const MobileNavLink = ({ to, label, icon }: MobileNavLinkProps) => (
  <Link to={to} className="block px-2 py-2 hover:bg-gray-800 rounded flex items-center">
    {icon}
    {label}
  </Link>
);

interface MobileNavProps {
  handleSignOut: () => Promise<void>;
}

export const MobileNav = ({ handleSignOut }: MobileNavProps) => {
  const { favorites } = useFavorites();
  const { user, profile } = useAuth();
  
  const getUserInitials = () => {
    if (profile?.username) {
      return profile.username.substring(0, 2).toUpperCase();
    }
    
    if (user?.email) {
      return user.email.substring(0, 2).toUpperCase();
    }
    
    return "U";
  };
  
  return (
    <nav className="md:hidden py-4 space-y-3">
      <MobileNavLink to="/" label="Home" />
      <MobileNavLink to="/escorts" label="Escorts" />
      <MobileNavLink to="/creators" label="Creators" />
      <MobileNavLink to="/favorites" label="Favorites" icon={<Heart size={18} className="mr-2" fill={favorites.length > 0 ? "currentColor" : "none"} />} />
      
      {user ? (
        <>
          <div className="pt-2 px-2">
            <div className="flex items-center space-x-2 p-2">
              <Avatar className="h-8 w-8">
                <AvatarImage src={profile?.avatar_url} alt={profile?.username || "User"} />
                <AvatarFallback>{getUserInitials()}</AvatarFallback>
              </Avatar>
              <div className="text-sm font-medium">{profile?.username || user.email}</div>
            </div>
          </div>
          <MobileNavLink to="/profile" label="Profile" icon={<User size={18} className="mr-2" />} />
          <MobileNavLink to="/wallet" label="Wallet" />
          <div className="pt-2">
            <Button 
              variant="destructive" 
              className="w-full flex items-center justify-center" 
              onClick={handleSignOut}
            >
              <LogOut size={18} className="mr-2" />
              Sign out
            </Button>
          </div>
        </>
      ) : (
        <div className="pt-4 grid grid-cols-2 gap-2">
          <Link to="/auth" className="w-full">
            <Button variant="outline" className="w-full">Login</Button>
          </Link>
          <Link to="/auth" className="w-full">
            <Button className="w-full">Sign Up</Button>
          </Link>
        </div>
      )}
    </nav>
  );
};

export default MobileNav;
