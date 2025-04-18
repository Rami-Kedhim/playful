
import React from 'react';
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import { Check, Info } from 'lucide-react';
import { cn } from "@/lib/utils";

import { ServiceTypeFilter as ServiceTypeFilterType } from '../context/ServiceTypeContext';
import { useServiceType } from '../context/ServiceTypeContext';

// Import ServiceTypeIcon separately since it might be in a different location
// This is just a placeholder - you'd need to update with the correct import path
const ServiceTypeIcon = ({ type, variant }: { type: any, variant: 'colored' | 'default' }) => {
  return <div className={variant === 'colored' ? 'text-primary' : 'text-muted-foreground'}>Icon</div>;
};

interface ServiceTypeSelectionProps {
  className?: string;
  showSpecializedTypes?: boolean;
  onChange?: (type: ServiceTypeFilterType) => void;
  value?: ServiceTypeFilterType;
  showTitle?: boolean;
}

const ServiceTypeSelection: React.FC<ServiceTypeSelectionProps> = ({
  className,
  showSpecializedTypes = true,
  onChange,
  value,
  showTitle = true
}) => {
  // Get specialized service types from context if available
  const {
    serviceType: contextServiceType,
    setServiceType: contextSetServiceType,
    specializedServiceTypes,
    selectedSpecializedTypes,
    toggleSpecializedType
  } = useServiceType();
  
  // Determine if we're controlled or uncontrolled
  const isControlled = value !== undefined && onChange !== undefined;
  
  // Use the controlled value if provided, otherwise use context
  const serviceType = isControlled ? value : contextServiceType;
  
  // Handle service type changes
  const handleServiceTypeChange = (type: ServiceTypeFilterType) => {
    if (isControlled) {
      onChange(type);
    } else {
      contextSetServiceType(type);
    }
  };
  
  // Basic service types for location-based filtering
  const basicServiceTypes: ServiceTypeFilterType[] = ["in-person", "virtual", "both", ""];
  
  const labels: Record<string, string> = {
    "in-person": "In Person",
    "virtual": "Virtual",
    "both": "Both Types",
    "": "Any Type"
  };
  
  return (
    <div className={className}>
      {showTitle && (
        <Label className="text-sm font-medium mb-2 block">Service Type</Label>
      )}
      
      <div className="grid grid-cols-2 gap-2">
        {basicServiceTypes.map((type) => (
          <Card
            key={type || "any"}
            className={cn(
              "flex items-center gap-2 px-3 py-2 cursor-pointer transition-colors",
              serviceType === type 
                ? "bg-primary/10 border-primary" 
                : "hover:bg-accent"
            )}
            onClick={() => handleServiceTypeChange(type)}
          >
            <div className="flex items-center gap-2 w-full">
              <ServiceTypeIcon 
                type={type} 
                variant={serviceType === type ? "colored" : "default"} 
              />
              <span>{labels[type]}</span>
            </div>
            
            {serviceType === type && (
              <Check size={16} className="text-primary ml-auto" />
            )}
          </Card>
        ))}
      </div>

      {showSpecializedTypes && specializedServiceTypes && specializedServiceTypes.length > 0 && (
        <div className="mt-6">
          <div className="flex items-center justify-between mb-3">
            <Label className="text-sm font-medium">Specialized Services</Label>
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Info size={16} className="text-muted-foreground cursor-help" />
                </TooltipTrigger>
                <TooltipContent side="top" align="end" className="max-w-[300px]">
                  <p className="text-xs">
                    These service types comply with our ethical platform guidelines. 
                    Select multiple to refine your search.
                  </p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          </div>
          
          <div className="grid grid-cols-2 gap-2">
            {specializedServiceTypes.map((serviceType) => (
              <Badge
                key={serviceType}
                variant={selectedSpecializedTypes.includes(serviceType) ? "default" : "outline"}
                className={cn(
                  "cursor-pointer py-2 px-3 flex items-center justify-between",
                  "hover:bg-accent hover:text-accent-foreground transition-colors",
                  "text-xs font-normal",
                  selectedSpecializedTypes.includes(serviceType) && "bg-primary/20 hover:bg-primary/30 text-foreground"
                )}
                onClick={() => toggleSpecializedType(serviceType)}
              >
                <span>{serviceType}</span>
                {selectedSpecializedTypes.includes(serviceType) && (
                  <Check size={14} className="ml-2" />
                )}
              </Badge>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default ServiceTypeSelection;
