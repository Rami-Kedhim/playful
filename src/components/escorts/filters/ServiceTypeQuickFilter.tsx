
import React from 'react';
import { Card } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { ServiceTypeFilter } from './ServiceTypeBadgeLabel';
import ServiceTypeIcon from './ServiceTypeIcon';
import { cn } from "@/lib/utils";

interface ServiceTypeQuickFilterProps {
  serviceTypeFilter: ServiceTypeFilter;
  setServiceTypeFilter: (type: ServiceTypeFilter) => void;
  className?: string;
  showLabel?: boolean;
}

/**
 * A horizontal quick filter for service types
 */
const ServiceTypeQuickFilter: React.FC<ServiceTypeQuickFilterProps> = ({ 
  serviceTypeFilter, 
  setServiceTypeFilter,
  className,
  showLabel = true
}) => {
  const types: ServiceTypeFilter[] = ["in-person", "virtual", "both", ""];
  const labels = {
    "in-person": "In Person",
    "virtual": "Virtual",
    "both": "Both",
    "": "Any"
  };
  
  return (
    <Card className={cn("bg-card border shadow-sm p-1", className)}>
      <div className="flex gap-1">
        {types.map((type) => (
          <button
            key={type}
            onClick={() => setServiceTypeFilter(type)}
            className={cn(
              "flex items-center gap-1.5 px-2.5 py-1 rounded-md text-sm transition-colors",
              "hover:bg-accent hover:text-accent-foreground",
              serviceTypeFilter === type 
                ? "bg-accent text-accent-foreground" 
                : "bg-transparent text-muted-foreground"
            )}
          >
            <ServiceTypeIcon 
              type={type || ""} 
              variant={serviceTypeFilter === type ? "colored" : "default"}
            />
            {showLabel && <span>{labels[type]}</span>}
          </button>
        ))}
      </div>
    </Card>
  );
};

export default ServiceTypeQuickFilter;
