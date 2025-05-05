
import React from 'react';
import { Badge } from '@/components/ui/badge';
import ServiceTypeIcon from './ServiceTypeIcon';

export type ServiceTypeFilter = "in-person" | "virtual" | "both" | "any" | "";

interface ServiceTypeBadgeLabelProps {
  type: ServiceTypeFilter;
}

const ServiceTypeBadgeLabel: React.FC<ServiceTypeBadgeLabelProps> = ({ type }) => {
  if (!type || type === "any") return null;

  let label: string;
  let variant: "default" | "outline" | "secondary" | "destructive" = "outline";
  
  switch (type) {
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
      <ServiceTypeIcon type={type} size={14} />
      <span>{label}</span>
    </Badge>
  );
};

export default ServiceTypeBadgeLabel;
