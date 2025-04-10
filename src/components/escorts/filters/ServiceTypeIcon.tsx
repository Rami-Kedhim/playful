
import React from 'react';
import { Monitor, Users, Globe } from 'lucide-react';
import { ServiceTypeFilter } from './ServiceTypeBadgeLabel';

interface ServiceTypeIconProps {
  type: ServiceTypeFilter;
  size?: number;
  className?: string;
}

const ServiceTypeIcon: React.FC<ServiceTypeIconProps> = ({ type, size = 16, className = "" }) => {
  switch (type) {
    case "in-person":
      return <Users size={size} className={className} />;
    case "virtual":
      return <Monitor size={size} className={className} />;
    case "both":
      return <Globe size={size} className={className} />;
    default:
      return null;
  }
};

export default ServiceTypeIcon;
