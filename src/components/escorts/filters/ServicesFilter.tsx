
import React from "react";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { ScrollArea } from "@/components/ui/scroll-area";

interface ServicesFilterProps {
  selectedServices: string[];
  toggleService: (service: string) => void;
  services: string[];
}

const ServicesFilter = ({
  selectedServices,
  toggleService,
  services,
}: ServicesFilterProps) => {
  return (
    <div className="space-y-2">
      <h3 className="text-sm font-medium">Services</h3>
      
      <ScrollArea className="h-[180px]">
        <div className="space-y-2 pr-4">
          {services.map((service) => (
            <div key={service} className="flex items-center space-x-2">
              <Checkbox
                id={`service-${service}`}
                checked={selectedServices.includes(service)}
                onCheckedChange={() => toggleService(service)}
              />
              <Label
                htmlFor={`service-${service}`}
                className="text-sm cursor-pointer"
              >
                {service}
              </Label>
            </div>
          ))}
        </div>
      </ScrollArea>
    </div>
  );
};

export default ServicesFilter;
