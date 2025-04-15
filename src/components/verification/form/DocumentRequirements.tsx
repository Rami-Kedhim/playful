
import React from 'react';
import { AlertCircle, FileCheck } from 'lucide-react';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';

const DocumentRequirements = () => {
  return (
    <Alert>
      <AlertCircle className="h-4 w-4" />
      <AlertTitle>Document Requirements</AlertTitle>
      <AlertDescription className="space-y-2 mt-2">
        <ul className="list-disc pl-4 space-y-1">
          <li>Document must be valid and not expired</li>
          <li>All text must be clearly readable</li>
          <li>Images must be in color and high resolution</li>
          <li>No glare or reflections on the document</li>
          <li>All corners of the document must be visible</li>
        </ul>
        <div className="flex items-center gap-2 text-sm mt-4 text-muted-foreground">
          <FileCheck className="h-4 w-4" />
          <span>Accepted formats: JPG, PNG, or WEBP (max 5MB)</span>
        </div>
      </AlertDescription>
    </Alert>
  );
};

export default DocumentRequirements;
