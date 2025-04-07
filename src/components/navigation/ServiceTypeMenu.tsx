
import React from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu";
import { Users, Video, Star, Sparkles, Compass } from 'lucide-react';

const ServiceTypeMenu: React.FC = () => {
  const { t } = useTranslation();

  const serviceItems = [
    {
      title: t('escorts'),
      description: t('escort_service_description', 'Connect with verified escorts for in-person meetings'),
      icon: Users,
      url: "/escorts",
    },
    {
      title: t('creators'),
      description: t('creators_service_description', 'Access exclusive content from premium creators'),
      icon: Star,
      url: "/creators",
    },
    {
      title: t('livecams'),
      description: t('livecams_service_description', 'Engage with live streaming performers in real-time'),
      icon: Video,
      url: "/livecams",
    },
    {
      title: t('ai_companions'),
      description: t('ai_companions_description', 'Chat with AI companions designed for connection'),
      icon: Sparkles,
      url: "/ai-companion",
    },
    {
      title: t('metaverse'),
      description: t('metaverse_service_description', 'Experience virtual reality encounters'),
      icon: Compass,
      url: "/metaverse",
    },
  ];

  return (
    <NavigationMenu>
      <NavigationMenuList>
        <NavigationMenuItem>
          <NavigationMenuTrigger>{t('services')}</NavigationMenuTrigger>
          <NavigationMenuContent>
            <div className="p-4 w-[400px] grid gap-3">
              {serviceItems.map((item) => (
                <Link 
                  key={item.url} 
                  to={item.url} 
                  className="group block p-3 space-y-1 rounded-md hover:bg-accent"
                >
                  <div className="flex items-center space-x-2">
                    <item.icon className="h-5 w-5 text-primary" />
                    <span className="text-sm font-medium">{item.title}</span>
                  </div>
                  <p className="text-xs text-muted-foreground line-clamp-2">
                    {item.description}
                  </p>
                </Link>
              ))}
            </div>
          </NavigationMenuContent>
        </NavigationMenuItem>
      </NavigationMenuList>
    </NavigationMenu>
  );
};

export default ServiceTypeMenu;
