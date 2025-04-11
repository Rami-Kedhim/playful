
import React from 'react';
import { Badge } from '@/components/ui/badge';
import { Video, Users, MapPin, Globe } from 'lucide-react';

// Define the possible service type filter values
export type ServiceTypeFilter = "" | "in-person" | "virtual" | "both";

// Information about each service type for consistent display
export const serviceTypeInfoMap: Record<string, {
  label: string;
  filterLabel: string;
  icon: React.ReactNode;
  bgColor: string;
  description: string;
}> = {
  "": {
    label: "Any",
    filterLabel: "Any Service Type",
    icon: <Globe className="h-3 w-3" />,
    bgColor: "bg-gray-100",
    description: "All service types"
  },
  "in-person": {
    label: "In Person",
    filterLabel: "In-Person Only",
    icon: <MapPin className="h-3 w-3" />,
    bgColor: "bg-blue-100",
    description: "Physical meetings only"
  },
  "virtual": {
    label: "Virtual",
    filterLabel: "Virtual Only",
    icon: <Video className="h-3 w-3" />,
    bgColor: "bg-purple-100",
    description: "Online services only"
  },
  "both": {
    label: "Both",
    filterLabel: "Both Services",
    icon: <Users className="h-3 w-3" />,
    bgColor: "bg-green-100",
    description: "Both in-person and virtual"
  }
};

// Helper function to get the service type info
export const getServiceTypeInfo = (type: ServiceTypeFilter) => {
  return serviceTypeInfoMap[type] || serviceTypeInfoMap[""];
};

// Helper function to get the badge label for a service type
export const getServiceTypeBadgeLabel = (type: ServiceTypeFilter): string => {
  return getServiceTypeInfo(type).filterLabel;
};

interface ServiceTypeBadgeLabelProps {
  type: ServiceTypeFilter;
  showLabel?: boolean;
}

/**
 * A badge component that displays the service type with an icon
 */
const ServiceTypeBadgeLabel: React.FC<ServiceTypeBadgeLabelProps> = ({ 
  type, 
  showLabel = true 
}) => {
  if (!type) return null;
  
  const info = serviceTypeInfoMap[type];
  
  if (!info) return null;
  
  return (
    <Badge 
      variant="outline" 
      className={`${info.bgColor} border-0 text-gray-800 flex items-center gap-1 whitespace-nowrap`}
    >
      <span className="flex items-center justify-center">
        {info.icon}
      </span>
      {showLabel && (
        <span>{info.label}</span>
      )}
    </Badge>
  );
};

export default ServiceTypeBadgeLabel;
