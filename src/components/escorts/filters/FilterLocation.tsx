
import React from "react";

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
      <label htmlFor="location" className="text-sm font-medium">Location</label>
      <select
        id="location"
        value={selectedLocation}
        onChange={(e) => setSelectedLocation(e.target.value)}
        className="w-full border rounded-md p-2"
      >
        <option value="">All Locations</option>
        {uniqueLocations.map((location) => (
          <option key={location} value={location}>
            {location}
          </option>
        ))}
      </select>
    </div>
  );
};

export default FilterLocation;
