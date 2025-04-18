
import React from 'react';
import { Badge } from '@/components/ui/badge';

interface ServiceTypeBadgeLabelProps {
  type: string;
  className?: string;
}

const ServiceTypeBadgeLabel: React.FC<ServiceTypeBadgeLabelProps> = ({ type, className }) => {
  let label: string;
  let variant: "default" | "secondary" | "outline" | "destructive" = "outline";
  
  switch (type.toLowerCase()) {
    case 'in-person':
      label = 'In-Person';
      variant = 'default';
      break;
    case 'virtual':
      label = 'Virtual';
      variant = 'secondary';
      break;
    case 'both':
      label = 'In-Person & Virtual';
      variant = 'outline';
      break;
    default:
      label = type;
  }
  
  return (
    <Badge variant={variant} className={className}>
      {label}
    </Badge>
  );
};

export default ServiceTypeBadgeLabel;
