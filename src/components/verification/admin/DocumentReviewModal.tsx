
import React from 'react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { VerificationDocument } from '@/types/escort';
import DocumentPreview from './DocumentPreview';

interface DocumentReviewModalProps {
  document: VerificationDocument | null;
  isOpen: boolean;
  onClose: () => void;
  onApprove: (id: string) => void;
  onReject: (id: string, reason: string) => void;
}

const DocumentReviewModal = ({
  document,
  isOpen,
  onClose,
  onApprove,
  onReject,
}: DocumentReviewModalProps) => {
  const [rejectionReason, setRejectionReason] = React.useState('');
  
  if (!document) return null;

  const handleView = (url: string) => {
    window.open(url, '_blank');
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[600px]">
        <DialogHeader>
          <DialogTitle>Review Document</DialogTitle>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <DocumentPreview document={document} onView={handleView} />
          
          <div className="space-y-4">
            <Textarea
              placeholder="Enter rejection reason (required for rejecting documents)"
              value={rejectionReason}
              onChange={(e) => setRejectionReason(e.target.value)}
              className="min-h-[100px]"
            />
            
            <div className="flex justify-end space-x-2">
              <Button variant="outline" onClick={onClose}>
                Cancel
              </Button>
              <Button 
                variant="destructive" 
                onClick={() => onReject(document.id, rejectionReason)}
                disabled={!rejectionReason}
              >
                Reject
              </Button>
              <Button onClick={() => onApprove(document.id)}>
                Approve
              </Button>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default DocumentReviewModal;
