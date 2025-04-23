import { NavLink } from "react-router-dom";
import { cn } from "@/lib/utils";
import { Shield } from "lucide-react";

const NavItems = () => {
  return (
    <nav className="flex items-center space-x-4">
      <NavLink
        to="/"
        className={({ isActive }) =>
          cn("text-sm font-medium transition-colors hover:text-primary",
            isActive ? "text-foreground" : "text-muted-foreground"
          )
        }
      >
        Home
      </NavLink>
      <NavLink
        to="/verification"
        className={({ isActive }) =>
          cn("text-sm font-medium transition-colors hover:text-primary flex items-center gap-1",
            isActive ? "text-foreground" : "text-muted-foreground"
          )
        }
      >
        <Shield className="h-4 w-4" />
        Verify Account
      </NavLink>
      
    </nav>
  );
};

export default NavItems;
