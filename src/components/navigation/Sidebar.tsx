
import React from 'react';
import { Link } from 'react-router-dom';
import { 
  Home, 
  User, 
  Heart, 
  MessageSquare, 
  Settings,
  Users,
  Zap,
  Book,
  BarChart
} from 'lucide-react';

export const Sidebar = () => {
  return (
    <aside className="w-64 border-r bg-background h-screen">
      <div className="p-4 space-y-4">
        <div className="space-y-1">
          <Link to="/" className="flex items-center gap-2 text-sm p-2 rounded-md hover:bg-muted">
            <Home className="h-4 w-4" />
            <span>Home</span>
          </Link>
          <Link to="/profile" className="flex items-center gap-2 text-sm p-2 rounded-md hover:bg-muted">
            <User className="h-4 w-4" />
            <span>Profile</span>
          </Link>
          <Link to="/favorites" className="flex items-center gap-2 text-sm p-2 rounded-md hover:bg-muted">
            <Heart className="h-4 w-4" />
            <span>Favorites</span>
          </Link>
          <Link to="/messages" className="flex items-center gap-2 text-sm p-2 rounded-md hover:bg-muted">
            <MessageSquare className="h-4 w-4" />
            <span>Messages</span>
          </Link>
        </div>
        
        <div className="pt-4 border-t">
          <h3 className="mb-2 text-xs font-medium">Explore</h3>
          <div className="space-y-1">
            <Link to="/escorts" className="flex items-center gap-2 text-sm p-2 rounded-md hover:bg-muted">
              <Users className="h-4 w-4" />
              <span>Escorts</span>
            </Link>
            <Link to="/creators" className="flex items-center gap-2 text-sm p-2 rounded-md hover:bg-muted">
              <Zap className="h-4 w-4" />
              <span>Creators</span>
            </Link>
            <Link to="/brain-hub" className="flex items-center gap-2 text-sm p-2 rounded-md hover:bg-muted">
              <Book className="h-4 w-4" />
              <span>Brain Hub</span>
            </Link>
            <Link to="/analytics" className="flex items-center gap-2 text-sm p-2 rounded-md hover:bg-muted">
              <BarChart className="h-4 w-4" />
              <span>Analytics</span>
            </Link>
          </div>
        </div>
        
        <div className="pt-4 border-t mt-auto">
          <Link to="/settings" className="flex items-center gap-2 text-sm p-2 rounded-md hover:bg-muted">
            <Settings className="h-4 w-4" />
            <span>Settings</span>
          </Link>
        </div>
      </div>
    </aside>
  );
};
