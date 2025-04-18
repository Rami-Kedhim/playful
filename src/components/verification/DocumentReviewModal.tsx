
import React, { useState } from 'react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { VerificationDocument, VerificationRequest } from '@/types/escort';

export interface DocumentReviewProps {
  document: VerificationDocument;
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
  const [rejectionReason, setRejectionReason] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleApprove = async () => {
    setIsLoading(true);
    try {
      await onApprove();
    } catch (error) {
      console.error('Error approving document:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleReject = async () => {
    setIsLoading(true);
    try {
      await onReject(rejectionReason);
    } catch (error) {
      console.error('Error rejecting document:', error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-3xl">
        <DialogHeader>
          <DialogTitle>Review Verification Document</DialogTitle>
        </DialogHeader>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <div className="bg-gray-100 rounded-md aspect-square overflow-hidden">
              {document && document.url ? (
                <img
                  src={document.url}
                  alt="Verification document"
                  className="w-full h-full object-contain"
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center text-gray-500">
                  No document available
                </div>
              )}
            </div>
            <p className="text-sm text-muted-foreground mt-2">
              Document Type: {document?.type || 'Not specified'}
            </p>
          </div>

          <div className="space-y-4">
            <div>
              <h3 className="text-lg font-medium mb-2">User Information</h3>
              <p className="text-sm">
                <span className="font-medium">User ID:</span> {verification.userId}
              </p>
              <p className="text-sm">
                <span className="font-medium">Submitted:</span>{' '}
                {new Date(verification.submittedAt).toLocaleString()}
              </p>
              <p className="text-sm">
                <span className="font-medium">Status:</span> {verification.status}
              </p>
            </div>

            {verification.status !== 'approved' && (
              <div className="space-y-2">
                <Label htmlFor="rejection-reason">Rejection Reason (if applicable)</Label>
                <Textarea
                  id="rejection-reason"
                  placeholder="Enter reason for rejection..."
                  value={rejectionReason}
                  onChange={(e) => setRejectionReason(e.target.value)}
                />
              </div>
            )}
          </div>
        </div>

        <DialogFooter className="sm:justify-between flex">
          <Button
            variant="outline"
            onClick={onClose}
            disabled={isLoading}
          >
            Cancel
          </Button>
          <div className="flex gap-2">
            <Button
              variant="destructive"
              onClick={handleReject}
              disabled={isLoading || rejectionReason.trim().length === 0}
            >
              Reject
            </Button>
            <Button
              variant="default"
              onClick={handleApprove}
              disabled={isLoading}
            >
              Approve
            </Button>
          </div>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default DocumentReviewModal;
