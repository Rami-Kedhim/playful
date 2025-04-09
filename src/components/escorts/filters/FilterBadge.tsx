
import { Badge } from "@/components/ui/badge";
import { X } from "lucide-react";

interface FilterBadgeProps {
  label: string;
  onRemove: () => void;
}

const FilterBadge = ({ label, onRemove }: FilterBadgeProps) => {
  return (
    <Badge 
      variant="secondary" 
      className="flex items-center gap-1 pl-2 pr-1 py-1"
    >
      <span>{label}</span>
      <button
        onClick={onRemove}
        className="ml-1 rounded-full p-0.5 hover:bg-muted-foreground/20"
      >
        <X className="h-3 w-3" />
        <span className="sr-only">Remove {label} filter</span>
      </button>
    </Badge>
  );
};

export default FilterBadge;
