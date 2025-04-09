
import React from "react";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";

interface ServicesFilterProps {
  selectedServices: string[];
  onChange: (service: string) => void;
  services?: string[];
}

const ServicesFilter = ({ selectedServices, onChange, services }: ServicesFilterProps) => {
  // Default service options if none provided
  const serviceOptions = services || [
    { value: "gfe", label: "GFE" },
    { value: "massage", label: "Massage" },
    { value: "overnight", label: "Overnight" },
    { value: "dinner-date", label: "Dinner Date" },
    { value: "travel", label: "Travel Companion" },
    { value: "bdsm", label: "BDSM" },
    { value: "role-play", label: "Role Play" },
    { value: "fetish", label: "Fetish" },
  ];

  return (
    <div className="space-y-2">
      <h3 className="text-sm font-medium">Services</h3>
      <div className="grid grid-cols-2 gap-2">
        {Array.isArray(serviceOptions) ? (
          serviceOptions.map((service) => {
            const serviceValue = typeof service === 'string' ? service : service.value;
            const serviceLabel = typeof service === 'string' ? service : service.label;
            
            return (
              <div key={serviceValue} className="flex items-center space-x-2">
                <Checkbox 
                  id={`service-${serviceValue}`} 
                  checked={selectedServices.includes(serviceValue)}
                  onCheckedChange={() => onChange(serviceValue)}
                />
                <Label 
                  htmlFor={`service-${serviceValue}`}
                  className="text-sm cursor-pointer"
                >
                  {serviceLabel}
                </Label>
              </div>
            );
          })
        ) : (
          <div>No services available</div>
        )}
      </div>
    </div>
  );
};

export default ServicesFilter;
