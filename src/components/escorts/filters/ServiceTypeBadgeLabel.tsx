
import React from 'react';
import { Badge } from "@/components/ui/badge";
import ServiceTypeIcon from './ServiceTypeIcon';
import { cn } from "@/lib/utils";

export type ServiceTypeFilter = "" | "in-person" | "virtual" | "both";

export interface ServiceTypeInfo {
  filterLabel: string;
  badgeLabel: string;
  description: string;
}

export const serviceTypeInfoMap: Record<ServiceTypeFilter, ServiceTypeInfo> = {
  "in-person": {
    filterLabel: "In Person",
    badgeLabel: "In Person",
    description: "Physical meetups and appointments"
  },
  "virtual": {
    filterLabel: "Virtual",
    badgeLabel: "Virtual",
    description: "Online video calls, chats, and content"
  },
  "both": {
    filterLabel: "Both",
    badgeLabel: "In Person & Virtual",
    description: "Both physical and virtual services"
  },
  "": {
    filterLabel: "Any",
    badgeLabel: "Any Type",
    description: "All service types"
  }
};

export const getServiceTypeInfo = (type: ServiceTypeFilter): ServiceTypeInfo => {
  return serviceTypeInfoMap[type];
};

export const getServiceTypeBadgeLabel = (type: ServiceTypeFilter): string => {
  return type ? serviceTypeInfoMap[type].badgeLabel : "Any Type";
};

interface ServiceTypeBadgeLabelProps {
  type: ServiceTypeFilter;
  size?: 'sm' | 'md' | 'lg';
  className?: string;
}

/**
 * A component that displays a service type as a badge with icon
 */
const ServiceTypeBadgeLabel: React.FC<ServiceTypeBadgeLabelProps> = ({ 
  type, 
  size = 'md', 
  className 
}) => {
  if (!type) return null;
  
  const iconSize = size === 'sm' ? 14 : size === 'md' ? 16 : 18;
  
  const getTypeLabel = () => {
    switch (type) {
      case 'in-person':
        return 'In Person';
      case 'virtual':
        return 'Virtual';
      case 'both':
        return 'In Person & Virtual';
      default:
        return '';
    }
  };
  
  const getVariant = () => {
    switch (type) {
      case 'in-person':
        return 'default';
      case 'virtual':
        return 'secondary';
      case 'both':
        return 'outline';
      default:
        return 'default';
    }
  };
  
  return (
    <Badge 
      variant={getVariant()} 
      className={cn(
        "gap-1 font-normal",
        size === 'sm' && "text-xs py-0 h-5",
        className
      )}
    >
      <ServiceTypeIcon type={type} size={iconSize} variant="colored" />
      <span>{getTypeLabel()}</span>
    </Badge>
  );
};

export default ServiceTypeBadgeLabel;
