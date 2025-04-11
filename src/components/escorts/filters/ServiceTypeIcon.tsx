
import React from 'react';
import { Globe, Users, Map, MapPin, Video } from 'lucide-react';
import { ServiceTypeFilter } from './ServiceTypeBadgeLabel';

interface ServiceTypeIconProps {
  type: ServiceTypeFilter;
  size?: number;
  className?: string;
}

/**
 * Component that displays the appropriate icon for a service type
 */
const ServiceTypeIcon: React.FC<ServiceTypeIconProps> = ({ 
  type,
  size = 16,
  className = ""
}) => {
  switch(type) {
    case "in-person":
      return <MapPin size={size} className={className} />;
    case "virtual":
      return <Video size={size} className={className} />;
    case "both":
      return <Users size={size} className={className} />;
    default:
      return <Globe size={size} className={className} />;
  }
};

export default ServiceTypeIcon;
