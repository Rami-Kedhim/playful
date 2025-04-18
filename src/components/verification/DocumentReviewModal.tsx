import React, { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';
import { CheckCircle, XCircle } from 'lucide-react';
import { VerificationDocument, VerificationRequest } from '@/types/verification';

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
  onReject
}) => {
  const [notes, setNotes] = useState('');
  const [status, setStatus] = useState<'approved' | 'rejected' | null>(null);

  const handleApprove = () => {
    if (document?.id) {
      onApprove(document.id, notes);
      onClose();
    }
  };

  const handleReject = () => {
    if (document?.id) {
      onReject(document.id, notes);
      onClose();
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Review Document</DialogTitle>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="document-type" className="text-right">
              Document Type
            </Label>
            <div className="col-span-3">
              <p>{document?.documentType || document?.document_type || 'N/A'}</p>
            </div>
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="document-url" className="text-right">
              Document URL
            </Label>
            <div className="col-span-3">
              <a href={document?.fileUrl || document?.file_url || document?.url || document?.document_url} target="_blank" rel="noopener noreferrer" className="text-blue-500 underline">View Document</a>
            </div>
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="status" className="text-right">
              Status
            </Label>
            <RadioGroup defaultValue="approved" className="col-span-3" onValueChange={(value) => setStatus(value as 'approved' | 'rejected')}>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="approved" id="approved" />
                <Label htmlFor="approved">Approve <CheckCircle className="ml-1 h-4 w-4 text-green-500" /></Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="rejected" id="rejected" />
                <Label htmlFor="rejected">Reject <XCircle className="ml-1 h-4 w-4 text-red-500" /></Label>
              </div>
            </RadioGroup>
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="notes" className="text-right">
              Notes
            </Label>
            <div className="col-span-3">
              <Textarea id="notes" value={notes} onChange={(e) => setNotes(e.target.value)} className="resize-none" />
            </div>
          </div>
        </div>
        <DialogFooter>
          <Button type="button" variant="secondary" onClick={onClose}>
            Cancel
          </Button>
          {status === 'approved' && (
            <Button type="button" onClick={handleApprove}>
              Approve
            </Button>
          )}
          {status === 'rejected' && (
            <Button type="button" variant="destructive" onClick={handleReject}>
              Reject
            </Button>
          )}
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default DocumentReviewModal;
