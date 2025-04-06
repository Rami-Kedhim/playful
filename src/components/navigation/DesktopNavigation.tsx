
import React from "react";
import { Link, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import ServiceTypeMenu from "@/components/navigation/ServiceTypeMenu";
import { Search } from "lucide-react";
import { useAuth } from "@/hooks/auth/useAuth";

const DesktopNavigation = () => {
  const location = useLocation();
  const { userRoles = [] } = useAuth();
  
  const isActive = (path: string) => {
    return location.pathname === path;
  };

  // Check if user has admin or moderator role for SEO access
  const hasAdminAccess = userRoles.some(role => ['admin', 'moderator'].includes(role));
  
  return (
    <nav className="hidden md:flex space-x-1">
      <Button
        variant={isActive("/") ? "default" : "ghost"}
        size="sm"
        asChild
      >
        <Link to="/">Home</Link>
      </Button>
      <ServiceTypeMenu />
      <Button
        variant={isActive("/escorts") ? "default" : "ghost"}
        size="sm"
        asChild
      >
        <Link to="/escorts">Escorts</Link>
      </Button>
      <Button
        variant={isActive("/creators") ? "default" : "ghost"}
        size="sm"
        asChild
      >
        <Link to="/creators">Creators</Link>
      </Button>
      <Button
        variant={isActive("/messages") ? "default" : "ghost"}
        size="sm"
        asChild
      >
        <Link to="/messages">Messages</Link>
      </Button>
      <Button
        variant={isActive("/metaverse") ? "default" : "ghost"}
        size="sm"
        asChild
      >
        <Link to="/metaverse">Metaverse</Link>
      </Button>
      
      {/* Only show SEO link for admin/moderator users */}
      {hasAdminAccess && (
        <Button
          variant={isActive("/seo") ? "default" : "ghost"}
          size="sm"
          asChild
          className="ml-auto"
        >
          <Link to="/seo">
            <Search className="h-4 w-4 mr-1" />
            SEO
          </Link>
        </Button>
      )}
    </nav>
  );
};

export default DesktopNavigation;
