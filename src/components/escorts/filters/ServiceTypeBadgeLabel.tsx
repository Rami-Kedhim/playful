
import React from 'react';
import { ServiceType } from '@/types/serviceType';
import { Badge } from '@/components/ui/badge';

// Export this type to fix imports in other files
export type ServiceTypeFilter = "in-person" | "virtual" | "both" | "all";

export interface ServiceTypeBadgeLabelProps {
  type?: ServiceType; // Make the type optional to fix TypeScript errors
}

const ServiceTypeBadgeLabel: React.FC<ServiceTypeBadgeLabelProps> = ({ type = "all" }) => {
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
    case "incall":
      label = "Incall";
      variant = "default";
      break;
    case "outcall":
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
