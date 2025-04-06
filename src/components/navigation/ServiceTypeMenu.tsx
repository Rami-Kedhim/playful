
import React from 'react';
import { Link } from 'react-router-dom';
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu";
import { Users, Video, Star } from 'lucide-react';

const ServiceTypeMenu: React.FC = () => {
  return (
    <NavigationMenu>
      <NavigationMenuList>
        <NavigationMenuItem>
          <NavigationMenuTrigger>Services</NavigationMenuTrigger>
          <NavigationMenuContent>
            <div className="p-4 w-[400px] grid gap-3">
              <Link to="/escorts" className="group block p-3 space-y-1 rounded-md hover:bg-accent">
                <div className="flex items-center space-x-2">
                  <Users className="h-5 w-5 text-primary" />
                  <span className="text-sm font-medium">Escorts</span>
                </div>
                <p className="text-xs text-muted-foreground line-clamp-2">
                  Connect with verified escorts for in-person meetings
                </p>
              </Link>
              
              <Link to="/creators" className="group block p-3 space-y-1 rounded-md hover:bg-accent">
                <div className="flex items-center space-x-2">
                  <Star className="h-5 w-5 text-primary" />
                  <span className="text-sm font-medium">Content Creators</span>
                </div>
                <p className="text-xs text-muted-foreground line-clamp-2">
                  Access exclusive content from premium creators
                </p>
              </Link>
              
              <Link to="/livecams" className="group block p-3 space-y-1 rounded-md hover:bg-accent">
                <div className="flex items-center space-x-2">
                  <Video className="h-5 w-5 text-primary" />
                  <span className="text-sm font-medium">Live Cams</span>
                </div>
                <p className="text-xs text-muted-foreground line-clamp-2">
                  Engage with live streaming performers in real-time
                </p>
              </Link>
            </div>
          </NavigationMenuContent>
        </NavigationMenuItem>
      </NavigationMenuList>
    </NavigationMenu>
  );
};

export default ServiceTypeMenu;
