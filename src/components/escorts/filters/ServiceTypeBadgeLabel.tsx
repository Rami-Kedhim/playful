
import React from 'react';
import { Badge } from '@/components/ui/badge';
import ServiceTypeIcon from './ServiceTypeIcon';

export type ServiceTypeFilter = "in-person" | "virtual" | "both" | "any" | "";

interface ServiceTypeBadgeLabelProps {
  type: ServiceTypeFilter;
  color?: string;
  size?: string;
  showIcon?: boolean;
}

const ServiceTypeBadgeLabel: React.FC<ServiceTypeBadgeLabelProps> = ({ 
  type,
  color,
  size,
  showIcon = true
}) => {
  // Ensure type is never empty by using "any" as fallback
  const safeType: ServiceTypeFilter = !type || type === "" ? "any" : type;
  
  // Return null if type is "any"
  if (safeType === "any") return null;

  let label: string;
  let variant: "default" | "outline" | "secondary" | "destructive" = "outline";
  
  switch (safeType) {
    case "in-person":
      label = "In Person";
      variant = "default";
      break;
    case "virtual":
      label = "Virtual";
      variant = "secondary";
      break;
    case "both":
      label = "Both Types";
      variant = "outline";
      break;
    default:
      return null;
  }

  return (
    <Badge variant={variant} className="flex items-center gap-1">
      {showIcon && <ServiceTypeIcon type={safeType} size={14} />}
      <span>{label}</span>
    </Badge>
  );
};

export default ServiceTypeBadgeLabel;
