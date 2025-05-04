
import React from 'react';
import { Users, Video, Activity } from 'lucide-react';
import { ServiceTypeFilter } from './ServiceTypeBadgeLabel';

interface ServiceTypeIconProps {
  type: ServiceTypeFilter;
  size?: number;
  className?: string;
}

const ServiceTypeIcon: React.FC<ServiceTypeIconProps> = ({ 
  type, 
  size = 16,
  className 
}) => {
  switch (type) {
    case "in-person":
      return <Users size={size} className={className} />;
    case "virtual":
      return <Video size={size} className={className} />;
    case "both":
      return <Activity size={size} className={className} />;
    case "any":
    default:
      return null;
  }
};

export default ServiceTypeIcon;
