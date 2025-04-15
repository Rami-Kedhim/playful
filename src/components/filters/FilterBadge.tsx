
import React from 'react';
import { X } from 'lucide-react';
import { Badge } from '@/components/ui/badge';

interface FilterBadgeProps {
  label: string;
  value: string;
  onRemove: () => void;
  className?: string;
}

const FilterBadge: React.FC<FilterBadgeProps> = ({ 
  label, 
  value, 
  onRemove,
  className 
}) => {
  return (
    <Badge 
      variant="outline" 
      className={`flex items-center gap-1 py-1 px-2 ${className}`}
    >
      <span className="text-xs font-medium text-muted-foreground mr-1">
        {label}:
      </span>
      <span className="text-xs">{value}</span>
      <X 
        className="h-3 w-3 cursor-pointer hover:text-destructive" 
        onClick={(e) => {
          e.stopPropagation();
          onRemove();
        }} 
      />
    </Badge>
  );
};

export default FilterBadge;
