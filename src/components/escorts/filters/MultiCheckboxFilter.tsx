
import React from 'react';
import { Checkbox } from '@/components/ui/checkbox';
import { Label } from '@/components/ui/label';

export interface Option {
  value: string;
  label: string;
}

interface MultiCheckboxFilterProps {
  options: Option[];
  selectedValues: string[];
  onChange: (values: string[]) => void;
  label?: string;
}

const MultiCheckboxFilter: React.FC<MultiCheckboxFilterProps> = ({
  options,
  selectedValues,
  onChange,
  label,
}) => {
  const handleCheckboxChange = (value: string) => {
    if (selectedValues.includes(value)) {
      onChange(selectedValues.filter((item) => item !== value));
    } else {
      onChange([...selectedValues, value]);
    }
  };

  return (
    <div className="space-y-2">
      {label && <h3 className="text-sm font-medium mb-2">{label}</h3>}
      <div className="grid grid-cols-2 gap-2">
        {options.map((option) => (
          <div key={option.value} className="flex items-center space-x-2">
            <Checkbox
              id={`filter-${option.value}`}
              checked={selectedValues.includes(option.value)}
              onCheckedChange={() => handleCheckboxChange(option.value)}
            />
            <Label
              htmlFor={`filter-${option.value}`}
              className="text-sm font-normal cursor-pointer"
            >
              {option.label}
            </Label>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MultiCheckboxFilter;
