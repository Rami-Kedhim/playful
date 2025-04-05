
import React from "react";

const LivecamLoadingState: React.FC = () => {
  return (
    <div className="flex justify-center p-8">
      <div className="flex flex-col items-center">
        <div className="h-8 w-8 border-4 border-t-primary border-r-transparent border-b-transparent border-l-transparent rounded-full animate-spin mb-4"></div>
        <p className="text-muted-foreground">Loading stream details...</p>
      </div>
    </div>
  );
};

export default LivecamLoadingState;
