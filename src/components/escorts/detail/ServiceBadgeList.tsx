
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { getServiceById, mapLegacyServiceToId } from "@/data/serviceCategories";

interface ServiceBadgeListProps {
  services: string[];
  limit?: number;
  className?: string;
}

const ServiceBadgeList = ({ services = [], limit, className = "" }: ServiceBadgeListProps) => {
  const [showAll, setShowAll] = useState(false);
  
  // Handle empty services array
  if (!services || services.length === 0) {
    return (
      <div className={`text-sm text-muted-foreground ${className}`}>
        No services listed
      </div>
    );
  }
  
  const displayServices = showAll || !limit ? services : services.slice(0, limit);
  const hasMore = limit && services.length > limit;
  
  return (
    <div className={className}>
      <div className="flex flex-wrap gap-1 mb-2">
        {displayServices.map((service, index) => {
          const serviceId = mapLegacyServiceToId(service);
          const serviceDetails = getServiceById(serviceId);
          
          return (
            <Badge 
              key={index} 
              variant="secondary"
              className="text-xs"
              title={serviceDetails?.description || ""}
            >
              {serviceDetails?.name || service}
            </Badge>
          );
        })}
      </div>
      
      {hasMore && (
        <Button 
          variant="link" 
          className="text-xs p-0 h-auto" 
          onClick={() => setShowAll(!showAll)}
        >
          {showAll ? "Show less" : `+${services.length - limit} more`}
        </Button>
      )}
    </div>
  );
};

export default ServiceBadgeList;
