
// Fix property references in this similar modal to the correct camelCase props

import React, { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { CheckCircle, XCircle } from 'lucide-react';
// Correct imports from verification types
import { VerificationDocument, VerificationRequest } from '@/types/verification';
import { format } from 'date-fns';

interface DocumentReviewModalProps {
  isOpen: boolean;
  onClose: () => void;
  document: VerificationDocument;
  request: VerificationRequest;
  onApprove: (documentId: string, notes: string) => void;
  onReject: (documentId: string, notes: string) => void;
}

const DocumentReviewModal: React.FC<DocumentReviewModalProps> = ({
  isOpen,
  onClose,
  document,
  request,
  onApprove,
  onReject,
}) => {
  const [reason, setReason] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleApprove = async () => {
    setIsSubmitting(true);
    try {
      await onApprove(document.id, reason);
      onClose();
    } catch (error) {
      console.error('Error approving document:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleReject = async () => {
    if (!reason) return;
    setIsSubmitting(true);
    try {
      await onReject(document.id, reason);
      onClose();
    } catch (error) {
      console.error('Error rejecting document:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Review Document</DialogTitle>
        </DialogHeader>

        <div className="space-y-4">
          <div className="bg-muted p-4 rounded-md">
            <img 
              src={document.fileUrl || ''} 
              alt="Verification document" 
              className="w-full h-auto max-h-[400px] object-contain"
            />
          </div>

          <div>
            <p><strong>Type:</strong> {document.documentType || 'Unknown'}</p>
            <p><strong>Uploaded:</strong> {document.uploadedAt ? 
              format(new Date(document.uploadedAt), 'PPP') : 
              'Unknown date'}</p>
          </div>

          <div className="space-y-2">
            <Label htmlFor="rejection-reason">Rejection Reason (if applicable)</Label>
            <Textarea 
              id="rejection-reason"
              placeholder="Explain why the document is being rejected..."
              value={reason}
              onChange={(e) => setReason(e.target.value)}
              className="min-h-[100px]"
            />
          </div>

          <div className="flex justify-between gap-2">
            <Button 
              variant="destructive" 
              onClick={handleReject} 
              disabled={!reason || isSubmitting}
              className="flex-1"
            >
              {isSubmitting ? 'Processing...' : 'Reject'}
            </Button>
            <Button 
              variant="default" 
              onClick={handleApprove} 
              disabled={isSubmitting}
              className="flex-1"
            >
              {isSubmitting ? 'Processing...' : 'Approve'}
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default DocumentReviewModal;
