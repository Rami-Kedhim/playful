
import React from "react";
import { Badge } from "@/components/ui/badge";

interface ServiceCategoryListProps {
  categoryNames: string[];
  className?: string;
}

const ServiceCategoryList = ({ 
  categoryNames,
  className = ""
}: ServiceCategoryListProps) => {
  if (!categoryNames.length) return null;

  return (
    <div className={`flex flex-wrap gap-1.5 ${className}`}>
      {categoryNames.slice(0, 3).map((category) => (
        <Badge key={category} variant="outline" className="text-xs">
          {category}
        </Badge>
      ))}
      {categoryNames.length > 3 && (
        <Badge variant="outline" className="text-xs">
          +{categoryNames.length - 3} more
        </Badge>
      )}
    </div>
  );
};

export default ServiceCategoryList;
