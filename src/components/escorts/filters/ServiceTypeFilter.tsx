
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
import { Label } from "@/components/ui/label";
import { getServiceTypeName } from "./ServiceTypeBadgeLabel";

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
      <Label htmlFor="service-type" className="text-sm font-medium">Service Type</Label>
      <ToggleGroup 
        type="single" 
        value={serviceTypeFilter || undefined}
        onValueChange={(value) => setServiceTypeFilter(value as "in-person" | "virtual" | "both" | "")}
        className="justify-start w-full"
      >
        <ToggleGroupItem value="in-person" className="text-xs" id="service-type">
          In-Person
        </ToggleGroupItem>
        <ToggleGroupItem value="virtual" className="text-xs">
          Virtual
        </ToggleGroupItem>
        <ToggleGroupItem value="both" className="text-xs">
          Both
        </ToggleGroupItem>
      </ToggleGroup>
    </div>
  );
};

export default ServiceTypeFilter;
