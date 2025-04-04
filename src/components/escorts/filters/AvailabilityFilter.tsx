
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import VerifiedFilter from "./VerifiedFilter";

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
      <VerifiedFilter 
        verifiedOnly={verifiedOnly} 
        setVerifiedOnly={setVerifiedOnly} 
      />
      
      <div className="flex items-center space-x-2">
        <Switch 
          id="available-now" 
          checked={availableNow}
          onCheckedChange={setAvailableNow}
        />
        <Label htmlFor="available-now">Available Now</Label>
      </div>
    </div>
  );
};

export default AvailabilityFilter;
