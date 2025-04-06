import React from "react";
import { Link } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

const DesktopNav = () => {
  const { user, profile } = useAuth();

  return (
    <div className="hidden md:flex items-center space-x-4">
      <Link to="/" className="text-foreground hover:text-primary">
        Home
      </Link>
      <Link to="/livecams" className="text-foreground hover:text-primary">
        Livecams
      </Link>
      <Link to="/ai-profiles" className="text-foreground hover:text-primary">
        AI Profiles
      </Link>
    </div>
  );
};

export default DesktopNav;
