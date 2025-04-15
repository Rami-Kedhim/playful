import React, { useState, useEffect } from 'react';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"
import { Slider } from "@/components/ui/slider"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Checkbox } from "@/components/ui/checkbox"
import FilterBadge from './FilterBadge';
import { cn } from '@/lib/utils';

interface FilterProps {
  title: string;
  options?: { key: string; label: string }[];
  range?: { min: number; max: number };
  onFilterChange: (filter: any) => void;
  activeFilters: any;
}

const StandardFilter: React.FC<FilterProps> = ({ 
  title, 
  options, 
  range, 
  onFilterChange,
  activeFilters 
}) => {
  const [filterValues, setFilterValues] = useState<string[]>([]);
  const [rangeValues, setRangeValues] = useState<number[]>([range?.min || 0, range?.max || 0]);
  
  useEffect(() => {
    if (options) {
      const activeOptionKeys = options
        .filter(option => activeFilters[option.key])
        .map(option => option.key);
      setFilterValues(activeOptionKeys);
    }
    if (range) {
      setRangeValues([
        activeFilters[title]?.min || range.min,
        activeFilters[title]?.max || range.max
      ]);
    }
  }, [activeFilters, options, range, title]);

  const handleCheckboxChange = (key: string) => {
    const newFilterValues = filterValues.includes(key)
      ? filterValues.filter(value => value !== key)
      : [...filterValues, key];
    setFilterValues(newFilterValues);

    const filter = newFilterValues.reduce((obj: any, key) => {
      obj[key] = true;
      return obj;
    }, {});
    
    onFilterChange(filter);
  };

  const handleRangeChange = (values: number[]) => {
    setRangeValues(values);
    onFilterChange({ min: values[0], max: values[1] });
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    const parsedValue = parseInt(value);

    if (!isNaN(parsedValue) && range) {
      const newValues = [...rangeValues];
      if (name === 'min') {
        newValues[0] = Math.min(parsedValue, rangeValues[1]);
      } else {
        newValues[1] = Math.max(parsedValue, rangeValues[0]);
      }
      setRangeValues(newValues);
      handleRangeChange(newValues);
    }
  };

  const handleRemoveFilter = (key: string) => {
    const newFilterValues = filterValues.filter(value => value !== key);
    setFilterValues(newFilterValues);

    const filter = newFilterValues.reduce((obj: any, key) => {
      obj[key] = true;
      return obj;
    }, {});
    
    onFilterChange(filter);
  };

  return (
    <Accordion type="single" collapsible className="w-full">
      <AccordionItem value={title}>
        <AccordionTrigger>{title}</AccordionTrigger>
        <AccordionContent>
          {options && (
            <div className="grid gap-2">
              {options.map(filter => (
                <div key={filter.key} className="flex items-center space-x-2">
                  <Checkbox
                    id={filter.key}
                    checked={filterValues.includes(filter.key)}
                    onCheckedChange={() => handleCheckboxChange(filter.key)}
                  />
                  <Label htmlFor={filter.key} className="capitalize">{filter.label}</Label>
                </div>
              ))}
            </div>
          )}

          {range && (
            <div className="grid gap-4">
              <div className="space-y-2">
                <Label htmlFor="min">Min</Label>
                <Input 
                  type="number" 
                  id="min" 
                  name="min"
                  value={rangeValues[0].toString()}
                  onChange={handleInputChange}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="max">Max</Label>
                <Input 
                  type="number" 
                  id="max"
                  name="max"
                  value={rangeValues[1].toString()}
                  onChange={handleInputChange}
                />
              </div>
              <Slider
                defaultValue={rangeValues}
                max={range.max}
                min={range.min}
                step={1}
                onValueChange={handleRangeChange}
              />
            </div>
          )}
          
          {activeFilters && Object.keys(activeFilters).length > 0 && (
            <div className="flex flex-wrap gap-1 mt-2">
              {options && options.map(filter => {
                if (activeFilters[filter.key]) {
                  return (
                    <FilterBadge
                      key={filter.key}
                      label={filter.label}
                      value={filter.value || filter.key}  // Add this line to provide the value prop
                      onRemove={() => handleRemoveFilter(filter.key)}
                    />
                  );
                }
                return null;
              })}
            </div>
          )}
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  );
};

export default StandardFilter;
