
import React from 'react';
import { Users, Monitor, Globe } from 'lucide-react';
import { ServiceTypeFilter } from '../escorts/filters/ServiceTypeBadgeLabel';

interface ServiceTypeIconProps {
  type: ServiceTypeFilter;
  size?: number;
  variant?: 'regular' | 'colored';
}

const ServiceTypeIcon: React.FC<ServiceTypeIconProps> = ({ 
  type, 
  size = 18,
  variant = 'regular'
}) => {
  const getIcon = () => {
    switch (type) {
      case 'in-person':
        return <Users size={size} className={variant === 'colored' ? "text-indigo-500" : ""} />;
      case 'virtual':
        return <Monitor size={size} className={variant === 'colored' ? "text-purple-500" : ""} />;
      case 'both':
        return <Globe size={size} className={variant === 'colored' ? "text-blue-500" : ""} />;
      case 'massage':
        return <span>💆</span>;
      case 'dinner':
        return <span>🍽️</span>;
      default:
        return null;
    }
  };

  return <>{getIcon()}</>;
};

export default ServiceTypeIcon;
