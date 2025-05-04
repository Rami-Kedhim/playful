
import React from 'react';
import { Badge } from "@/components/ui/badge";
import { Users, Video, Zap } from "lucide-react";

export type ServiceTypeFilter = "in-person" | "virtual" | "both" | "any" | "";

interface ServiceTypeBadgeLabelProps {
  serviceType?: ServiceTypeFilter;
  type?: ServiceTypeFilter; // Add this prop to accept both naming conventions
  includeIcon?: boolean;
  size?: "sm" | "default" | "lg"; // Add 'lg' size option
  showIcon?: boolean; // Added showIcon prop
  color?: string; // Added color prop
  className?: string; // Add className prop for custom styling
}

/**
 * A badge component to display service type with icon and label
 * Used for filtering and displaying escort service types
 */
const ServiceTypeBadgeLabel: React.FC<ServiceTypeBadgeLabelProps> = ({ 
  serviceType,
  type,
  includeIcon = true,
  size = "default",
  showIcon, // This will override includeIcon if provided
  color,
  className: customClassName = ""
}) => {
  // Use type prop if serviceType is not provided
  const actualType = serviceType || type || "";
  
  // Use showIcon prop if provided, otherwise fall back to includeIcon
  const shouldShowIcon = showIcon !== undefined ? showIcon : includeIcon;
  
  const getServiceTypeDetails = () => {
    switch (actualType) {
      case "in-person":
        return { 
          label: "In Person",
          icon: <Users size={16} />,
          variant: "outline" as const,
          className: color ? `text-${color}` : "text-blue-500 border-blue-200"
        };
      case "virtual":
        return { 
          label: "Virtual",
          icon: <Video size={16} />,
          variant: "outline" as const,
          className: color ? `text-${color}` : "text-purple-500 border-purple-200" 
        };
      case "both":
        return { 
          label: "Both Types",
          icon: <Zap size={16} />,
          variant: "outline" as const,
          className: color ? `text-${color}` : "text-green-500 border-green-200" 
        };
      default:
        return { 
          label: "Any Type",
          icon: null,
          variant: "outline" as const,
          className: color ? `text-${color}` : "text-gray-500 border-gray-200" 
        };
    }
  };
  
  const { label, icon, variant, className } = getServiceTypeDetails();
  
  return (
    <Badge 
      variant={variant}
      className={`${className} ${customClassName} ${size === "sm" ? "text-xs py-0 px-1.5" : size === "lg" ? "text-base py-1 px-3" : ""}`}
    >
      {shouldShowIcon && icon && <span className="mr-1">{icon}</span>}
      {label}
    </Badge>
  );
};

export default ServiceTypeBadgeLabel;
