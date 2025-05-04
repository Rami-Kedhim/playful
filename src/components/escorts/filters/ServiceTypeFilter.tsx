
import React from 'react';
import { Label } from "@/components/ui/label";
import { Card } from "@/components/ui/card";
import type { ServiceTypeFilter as ServiceTypeFilterType } from './ServiceTypeBadgeLabel';
import ServiceTypeIcon from './ServiceTypeIcon';
import { cn } from "@/lib/utils";

interface ServiceTypeFilterProps {
  serviceTypeFilter: ServiceTypeFilterType;
  setServiceTypeFilter: (type: ServiceTypeFilterType) => void;
  className?: string;
}

/**
 * A component for filtering escorts by service type
 */
const ServiceTypeFilter: React.FC<ServiceTypeFilterProps> = ({
  serviceTypeFilter,
  setServiceTypeFilter,
  className
}) => {
  const serviceTypes: ServiceTypeFilterType[] = ["in-person", "virtual", "both", "any"];
  
  const labels = {
    "in-person": "In Person",
    "virtual": "Virtual",
    "both": "Both",
    "any": "Any"
  };
  
  return (
    <div className={className}>
      <Label className="text-sm font-medium mb-2 block">Service Type</Label>
      <div className="grid grid-cols-2 gap-2">
        {serviceTypes.map((type) => (
          <Card
            key={type}
            className={cn(
              "flex items-center gap-2 px-3 py-2 cursor-pointer transition-colors",
              serviceTypeFilter === type 
                ? "bg-primary/10 border-primary" 
                : "hover:bg-accent"
            )}
            onClick={() => setServiceTypeFilter(type)}
          >
            <ServiceTypeIcon 
              type={type} 
              className={serviceTypeFilter === type ? "text-primary" : ""}
            />
            <span>{labels[type]}</span>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default ServiceTypeFilter;
