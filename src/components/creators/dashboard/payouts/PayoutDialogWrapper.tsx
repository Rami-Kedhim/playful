
import { Dialog } from "@/components/ui/dialog";
import PayoutRequestForm from "./PayoutRequestForm";

interface PayoutDialogWrapperProps {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
  earnings: {
    total: number;
    pending: number;
    available: number;
  };
  onRequestPayout: (payoutData: {
    amount: number;
    payoutMethod: string;
    payoutDetails: Record<string, any>;
  }) => Promise<boolean>;
}

const PayoutDialogWrapper = ({ 
  isOpen, 
  onOpenChange, 
  earnings, 
  onRequestPayout 
}: PayoutDialogWrapperProps) => {
  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <PayoutRequestForm 
        earnings={earnings}
        onRequestPayout={onRequestPayout}
        onCancel={() => onOpenChange(false)}
      />
    </Dialog>
  );
};

export default PayoutDialogWrapper;
