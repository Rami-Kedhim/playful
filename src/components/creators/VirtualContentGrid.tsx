
import React, { useMemo } from "react";
import VirtualContent from "./VirtualContent";
import { ContentType } from "@/hooks/useVirtualContent";
import { logContentAction } from "@/utils/debugUtils";
import { Alert, AlertTitle, AlertDescription } from "@/components/ui/alert";
import { AlertCircle, Loader2 } from "lucide-react";

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
  isLoading?: boolean;
  error?: string | null;
  emptyMessage?: string;
}

const VirtualContentGrid: React.FC<VirtualContentGridProps> = ({ 
  items, 
  columns = 2,
  isLoading = false,
  error = null,
  emptyMessage = "No content available"
}) => {
  React.useEffect(() => {
    logContentAction('Content grid rendered', { itemCount: items?.length || 0, columns });
  }, [items?.length, columns]);

  // Memoize the grid classes to prevent unnecessary re-renders
  const gridClasses = useMemo(() => {
    if (columns === 1) return "grid grid-cols-1 gap-4";
    if (columns === 2) return "grid grid-cols-1 sm:grid-cols-2 gap-4";
    if (columns === 3) return "grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4";
    if (columns === 4) return "grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4";
    return "grid grid-cols-1 sm:grid-cols-2 gap-4"; // Default to 2 columns
  }, [columns]);
  
  // Error state
  if (error) {
    return (
      <Alert variant="destructive">
        <AlertCircle className="h-4 w-4" />
        <AlertTitle>Error</AlertTitle>
        <AlertDescription>{error}</AlertDescription>
      </Alert>
    );
  }
  
  // Loading state
  if (isLoading) {
    return (
      <div className="flex flex-col items-center justify-center p-8 text-muted-foreground" data-testid="loading-content-grid">
        <Loader2 className="h-8 w-8 animate-spin mb-2" />
        <p>Loading content...</p>
      </div>
    );
  }
  
  // Empty state
  if (!items || items.length === 0) {
    return (
      <div className="text-center p-8 text-muted-foreground" data-testid="empty-content-grid">
        {emptyMessage}
      </div>
    );
  }
  
  // Render content grid
  return (
    <div className={gridClasses} data-testid="virtual-content-grid">
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
