
import React from "react";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";

interface ServiceTypeFilterProps {
  serviceTypeFilter: string;
  setServiceTypeFilter: (type: string) => void;
}

const ServiceTypeFilter = ({
  serviceTypeFilter,
  setServiceTypeFilter,
}: ServiceTypeFilterProps) => {
  // Ensure serviceTypeFilter is never empty string
  const safeServiceType = serviceTypeFilter || "any";
  
  // Handler to prevent empty string values
  const handleChange = (value: string) => {
    setServiceTypeFilter(value || "any");
  };
  
  return (
    <div className="space-y-2">
      <h3 className="text-sm font-medium">Service Type</h3>
      <RadioGroup
        value={safeServiceType}
        onValueChange={handleChange}
        className="flex flex-col space-y-1.5"
      >
        <div className="flex items-center space-x-2">
          <RadioGroupItem value="any" id="any-service" />
          <Label htmlFor="any-service" className="text-sm cursor-pointer">
            Any Service Type
          </Label>
        </div>
        
        <div className="flex items-center space-x-2">
          <RadioGroupItem value="in-person" id="in-person" />
          <Label htmlFor="in-person" className="text-sm cursor-pointer">
            In Person
          </Label>
        </div>
        
        <div className="flex items-center space-x-2">
          <RadioGroupItem value="virtual" id="virtual" />
          <Label htmlFor="virtual" className="text-sm cursor-pointer">
            Virtual
          </Label>
        </div>
        
        <div className="flex items-center space-x-2">
          <RadioGroupItem value="both" id="both-types" />
          <Label htmlFor="both-types" className="text-sm cursor-pointer">
            Both Types
          </Label>
        </div>
      </RadioGroup>
    </div>
  );
};

export default ServiceTypeFilter;
