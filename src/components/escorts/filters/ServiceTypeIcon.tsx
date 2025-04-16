
import React from 'react';
import { PersonStanding, Laptop, Flower2 } from 'lucide-react';
import { ServiceTypeFilter } from './ServiceTypeBadgeLabel';

interface ServiceTypeIconProps {
  type: ServiceTypeFilter;
  size?: number;
  variant?: 'default' | 'colored';
}

const ServiceTypeIcon: React.FC<ServiceTypeIconProps> = ({ 
  type, 
  size = 16,
  variant = 'default'
}) => {
  if (!type) return null;
  
  const iconProps = {
    width: size,
    height: size,
    className: variant === 'colored' ? getColorClass(type) : undefined
  };
  
  switch (type) {
    case 'in-person':
      return <PersonStanding {...iconProps} />;
    case 'virtual':
      return <Laptop {...iconProps} />;
    case 'both':
      return <Flower2 {...iconProps} />;
    default:
      return null;
  }
};

const getColorClass = (type: ServiceTypeFilter): string => {
  switch (type) {
    case 'in-person':
      return 'text-primary';
    case 'virtual':
      return 'text-blue-500';
    case 'both':
      return 'text-purple-500';
    default:
      return '';
  }
};

export default ServiceTypeIcon;
