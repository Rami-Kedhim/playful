
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
  
  // Fix the grid columns dynamically
  const gridClasses = `grid grid-cols-1 sm:grid-cols-${columns} gap-4`;
  
  return (
    <div className={gridClasses}>
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
