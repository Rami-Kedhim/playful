
import React from 'react';
import { Link } from 'react-router-dom';

interface NavItemsProps {
  className?: string;
}

const NavItems: React.FC<NavItemsProps> = ({ className }) => {
  return (
    <nav className={className}>
      <ul className="flex space-x-4">
        <li>
          <Link to="/" className="text-foreground hover:text-primary">
            Home
          </Link>
        </li>
        <li>
          <Link to="/explore" className="text-foreground hover:text-primary">
            Explore
          </Link>
        </li>
        <li>
          <Link to="/livecams" className="text-foreground hover:text-primary">
            Live
          </Link>
        </li>
      </ul>
    </nav>
  );
};

export default NavItems;
