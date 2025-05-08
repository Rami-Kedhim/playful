
import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '@/hooks/auth';

interface SidebarProps {
  className?: string;
}

const Sidebar: React.FC<SidebarProps> = ({ className = '' }) => {
  const { user } = useAuth();

  return (
    <aside className={`w-64 border-r p-4 ${className}`}>
      <nav className="flex flex-col gap-2">
        <Link to="/" className="px-2 py-1 hover:bg-primary/10 rounded">Home</Link>
        <Link to="/escorts" className="px-2 py-1 hover:bg-primary/10 rounded">Escorts</Link>
        <Link to="/creators" className="px-2 py-1 hover:bg-primary/10 rounded">Creators</Link>
        <Link to="/livecams" className="px-2 py-1 hover:bg-primary/10 rounded">Livecams</Link>
        <Link to="/ai-companions" className="px-2 py-1 hover:bg-primary/10 rounded">AI Companions</Link>
        
        {user && (
          <>
            <div className="h-px bg-border my-2"></div>
            <Link to="/profile" className="px-2 py-1 hover:bg-primary/10 rounded">Profile</Link>
            <Link to="/messages" className="px-2 py-1 hover:bg-primary/10 rounded">Messages</Link>
            <Link to="/favorites" className="px-2 py-1 hover:bg-primary/10 rounded">Favorites</Link>
          </>
        )}
      </nav>
    </aside>
  );
};

export default Sidebar;
