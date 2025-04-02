
import { Input } from "@/components/ui/input";
import { MapPin } from "lucide-react";

interface LocationFilterProps {
  location: string;
  setLocation: (value: string) => void;
}

const LocationFilter = ({ location, setLocation }: LocationFilterProps) => {
  return (
    <div className="space-y-2">
      <label className="text-sm font-medium">Location</label>
      <div className="relative">
        <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={16} />
        <Input
          placeholder="City or area"
          value={location}
          onChange={(e) => setLocation(e.target.value)}
          className="pl-10 bg-background/50"
        />
      </div>
    </div>
  );
};

export default LocationFilter;
