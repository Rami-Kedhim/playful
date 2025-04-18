
// Add the missing prop to the component props interface
export interface DocumentReviewModalProps {
  isOpen: boolean;
  onClose: () => void;
  document: VerificationDocument;
  request: VerificationRequest; // Add this missing property
  onApprove: () => Promise<void>;
  onReject: (reason: string) => Promise<void>;
  verification?: VerificationRequest; // Optional for backward compatibility
}

// Also fix any approve/reject functions that are missing arguments
const handleApprove = async () => {
  try {
    // Call the onApprove prop with no arguments if it's defined that way
    await onApprove();
    onClose();
  } catch (error) {
    setError('Failed to approve document');
  }
};

const handleReject = async () => {
  try {
    // Make sure to pass the rejection reason to onReject
    await onReject(rejectionReason);
    onClose();
  } catch (error) {
    setError('Failed to reject document');
  }
};
