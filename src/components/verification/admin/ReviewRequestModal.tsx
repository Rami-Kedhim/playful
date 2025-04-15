
import React, { useState } from 'react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from '@/components/ui/button';
import { VerificationRequest } from '@/types/escort';
import { Textarea } from '@/components/ui/textarea';
import DocumentPreview from './DocumentPreview';
import DocumentReviewModal from './DocumentReviewModal';

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
  const [selectedDocument, setSelectedDocument] = useState<null | any>(null);
  const [rejectionReason, setRejectionReason] = useState('');
  
  if (!request) return null;

  const handleDocumentView = (url: string) => {
    window.open(url, '_blank');
  };

  return (
    <>
      <Dialog open={isOpen} onOpenChange={onClose}>
        <DialogContent className="sm:max-w-[600px]">
          <DialogHeader>
            <DialogTitle>Review Verification Request</DialogTitle>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="space-y-4">
              <div>
                <h3 className="font-medium mb-2">Documents Submitted</h3>
                <div className="grid grid-cols-2 gap-4">
                  {request.documents.map((doc, index) => (
                    <DocumentPreview 
                      key={index}
                      document={doc}
                      onView={handleDocumentView}
                    />
                  ))}
                </div>
              </div>

              <div className="space-y-4">
                <Textarea
                  placeholder="Enter rejection reason (required for rejecting verification)"
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
                    onClick={() => onReject(rejectionReason)}
                    disabled={!rejectionReason}
                  >
                    Reject
                  </Button>
                  <Button onClick={onApprove}>
                    Approve
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      <DocumentReviewModal
        document={selectedDocument}
        isOpen={!!selectedDocument}
        onClose={() => setSelectedDocument(null)}
        onApprove={() => {
          // Handle document approval
          setSelectedDocument(null);
        }}
        onReject={(id, reason) => {
          // Handle document rejection
          setSelectedDocument(null);
        }}
      />
    </>
  );
};

export default ReviewRequestModal;
