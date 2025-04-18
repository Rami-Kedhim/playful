
import React, { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { VerificationRequest } from '@/types/escort';

export interface DocumentReviewProps {
  document: any; // Document being reviewed
  isOpen: boolean;
  onClose: () => void;
  verification: VerificationRequest;
  onApprove: () => Promise<void>;
  onReject: (reason: string) => Promise<void>;
}

const DocumentReviewModal: React.FC<DocumentReviewProps> = ({
  document,
  isOpen,
  onClose,
  verification,
  onApprove,
  onReject
}) => {
  const [reason, setReason] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  const handleApprove = async () => {
    setIsSubmitting(true);
    try {
      await onApprove();
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
      await onReject(reason);
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
              src={document?.url || document?.fileUrl || 'no-image.png'} 
              alt="Verification document" 
              className="w-full h-auto max-h-[400px] object-contain"
            />
          </div>
          
          <div>
            <p><strong>Type:</strong> {document?.type || document?.document_type || 'Unknown'}</p>
            <p><strong>Uploaded:</strong> {document?.uploadedAt || document?.uploaded_at || 'Unknown'}</p>
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
