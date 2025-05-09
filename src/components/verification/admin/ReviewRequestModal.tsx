
import React, { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Loader2, UserCheck, UserX } from 'lucide-react';
import { VerificationRequest } from '@/types/verification';

interface ReviewRequestModalProps {
  open: boolean;
  onClose: () => void;
  request: VerificationRequest | null;
  onApprove: (id: string, notes?: string) => Promise<void>;
  onReject: (id: string, notes?: string) => Promise<void>;
  isLoading?: boolean;
}

const ReviewRequestModal: React.FC<ReviewRequestModalProps> = ({
  open,
  onClose,
  request,
  onApprove,
  onReject,
  isLoading = false
}) => {
  const [notes, setNotes] = React.useState('');
  
  // Convert to string and lowercase for safe comparison
  const statusLower = request ? String(request.status).toLowerCase() : '';
  const isPending = statusLower === 'pending' || statusLower === 'in_review';
  
  const handleApprove = async () => {
    if (!isPending || !request) return;
    await onApprove(request.id, notes);
  };
  
  const handleReject = async () => {
    if (!isPending || !request) return;
    await onReject(request.id, notes);
  };
  
  // Safely get requested level
  const getRequestedLevel = () => {
    if (!request) return 'unknown';
    return request.requested_level || request.requestedLevel || request.verificationLevel || 'unknown';
  };

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Review Verification Request</DialogTitle>
        </DialogHeader>

        {request && (
          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-2 text-sm">
              <div className="font-medium">User ID:</div>
              <div>{request.profile_id || request.userId || ''}</div>

              <div className="font-medium">Status:</div>
              <div className="capitalize">{statusLower}</div>

              <div className="font-medium">Requested Level:</div>
              <div className="capitalize">{getRequestedLevel()}</div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="notes">Review Notes</Label>
              <Textarea
                id="notes"
                placeholder="Add notes about this verification request..."
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
              />
            </div>

            <div className="flex justify-end space-x-2 pt-4">
              <Button
                variant="destructive"
                onClick={handleReject}
                disabled={isLoading}
              >
                {isLoading ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <UserX className="mr-2 h-4 w-4" />}
                Reject
              </Button>
              <Button
                onClick={handleApprove}
                disabled={isLoading}
              >
                {isLoading ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <UserCheck className="mr-2 h-4 w-4" />}
                Approve
              </Button>
            </div>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
};

export default ReviewRequestModal;
