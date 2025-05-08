
import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '@/hooks/auth';
import { 
  Home, 
  Heart, 
  Search, 
  User, 
  MessageSquare, 
  Settings, 
  Video, 
  DollarSign,
  ShieldCheck 
} from 'lucide-react';

const Sidebar = () => {
  const { user } = useAuth();
  
  const menuItems = [
    { label: 'Home', icon: <Home size={18} />, path: '/' },
    { label: 'Search', icon: <Search size={18} />, path: '/search' },
    { label: 'Escorts', icon: <User size={18} />, path: '/escorts' },
    { label: 'Creators', icon: <DollarSign size={18} />, path: '/creators' },
    { label: 'Live Cams', icon: <Video size={18} />, path: '/livecams' },
  ];
  
  const userItems = user ? [
    { label: 'Profile', icon: <User size={18} />, path: '/profile' },
    { label: 'Messages', icon: <MessageSquare size={18} />, path: '/messages' },
    { label: 'Favorites', icon: <Heart size={18} />, path: '/favorites' },
    { label: 'Safety', icon: <ShieldCheck size={18} />, path: '/safety' },
    { label: 'Settings', icon: <Settings size={18} />, path: '/settings' },
  ] : [];
  
  return (
    <aside className="w-64 border-r h-screen p-4">
      <div className="font-bold text-xl mb-8 p-2">UberEscorts</div>
      
      <nav className="space-y-2">
        {menuItems.map((item) => (
          <Link
            key={item.path}
            to={item.path}
            className="flex items-center gap-3 p-2 rounded-md hover:bg-primary/10"
          >
            {item.icon}
            <span>{item.label}</span>
          </Link>
        ))}
        
        {userItems.length > 0 && (
          <>
            <div className="h-px bg-border my-3" />
            
            {userItems.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                className="flex items-center gap-3 p-2 rounded-md hover:bg-primary/10"
              >
                {item.icon}
                <span>{item.label}</span>
              </Link>
            ))}
          </>
        )}
      </nav>
    </aside>
  );
};

export default Sidebar;
