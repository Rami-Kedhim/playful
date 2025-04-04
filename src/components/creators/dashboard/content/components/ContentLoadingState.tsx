
import React from "react";
import { Skeleton } from "@/components/ui/skeleton";

const ContentLoadingState: React.FC = () => {
  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
      {Array(6).fill(0).map((_, index) => (
        <div key={index} className="space-y-2">
          <Skeleton className="h-40 w-full" />
          <Skeleton className="h-4 w-2/3" />
          <Skeleton className="h-4 w-1/2" />
        </div>
      ))}
    </div>
  );
};

export default ContentLoadingState;
