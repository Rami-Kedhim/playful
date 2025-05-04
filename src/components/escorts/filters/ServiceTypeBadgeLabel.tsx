
import React from 'react';
import { Badge } from "@/components/ui/badge";
import { Users, Video, Zap } from "lucide-react";

export type ServiceTypeFilter = "in-person" | "virtual" | "both" | "any" | "";

interface ServiceTypeBadgeLabelProps {
  serviceType?: ServiceTypeFilter;
  type?: ServiceTypeFilter; // Add this prop to accept both naming conventions
  includeIcon?: boolean;
  size?: "sm" | "default" | "lg"; // Add 'lg' size option
}

/**
 * A badge component to display service type with icon and label
 * Used for filtering and displaying escort service types
 */
const ServiceTypeBadgeLabel: React.FC<ServiceTypeBadgeLabelProps> = ({ 
  serviceType,
  type,
  includeIcon = true,
  size = "default"
}) => {
  // Use type prop if serviceType is not provided
  const actualType = serviceType || type || "";
  
  const getServiceTypeDetails = () => {
    switch (actualType) {
      case "in-person":
        return { 
          label: "In Person",
          icon: <Users size={16} />,
          variant: "outline" as const,
          className: "text-blue-500 border-blue-200"
        };
      case "virtual":
        return { 
          label: "Virtual",
          icon: <Video size={16} />,
          variant: "outline" as const,
          className: "text-purple-500 border-purple-200" 
        };
      case "both":
        return { 
          label: "Both Types",
          icon: <Zap size={16} />,
          variant: "outline" as const,
          className: "text-green-500 border-green-200" 
        };
      default:
        return { 
          label: "Any Type",
          icon: null,
          variant: "outline" as const,
          className: "text-gray-500 border-gray-200" 
        };
    }
  };
  
  const { label, icon, variant, className } = getServiceTypeDetails();
  
  return (
    <Badge 
      variant={variant}
      className={`${className} ${size === "sm" ? "text-xs py-0 px-1.5" : size === "lg" ? "text-base py-1 px-3" : ""}`}
    >
      {includeIcon && icon && <span className="mr-1">{icon}</span>}
      {label}
    </Badge>
  );
};

export default ServiceTypeBadgeLabel;
