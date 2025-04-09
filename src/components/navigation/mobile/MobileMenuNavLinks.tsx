
import React from "react";
import { NavLink } from "react-router-dom";

interface NavItem {
  name: string;
  path: string;
  icon?: React.ReactNode;
}

interface MobileMenuNavLinksProps {
  items: NavItem[];
  onItemClick: () => void;
}

const MobileMenuNavLinks: React.FC<MobileMenuNavLinksProps> = ({ items, onItemClick }) => {
  return (
    <nav className="space-y-1">
      {items.map((item) => (
        <NavLink
          key={item.path}
          to={item.path}
          className={({ isActive }) =>
            `flex items-center px-2 py-3 rounded-md text-sm ${
              isActive
                ? "bg-primary/10 text-primary font-medium"
                : "text-muted-foreground hover:text-foreground hover:bg-accent/50"
            }`
          }
          onClick={onItemClick}
        >
          {item.icon && item.icon}
          {item.name}
        </NavLink>
      ))}
    </nav>
  );
};

export default MobileMenuNavLinks;
