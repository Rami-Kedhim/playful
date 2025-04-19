
// Fix access to 'type' property on VerificationDocument, use documentType instead
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { File } from 'lucide-react';
import { VerificationDocument } from '@/types/verification';

interface DocumentReviewProps {
  document: VerificationDocument;
  isOpen?: boolean;
  onClose?: () => void;
  verification?: any;
  onApprove?: () => Promise<void>;
  onReject?: (reason: any) => Promise<void>;
}

const DocumentReview = ({ document, isOpen, onClose, verification, onApprove, onReject }: DocumentReviewProps) => {
  // Format document type for display
  const formatDocumentType = (type: string) => {
    return type
      .replace(/_/g, ' ')
      .replace(/\b\w/g, (char) => char.toUpperCase());
  };
  
  // Use appropriate property for document type
  const documentType = document.documentType || document.document_type || 'Unknown';
  const imageUrl = document.fileUrl || document.url || '';
  
  // Handle date timestamp with backward compatibility
  const uploadDate = document.uploadedAt || document.uploaded_at || '';

  return (
    <Card>
      <CardHeader className="pb-3">
        <CardTitle className="text-base flex justify-between">
          <span className="flex items-center">
            <File className="h-4 w-4 mr-2" />
            {formatDocumentType(documentType)}
          </span>
          <Badge variant="outline" className="ml-2">
            {uploadDate ? new Date(uploadDate).toLocaleDateString() : 'Unknown'}
          </Badge>
        </CardTitle>
      </CardHeader>
      <CardContent>
        {imageUrl ? (
          <div className="rounded-md overflow-hidden border">
            <img
              src={imageUrl}
              alt={`${formatDocumentType(documentType)} document`}
              className="w-full h-auto object-contain"
            />
          </div>
        ) : (
          <div className="h-40 flex items-center justify-center border rounded-md bg-muted/30">
            <span className="text-muted-foreground">Image not available</span>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default DocumentReview;
