
import React from "react";
import { Badge } from "@/components/ui/badge";

interface FilterBadgesProps {
  title: string;
  items: string[];
  selectedItems: string[];
  toggleItem: (item: string) => void;
}

const FilterBadges: React.FC<FilterBadgesProps> = ({
  title,
  items,
  selectedItems,
  toggleItem,
}) => {
  if (items.length === 0) return null;
  
  return (
    <div className="space-y-2">
      <span className="text-sm font-medium">{title}</span>
      <div className="flex flex-wrap gap-2">
        {items.map((item) => (
          <Badge
            key={item}
            variant={selectedItems.includes(item) ? "default" : "outline"}
            className="cursor-pointer"
            onClick={() => toggleItem(item)}
          >
            {item}
          </Badge>
        ))}
      </div>
    </div>
  );
};

export default FilterBadges;
