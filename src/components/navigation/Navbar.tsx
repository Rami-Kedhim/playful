import { useState } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet"
import { Menu } from "lucide-react";
import NavItems from "./NavItems";
import ProfileDropdown from "./ProfileDropdown";

const Navbar = () => {
  const { isAuthenticated, user } = useAuth();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <div className="bg-background border-b sticky top-0 z-50">
      <div className="container h-16 flex items-center justify-between py-4">
        <Link to="/" className="font-bold text-xl">
          UberEscorts
        </Link>

        <div className="hidden md:flex items-center space-x-4">
          <NavItems />
          {isAuthenticated ? (
            <ProfileDropdown />
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

        <Sheet open={isMenuOpen} onOpenChange={setIsMenuOpen}>
          <SheetTrigger asChild className="md:hidden">
            <Button variant="ghost" size="sm">
              <Menu className="h-4 w-4" />
            </Button>
          </SheetTrigger>
          <SheetContent side="left" className="sm:max-w-sm">
            <SheetHeader>
              <SheetTitle>Menu</SheetTitle>
              <SheetDescription>
                Explore the platform
              </SheetDescription>
            </SheetHeader>
            <div className="py-4">
              <NavItems />
              <div className="mt-4">
                {isAuthenticated ? (
                  <ProfileDropdown />
                ) : (
                  <div className="flex flex-col space-y-2">
                    <Link to="/auth?tab=login">
                      <Button variant="outline" size="sm">
                        Log In
                      </Button>
                    </Link>
                    <Link to="/auth?tab=register">
                      <Button size="sm">Sign Up</Button>
                    </Link>
                  </div>
                )}
              </div>
            </div>
          </SheetContent>
        </Sheet>
      </div>
    </div>
  );
};

export default Navbar;
