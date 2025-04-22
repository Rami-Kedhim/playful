
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import React from "react";
import { ButtonProps } from "./button";

interface LinkButtonProps extends ButtonProps {
  to: string;
  children: React.ReactNode;
}

// This component creates a button that acts as a link
const LinkButton = ({ to, children, ...props }: LinkButtonProps) => {
  return (
    <Button asChild {...props}>
      <Link to={to}>{children}</Link>
    </Button>
  );
};

export default LinkButton;
