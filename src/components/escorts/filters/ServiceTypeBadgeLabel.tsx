
import React from 'react';
import { Badge } from '@/components/ui/badge';
import ServiceTypeIcon from './ServiceTypeIcon';

// Update type definition to include "any" as a value
export type ServiceTypeFilter = "any" | "" | "in-person" | "virtual" | "both";

interface ServiceTypeBadgeLabelProps {
  type: ServiceTypeFilter;
  onRemove?: () => void;
  size?: 'sm' | 'md' | 'lg';
  className?: string;
}

/**
 * A badge component showing service type with appropriate icon and label
 */
const ServiceTypeBadgeLabel: React.FC<ServiceTypeBadgeLabelProps> = ({
  type,
  onRemove,
  size = 'md',
  className
}) => {
  if (!type) return null;
  
  const sizeClasses = {
    sm: 'text-xs py-0.5 px-1.5',
    md: 'text-sm py-1 px-2.5',
    lg: 'text-base py-1.5 px-3'
  };
  
  const getLabel = () => {
    switch (type) {
      case "in-person": return "In Person";
      case "virtual": return "Virtual";
      case "both": return "Both Types";
      case "any": return "Any Type";
      default: return "Any Type";
    }
  };
  
  const getVariant = () => {
    switch (type) {
      case "in-person": return "blue";
      case "virtual": return "purple";
      case "both": return "green";
      case "any": return "default";
      default: return "default";
    }
  };
  
  return (
    <Badge 
      variant={getVariant() as any}
      className={`flex items-center gap-1.5 ${sizeClasses[size]} ${className}`}
      onClick={onRemove}
    >
      <ServiceTypeIcon type={type} size={size === 'sm' ? 12 : size === 'md' ? 14 : 16} />
      {getLabel()}
      {onRemove && <span className="ml-1 cursor-pointer">×</span>}
    </Badge>
  );
};

export default ServiceTypeBadgeLabel;
