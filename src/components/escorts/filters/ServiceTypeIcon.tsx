
import React from 'react';
import { Users, Video, Activity } from 'lucide-react';
import { ServiceTypeFilter } from './ServiceTypeBadgeLabel';

export interface ServiceTypeIconProps {
  type: ServiceTypeFilter;
  size?: number;
  className?: string;
  variant?: 'default' | 'colored';
}

const ServiceTypeIcon: React.FC<ServiceTypeIconProps> = ({ 
  type, 
  size = 16,
  className,
  variant = 'default'
}) => {
  // For colored variants
  const getColorClass = () => {
    if (variant !== 'colored') return '';
    
    switch (type) {
      case "in-person":
        return "text-blue-500";
      case "virtual":
        return "text-purple-500";
      case "both":
        return "text-green-500";
      case "any":
      case "":
      default:
        return "text-gray-500";
    }
  };
  
  const iconClassName = `${className || ''} ${getColorClass()}`;
  
  switch (type) {
    case "in-person":
      return <Users size={size} className={iconClassName} />;
    case "virtual":
      return <Video size={size} className={iconClassName} />;
    case "both":
      return <Activity size={size} className={iconClassName} />;
    case "any":
    case "":
    default:
      return null;
  }
};

export default ServiceTypeIcon;
