
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { VerificationDocument } from '@/types/escort';
import { Eye } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface DocumentPreviewProps {
  document: VerificationDocument;
  onView: (url: string) => void;
}

const DocumentPreview = ({ document, onView }: DocumentPreviewProps) => {
  return (
    <Card className="w-full">
      <CardHeader className="pb-2">
        <CardTitle className="text-sm font-medium">
          {document.type}
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="aspect-[3/2] relative rounded-md overflow-hidden bg-muted">
          <img 
            src={document.fileUrl} 
            alt={document.type}
            className="object-cover absolute inset-0 w-full h-full"
          />
          <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity">
            <Button
              variant="secondary"
              size="sm"
              onClick={() => onView(document.fileUrl)}
              className="gap-2"
            >
              <Eye className="h-4 w-4" />
              View Full Size
            </Button>
          </div>
        </div>
        <div className="mt-2 text-xs text-muted-foreground">
          Uploaded: {new Date(document.uploadedAt).toLocaleDateString()}
        </div>
      </CardContent>
    </Card>
  );
};

export default DocumentPreview;
