
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/hooks/auth/useAuth";
import { Search } from "lucide-react";
import ServiceTypeMenu from "@/components/navigation/ServiceTypeMenu";

const DesktopNav = () => {
  const { user } = useAuth();

  return (
    <div className="hidden md:flex w-full items-center justify-between">
      <div className="flex items-center gap-8">
        <Link to="/" className="text-xl font-bold">
          Luscious
        </Link>
        
        <div className="flex items-center gap-2">
          <Link to="/">
            <Button variant="ghost">Home</Button>
          </Link>
          
          <ServiceTypeMenu />
          
          <Link to="/escort-application">
            <Button variant="ghost">Become an Escort</Button>
          </Link>
        </div>
      </div>
      
      <div className="flex items-center gap-4">
        <Link to="/search">
          <Button variant="ghost" size="icon">
            <Search className="h-[1.2rem] w-[1.2rem]" />
          </Button>
        </Link>
        
        {user ? (
          <Link to="/profile">
            <Button variant="default">My Account</Button>
          </Link>
        ) : (
          <Link to="/auth">
            <Button variant="default">Sign In</Button>
          </Link>
        )}
      </div>
    </div>
  );
};

export default DesktopNav;
