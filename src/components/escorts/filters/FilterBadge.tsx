
import React, { ReactNode } from 'react';
import { Badge } from '@/components/ui/badge';
import { X } from 'lucide-react';

interface FilterBadgeProps {
  label: string;
  onRemove: () => void;
  variant?: 'default' | 'secondary' | 'destructive';
  icon?: ReactNode;
}

const FilterBadge: React.FC<FilterBadgeProps> = ({ 
  label, 
  onRemove, 
  variant = 'default',
  icon
}) => {
  return (
    <Badge 
      variant={variant} 
      className="pl-2 pr-1.5 py-1 flex items-center gap-1.5 h-7"
    >
      {icon && <span className="flex items-center">{icon}</span>}
      <span>{label}</span>
      <button 
        onClick={(e) => {
          e.preventDefault();
          onRemove();
        }}
        className="hover:bg-muted/20 rounded-full p-0.5"
      >
        <X className="h-3.5 w-3.5" />
      </button>
    </Badge>
  );
};

export default FilterBadge;
