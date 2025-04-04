
import React from "react";
import { Badge } from "@/components/ui/badge";
import ServiceCategoryBadge from "./ServiceCategoryBadge";

interface ServiceBadgeListProps {
  services: string[];
  className?: string;
  limit?: number;
}

const ServiceBadgeList = ({ 
  services,
  className = "",
  limit = 5
}: ServiceBadgeListProps) => {
  if (!services.length) return null;

  const displayServices = services.slice(0, limit);
  const hasMore = services.length > limit;

  return (
    <div className={`flex flex-wrap gap-1.5 ${className}`}>
      {displayServices.map((service) => (
        <ServiceCategoryBadge 
          key={service} 
          serviceName={service} 
          className="text-xs"
        />
      ))}
      {hasMore && (
        <Badge variant="secondary" className="text-xs">
          +{services.length - limit} more
        </Badge>
      )}
    </div>
  );
};

export default ServiceBadgeList;
