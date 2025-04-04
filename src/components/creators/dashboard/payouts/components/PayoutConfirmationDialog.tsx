
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";

interface PayoutConfirmationDialogProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  amount: number;
  payoutMethod: string;
}

const PayoutMethodLabel: Record<string, string> = {
  bank_transfer: "Bank Transfer",
  paypal: "PayPal",
  crypto: "Cryptocurrency",
};

const PayoutConfirmationDialog = ({
  isOpen,
  onClose,
  onConfirm,
  amount,
  payoutMethod,
}: PayoutConfirmationDialogProps) => {
  return (
    <AlertDialog open={isOpen} onOpenChange={onClose}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Confirm Your Payout Request</AlertDialogTitle>
          <AlertDialogDescription>
            You are about to request a payout of {amount.toFixed(2)} LC via {PayoutMethodLabel[payoutMethod] || payoutMethod}.
            This action cannot be undone. Are you sure you want to proceed?
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction onClick={onConfirm}>Confirm Request</AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default PayoutConfirmationDialog;
