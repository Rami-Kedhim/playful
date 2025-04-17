
import React from 'react';
import { Badge } from '@/components/ui/badge';
import { MapPin, Laptop, SquareUserRound } from 'lucide-react';

export type ServiceTypeFilter = 'in-person' | 'virtual' | 'both' | '';

interface ServiceTypeBadgeLabelProps {
  type: ServiceTypeFilter;
  className?: string;
}

// Helper function to get the label for a service type
export const getServiceTypeBadgeLabel = (type: ServiceTypeFilter): string => {
  switch (type) {
    case 'in-person': return 'In Person';
    case 'virtual': return 'Virtual';
    case 'both': return 'In Person & Virtual';
    default: return '';
  }
};

const ServiceTypeBadgeLabel: React.FC<ServiceTypeBadgeLabelProps> = ({ type, className }) => {
  switch (type) {
    case 'in-person':
      return (
        <Badge className={`bg-blue-600 text-white border-0 flex items-center gap-1 ${className}`}>
          <MapPin className="h-3 w-3" />
          <span>In Person</span>
        </Badge>
      );
    case 'virtual':
      return (
        <Badge className={`bg-purple-600 text-white border-0 flex items-center gap-1 ${className}`}>
          <Laptop className="h-3 w-3" />
          <span>Virtual</span>
        </Badge>
      );
    case 'both':
      return (
        <Badge className={`bg-green-600 text-white border-0 flex items-center gap-1 ${className}`}>
          <SquareUserRound className="h-3 w-3" />
          <span>In Person & Virtual</span>
        </Badge>
      );
    default:
      return null;
  }
};

export default ServiceTypeBadgeLabel;
