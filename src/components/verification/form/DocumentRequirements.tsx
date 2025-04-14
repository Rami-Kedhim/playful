
import React from 'react';
import { AlertTriangle } from 'lucide-react';

const DocumentRequirements = () => {
  return (
    <div className="rounded-lg bg-amber-50 dark:bg-amber-900/20 border border-amber-200 dark:border-amber-800 p-3 flex items-start">
      <AlertTriangle className="h-5 w-5 text-amber-500 mr-2 mt-0.5 flex-shrink-0" />
      <div className="space-y-1">
        <h4 className="font-medium text-sm">Document requirements</h4>
        <ul className="text-xs text-muted-foreground space-y-1">
          <li>• Government-issued ID, passport, or driver's license only</li>
          <li>• Documents must be valid and not expired</li>
          <li>• All text must be clearly readable</li>
          <li>• Photos must be in color and well-lit</li>
          <li>• No digital modifications or screenshots</li>
        </ul>
      </div>
    </div>
  );
};

export default DocumentRequirements;
