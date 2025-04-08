
import { Badge } from "@/components/ui/badge";
import { X } from "lucide-react";
import { cn } from "@/lib/utils";

interface FilterBadgeProps {
  label: string;
  onRemove: () => void;
  icon?: React.ReactNode;
  variant?: "default" | "outline" | "secondary";
}

const FilterBadge = ({ 
  label, 
  onRemove, 
  icon,
  variant = "outline" 
}: FilterBadgeProps) => {
  return (
    <Badge 
      variant={variant} 
      className={cn(
        "flex items-center gap-1 px-2 py-1 h-7 transition-colors",
        "hover:bg-accent hover:text-accent-foreground"
      )}
    >
      {icon && <span className="mr-1">{icon}</span>}
      <span className="text-xs font-medium">{label}</span>
      <button
        onClick={(e) => {
          e.stopPropagation();
          onRemove();
        }}
        className="ml-1 rounded-full hover:bg-muted p-0.5 text-muted-foreground hover:text-foreground"
        aria-label={`Remove ${label} filter`}
      >
        <X size={12} />
      </button>
    </Badge>
  );
};

export default FilterBadge;
