
import { X } from 'lucide-react';
import { cn } from '@/lib/utils';

interface FilterBadgeProps {
  label: string;
  onRemove: () => void;
  icon?: React.ReactNode;
  variant?: 'default' | 'outline' | 'secondary' | 'destructive';
}

const FilterBadge = ({ 
  label, 
  onRemove, 
  icon,
  variant = 'default'
}: FilterBadgeProps) => {
  const variantClasses = {
    default: "bg-primary/10 text-primary hover:bg-primary/20 border-primary/20",
    outline: "bg-background border border-input hover:bg-accent hover:text-accent-foreground",
    secondary: "bg-secondary text-secondary-foreground hover:bg-secondary/80",
    destructive: "bg-destructive/10 text-destructive hover:bg-destructive/20"
  };

  return (
    <div
      className={cn(
        "inline-flex items-center rounded-full px-2.5 py-1 text-xs font-semibold",
        "transition-colors border focus:outline-none focus:ring-2",
        "focus:ring-ring focus:ring-offset-2",
        variantClasses[variant]
      )}
    >
      {icon && (
        <span className="mr-1 flex items-center justify-center">
          {icon}
        </span>
      )}
      <span>{label}</span>
      <button
        onClick={onRemove}
        className="ml-1 rounded-full p-0.5 hover:bg-background/20 transition-colors focus:outline-none"
        aria-label={`Remove ${label} filter`}
      >
        <X className="h-3 w-3" />
      </button>
    </div>
  );
};

export default FilterBadge;
