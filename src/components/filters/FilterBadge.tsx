
import React from 'react';
import { Badge } from '@/components/ui/badge';
import { X } from 'lucide-react';

interface FilterBadgeProps {
  label: string;
  onRemove: () => void;
  className?: string;
}

const FilterBadge: React.FC<FilterBadgeProps> = ({ label, onRemove, className = '' }) => {
  return (
    <Badge
      variant="secondary"
      className={`flex items-center gap-1 px-2 py-1 ${className}`}
    >
      <span className="text-xs">{label}</span>
      <X 
        className="h-3 w-3 cursor-pointer hover:text-destructive" 
        onClick={(e) => {
          e.preventDefault();
          e.stopPropagation();
          onRemove();
        }} 
      />
    </Badge>
  );
};

export default FilterBadge;
