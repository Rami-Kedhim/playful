
import React from "react";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";

interface FilterServicesProps {
  services: string[];
  selectedServices: string[];
  toggleService: (service: string) => void;
}

const FilterServices: React.FC<FilterServicesProps> = ({
  services,
  selectedServices,
  toggleService,
}) => {
  const professionalServices = services.filter(service => {
    // Filter out services that might be inappropriate
    const respectfulServices = [
      "GFE", "Massage", "Overnight", "Dinner Date", "Travel Companion", 
      "Roleplay", "Lingerie Shows", "Exotic Dancing", "Cosplay", 
      "Striptease", "Companionship", "Social Events"
    ];
    
    return respectfulServices.includes(service) || 
           !service.includes("Anal") &&
           !service.includes("Deepthroat");
  });

  return (
    <div className="space-y-2">
      <h3 className="text-sm font-medium">Professional Services</h3>
      <ScrollArea className="h-[150px]">
        <div className="flex flex-wrap gap-2 pr-4">
          {professionalServices.length > 0 ? (
            professionalServices.map((service) => (
              <Badge
                key={service}
                variant={selectedServices.includes(service) ? "default" : "outline"}
                className="cursor-pointer"
                onClick={() => toggleService(service)}
              >
                {service}
              </Badge>
            ))
          ) : (
            <p className="text-sm text-muted-foreground">No services available</p>
          )}
        </div>
      </ScrollArea>
    </div>
  );
};

export default FilterServices;
