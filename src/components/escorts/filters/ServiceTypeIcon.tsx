
import React from 'react';
import { Home, MapPin, Video, Users, Utensils } from 'lucide-react';
import { ServiceTypeFilter } from '@/contexts/ServiceTypeContext';

interface ServiceTypeIconProps {
  type: ServiceTypeFilter;
  className?: string;
  size?: number;
}

const ServiceTypeIcon: React.FC<ServiceTypeIconProps> = ({ type, className, size }) => {
  switch (type) {
    case 'in-call':
      return <Home className={className} size={size} />;
    case 'out-call':
      return <MapPin className={className} size={size} />;
    case 'virtual':
      return <Video className={className} size={size} />;
    case 'massage':
      return <Users className={className} size={size} />; // Using Users instead of Massage
    case 'dinner':
      return <Utensils className={className} size={size} />;
    case 'any':
    default:
      return <Home className={className} size={size} />;
  }
};

export default ServiceTypeIcon;
