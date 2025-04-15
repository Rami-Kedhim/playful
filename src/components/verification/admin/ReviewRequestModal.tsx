
import React from 'react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from '@/components/ui/button';
import { VerificationRequest } from '@/types/escort';

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
  if (!request) return null;

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Review Verification Request</DialogTitle>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="space-y-4">
            <div>
              <h3 className="font-medium mb-2">Documents Submitted</h3>
              {request.documents.map((doc, index) => (
                <div key={index} className="p-2 bg-muted rounded-md mb-2">
                  <p className="text-sm">Type: {doc.type}</p>
                  <a 
                    href={doc.fileUrl} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="text-sm text-blue-500 hover:underline"
                  >
                    View Document
                  </a>
                </div>
              ))}
            </div>
            <div className="flex justify-end space-x-2">
              <Button variant="outline" onClick={onClose}>
                Cancel
              </Button>
              <Button variant="destructive" onClick={() => onReject("Not approved")}>
                Reject
              </Button>
              <Button onClick={onApprove}>
                Approve
              </Button>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default ReviewRequestModal;
