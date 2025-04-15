
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Eye } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent } from "@/components/ui/dialog";
import DocumentViewer from '@/components/documents/DocumentViewer';
import { VerificationDocument } from '@/types/escort';
import { Badge } from '@/components/ui/badge';

interface DocumentReviewProps {
  document: VerificationDocument;
}

const DocumentReview = ({ document }: DocumentReviewProps) => {
  const [isViewerOpen, setIsViewerOpen] = React.useState(false);

  return (
    <>
      <Card>
        <CardHeader className="pb-2">
          <div className="flex justify-between items-center">
            <CardTitle className="text-base">
              {document.type}
            </CardTitle>
            <Badge variant={document.status === 'pending' ? 'outline' : document.status === 'approved' ? 'success' : 'destructive'}>
              {document.status}
            </Badge>
          </div>
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
                onClick={() => setIsViewerOpen(true)}
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

      <Dialog open={isViewerOpen} onOpenChange={setIsViewerOpen}>
        <DialogContent className="max-w-4xl h-[80vh]">
          <DocumentViewer 
            url={document.fileUrl}
            type={document.fileUrl.toLowerCase().endsWith('.pdf') ? 'pdf' : 'image'}
          />
        </DialogContent>
      </Dialog>
    </>
  );
};

export default DocumentReview;
