
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Eye } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent } from "@/components/ui/dialog";
import DocumentViewer from '@/components/documents/DocumentViewer';
import { VerificationDocument } from '@/types/escort';

interface DocumentPreviewProps {
  document: VerificationDocument;
  onView: (url: string) => void;
}

const DocumentPreview = ({ document, onView }: DocumentPreviewProps) => {
  const [isViewerOpen, setIsViewerOpen] = React.useState(false);

  // Get the appropriate document properties, supporting both naming conventions
  const documentType = document.type || document.document_type;
  const documentUrl = document.fileUrl || document.document_url;
  const uploadDate = document.uploadedAt || document.created_at;

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
              alt={documentType}
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
            Uploaded: {new Date(uploadDate).toLocaleDateString()}
          </div>
        </CardContent>
      </Card>

      <Dialog open={isViewerOpen} onOpenChange={setIsViewerOpen}>
        <DialogContent className="max-w-4xl h-[80vh]">
          <DocumentViewer 
            url={documentUrl}
            type={documentUrl.toLowerCase().endsWith('.pdf') ? 'pdf' : 'image'}
          />
        </DialogContent>
      </Dialog>
    </>
  );
};

export default DocumentPreview;
