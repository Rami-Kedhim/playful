
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import React from "react";

interface EthnicityFilterProps {
  selectedEthnicities: string[];
  toggleEthnicity: (ethnicity: string) => void;
}

const ETHNICITY_OPTIONS = [
  'Asian',
  'Black',
  'Caucasian',
  'Hispanic/Latino',
  'Middle Eastern',
  'Mixed',
  'Other'
];

const EthnicityFilter = ({ selectedEthnicities, toggleEthnicity }: EthnicityFilterProps) => {
  return (
    <div className="space-y-2">
      <h3 className="text-sm font-medium mb-2">Ethnicity</h3>
      
      <div className="space-y-2">
        {ETHNICITY_OPTIONS.map(ethnicity => (
          <div key={ethnicity} className="flex items-center space-x-2">
            <Checkbox 
              id={`ethnicity-${ethnicity}`}
              checked={selectedEthnicities.includes(ethnicity)}
              onCheckedChange={() => toggleEthnicity(ethnicity)}
            />
            <Label 
              htmlFor={`ethnicity-${ethnicity}`}
              className="text-sm capitalize cursor-pointer"
            >
              {ethnicity}
            </Label>
          </div>
        ))}
      </div>
    </div>
  );
};

export default EthnicityFilter;
