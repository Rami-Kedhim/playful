
import { RadioGroup } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Radio } from "@/components/ui/radio";
import getServiceTypeName from "./ServiceTypeBadgeLabel";

interface ServiceTypeRadioFilterProps {
  serviceTypeFilter: "in-person" | "virtual" | "both" | "";
  setServiceTypeFilter: (type: "in-person" | "virtual" | "both" | "") => void;
}

const ServiceTypeRadioFilter = ({ 
  serviceTypeFilter, 
  setServiceTypeFilter 
}: ServiceTypeRadioFilterProps) => {
  return (
    <RadioGroup 
      value={serviceTypeFilter} 
      onValueChange={(value) => 
        setServiceTypeFilter(value as "in-person" | "virtual" | "both" | "")
      }
    >
      <div className="flex flex-col space-y-2">
        <div className="flex items-center space-x-2">
          <Radio 
            id="service-type-in-person" 
            value="in-person" 
            checked={serviceTypeFilter === "in-person"}
          />
          <Label htmlFor="service-type-in-person">In-Person Services</Label>
        </div>
        <div className="flex items-center space-x-2">
          <Radio 
            id="service-type-virtual" 
            value="virtual"
            checked={serviceTypeFilter === "virtual"}
          />
          <Label htmlFor="service-type-virtual">Virtual Services</Label>
        </div>
        <div className="flex items-center space-x-2">
          <Radio 
            id="service-type-both" 
            value="both"
            checked={serviceTypeFilter === "both"}
          />
          <Label htmlFor="service-type-both">Both Services Types</Label>
        </div>
        <div className="flex items-center space-x-2">
          <Radio 
            id="service-type-none" 
            value=""
            checked={serviceTypeFilter === ""}
          />
          <Label htmlFor="service-type-none">No Preference</Label>
        </div>
      </div>
    </RadioGroup>
  );
};

export default ServiceTypeRadioFilter;
