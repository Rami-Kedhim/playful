
import React from "react";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";

interface ServiceTypeFilterProps {
  serviceTypeFilter: "in-person" | "virtual" | "both" | "";
  setServiceTypeFilter: (type: "in-person" | "virtual" | "both" | "") => void;
}

const ServiceTypeFilter = ({ 
  serviceTypeFilter, 
  setServiceTypeFilter 
}: ServiceTypeFilterProps) => {
  return (
    <div className="space-y-2">
      <h3 className="text-sm font-medium">Service Type</h3>
      <RadioGroup 
        value={serviceTypeFilter} 
        onValueChange={(value) => setServiceTypeFilter(value as "in-person" | "virtual" | "both" | "")}
      >
        <div className="flex items-center space-x-2">
          <RadioGroupItem value="" id="any-type" />
          <Label htmlFor="any-type" className="text-sm cursor-pointer">
            All Types
          </Label>
        </div>
        
        <div className="flex items-center space-x-2">
          <RadioGroupItem value="in-person" id="in-person" />
          <Label htmlFor="in-person" className="text-sm cursor-pointer">
            In-Person Only
          </Label>
        </div>
        
        <div className="flex items-center space-x-2">
          <RadioGroupItem value="virtual" id="virtual" />
          <Label htmlFor="virtual" className="text-sm cursor-pointer">
            Virtual Only
          </Label>
        </div>
        
        <div className="flex items-center space-x-2">
          <RadioGroupItem value="both" id="both" />
          <Label htmlFor="both" className="text-sm cursor-pointer">
            Both In-Person and Virtual
          </Label>
        </div>
      </RadioGroup>
    </div>
  );
};

export default ServiceTypeFilter;
