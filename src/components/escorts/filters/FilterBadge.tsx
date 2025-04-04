
import { Badge } from "@/components/ui/badge";
import { X } from "lucide-react";

interface FilterBadgeProps {
  label: React.ReactNode;
  onRemove: () => void;
}

const FilterBadge = ({ label, onRemove }: FilterBadgeProps) => {
  return (
    <Badge variant="secondary" className="flex items-center gap-1">
      {label}
      <X 
        size={14} 
        className="cursor-pointer ml-1" 
        onClick={(e) => {
          e.stopPropagation();
          onRemove();
        }}
      />
    </Badge>
  );
};

export default FilterBadge;
