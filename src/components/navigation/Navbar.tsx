
import { Link } from "react-router-dom";
import { useAuth } from "@/hooks/auth";
import { Button } from "@/components/ui/button";
import UserMenu from "@/components/layout/UserMenu";
import { NavigationMenu } from "@/components/layout/NavigationMenu";
import { MobileMenu } from "@/components/layout/MobileMenu";

const Navbar = () => {
  const { isAuthenticated } = useAuth();

  return (
    <div className="bg-background border-b sticky top-0 z-50">
      <div className="container h-16 flex items-center justify-between py-4">
        <Link to="/" className="font-bold text-xl">
          Your App
        </Link>

        <div className="hidden md:flex items-center space-x-4">
          <NavigationMenu />
          {isAuthenticated ? (
            <UserMenu />
          ) : (
            <>
              <Link to="/auth?tab=login">
                <Button variant="outline" size="sm">
                  Log In
                </Button>
              </Link>
              <Link to="/auth?tab=register">
                <Button size="sm">Sign Up</Button>
              </Link>
            </>
          )}
        </div>

        <MobileMenu className="md:hidden" />
      </div>
    </div>
  );
};

export default Navbar;
