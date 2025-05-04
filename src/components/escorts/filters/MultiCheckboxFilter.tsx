
import React from 'react';
import { Checkbox } from '@/components/ui/checkbox';
import { Label } from '@/components/ui/label';

interface Option {
  value: string;
  label: string;
}

interface MultiCheckboxFilterProps {
  title: string;
  options: Option[];
  selectedValues: string[];
  onChange: (values: string[]) => void;
}

const MultiCheckboxFilter: React.FC<MultiCheckboxFilterProps> = ({
  title,
  options,
  selectedValues,
  onChange,
}) => {
  const handleCheckboxChange = (value: string) => {
    if (selectedValues.includes(value)) {
      onChange(selectedValues.filter(item => item !== value));
    } else {
      onChange([...selectedValues, value]);
    }
  };

  return (
    <div className="space-y-2">
      <h3 className="font-medium text-sm">{title}</h3>
      <div className="space-y-1">
        {options.map((option) => (
          <div key={option.value} className="flex items-center space-x-2">
            <Checkbox 
              id={`${title}-${option.value}`}
              checked={selectedValues.includes(option.value)}
              onCheckedChange={() => handleCheckboxChange(option.value)}
            />
            <Label 
              htmlFor={`${title}-${option.value}`}
              className="text-sm cursor-pointer"
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
