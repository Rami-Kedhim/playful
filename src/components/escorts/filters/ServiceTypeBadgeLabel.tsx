
import React from 'react';
import { Badge } from '@/components/ui/badge';
import ServiceTypeIcon from './ServiceTypeIcon';

export type ServiceTypeFilter = "" | "in-person" | "virtual" | "both";

interface ServiceTypeInfo {
  label: string;
  filterLabel: string;
  badgeLabel: string;
  description: string;
  color: string;
}

// Service type information mapping
const serviceTypeInfoMap: Record<ServiceTypeFilter, ServiceTypeInfo> = {
  "in-person": {
    label: "In-Person",
    filterLabel: "In-Person Only",
    badgeLabel: "In-Person",
    description: "Physical meetings and in-person services only",
    color: "bg-indigo-500"
  },
  "virtual": {
    label: "Virtual",
    filterLabel: "Virtual Only",
    badgeLabel: "Virtual",
    description: "Online services and virtual interactions only",
    color: "bg-purple-500"
  },
  "both": {
    label: "In-Person & Virtual",
    filterLabel: "Both Services",
    badgeLabel: "In-Person & Virtual",
    description: "Offers both in-person and virtual services",
    color: "bg-blue-500"
  },
  "": {
    label: "All Services",
    filterLabel: "All Services",
    badgeLabel: "",
    description: "No preference for service type",
    color: ""
  }
};

// Helper function to get service type badge label
export const getServiceTypeBadgeLabel = (type: ServiceTypeFilter): string => {
  return serviceTypeInfoMap[type]?.badgeLabel || "";
};

// Helper function to get service type information
export const getServiceTypeInfo = (type: ServiceTypeFilter): ServiceTypeInfo => {
  return serviceTypeInfoMap[type];
};

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
