
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";

interface AvailabilityFilterProps {
  verifiedOnly: boolean;
  setVerifiedOnly: (value: boolean) => void;
  availableNow: boolean;
  setAvailableNow: (value: boolean) => void;
}

const AvailabilityFilter = ({
  verifiedOnly,
  setVerifiedOnly,
  availableNow,
  setAvailableNow
}: AvailabilityFilterProps) => {
  return (
    <div className="space-y-4">
      <div className="flex items-center space-x-2">
        <Switch
          checked={verifiedOnly}
          onCheckedChange={setVerifiedOnly}
          id="verified-filter"
        />
        <Label htmlFor="verified-filter">Verified only</Label>
      </div>
      
      <div className="flex items-center space-x-2">
        <Switch
          checked={availableNow}
          onCheckedChange={setAvailableNow}
          id="available-filter"
        />
        <Label htmlFor="available-filter">Available now</Label>
      </div>
    </div>
  );
};

export default AvailabilityFilter;
