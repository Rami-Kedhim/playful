
import React from "react";

interface StreamViewerProps {
  streamUrl: string;
}

const StreamViewer: React.FC<StreamViewerProps> = ({ streamUrl }) => {
  return (
    <div className="relative w-full pt-[56.25%] bg-black rounded-lg overflow-hidden">
      <video 
        className="absolute top-0 left-0 w-full h-full object-contain"
        src={streamUrl}
        controls
        autoPlay
        playsInline
      />
    </div>
  );
};

export default StreamViewer;
