
import React from 'react';
import { Globe, Users, MapPin, Video } from 'lucide-react';
import { ServiceTypeFilter } from './ServiceTypeBadgeLabel';
import { cn } from '@/lib/utils';

interface ServiceTypeIconProps {
  type: ServiceTypeFilter;
  size?: number;
  className?: string;
  variant?: 'default' | 'colored';
}

/**
 * Component that displays the appropriate icon for a service type
 * Supports different visual styles through the variant prop
 */
const ServiceTypeIcon: React.FC<ServiceTypeIconProps> = ({ 
  type,
  size = 16,
  className = "",
  variant = 'default'
}) => {
  const getColorClass = () => {
    if (variant !== 'colored') return "";
    
    switch(type) {
      case "in-person": return "text-blue-500";
      case "virtual": return "text-purple-500";
      case "both": return "text-green-500";
      default: return "text-gray-500";
    }
  };
  
  const iconClass = cn(className, getColorClass());
  
  switch(type) {
    case "in-person":
      return <MapPin size={size} className={iconClass} />;
    case "virtual":
      return <Video size={size} className={iconClass} />;
    case "both":
      return <Users size={size} className={iconClass} />;
    default:
      return <Globe size={size} className={iconClass} />;
  }
};

export default ServiceTypeIcon;
