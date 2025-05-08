
import React from 'react';
import { ServiceTypeFilter as ServiceTypeFilterType } from '@/types/serviceType';
import { Badge } from '@/components/ui/badge';

// Export the ServiceTypeFilter type to be used by other components
export type ServiceTypeFilter = ServiceTypeFilterType;

export interface ServiceTypeBadgeLabelProps {
  type?: ServiceTypeFilter;
}

const ServiceTypeBadgeLabel: React.FC<ServiceTypeBadgeLabelProps> = ({ type = "any" }) => {
  let label: string;
  let variant: "default" | "outline" | "secondary" | "destructive" | null = null;

  switch (type) {
    case "in-person":
      label = "In-Person";
      variant = "default";
      break;
    case "virtual":
      label = "Virtual";
      variant = "secondary";
      break;
    case "both":
      label = "In-Person & Virtual";
      variant = "outline";
      break;
    case "in-call":
      label = "Incall";
      variant = "default";
      break;
    case "out-call":
      label = "Outcall";
      variant = "default";
      break;
    case "massage":
      label = "Massage";
      variant = "outline";
      break;
    case "dinner":
      label = "Dinner";
      variant = "outline";
      break;
    default:
      label = "Any Service";
      variant = "secondary";
  }

  return (
    <Badge variant={variant} className={variant === "secondary" ? "bg-secondary" : ""}>
      {label}
    </Badge>
  );
};

export default ServiceTypeBadgeLabel;
