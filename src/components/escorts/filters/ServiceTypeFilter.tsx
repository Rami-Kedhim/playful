
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { VideoIcon, UserIcon } from "lucide-react";

interface ServiceTypeFilterProps {
  serviceTypeFilter: "in-person" | "virtual" | "both" | "";
  setServiceTypeFilter: (type: "in-person" | "virtual" | "both" | "") => void;
}

const ServiceTypeFilter = ({ 
  serviceTypeFilter, 
  setServiceTypeFilter 
}: ServiceTypeFilterProps) => {
  return (
    <RadioGroup 
      value={serviceTypeFilter} 
      onValueChange={(value) => setServiceTypeFilter(value as "in-person" | "virtual" | "both" | "")}
      className="space-y-2"
    >
      <div className="flex items-center space-x-2">
        <RadioGroupItem value="" id="all-services" />
        <Label htmlFor="all-services" className="flex items-center gap-2">
          All Services
        </Label>
      </div>
      <div className="flex items-center space-x-2">
        <RadioGroupItem value="in-person" id="in-person" />
        <Label htmlFor="in-person" className="flex items-center gap-2">
          <UserIcon className="h-4 w-4" />
          In-Person
        </Label>
      </div>
      <div className="flex items-center space-x-2">
        <RadioGroupItem value="virtual" id="virtual" />
        <Label htmlFor="virtual" className="flex items-center gap-2">
          <VideoIcon className="h-4 w-4" />
          Virtual
        </Label>
      </div>
      <div className="flex items-center space-x-2">
        <RadioGroupItem value="both" id="both" />
        <Label htmlFor="both" className="flex items-center gap-2">
          Both
        </Label>
      </div>
    </RadioGroup>
  );
};

export default ServiceTypeFilter;
