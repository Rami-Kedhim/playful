
import React from "react";
import { Button } from "@/components/ui/button";

interface LivecamErrorStateProps {
  error: string;
  onGoBack: () => void;
}

const LivecamErrorState: React.FC<LivecamErrorStateProps> = ({ error, onGoBack }) => {
  return (
    <div className="flex flex-col items-center p-8">
      <div className="text-destructive mb-4">Error: {error}</div>
      <Button 
        className="px-4 py-2 bg-primary text-white rounded-md"
        onClick={onGoBack}
      >
        Go Back
      </Button>
    </div>
  );
};

export default LivecamErrorState;
