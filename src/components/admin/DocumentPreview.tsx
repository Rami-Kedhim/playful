
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Eye } from 'lucide-react';
import { VerificationDocument } from '@/types/verification';

interface DocumentPreviewProps {
  document: VerificationDocument;
  onView: (url: string) => void;
}

const DocumentPreview = ({ document, onView }: DocumentPreviewProps) => {
  const getDocumentTypeLabel = (type: string): string => {
    switch (type) {
      case 'id':
        return 'ID Document';
      case 'selfie':
        return 'Selfie';
      case 'address_proof':
        return 'Proof of Address';
      default:
        return 'Other Document';
    }
  };

  return (
    <Card>
      <CardContent className="p-4">
        <div className="flex justify-between items-center">
          <div>
            <h3 className="font-medium">{getDocumentTypeLabel(document.type)}</h3>
            <p className="text-sm text-muted-foreground">
              Uploaded: {document.uploadedAt instanceof Date 
                ? document.uploadedAt.toLocaleDateString() 
                : new Date(document.uploadedAt).toLocaleDateString()}
            </p>
          </div>
          <Button size="sm" variant="outline" onClick={() => onView(document.fileUrl)}>
            <Eye className="h-4 w-4 mr-1" /> View
          </Button>
        </div>
        {document.notes && (
          <div className="mt-2">
            <p className="text-sm italic">{document.notes}</p>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default DocumentPreview;
