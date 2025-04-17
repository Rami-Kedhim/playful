
import React from 'react';
import { MapPin, Laptop, SquareUserRound } from 'lucide-react';
import { ServiceTypeFilter } from './ServiceTypeBadgeLabel';

interface ServiceTypeIconProps {
  type: ServiceTypeFilter;
  size?: number;
  variant?: 'colored' | 'default';
}

const ServiceTypeIcon: React.FC<ServiceTypeIconProps> = ({ 
  type, 
  size = 16,
  variant = 'default'
}) => {
  const getColorClass = () => {
    if (variant !== 'colored') return '';
    
    switch (type) {
      case 'in-person': return 'text-blue-600';
      case 'virtual': return 'text-purple-600';
      case 'both': return 'text-green-600';
      default: return '';
    }
  };

  const className = `h-${size} w-${size} ${getColorClass()}`;
  
  switch (type) {
    case 'in-person':
      return <MapPin className={className} />;
    case 'virtual':
      return <Laptop className={className} />;
    case 'both':
      return <SquareUserRound className={className} />;
    default:
      return null;
  }
};

export default ServiceTypeIcon;
