
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";

interface LocationFilterProps {
  location: string;
  setLocation: (value: string) => void;
}

const LocationFilter = ({ location, setLocation }: LocationFilterProps) => {
  return (
    <div className="space-y-2">
      <label className="text-sm font-medium">Location</label>
      <div className="relative">
        <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
        <Input
          placeholder="Enter city or area"
          value={location}
          onChange={(e) => setLocation(e.target.value)}
          className="bg-background/50 pl-9"
        />
      </div>
    </div>
  );
};

export default LocationFilter;
