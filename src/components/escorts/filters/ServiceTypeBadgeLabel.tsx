
import React from 'react';
import { Badge } from '@/components/ui/badge';
import ServiceTypeIcon from './ServiceTypeIcon';

// Export this type so it can be used elsewhere
export type ServiceTypeFilter = 'in-person' | 'virtual' | 'both' | 'any' | '';

interface ServiceTypeBadgeLabelProps {
  type: ServiceTypeFilter;
  showIcon?: boolean;
  color?: 'default' | 'primary' | 'secondary' | 'outline';
  size?: 'sm' | 'default' | 'lg';
}

const ServiceTypeBadgeLabel: React.FC<ServiceTypeBadgeLabelProps> = ({ 
  type, 
  showIcon = true,
  color = 'default',
  size = 'default'
}) => {
  const getLabel = () => {
    switch (type) {
      case "in-person": return "In Person";
      case "virtual": return "Virtual";
      case "both": return "In Person & Virtual";
      case "any": return "Any Type";
      default: return "Any Type";
    }
  };

  const getSizeClasses = () => {
    switch (size) {
      case "sm": return "text-xs py-0 px-2";
      case "lg": return "text-sm py-1 px-3";
      default: return "text-xs py-0.5 px-2.5";
    }
  };

  const label = getLabel();
  const sizeClasses = getSizeClasses();

  return (
    <Badge 
      variant={color} 
      className={`${sizeClasses} font-normal gap-1`}
    >
      {showIcon && <ServiceTypeIcon type={type} size={size === 'lg' ? 16 : 14} />}
      {label}
    </Badge>
  );
};

export default ServiceTypeBadgeLabel;
