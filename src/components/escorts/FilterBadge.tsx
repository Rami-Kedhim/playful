
import React from 'react';
import { Badge } from "@/components/ui/badge";
import { X } from "lucide-react";

interface FilterBadgeProps {
  label: string;
  onRemove: () => void;
}

const FilterBadge: React.FC<FilterBadgeProps> = ({ label, onRemove }) => {
  return (
    <Badge variant="secondary" className="flex items-center gap-1 px-2 py-1">
      <span className="text-xs">{label}</span>
      <X
        className="h-3 w-3 cursor-pointer opacity-70 hover:opacity-100"
        onClick={onRemove}
      />
    </Badge>
  );
};

export default FilterBadge;
