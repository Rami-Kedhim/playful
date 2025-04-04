
import { Input } from "@/components/ui/input";

interface LocationFilterProps {
  location: string;
  setLocation: (value: string) => void;
}

const LocationFilter = ({ location, setLocation }: LocationFilterProps) => {
  return (
    <div className="space-y-2">
      <label className="text-sm font-medium">Location</label>
      <Input
        placeholder="Enter city or area"
        value={location}
        onChange={(e) => setLocation(e.target.value)}
        className="bg-background/50"
      />
    </div>
  );
};

export default LocationFilter;
