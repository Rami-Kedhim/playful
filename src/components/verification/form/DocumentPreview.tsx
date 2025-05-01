
import React from 'react';
import { Button } from '@/components/ui/button';
import { X } from 'lucide-react';

interface DocumentPreviewProps {
  imageUrl: string;
  documentType: string;
  onRemove: () => void;
}

const DocumentPreview: React.FC<DocumentPreviewProps> = ({ imageUrl, documentType, onRemove }) => {
  return (
    <div className="relative mt-2">
      <div className="relative aspect-video w-full max-w-sm overflow-hidden rounded-md border">
        <img
          src={imageUrl}
          alt={`${documentType} preview`}
          className="h-full w-full object-cover"
        />
        <Button
          variant="destructive"
          size="icon"
          className="absolute top-2 right-2 h-6 w-6"
          onClick={onRemove}
        >
          <X className="h-3 w-3" />
        </Button>
      </div>
    </div>
  );
};

export default DocumentPreview;
