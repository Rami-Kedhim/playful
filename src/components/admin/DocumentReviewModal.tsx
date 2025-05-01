import React, { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Alert, AlertTitle, AlertDescription } from '@/components/ui/alert';
import { ExclamationTriangleIcon } from '@radix-ui/react-icons';
import { VerificationDocument, VerificationRequest, VerificationStatus } from '@/types/verification';

export interface DocumentReviewModalProps {
  isOpen: boolean;
  onClose: () => void;
  document: VerificationDocument;
  request: VerificationRequest;
  onApprove: () => Promise<void>;
  onReject: (reason: string) => Promise<void>;
  verification?: VerificationRequest;
}

const DocumentReviewModal: React.FC<DocumentReviewModalProps> = ({
  isOpen,
  onClose,
  document,
  request,
  onApprove,
  onReject
}) => {
  const [rejectionReason, setRejectionReason] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleApprove = async () => {
    try {
      setIsSubmitting(true);
      setError(null);
      await onApprove();
      onClose();
    } catch (error) {
      setError('Failed to approve document');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleReject = async () => {
    try {
      setIsSubmitting(true);
      setError(null);
      await onReject(rejectionReason);
      onClose();
    } catch (error) {
      setError('Failed to reject document');
    } finally {
      setIsSubmitting(false);
    }
  };

  const getDocumentUrl = () => {
    return document.fileUrl || '';
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[700px]">
        <DialogHeader>
          <DialogTitle>Document Review - {document.documentType}</DialogTitle>
        </DialogHeader>

        <div className="grid gap-6">
          {error && (
            <Alert variant="destructive">
              <ExclamationTriangleIcon className="h-4 w-4" />
              <AlertTitle>Error</AlertTitle>
              <AlertDescription>{error}</AlertDescription>
            </Alert>
          )}

          <div className="overflow-hidden rounded-md">
            {getDocumentUrl() && getDocumentUrl().match(/\.(jpg|jpeg|png|gif|webp)$/i) ? (
              <img
                src={getDocumentUrl()}
                alt={document.documentType}
                className="w-full h-auto max-h-[500px] object-contain"
              />
            ) : (
              <div className="bg-muted p-4 rounded-md text-center">
                <p>Document preview not available</p>
                <a 
                  href={getDocumentUrl()} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-primary hover:underline"
                >
                  Download Document
                </a>
              </div>
            )}
          </div>

          <div className="grid gap-2">
            <h3 className="font-medium">Document Information</h3>
            <div className="grid grid-cols-2 gap-2 text-sm">
              <div className="font-medium">Type</div>
              <div>{document.documentType}</div>
              
              <div className="font-medium">Uploaded</div>
              <div>{new Date(document.uploadedAt || Date.now()).toLocaleString()}</div>
              
              <div className="font-medium">Status</div>
              <div>
                <span className={`inline-block px-2 py-1 rounded-full text-xs 
                  ${document.status === VerificationStatus.APPROVED ? 'bg-green-100 text-green-800' : 
                    document.status === VerificationStatus.REJECTED ? 'bg-red-100 text-red-800' : 
                    'bg-yellow-100 text-yellow-800'}`}>
                  {document.status.charAt(0).toUpperCase() + document.status.slice(1)}
                </span>
              </div>
            </div>
          </div>

          {document.status === VerificationStatus.PENDING && (
            <div className="grid gap-2">
              <h3 className="font-medium">Rejection Reason</h3>
              <Textarea
                placeholder="Provide a reason for rejection (required for rejecting documents)"
                value={rejectionReason}
                onChange={(e) => setRejectionReason(e.target.value)}
              />
            </div>
          )}
        </div>

        <DialogFooter>
          <Button variant="outline" onClick={onClose} disabled={isSubmitting}>
            Cancel
          </Button>
          {document.status === VerificationStatus.PENDING && (
            <>
              <Button 
                variant="destructive" 
                onClick={handleReject} 
                disabled={isSubmitting || !rejectionReason.trim()}
              >
                Reject
              </Button>
              <Button 
                variant="default" 
                onClick={handleApprove} 
                disabled={isSubmitting}
              >
                Approve
              </Button>
            </>
          )}
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default DocumentReviewModal;
