
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Eye } from 'lucide-react';
import { VerificationDocument } from '@/types/verification';

export interface DocumentPreviewProps {
  document: VerificationDocument;
  onView: (url: string) => void;
}

const DocumentPreview: React.FC<DocumentPreviewProps> = ({ document, onView }) => {
  const { type, fileUrl, documentType, status } = document;

  const displayType = documentType || type || 'Document';
  const fileLink = fileUrl || document.filePath; // Support both fileUrl and filePath

  const statusClasses = {
    pending: 'bg-yellow-100 text-yellow-800',
    approved: 'bg-green-100 text-green-800',
    rejected: 'bg-red-100 text-red-800'
  };

  return (
    <Card className="overflow-hidden">
      <CardContent className="p-4">
        <div className="flex justify-between items-center mb-2">
          <h4 className="text-sm font-medium">{displayType}</h4>
          <span className={`text-xs px-2 py-1 rounded ${statusClasses[status] || ''}`}>
            {status?.charAt(0).toUpperCase() + status?.slice(1)}
          </span>
        </div>
        
        <div className="mt-4">
          <Button 
            variant="outline" 
            size="sm" 
            className="w-full"
            onClick={() => onView(fileLink)}
          >
            <Eye className="h-4 w-4 mr-2" />
            View Document
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default DocumentPreview;
