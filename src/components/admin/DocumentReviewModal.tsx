
import React, { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { VerificationDocument, VerificationRequest } from '@/types/escort';

export interface DocumentReviewModalProps {
  isOpen: boolean;
  onClose: () => void;
  document: VerificationDocument;
  request: VerificationRequest;
  onApprove: (documentId: string, requestId: string) => Promise<void>;
  onReject: (documentId: string, requestId: string, reason: string) => Promise<void>;
}

const DocumentReviewModal = ({
  isOpen,
  onClose,
  document,
  request,
  onApprove,
  onReject
}: DocumentReviewModalProps) => {
  const [rejectionReason, setRejectionReason] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleApprove = async () => {
    try {
      setIsSubmitting(true);
      await onApprove(document.id, request.id);
      setIsSubmitting(false);
      onClose();
    } catch (error) {
      console.error('Error approving document:', error);
      setIsSubmitting(false);
    }
  };

  const handleReject = async () => {
    try {
      setIsSubmitting(true);
      await onReject(document.id, request.id, rejectionReason);
      setIsSubmitting(false);
      onClose();
    } catch (error) {
      console.error('Error rejecting document:', error);
      setIsSubmitting(false);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Review Verification Document</DialogTitle>
        </DialogHeader>
        
        <div className="space-y-4">
          <div className="aspect-video bg-muted rounded-md overflow-hidden">
            <img 
              src={document.fileUrl || document.url || document.document_url} 
              alt="Verification document" 
              className="w-full h-full object-contain"
            />
          </div>
          
          <div className="grid grid-cols-2 gap-2 text-sm">
            <div className="text-muted-foreground">Document Type:</div>
            <div>{document.documentType || document.document_type || document.type}</div>
            
            <div className="text-muted-foreground">Submitted:</div>
            <div>{new Date(document.uploadedAt || document.uploaded_at || document.created_at || "").toLocaleDateString()}</div>
          </div>
          
          <Textarea 
            placeholder="Reason for rejection (required if rejecting)"
            onChange={(e) => setRejectionReason(e.target.value)}
            value={rejectionReason}
          />
          
          <div className="flex justify-end gap-2">
            <Button variant="outline" onClick={onClose} disabled={isSubmitting}>
              Cancel
            </Button>
            <Button variant="destructive" onClick={handleReject} disabled={isSubmitting || !rejectionReason.trim()}>
              Reject
            </Button>
            <Button onClick={handleApprove} disabled={isSubmitting}>
              Approve
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default DocumentReviewModal;
