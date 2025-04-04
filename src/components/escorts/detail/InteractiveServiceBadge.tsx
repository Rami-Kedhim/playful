
import React, { useState } from "react";
import { Badge } from "@/components/ui/badge";
import { 
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger
} from "@/components/ui/tooltip";
import { 
  mapLegacyServiceToId, 
  serviceCategories, 
  getServiceById 
} from "@/data/serviceCategories";
import { Sparkles } from "lucide-react";

interface InteractiveServiceBadgeProps {
  serviceName: string;
  className?: string;
  showCategory?: boolean;
  interactive?: boolean;
}

const InteractiveServiceBadge = ({ 
  serviceName, 
  className = "",
  showCategory = false,
  interactive = true
}: InteractiveServiceBadgeProps) => {
  const [isHovered, setIsHovered] = useState(false);
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
  
  if (!interactive) {
    return (
      <Badge 
        variant="secondary" 
        className={`text-xs ${className}`}
      >
        {serviceMappedName}
        {showCategory && ` (${categoryName})`}
      </Badge>
    );
  }
  
  return (
    <TooltipProvider>
      <Tooltip delayDuration={300}>
        <TooltipTrigger asChild>
          <Badge 
            variant="secondary" 
            className={`text-xs hover:bg-primary hover:text-primary-foreground transition-colors cursor-pointer ${className} ${isHovered ? 'scale-105' : ''}`}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
          >
            {isHovered && <Sparkles className="h-3 w-3 mr-1 inline-block" />}
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

export default InteractiveServiceBadge;
