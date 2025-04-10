
import React from 'react';
import { Badge } from '@/components/ui/badge';
import { Monitor, Users, Globe } from 'lucide-react';

export type ServiceTypeFilter = "" | "in-person" | "virtual" | "both";

interface ServiceTypeBadgeLabelProps {
  type: ServiceTypeFilter;
}

const ServiceTypeBadgeLabel: React.FC<ServiceTypeBadgeLabelProps> = ({ type }) => {
  switch (type) {
    case "in-person":
      return (
        <Badge className="flex items-center gap-1 bg-indigo-500 text-white border-0">
          <Users size={12} />
          <span>In-Person</span>
        </Badge>
      );
    case "virtual":
      return (
        <Badge className="flex items-center gap-1 bg-purple-500 text-white border-0">
          <Monitor size={12} />
          <span>Virtual</span>
        </Badge>
      );
    case "both":
      return (
        <Badge className="flex items-center gap-1 bg-blue-500 text-white border-0">
          <Globe size={12} />
          <span>In-Person & Virtual</span>
        </Badge>
      );
    default:
      return null;
  }
};

export default ServiceTypeBadgeLabel;
