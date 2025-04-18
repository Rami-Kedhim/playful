
import React from 'react';
import { Badge } from '@/components/ui/badge';

// Define the ServiceTypeFilter as a type, not just values
export type ServiceTypeFilter = 'in-person' | 'virtual' | 'both' | '';

interface ServiceTypeBadgeLabelProps {
  type: ServiceTypeFilter;
  className?: string;
}

// Service type filter constants that can be exported and used by other components
export const SERVICE_TYPES = {
  IN_PERSON: 'in-person' as ServiceTypeFilter,
  VIRTUAL: 'virtual' as ServiceTypeFilter,
  BOTH: 'both' as ServiceTypeFilter,
};

// Helper function to get badge label from service type
export const getServiceTypeBadgeLabel = (type: ServiceTypeFilter): string => {
  switch (type.toLowerCase()) {
    case SERVICE_TYPES.IN_PERSON:
      return 'In-Person';
    case SERVICE_TYPES.VIRTUAL:
      return 'Virtual';
    case SERVICE_TYPES.BOTH:
      return 'In-Person & Virtual';
    default:
      return type || 'Any';
  }
};

// Export the ServiceTypeFilter for other components to use
export const ServiceTypeFilterOptions = {
  types: SERVICE_TYPES,
  getLabel: getServiceTypeBadgeLabel,
  options: [
    { value: SERVICE_TYPES.IN_PERSON, label: 'In-Person' },
    { value: SERVICE_TYPES.VIRTUAL, label: 'Virtual' },
    { value: SERVICE_TYPES.BOTH, label: 'Both' },
    { value: '', label: 'Any' }
  ],
};

const ServiceTypeBadgeLabel: React.FC<ServiceTypeBadgeLabelProps> = ({ type, className }) => {
  let label: string = getServiceTypeBadgeLabel(type);
  let variant: "default" | "secondary" | "outline" | "destructive" = "outline";
  
  switch (type.toLowerCase()) {
    case SERVICE_TYPES.IN_PERSON:
      variant = 'default';
      break;
    case SERVICE_TYPES.VIRTUAL:
      variant = 'secondary';
      break;
    case SERVICE_TYPES.BOTH:
      variant = 'outline';
      break;
    default:
      variant = 'outline';
  }
  
  return (
    <Badge variant={variant} className={className}>
      {label}
    </Badge>
  );
};

export default ServiceTypeBadgeLabel;
