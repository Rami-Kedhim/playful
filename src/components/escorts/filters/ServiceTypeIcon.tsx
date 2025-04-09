
import React from "react";
import { Users, Video, MonitorSmartphone, Check } from "lucide-react";
import { ServiceTypeFilter } from "./ServiceTypeBadgeLabel";
import { cn } from "@/lib/utils";

interface ServiceTypeIconProps {
  type: ServiceTypeFilter;
  className?: string;
  size?: number;
  withLabel?: boolean;
  isSelected?: boolean;
  withBackground?: boolean;
}

const ServiceTypeIcon = ({ 
  type, 
  className, 
  size = 16, 
  withLabel = false,
  isSelected = false,
  withBackground = false
}: ServiceTypeIconProps) => {
  // Get the appropriate icon based on service type
  const renderIcon = () => {
    switch (type) {
      case "in-person":
        return <Users className={cn("text-primary", className)} size={size} />;
      case "virtual":
        return <Video className={cn("text-primary", className)} size={size} />;
      case "both":
        return (
          <div className={cn("flex items-center space-x-0.5", className)}>
            <Users size={size * 0.75} className="text-primary" />
            <Video size={size * 0.75} className="text-primary" />
          </div>
        );
      default:
        return <MonitorSmartphone className={cn("text-muted-foreground", className)} size={size} />;
    }
  };

  // Simple icon-only version
  if (!withLabel) {
    if (withBackground) {
      return (
        <div className={cn(
          "flex items-center justify-center rounded-full bg-primary/10 p-1",
          isSelected && "bg-primary/20",
          className
        )}>
          {renderIcon()}
        </div>
      );
    }
    return renderIcon();
  }

  // Icon with label version
  const getLabel = () => {
    switch (type) {
      case "in-person": return "In-Person";
      case "virtual": return "Virtual";
      case "both": return "Both";
      default: return "All Types";
    }
  };

  return (
    <div className={cn(
      "flex items-center gap-2",
      isSelected && "font-medium",
      className
    )}>
      {withBackground ? (
        <div className={cn(
          "flex items-center justify-center rounded-full bg-primary/10 p-1",
          isSelected && "bg-primary/20"
        )}>
          {renderIcon()}
        </div>
      ) : (
        renderIcon()
      )}
      <span>{getLabel()}</span>
      {isSelected && <Check size={size} className="text-primary ml-1" />}
    </div>
  );
};

export default ServiceTypeIcon;
