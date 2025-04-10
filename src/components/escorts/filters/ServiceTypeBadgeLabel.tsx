
import React from 'react';
import { Badge } from '@/components/ui/badge';
import ServiceTypeIcon from './ServiceTypeIcon';

export type ServiceTypeFilter = "" | "in-person" | "virtual" | "both";

interface ServiceTypeBadgeLabelProps {
  type: ServiceTypeFilter;
}

const ServiceTypeBadgeLabel: React.FC<ServiceTypeBadgeLabelProps> = ({ type }) => {
  switch (type) {
    case "in-person":
      return (
        <Badge className="flex items-center gap-1 bg-indigo-500 text-white border-0">
          <ServiceTypeIcon type="in-person" size={12} />
          <span>In-Person</span>
        </Badge>
      );
    case "virtual":
      return (
        <Badge className="flex items-center gap-1 bg-purple-500 text-white border-0">
          <ServiceTypeIcon type="virtual" size={12} />
          <span>Virtual</span>
        </Badge>
      );
    case "both":
      return (
        <Badge className="flex items-center gap-1 bg-blue-500 text-white border-0">
          <ServiceTypeIcon type="both" size={12} />
          <span>In-Person & Virtual</span>
        </Badge>
      );
    default:
      return null;
  }
};

export default ServiceTypeBadgeLabel;
