
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { FileCheck, AlertTriangle } from 'lucide-react';

const FileUploadInstructions = () => {
  return (
    <Card className="bg-muted/30">
      <CardContent className="pt-6">
        <div className="space-y-4">
          <h4 className="text-sm font-medium flex items-center">
            <FileCheck className="h-4 w-4 mr-2 text-primary" />
            Document Requirements
          </h4>
          
          <ul className="space-y-2 text-sm text-muted-foreground">
            <li className="flex items-start">
              <span className="text-primary mr-2">•</span>
              Clear, color photos or scans of your documents
            </li>
            <li className="flex items-start">
              <span className="text-primary mr-2">•</span>
              All text must be clearly legible
            </li>
            <li className="flex items-start">
              <span className="text-primary mr-2">•</span>
              No blurry or dark images
            </li>
            <li className="flex items-start">
              <span className="text-primary mr-2">•</span>
              Documents must be valid and not expired
            </li>
          </ul>
          
          <div className="flex items-start mt-4 p-3 bg-yellow-500/10 rounded-md">
            <AlertTriangle className="h-4 w-4 text-yellow-500 mt-0.5 mr-2 flex-shrink-0" />
            <p className="text-sm">
              Make sure your documents are valid and not expired. Invalid or expired documents will result in rejection.
            </p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default FileUploadInstructions;
