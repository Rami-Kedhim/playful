
import React from 'react';
import { Badge } from '@/components/ui/badge';
import { X } from 'lucide-react';

interface FilterBadgeProps {
  label: string;
  onRemove: () => void;
}

const FilterBadge = ({ label, onRemove }: FilterBadgeProps) => {
  return (
    <Badge
      className="bg-secondary text-secondary-foreground hover:bg-secondary/80"
    >
      {label}
      <button
        className="ml-1 rounded-full p-0.5 hover:bg-primary/20"
        onClick={(e) => {
          e.preventDefault();
          onRemove();
        }}
      >
        <X className="h-3 w-3" />
        <span className="sr-only">Remove {label} filter</span>
      </button>
    </Badge>
  );
};

export default FilterBadge;
