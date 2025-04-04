
import { useState } from "react";
import PayoutRequestForm from "../PayoutRequestForm";
import PayoutRequestSuccess from "./PayoutRequestSuccess";
import PayoutConfirmationDialog from "./PayoutConfirmationDialog";

interface PayoutRequestManagerProps {
  availableAmount: number;
  onRequestPayout: (data: {
    amount: number;
    payoutMethod: string;
    payoutDetails: Record<string, any>;
  }) => Promise<boolean>;
  isSubmitting: boolean;
}

const PayoutRequestManager = ({
  availableAmount,
  onRequestPayout,
  isSubmitting
}: PayoutRequestManagerProps) => {
  const [showSuccess, setShowSuccess] = useState(false);
  const [requestAmount, setRequestAmount] = useState(0);
  const [confirmationOpen, setConfirmationOpen] = useState(false);
  const [pendingRequest, setPendingRequest] = useState<any | null>(null);
  
  const handleRequestSubmit = (data: {
    amount: number;
    payoutMethod: string;
    payoutDetails: Record<string, any>;
  }) => {
    setRequestAmount(data.amount);
    setPendingRequest(data);
    setConfirmationOpen(true);
  };
  
  const handleConfirmRequest = async () => {
    if (!pendingRequest) return;
    
    setConfirmationOpen(false);
    const success = await onRequestPayout(pendingRequest);
    
    if (success) {
      setShowSuccess(true);
    }
    
    setPendingRequest(null);
  };
  
  const handleCloseSuccess = () => {
    setShowSuccess(false);
  };
  
  return (
    <>
      {showSuccess ? (
        <PayoutRequestSuccess 
          amount={requestAmount} 
          onClose={handleCloseSuccess} 
        />
      ) : (
        <PayoutRequestForm 
          availableAmount={availableAmount} 
          onSubmit={handleRequestSubmit}
          isSubmitting={isSubmitting}
        />
      )}
      
      <PayoutConfirmationDialog
        isOpen={confirmationOpen}
        onClose={() => setConfirmationOpen(false)}
        onConfirm={handleConfirmRequest}
        amount={pendingRequest?.amount || 0}
        payoutMethod={pendingRequest?.payoutMethod || ""}
      />
    </>
  );
};

export default PayoutRequestManager;
