
import React from "react";
import VirtualContent from "./VirtualContent";
import { ContentType } from "@/hooks/useVirtualContent";

interface VirtualContentItem {
  id: string;
  creatorId: string;
  type: ContentType;
  price: number;
  thumbnailUrl?: string;
  title?: string;
  description?: string;
}

interface VirtualContentGridProps {
  items: VirtualContentItem[];
  columns?: number;
}

const VirtualContentGrid: React.FC<VirtualContentGridProps> = ({ 
  items, 
  columns = 2 
}) => {
  if (!items || items.length === 0) {
    return (
      <div className="text-center p-8 text-muted-foreground">
        No content available
      </div>
    );
  }
  
  // Using a consistent Tailwind approach instead of template literals for column count
  // This resolves the TypeScript warnings and ensures proper column rendering
  const getGridClasses = () => {
    if (columns === 1) return "grid grid-cols-1 gap-4";
    if (columns === 2) return "grid grid-cols-1 sm:grid-cols-2 gap-4";
    if (columns === 3) return "grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4";
    if (columns === 4) return "grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4";
    return "grid grid-cols-1 sm:grid-cols-2 gap-4"; // Default to 2 columns
  };
  
  return (
    <div className={getGridClasses()}>
      {items.map(item => (
        <VirtualContent
          key={item.id}
          creatorId={item.creatorId}
          contentId={item.id}
          contentType={item.type}
          price={item.price}
          thumbnailUrl={item.thumbnailUrl}
          title={item.title}
          description={item.description}
        />
      ))}
    </div>
  );
};

export default VirtualContentGrid;
