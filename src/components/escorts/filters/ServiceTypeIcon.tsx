
import React from "react";
import { Users, Video, MonitorSmartphone } from "lucide-react";
import { ServiceTypeFilter } from "./ServiceTypeBadgeLabel";
import { cn } from "@/lib/utils";

interface ServiceTypeIconProps {
  type: ServiceTypeFilter;
  className?: string;
  size?: number;
}

const ServiceTypeIcon = ({ type, className, size = 16 }: ServiceTypeIconProps) => {
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

export default ServiceTypeIcon;
