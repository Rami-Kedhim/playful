
import React from 'react';
import { AlertCircle } from 'lucide-react';

const FileUploadInstructions: React.FC = () => {
  return (
    <div className="bg-muted/30 rounded-md p-3 text-sm text-muted-foreground flex items-start gap-2">
      <AlertCircle className="h-4 w-4 mt-0.5 flex-shrink-0 text-blue-500" />
      <div>
        <p>Please ensure documents are scanned or photographed in good lighting conditions.</p>
        <p className="mt-1">For best results, crop images to remove any background and ensure all text is clearly visible.</p>
      </div>
    </div>
  );
};

export default FileUploadInstructions;
