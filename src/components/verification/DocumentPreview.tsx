
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Eye } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { VerificationDocument } from '@/types/verification';

interface DocumentPreviewProps {
  document: VerificationDocument;
  onView: (url: string) => void;
}

const DocumentPreview = ({ document, onView }: DocumentPreviewProps) => {
  const [isViewerOpen, setIsViewerOpen] = React.useState(false);

  // Use fallbacks to handle missing properties
  const documentType = document.type || document.documentType || 'Unknown';
  const documentUrl = document.filePath || document.fileUrl || '';
  const uploadDate = document.uploadedAt ? document.uploadedAt.toString() : '';

  return (
    <>
      <Card className="w-full">
        <CardHeader className="pb-2">
          <CardTitle className="text-sm font-medium">
            {documentType}
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="aspect-[3/2] relative rounded-md overflow-hidden bg-muted">
            <img 
              src={documentUrl} 
              alt={documentType.toString()}
              className="object-cover absolute inset-0 w-full h-full"
            />
            <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity">
              <Button
                variant="secondary"
                size="sm"
                onClick={() => setIsViewerOpen(true)}
                className="gap-2"
              >
                <Eye className="h-4 w-4" />
                View Full Size
              </Button>
            </div>
          </div>
          <div className="mt-2 text-xs text-muted-foreground">
            Uploaded: {uploadDate ? new Date(uploadDate).toLocaleDateString() : 'Unknown'}
          </div>
        </CardContent>
      </Card>

      <Dialog open={isViewerOpen} onOpenChange={setIsViewerOpen}>
        <DialogContent className="max-w-4xl h-[80vh]">
          <div className="w-full h-full flex items-center justify-center">
            <img 
              src={documentUrl}
              alt={documentType.toString()}
              className="max-w-full max-h-full object-contain"
            />
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default DocumentPreview;
