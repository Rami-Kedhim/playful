
import React from 'react';
import { MapPin, Video, Layers } from 'lucide-react';
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
  switch (type) {
    case 'in-person':
      return <MapPin size={size} className={className} />;
    case 'virtual':
      return <Video size={size} className={className} />;
    case 'both':
      return <Layers size={size} className={className} />;
    default:
      return null;
  }
};

export default ServiceTypeIcon;
