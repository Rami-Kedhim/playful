
import React from 'react';
import { Link } from 'react-router-dom';

const Header = () => {
  return (
    <header className="border-b border-border py-3">
      <div className="container mx-auto px-4 flex items-center justify-between">
        <Link to="/" className="text-xl font-semibold">
          Neural Analytics
        </Link>
        <nav>
          <ul className="flex items-center space-x-4">
            <li>
              <Link to="/" className="text-sm hover:text-primary transition-colors">
                Home
              </Link>
            </li>
            <li>
              <Link to="/neural/monitor" className="text-sm hover:text-primary transition-colors">
                Neural Monitor
              </Link>
            </li>
            <li>
              <Link to="/neural/analytics" className="text-sm hover:text-primary transition-colors">
                Analytics
              </Link>
            </li>
            <li>
              <Link to="/brain-hub" className="text-sm hover:text-primary transition-colors">
                Brain Hub
              </Link>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
};

export default Header;
