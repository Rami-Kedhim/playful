
import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '@/hooks/auth/useAuth';

const Sidebar = () => {
  const { user } = useAuth();

  return (
    <aside className="bg-background border-r w-64 h-screen p-4">
      <div className="mb-8">
        <h2 className="text-xl font-bold">Dashboard</h2>
      </div>
      <nav>
        <ul className="space-y-2">
          <li>
            <Link to="/dashboard" className="block p-2 rounded-md hover:bg-accent">
              Home
            </Link>
          </li>
          <li>
            <Link to="/profile" className="block p-2 rounded-md hover:bg-accent">
              Profile
            </Link>
          </li>
          <li>
            <Link to="/settings" className="block p-2 rounded-md hover:bg-accent">
              Settings
            </Link>
          </li>
        </ul>
      </nav>
    </aside>
  );
};

export default Sidebar;
