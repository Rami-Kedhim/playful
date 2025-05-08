
import React from 'react';
import { Home, MapPin, Video, Massage, Utensils } from 'lucide-react';
import { ServiceTypeFilter } from '@/contexts/ServiceTypeContext';

interface ServiceTypeIconProps {
  type: ServiceTypeFilter;
  className?: string;
}

const ServiceTypeIcon: React.FC<ServiceTypeIconProps> = ({ type, className }) => {
  switch (type) {
    case 'in-call':
      return <Home className={className} />;
    case 'out-call':
      return <MapPin className={className} />;
    case 'virtual':
      return <Video className={className} />;
    case 'massage':
      return <Massage className={className} />;
    case 'dinner':
      return <Utensils className={className} />;
    case 'any':
    default:
      return <Home className={className} />;
  }
};

export default ServiceTypeIcon;
