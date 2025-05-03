
import React from "react";

const LoadingSpinner = () => {
  return (
    <div className="flex items-center justify-center h-40">
      <div className="relative">
        <div className="h-12 w-12 rounded-full border-t-2 border-b-2 border-primary animate-spin"></div>
        <div className="absolute inset-0 flex items-center justify-center">
          <span className="text-xs text-primary font-medium">Loading</span>
        </div>
      </div>
    </div>
  );
};

export default LoadingSpinner;
