
import React from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { Button } from '@/components/ui/button';
import { Users, Heart, Video, Search, MessageCircle, Star } from 'lucide-react';
import { AnimatedContainer } from '@/components/ui/animated-container';

interface MobileNavigationProps {
  onItemClick?: () => void;
}

const MobileNavigation = ({ onItemClick }: MobileNavigationProps) => {
  const { t } = useTranslation();
  
  const navItems = [
    { icon: Users, label: t('escorts'), href: '/escorts' },
    { icon: Star, label: t('creators'), href: '/creators' },
    { icon: Video, label: t('livecams'), href: '/livecams' },
    { icon: Heart, label: t('favorites'), href: '/favorites' },
    { icon: MessageCircle, label: t('messages'), href: '/messages' },
  ];

  return (
    <div className="flex flex-col gap-2">
      {navItems.map((item, index) => (
        <AnimatedContainer key={item.href} delay={0.05 * index} animation="slide-right">
          <Button
            variant="ghost"
            className="w-full justify-start gap-2 text-base"
            asChild
            onClick={onItemClick}
          >
            <Link to={item.href}>
              <item.icon className="h-5 w-5" />
              {item.label}
            </Link>
          </Button>
        </AnimatedContainer>
      ))}
    </div>
  );
};

export default MobileNavigation;
