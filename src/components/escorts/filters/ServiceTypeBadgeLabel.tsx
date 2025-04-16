
import React from 'react';
import { Badge } from "@/components/ui/badge";
import { Globe, MapPin, Users } from "lucide-react";

export type ServiceTypeFilter = "in-person" | "virtual" | "both" | "";

interface ServiceTypeInfo {
  label: string;
  filterLabel: string;
  icon: React.ElementType;
  description?: string;
  color?: string;
}

export const serviceTypeInfoMap: Record<string, ServiceTypeInfo> = {
  "in-person": {
    label: "In-Person",
    filterLabel: "In-Person Only",
    icon: MapPin,
    description: "Physical meetings",
    color: "text-rose-500"
  },
  "virtual": {
    label: "Virtual",
    filterLabel: "Virtual Only",
    icon: Globe,
    description: "Online experiences",
    color: "text-blue-500"
  },
  "both": {
    label: "Hybrid",
    filterLabel: "In-Person & Virtual",
    icon: Users,
    description: "Both types available",
    color: "text-purple-500"
  },
  "": {
    label: "Any",
    filterLabel: "Any Type",
    icon: Users,
    description: "All service types",
    color: "text-gray-500"
  }
};

export const getServiceTypeInfo = (type: ServiceTypeFilter): ServiceTypeInfo => {
  return serviceTypeInfoMap[type] || serviceTypeInfoMap[""];
};

export const getServiceTypeBadgeLabel = (type: ServiceTypeFilter): string => {
  return getServiceTypeInfo(type).filterLabel;
};

export const getSafeServiceLabel = (serviceLabel: string): string => {
  // Map potentially problematic service names to safer ones
  const safetyMap: Record<string, string> = {
    "bdsm": "Power Play",
    "GFE": "Girlfriend Experience",
    "BDSM": "Power Play",
    "massage": "Massage",
    "roleplay": "Role Play",
    "Role Play": "Role Play",
    "Sensual Massage": "Massage",
    "overnight": "Overnight",
    "Dinner Date": "Dinner Date",
    "Travel Companion": "Travel Companion",
    "Events": "Events",
    "Weekend Getaways": "Weekend Getaways"
  };

  return safetyMap[serviceLabel] || serviceLabel;
};

interface ServiceTypeBadgeLabelProps {
  type: ServiceTypeFilter;
  className?: string;
  size?: "sm" | "default" | "lg";
}

const ServiceTypeBadgeLabel: React.FC<ServiceTypeBadgeLabelProps> = ({
  type,
  className = "",
  size = "default"
}) => {
  const info = getServiceTypeInfo(type);
  const IconComponent = info.icon;
  
  const sizeClasses = {
    sm: "text-xs py-0.5 px-1.5",
    default: "text-xs py-1 px-2",
    lg: "text-sm py-1 px-3"
  };
  
  return (
    <Badge 
      variant="outline" 
      className={`flex items-center gap-1 ${sizeClasses[size]} ${info.color || ""} ${className}`}
    >
      <IconComponent className="w-3 h-3" />
      <span>{info.label}</span>
    </Badge>
  );
};

export default ServiceTypeBadgeLabel;
export { type ServiceTypeFilter };
