
import React from "react";
import { Link, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Search } from "lucide-react";
import ServiceTypeMenu from "@/components/navigation/ServiceTypeMenu";

const DesktopNavigation = () => {
  const location = useLocation();
  
  const isActive = (path: string) => {
    return location.pathname === path;
  };
  
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
        variant={isActive("/messages") ? "default" : "ghost"}
        size="sm"
        asChild
      >
        <Link to="/messages">Messages</Link>
      </Button>
    </nav>
  );
};

export default DesktopNavigation;
