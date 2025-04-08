
import { ESCORT_SERVICE_TYPES } from "@/types/escortTypes";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { ChevronDown, ChevronUp } from "lucide-react";

interface ServiceTypeFilterProps {
  selectedServices: string[];
  toggleService: (service: string) => void;
}

const ServiceTypeFilter = ({ selectedServices, toggleService }: ServiceTypeFilterProps) => {
  const [showAll, setShowAll] = useState(false);
  
  // Show only the first 6 services initially
  const displayServices = showAll ? ESCORT_SERVICE_TYPES : ESCORT_SERVICE_TYPES.slice(0, 6);
  
  return (
    <div className="space-y-2">
      <div className="grid grid-cols-1 gap-2">
        {displayServices.map((service) => (
          <div key={service} className="flex items-center space-x-2">
            <Checkbox 
              id={`service-${service.replace(/\s+/g, '-').toLowerCase()}`}
              checked={selectedServices.includes(service)}
              onCheckedChange={() => toggleService(service)}
            />
            <Label 
              htmlFor={`service-${service.replace(/\s+/g, '-').toLowerCase()}`}
              className="text-sm cursor-pointer"
            >
              {service}
            </Label>
          </div>
        ))}
      </div>
      
      {ESCORT_SERVICE_TYPES.length > 6 && (
        <Button
          variant="ghost"
          size="sm"
          className="w-full text-xs flex items-center justify-center mt-1"
          onClick={() => setShowAll(!showAll)}
        >
          {showAll ? (
            <>
              <ChevronUp className="h-3 w-3 mr-1" />
              Show less
            </>
          ) : (
            <>
              <ChevronDown className="h-3 w-3 mr-1" />
              Show all services
            </>
          )}
        </Button>
      )}
    </div>
  );
};

export default ServiceTypeFilter;
