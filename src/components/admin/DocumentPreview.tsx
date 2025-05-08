
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { VerificationDocument } from '@/types/verification';
import { Eye, Download, Check, X } from 'lucide-react';

export interface DocumentPreviewProps {
  document: VerificationDocument;
  onView?: (url: string) => void;
  onApprove?: (document: VerificationDocument, notes?: string) => void;
  onReject?: (document: VerificationDocument, notes?: string) => void;
  onClose?: () => void;
  canModerate?: boolean;
}

const DocumentPreview: React.FC<DocumentPreviewProps> = ({
  document,
  onApprove,
  onReject,
  onClose,
  onView = (url) => window.open(url, '_blank'),
  canModerate = false,
}) => {
  const [notes, setNotes] = useState(document.notes || '');
  const [isImage, setIsImage] = useState(false);
  const [isPdf, setIsPdf] = useState(false);

  React.useEffect(() => {
    const fileUrl = document.fileUrl || document.filePath || '';
    const fileExt = fileUrl.split('.').pop()?.toLowerCase();
    setIsImage(["jpg", "jpeg", "png", "gif", "webp"].includes(fileExt || ''));
    setIsPdf(fileExt === "pdf");
  }, [document.fileUrl, document.filePath]);

  const handleDownload = () => {
    const fileUrl = document.fileUrl || document.filePath || '';
    window.open(fileUrl, '_blank');
  };

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h3 className="text-lg font-medium">{document.type || document.documentType || 'Document'}</h3>
        <Button variant="ghost" size="sm" onClick={handleDownload}>
          <Download className="h-4 w-4 mr-2" />
          Download
        </Button>
      </div>

      {isImage && (
        <div className="border rounded-md overflow-hidden">
          <img 
            src={document.fileUrl || document.filePath} 
            alt={document.type || document.documentType || 'Document'} 
            className="w-full object-contain max-h-[500px]"
          />
        </div>
      )}
      
      {isPdf && (
        <div className="border rounded-md overflow-hidden h-[500px]">
          <iframe 
            src={document.fileUrl || document.filePath} 
            className="w-full h-full"
            title={document.type || document.documentType || 'Document'}
          ></iframe>
        </div>
      )}

      {!isImage && !isPdf && (
        <div className="p-8 border rounded-md flex justify-center items-center">
          <Button onClick={() => onView(document.fileUrl || document.filePath || '')}>
            <Eye className="h-4 w-4 mr-2" />
            View Document
          </Button>
        </div>
      )}

      {canModerate && (
        <>
          <Textarea
            placeholder="Add reviewer notes..."
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
            rows={3}
          />

          <div className="flex justify-end gap-2">
            {onClose && (
              <Button variant="outline" onClick={onClose}>
                Cancel
              </Button>
            )}
            {onReject && (
              <Button 
                variant="destructive" 
                onClick={() => onReject(document, notes)}
              >
                <X className="h-4 w-4 mr-2" />
                Reject
              </Button>
            )}
            {onApprove && (
              <Button 
                variant="default" 
                onClick={() => onApprove(document, notes)}
              >
                <Check className="h-4 w-4 mr-2" />
                Approve
              </Button>
            )}
          </div>
        </>
      )}
    </div>
  );
};

export default DocumentPreview;
