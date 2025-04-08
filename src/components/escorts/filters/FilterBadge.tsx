
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
      className="flex items-center gap-1 py-1 px-2.5"
    >
      {label}
      <X 
        size={12} 
        className="cursor-pointer hover:text-primary transition-colors" 
        onClick={onRemove}
      />
    </Badge>
  );
};

export default FilterBadge;
