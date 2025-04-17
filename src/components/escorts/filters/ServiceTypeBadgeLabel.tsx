
import React from 'react';
import { Badge } from '@/components/ui/badge';
import { MapPin, Laptop, SquareUserRound } from 'lucide-react';
import { ServiceTypeFilter } from '@/types/escort';

interface ServiceTypeBadgeLabelProps {
  type: ServiceTypeFilter;
  className?: string;
}

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
export type { ServiceTypeFilter };
