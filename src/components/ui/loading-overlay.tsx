
import React from 'react';
import { Loader2 } from 'lucide-react';

interface LoadingOverlayProps {
  text?: string;
}

const LoadingOverlay: React.FC<LoadingOverlayProps> = ({ 
  text = "Loading..." 
}) => {
  return (
    <div className="flex flex-col items-center justify-center space-y-2 py-8">
      <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
      <p className="text-sm text-muted-foreground">{text}</p>
    </div>
  );
};

export default LoadingOverlay;
