
import React from "react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

interface FilterLocationProps {
  selectedLocation: string;
  setSelectedLocation: (location: string) => void;
  uniqueLocations: string[];
}

const FilterLocation: React.FC<FilterLocationProps> = ({
  selectedLocation,
  setSelectedLocation,
  uniqueLocations,
}) => {
  return (
    <div className="space-y-2">
      <label htmlFor="location" className="text-sm font-medium">
        Location
      </label>
      <Select
        value={selectedLocation}
        onValueChange={setSelectedLocation}
      >
        <SelectTrigger id="location" className="w-full">
          <SelectValue placeholder="All Locations" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="all">All Locations</SelectItem>
          {uniqueLocations.map((location) => (
            <SelectItem key={location} value={location}>
              {location}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
};

export default FilterLocation;
