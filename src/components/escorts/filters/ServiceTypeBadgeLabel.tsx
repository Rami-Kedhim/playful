
import React from 'react';
import { Badge } from '@/components/ui/badge';
import { MapPin, Video, SplitSquareVertical } from 'lucide-react';

export type ServiceTypeFilter = "" | "in-person" | "virtual" | "both" | "all" | "incall" | "outcall" | "massage" | "dinner";

export interface ServiceTypeBadgeLabelProps {
  type: ServiceTypeFilter;
  size?: 'sm' | 'default' | 'lg';
  showLabel?: boolean;
}

export const getServiceTypeBadgeLabel = (type: ServiceTypeFilter): string => {
  switch (type) {
    case "in-person":
      return "In-person";
    case "virtual":
      return "Virtual";
    case "both":
      return "In-person & Virtual";
    case "all":
      return "All Types";
    case "incall":
      return "Incall";
    case "outcall":
      return "Outcall";
    case "massage":
      return "Massage";
    case "dinner":
      return "Dinner Date";
    default:
      return "";
  }
};

const ServiceTypeBadgeLabel: React.FC<ServiceTypeBadgeLabelProps> = ({
  type,
  size = 'default',
  showLabel = true
}) => {
  if (!type) return null;
  
  let Icon;
  let label = "";
  let variant: "default" | "secondary" | "outline" = "default";
  
  switch (type) {
    case "in-person":
      Icon = MapPin;
      label = "In-person";
      variant = "secondary";
      break;
    case "virtual":
      Icon = Video;
      label = "Virtual";
      variant = "outline";
      break;
    case "both":
      Icon = SplitSquareVertical;
      label = "In-person & Virtual";
      variant = "default";
      break;
    case "all":
      Icon = SplitSquareVertical;
      label = "All Types";
      variant = "default";
      break;
    case "incall":
      Icon = MapPin;
      label = "Incall";
      variant = "secondary";
      break;
    case "outcall":
      Icon = MapPin;
      label = "Outcall";
      variant = "secondary";
      break;
    case "massage":
      Icon = MapPin;
      label = "Massage";
      variant = "secondary";
      break;
    case "dinner":
      Icon = MapPin;
      label = "Dinner Date";
      variant = "secondary";
      break;
    default:
      return null;
  }
  
  const iconSize = size === 'sm' ? 'h-3 w-3' : size === 'lg' ? 'h-5 w-5' : 'h-4 w-4';
  const badgeClass = size === 'sm' ? 'text-xs py-0 px-1' : size === 'lg' ? 'text-sm py-1 px-2' : '';
  
  return (
    <Badge variant={variant} className={badgeClass}>
      {Icon && <Icon className={`${iconSize} ${showLabel ? 'mr-1' : ''}`} />}
      {showLabel && label}
    </Badge>
  );
};

export default ServiceTypeBadgeLabel;
