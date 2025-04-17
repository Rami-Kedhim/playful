
import React, { useState } from 'react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { VerificationRequest } from '@/types/verification';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { CheckCircle2, XCircle } from 'lucide-react';
import DocumentReview from './DocumentReview';

interface ReviewRequestModalProps {
  request: VerificationRequest | null;
  isOpen: boolean;
  onClose: () => void;
  onApprove: () => void;
  onReject: (reason: string) => void;
}

const ReviewRequestModal = ({
  request,
  isOpen,
  onClose,
  onApprove,
  onReject,
}: ReviewRequestModalProps) => {
  const [rejectionReason, setRejectionReason] = useState('');
  
  if (!request) return null;

  // Get the user ID, supporting both naming conventions
  const userId = request.userId || request.user_id || request.profile_id;
  const submittedDate = request.submittedAt || request.createdAt || request.created_at;

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl h-[90vh]">
        <DialogHeader>
          <DialogTitle>Review Verification Request</DialogTitle>
        </DialogHeader>
        
        <div className="grid gap-6 h-full overflow-hidden">
          <div className="space-y-4 overflow-y-auto pr-4">
            <div className="grid gap-4">
              <Alert>
                <AlertTitle>Verification Details</AlertTitle>
                <AlertDescription>
                  <div className="grid gap-2 mt-2 text-sm">
                    <div>Submitted: {submittedDate ? new Date(submittedDate).toLocaleString() : 'Unknown'}</div>
                    <div>User ID: {userId || 'Unknown'}</div>
                    <div>Documents: {request.documents.length} submitted</div>
                  </div>
                </AlertDescription>
              </Alert>

              <div className="space-y-4">
                {request.documents.map((doc, index) => (
                  <DocumentReview key={index} document={doc} />
                ))}
              </div>
            </div>
          </div>

          <div className="space-y-4 mt-auto pt-4 border-t">
            <Textarea
              placeholder="Enter rejection reason (required for rejecting verification)"
              value={rejectionReason}
              onChange={(e) => setRejectionReason(e.target.value)}
              className="min-h-[100px]"
            />
            
            <div className="flex justify-end gap-2">
              <Button variant="outline" onClick={onClose}>
                Cancel
              </Button>
              <Button 
                variant="destructive" 
                onClick={() => onReject(rejectionReason)}
                disabled={!rejectionReason}
              >
                <XCircle className="w-4 w-4 mr-2" />
                Reject Request
              </Button>
              <Button onClick={onApprove}>
                <CheckCircle2 className="w-4 w-4 mr-2" />
                Approve Request
              </Button>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default ReviewRequestModal;
