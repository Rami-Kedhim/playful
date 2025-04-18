
import React from 'react';
import { Users, Monitor, Globe, SunMoon, UtensilsCrossed } from 'lucide-react';
import { ServiceTypeFilter } from './ServiceTypeBadgeLabel';

interface ServiceTypeIconProps {
  type: ServiceTypeFilter | string;
  size?: number;
  variant?: 'default' | 'colored';
  className?: string;
}

const ServiceTypeIcon: React.FC<ServiceTypeIconProps> = ({
  type,
  size = 18,
  variant = 'default',
  className = ''
}) => {
  const iconColor = variant === 'colored' ? 'text-primary' : 'text-muted-foreground';
  const iconClass = `${iconColor} ${className}`;

  switch (type) {
    case 'in-person':
      return <Users size={size} className={iconClass} />;
    case 'virtual':
      return <Monitor size={size} className={iconClass} />;
    case 'both':
      return <Globe size={size} className={iconClass} />;
    case 'all':
    case '':
      return <Globe size={size} className={iconClass} />;
    default:
      return <Users size={size} className={iconClass} />;
  }
};

export default ServiceTypeIcon;
