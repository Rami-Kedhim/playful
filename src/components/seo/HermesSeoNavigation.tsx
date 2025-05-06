
import React from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import { cn } from '@/lib/utils';
import {
  Brain,
  LineChart,
  History,
  Settings,
  FileText,
  UserCircle,
  Video,
  PlusCircle
} from 'lucide-react';

const HermesSeoNavigation: React.FC = () => {
  const location = useLocation();
  
  const navItems = [
    {
      title: 'Dashboard',
      path: '/seo',
      icon: <Brain className="h-5 w-5 mr-2" />
    },
    {
      title: 'Content Optimization',
      path: '/seo/optimize-content',
      icon: <FileText className="h-5 w-5 mr-2" />
    },
    {
      title: 'Profile Optimization',
      path: '/seo/optimize-profile',
      icon: <UserCircle className="h-5 w-5 mr-2" />
    },
    {
      title: 'Live Optimization',
      path: '/seo/optimize-live',
      icon: <Video className="h-5 w-5 mr-2" />
    },
    {
      title: 'New Optimization',
      path: '/seo/new-optimization',
      icon: <PlusCircle className="h-5 w-5 mr-2" />
    },
    {
      title: 'Analytics',
      path: '/seo/analytics',
      icon: <LineChart className="h-5 w-5 mr-2" />
    },
    {
      title: 'History',
      path: '/seo/history',
      icon: <History className="h-5 w-5 mr-2" />
    },
    {
      title: 'SEO Tools',
      path: '/seo/tools',
      icon: <Settings className="h-5 w-5 mr-2" />
    }
  ];

  return (
    <div className="bg-card border-r h-full p-4 space-y-1">
      <div className="flex items-center px-2 py-3 mb-6">
        <Brain className="h-6 w-6 mr-2 text-primary" />
        <h2 className="font-bold text-lg">HERMES SEO</h2>
      </div>
      
      <nav className="space-y-1">
        {navItems.map((item) => (
          <NavLink
            key={item.path}
            to={item.path}
            className={({ isActive }) => cn(
              "flex items-center px-3 py-2 rounded-md text-sm font-medium transition-colors",
              isActive 
                ? "bg-primary/10 text-primary" 
                : "hover:bg-accent hover:text-accent-foreground"
            )}
          >
            {item.icon}
            {item.title}
          </NavLink>
        ))}
      </nav>
    </div>
  );
};

export default HermesSeoNavigation;
