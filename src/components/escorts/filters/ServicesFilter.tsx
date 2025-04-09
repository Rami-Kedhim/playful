
import React from "react";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";

interface ServicesFilterProps {
  selectedServices: string[];
  onChange: (service: string) => void;
}

const ServicesFilter = ({ selectedServices, onChange }: ServicesFilterProps) => {
  const serviceOptions = [
    { value: "gfe", label: "GFE (Girlfriend Experience)" },
    { value: "massage", label: "Massage" },
    { value: "dinner-date", label: "Dinner Date" },
    { value: "overnight", label: "Overnight" },
    { value: "travel", label: "Travel Companion" },
    { value: "bdsm", label: "BDSM" },
    { value: "roleplay", label: "Role Play" }
  ];

  return (
    <div className="space-y-2">
      <h3 className="text-sm font-medium">Services</h3>
      <div className="space-y-2">
        {serviceOptions.map((service) => (
          <div key={service.value} className="flex items-center space-x-2">
            <Checkbox 
              id={`service-${service.value}`} 
              checked={selectedServices.includes(service.value)}
              onCheckedChange={() => onChange(service.value)}
            />
            <Label 
              htmlFor={`service-${service.value}`}
              className="text-sm cursor-pointer"
            >
              {service.label}
            </Label>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ServicesFilter;
