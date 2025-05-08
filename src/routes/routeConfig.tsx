
import React from 'react';
import { RouteConfig } from './routeConfig';
import { Home, Users, Brain, Shield } from 'lucide-react';

// Define routes with proper typing including the category property
export const routes: RouteConfig[] = [
  { 
    path: '/', 
    label: 'Home', 
    title: 'Home',
    icon: Home,
    category: 'core'
  },
  { 
    path: '/escorts', 
    label: 'Escorts', 
    title: 'All Escorts',
    icon: Users,
    category: 'escort'
  },
  { 
    path: '/neural/monitor', 
    label: 'Neural Monitor', 
    title: 'Neural System Monitor',
    icon: Brain,
    category: 'neural'
  },
  { 
    path: '/neural/analytics', 
    label: 'Neural Analytics', 
    title: 'Neural Analytics Dashboard',
    icon: Brain,
    category: 'neural'
  },
  { 
    path: '/admin', 
    label: 'Admin', 
    title: 'Administration',
    icon: Shield,
    requireAuth: true,
    roles: ['admin'],
    category: 'admin'
  },
  // Add other routes as needed
];

export default routes;
