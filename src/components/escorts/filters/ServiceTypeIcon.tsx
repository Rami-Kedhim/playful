
import React from 'react';
import { Globe, Map, Users } from 'lucide-react';
import { ServiceTypeFilter } from './ServiceTypeBadgeLabel';

interface ServiceTypeIconProps {
  type: ServiceTypeFilter;
  size?: number;
  variant?: 'default' | 'colored';
  className?: string;
}

/**
 * A component that displays an appropriate icon for service type
 */
const ServiceTypeIcon: React.FC<ServiceTypeIconProps> = ({ 
  type, 
  size = 16,
  variant = 'default',
  className
}) => {
  const getIconColor = () => {
    if (variant !== 'colored') return 'currentColor';
    
    switch (type) {
      case 'in-person':
        return '#0ea5e9'; // sky-500
      case 'virtual':
        return '#8b5cf6'; // violet-500
      case 'both':
        return '#06b6d4'; // cyan-500
      default:
        return 'currentColor';
    }
  };
  
  const iconColor = getIconColor();
  const iconProps = { size, className, color: iconColor };
  
  switch (type) {
    case 'in-person':
      return <Map {...iconProps} />;
    case 'virtual':
      return <Globe {...iconProps} />;
    case 'both':
      return <Users {...iconProps} />;
    default:
      return null;
  }
};

export default ServiceTypeIcon;
