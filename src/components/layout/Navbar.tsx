
import React from "react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { Shield } from "lucide-react";
import { cn } from "@/lib/utils";
import { useAuth } from "@/hooks/auth";
import { useRole } from "@/hooks/auth";

const Navbar: React.FC = () => {
  const { isAuthenticated } = useAuth();
  const { canAccessAdminFeatures } = useRole();

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <nav className="flex h-14 items-center justify-between px-4 md:px-6">
        <div className="flex items-center gap-2">
          <Link to="/" className="flex items-center" aria-label="UberEscorts Home">
            <img
              src="/lovable-uploads/270a89d4-565b-4654-b8ae-20b959208800.png"
              alt="UberEscorts Logo"
              className="h-6 w-6 mr-2"
              loading="lazy"
              decoding="async"
            />
            <span className="text-xl font-bold text-primary">UberEscorts</span>
          </Link>
          <div className="hidden md:flex items-center gap-1 md:gap-2">
            <Button variant="ghost" asChild>
              <Link to="/escorts">Escorts</Link>
            </Button>
            <Button variant="ghost" asChild>
              <Link to="/creators">Content</Link>
            </Button>
            {isAuthenticated && (
              <Button variant="ghost" asChild>
                <Link to="/ai-companions">AI Companions</Link>
              </Button>
            )}
            {canAccessAdminFeatures && (
              <Button variant="ghost" asChild>
                <Link to="/admin">Admin</Link>
              </Button>
            )}
          </div>
        </div>
        <div className="flex items-center gap-2">
          {!isAuthenticated ? (
            <Button asChild variant="default" size="sm">
              <Link to="/auth">Sign In</Link>
            </Button>
          ) : (
            <Button asChild variant="ghost" size="sm">
              <Link to="/dashboard">Dashboard</Link>
            </Button>
          )}
        </div>
      </nav>
    </header>
  );
};

export default Navbar;
