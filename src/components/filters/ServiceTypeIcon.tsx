
import React from 'react';
import { MapPin, Video, UserCheck, SunMoon, UtensilsCrossed } from 'lucide-react';
import { ServiceTypeFilter } from '@/components/escorts/filters/ServiceTypeBadgeLabel';

export interface ServiceTypeIconProps {
  type: ServiceTypeFilter;
  size?: number;
  className?: string; // Added className prop
}

const ServiceTypeIcon: React.FC<ServiceTypeIconProps> = ({ 
  type, 
  size = 16,
  className = ""
}) => {
  switch(type) {
    case 'in-person':
      return <MapPin size={size} className={className} />;
    case 'virtual':
      return <Video size={size} className={className} />;
    case 'both':
      return <UserCheck size={size} className={className} />;
    case 'massage':
      return <SunMoon size={size} className={className} />;
    case 'dinner':
      return <UtensilsCrossed size={size} className={className} />;
    default:
      return null;
  }
};

export default ServiceTypeIcon;
