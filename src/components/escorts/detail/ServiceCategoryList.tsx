
import { Badge } from "@/components/ui/badge";

interface ServiceCategoryListProps {
  categoryNames: string[];
  className?: string;
}

const ServiceCategoryList = ({ categoryNames, className = "" }: ServiceCategoryListProps) => {
  // Handle the case when no categories are available
  if (!categoryNames || categoryNames.length === 0) {
    return (
      <div className={`text-sm text-muted-foreground ${className}`}>
        No service categories available
      </div>
    );
  }

  return (
    <div className={`flex flex-wrap gap-1 ${className}`}>
      {categoryNames.map((category, index) => (
        <Badge key={index} variant="outline" className="text-xs">
          {category}
        </Badge>
      ))}
    </div>
  );
};

export default ServiceCategoryList;
