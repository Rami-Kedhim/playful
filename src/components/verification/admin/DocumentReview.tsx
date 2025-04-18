
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { File } from 'lucide-react';
import { VerificationDocument } from '@/types/verification';

interface DocumentReviewProps {
  document: VerificationDocument;
}

const DocumentReview = ({ document }: DocumentReviewProps) => {
  // Format document type for display
  const formatDocumentType = (type: string) => {
    return type
      .replace(/_/g, ' ')
      .replace(/\b\w/g, (char) => char.toUpperCase());
  };
  
  const documentType = document.documentType || document.document_type || document.type || 'Unknown';
  const imageUrl = document.fileUrl || document.file_url || document.url || document.document_url || '';
  const uploadedAt = document.uploadedAt || document.uploaded_at || document.created_at || new Date().toISOString();

  return (
    <Card>
      <CardHeader className="pb-3">
        <CardTitle className="text-base flex justify-between">
          <span className="flex items-center">
            <File className="h-4 w-4 mr-2" />
            {formatDocumentType(documentType)}
          </span>
          <Badge variant="outline" className="ml-2">
            {new Date(uploadedAt).toLocaleDateString()}
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
