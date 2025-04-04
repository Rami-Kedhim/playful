
import React from "react";
import { Badge } from "@/components/ui/badge";
import { 
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger
} from "@/components/ui/tooltip";
import { mapLegacyServiceToId, serviceCategories, getServiceById } from "@/data/serviceCategories";

interface ServiceCategoryBadgeProps {
  serviceName: string;
  className?: string;
  showCategory?: boolean;
}

const ServiceCategoryBadge = ({ 
  serviceName, 
  className = "",
  showCategory = false
}: ServiceCategoryBadgeProps) => {
  const serviceId = mapLegacyServiceToId(serviceName);
  
  // Find which category this service belongs to
  let categoryName = "Specialty";
  let serviceMappedName = serviceName;
  let serviceDescription = "";
  
  for (const category of serviceCategories) {
    const service = category.services.find(s => s.id === serviceId);
    if (service) {
      categoryName = category.name;
      serviceMappedName = service.name;
      serviceDescription = service.description;
      break;
    }
  }
  
  return (
    <TooltipProvider>
      <Tooltip delayDuration={300}>
        <TooltipTrigger asChild>
          <Badge 
            variant="secondary" 
            className={`text-xs hover:bg-primary hover:text-primary-foreground transition-colors ${className}`}
          >
            {serviceMappedName}
            {showCategory && ` (${categoryName})`}
          </Badge>
        </TooltipTrigger>
        <TooltipContent className="max-w-xs">
          <div>
            <p className="font-medium">{serviceMappedName}</p>
            <p className="text-xs text-muted-foreground mt-1">{serviceDescription}</p>
            <p className="text-xs mt-2 opacity-70">Category: {categoryName}</p>
          </div>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
};

export default ServiceCategoryBadge;
