
import { Badge } from "@/components/ui/badge";
import { X } from "lucide-react";

interface FilterBadgeProps {
  label: string;
  onRemove: () => void;
  icon?: React.ReactNode;
}

const FilterBadge = ({ label, onRemove, icon }: FilterBadgeProps) => {
  return (
    <Badge variant="outline" className="flex items-center gap-1 px-2 py-1 h-7">
      {icon && <span className="mr-1">{icon}</span>}
      <span>{label}</span>
      <button
        onClick={onRemove}
        className="ml-1 rounded-full hover:bg-muted p-0.5 text-muted-foreground hover:text-foreground"
      >
        <X size={12} />
      </button>
    </Badge>
  );
};

export default FilterBadge;
