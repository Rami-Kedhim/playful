
import React from "react";
import { Badge } from "@/components/ui/badge";
import { mapLegacyServiceToId, serviceCategories } from "@/data/serviceCategories";

interface ServiceCategoryBadgeProps {
  serviceName: string;
  className?: string;
}

const ServiceCategoryBadge = ({ serviceName, className = "" }: ServiceCategoryBadgeProps) => {
  const serviceId = mapLegacyServiceToId(serviceName);
  
  // Find which category this service belongs to
  let categoryName = "Specialty";
  let serviceMappedName = serviceName;
  
  for (const category of serviceCategories) {
    const service = category.services.find(s => s.id === serviceId);
    if (service) {
      categoryName = category.name;
      serviceMappedName = service.name;
      break;
    }
  }
  
  return (
    <Badge 
      variant="secondary" 
      className={`text-xs ${className}`}
      title={`Category: ${categoryName}`}
    >
      {serviceMappedName}
    </Badge>
  );
};

export default ServiceCategoryBadge;
