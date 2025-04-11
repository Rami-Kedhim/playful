
import React from 'react';
import { Globe, Users, Map } from 'lucide-react';
import { ServiceTypeFilter } from './ServiceTypeBadgeLabel';

interface ServiceTypeIconProps {
  type: ServiceTypeFilter;
  size?: number;
  className?: string;
}

const ServiceTypeIcon: React.FC<ServiceTypeIconProps> = ({ 
  type,
  size = 16,
  className = ""
}) => {
  switch(type) {
    case "in-person":
      return <Map size={size} className={className} />;
    case "virtual":
      return <Globe size={size} className={className} />;
    case "both":
      return <Users size={size} className={className} />;
    default:
      return <Globe size={size} className={className} />;
  }
};

export default ServiceTypeIcon;
