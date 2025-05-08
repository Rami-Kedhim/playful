
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
  onView?: (url: string) => void; // Add this prop
}

const DocumentReview = ({ document, onView }: DocumentReviewProps) => {
  const formatDocumentType = (type: string) => {
    return type
      .replace(/_/g, ' ')
      .replace(/\b\w/g, (char) => char.toUpperCase());
  };

  // Use fallbacks for potentially missing properties
  const documentType = document.type || document.documentType || 'Unknown';
  const imageUrl = document.fileUrl || '';
  const uploadDate = document.uploadedAt ? document.uploadedAt.toString() : '';

  // Add onClick handler to call onView when image is clicked
  const handleImageClick = () => {
    if (onView && imageUrl) {
      onView(imageUrl);
    }
  };

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
          <div 
            className="rounded-md overflow-hidden border cursor-pointer"
            onClick={handleImageClick}
          >
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
