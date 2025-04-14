
import React from 'react';
import { Info } from 'lucide-react';

const FileUploadInstructions = () => {
  return (
    <div className="text-xs bg-muted/50 rounded-md p-3">
      <div className="flex items-center gap-2 text-muted-foreground mb-2">
        <Info className="h-4 w-4" />
        <span className="font-medium">Upload guidelines:</span>
      </div>
      <ul className="space-y-1 text-muted-foreground">
        <li>• Maximum file size: 5MB</li>
        <li>• Accepted formats: JPG, PNG, or WEBP</li>
        <li>• Make sure the image is clear and not blurry</li>
        <li>• Entire document must be visible in the frame</li>
      </ul>
    </div>
  );
};

export default FileUploadInstructions;
