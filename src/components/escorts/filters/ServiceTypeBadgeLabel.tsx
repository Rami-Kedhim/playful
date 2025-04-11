
import React from 'react';
import { Badge } from "@/components/ui/badge";
import ServiceTypeIcon from './ServiceTypeIcon';
import { cn } from "@/lib/utils";

export type ServiceTypeFilter = "" | "in-person" | "virtual" | "both";

interface ServiceTypeBadgeLabelProps {
  type: ServiceTypeFilter;
  size?: 'sm' | 'md' | 'lg';
  className?: string;
}

/**
 * A component that displays a service type as a badge with icon
 */
const ServiceTypeBadgeLabel: React.FC<ServiceTypeBadgeLabelProps> = ({ 
  type, 
  size = 'md', 
  className 
}) => {
  if (!type) return null;
  
  const iconSize = size === 'sm' ? 14 : size === 'md' ? 16 : 18;
  
  const getTypeLabel = () => {
    switch (type) {
      case 'in-person':
        return 'In Person';
      case 'virtual':
        return 'Virtual';
      case 'both':
        return 'In Person & Virtual';
      default:
        return '';
    }
  };
  
  const getVariant = () => {
    switch (type) {
      case 'in-person':
        return 'default';
      case 'virtual':
        return 'secondary';
      case 'both':
        return 'outline';
      default:
        return 'default';
    }
  };
  
  return (
    <Badge 
      variant={getVariant()} 
      className={cn(
        "gap-1 font-normal",
        size === 'sm' && "text-xs py-0 h-5",
        className
      )}
    >
      <ServiceTypeIcon type={type} size={iconSize} variant="colored" />
      <span>{getTypeLabel()}</span>
    </Badge>
  );
};

export default ServiceTypeBadgeLabel;
