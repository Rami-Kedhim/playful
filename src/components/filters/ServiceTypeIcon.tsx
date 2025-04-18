
import React from 'react';
import { MapPin, Video, UserCheck, SunMoon, UtensilsCrossed } from 'lucide-react';
import { ServiceTypeFilter } from '@/components/escorts/context/ServiceTypeContext';

export interface ServiceTypeIconProps {
  type: ServiceTypeFilter;
  size?: number;
  className?: string;
  variant?: string; // Add support for variant prop
}

const ServiceTypeIcon: React.FC<ServiceTypeIconProps> = ({ 
  type, 
  size = 16,
  className = "",
  variant = "default" // Default value for variant
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
