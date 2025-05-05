
import React from 'react';
import { Card } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { ServiceTypeFilter } from './ServiceTypeBadgeLabel';
import ServiceTypeIcon from './ServiceTypeIcon';
import { cn } from "@/lib/utils";

interface ServiceTypeQuickFilterProps {
  serviceTypeFilter: ServiceTypeFilter | string;
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
  // Replace empty string with "any" to avoid empty string values
  const safeServiceTypeFilter: ServiceTypeFilter = 
    (!serviceTypeFilter || typeof serviceTypeFilter !== 'string' || serviceTypeFilter === '') 
      ? "any" 
      : serviceTypeFilter as ServiceTypeFilter;
  
  const types: ServiceTypeFilter[] = ["in-person", "virtual", "both", "any"];
  const labels = {
    "in-person": "In Person",
    "virtual": "Virtual",
    "both": "Both",
    "any": "Any"
  };
  
  // Safe handler to prevent empty strings
  const handleSetServiceType = (type: ServiceTypeFilter) => {
    if (!type) {
      setServiceTypeFilter("any");
    } else {
      setServiceTypeFilter(type);
    }
  };
  
  return (
    <Card className={cn("bg-card border shadow-sm p-1", className)}>
      <div className="flex gap-1">
        {types.map((type) => (
          <button
            key={type}
            onClick={() => handleSetServiceType(type)}
            className={cn(
              "flex items-center gap-1.5 px-2.5 py-1 rounded-md text-sm transition-colors",
              "hover:bg-accent hover:text-accent-foreground",
              safeServiceTypeFilter === type 
                ? "bg-accent text-accent-foreground" 
                : "bg-transparent text-muted-foreground"
            )}
          >
            <ServiceTypeIcon 
              type={type} 
              className={safeServiceTypeFilter === type ? "text-primary" : ""}
            />
            {showLabel && <span>{labels[type]}</span>}
          </button>
        ))}
      </div>
    </Card>
  );
};

export default ServiceTypeQuickFilter;
