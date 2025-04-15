
import React from 'react';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { FileCheck } from 'lucide-react';

const DocumentRequirements: React.FC = () => {
  return (
    <Alert className="mb-6 bg-muted/50">
      <FileCheck className="h-4 w-4 mt-0.5" />
      <AlertTitle>Document Requirements</AlertTitle>
      <AlertDescription className="text-sm mt-2">
        <ul className="list-disc pl-5 space-y-1">
          <li>Government-issued ID (passport, driver's license, or ID card)</li>
          <li>All text must be clearly legible</li>
          <li>Document must not be expired</li>
          <li>Your selfie must clearly show your face next to your ID</li>
          <li>Files must be JPG, PNG or WEBP format, max 5MB each</li>
        </ul>
      </AlertDescription>
    </Alert>
  );
};

export default DocumentRequirements;
