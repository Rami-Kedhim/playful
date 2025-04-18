
import React, { ReactNode } from 'react';
import { Badge } from '@/components/ui/badge';
import { X } from 'lucide-react';
import { cn } from '@/lib/utils';

interface FilterBadgeProps {
  label: string;
  onRemove: () => void;
  icon?: ReactNode;
  variant?: "default" | "secondary" | "outline" | "destructive";
  className?: string;
}

const FilterBadge: React.FC<FilterBadgeProps> = ({
  label,
  onRemove,
  icon,
  variant = "default",
  className
}) => {
  return (
    <Badge 
      variant={variant} 
      className={cn(
        "flex items-center gap-1.5 py-1 px-2 h-7 cursor-default",
        className
      )}
    >
      {icon && <span className="flex items-center">{icon}</span>}
      <span>{label}</span>
      <X 
        className="h-3.5 w-3.5 cursor-pointer hover:text-foreground/80 transition-colors"
        onClick={onRemove}
      />
    </Badge>
  );
};

export default FilterBadge;
