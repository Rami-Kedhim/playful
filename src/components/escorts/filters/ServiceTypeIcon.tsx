
import React from 'react';
import { MapPin, Laptop, SquareUserRound } from 'lucide-react';
import { ServiceTypeFilter } from './ServiceTypeBadgeLabel';

interface ServiceTypeIconProps {
  type: ServiceTypeFilter;
  size?: number;
  variant?: 'colored' | 'default';
  className?: string;
}

const ServiceTypeIcon: React.FC<ServiceTypeIconProps> = ({ 
  type, 
  size = 16,
  variant = 'default',
  className = ''
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

  const iconClassName = `h-${size} w-${size} ${getColorClass()} ${className}`;
  
  switch (type) {
    case 'in-person':
      return <MapPin className={iconClassName} />;
    case 'virtual':
      return <Laptop className={iconClassName} />;
    case 'both':
      return <SquareUserRound className={iconClassName} />;
    default:
      return null;
  }
};

export default ServiceTypeIcon;
