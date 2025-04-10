
import React from 'react';
import { Badge } from "@/components/ui/badge";
import { VideoIcon, Users, Radio, CheckCircle } from 'lucide-react';

export type ServiceTypeFilter = "" | "in-person" | "virtual" | "both";

export interface ServiceTypeInfo {
  icon: React.ReactNode;
  label: string;
  bgColor: string;
  textColor: string;
  // Add the missing properties
  filterLabel: string;
  description: string;
}

// Map of service types to their display information
export const serviceTypeInfoMap: Record<ServiceTypeFilter, ServiceTypeInfo> = {
  "": {
    icon: <CheckCircle className="h-3.5 w-3.5" />,
    label: "All Services",
    bgColor: "bg-gray-100",
    textColor: "text-gray-700",
    filterLabel: "All Services",
    description: "Both in-person and virtual services"
  },
  "in-person": {
    icon: <Users className="h-3.5 w-3.5" />,
    label: "In Person",
    bgColor: "bg-blue-100",
    textColor: "text-blue-700",
    filterLabel: "In-person",
    description: "Meet face-to-face for services"
  },
  "virtual": {
    icon: <VideoIcon className="h-3.5 w-3.5" />,
    label: "Virtual",
    bgColor: "bg-purple-100",
    textColor: "text-purple-700",
    filterLabel: "Virtual",
    description: "Video calls and online experiences"
  },
  "both": {
    icon: <Radio className="h-3.5 w-3.5" />,
    label: "Both Services",
    bgColor: "bg-green-100",
    textColor: "text-green-700",
    filterLabel: "Both",
    description: "Provides both in-person and virtual services"
  }
};

export const getServiceTypeInfo = (type: ServiceTypeFilter): ServiceTypeInfo => {
  return serviceTypeInfoMap[type] || serviceTypeInfoMap[""];
};

export const getServiceTypeBadgeLabel = (type: ServiceTypeFilter): string => {
  return serviceTypeInfoMap[type]?.label || "All Services";
};

interface ServiceTypeBadgeLabelProps {
  type: ServiceTypeFilter;
}

const ServiceTypeBadgeLabel: React.FC<ServiceTypeBadgeLabelProps> = ({ type }) => {
  const { icon, label, bgColor, textColor } = getServiceTypeInfo(type);
  
  return (
    <Badge 
      variant="outline" 
      className={`flex items-center gap-1 font-normal ${bgColor} ${textColor} border-0`}
    >
      {icon}
      <span>{label}</span>
    </Badge>
  );
};

export default ServiceTypeBadgeLabel;
