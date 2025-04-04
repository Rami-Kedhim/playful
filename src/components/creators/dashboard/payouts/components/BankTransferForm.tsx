
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

interface BankTransferFormProps {
  details: {
    accountName: string;
    accountNumber: string;
    bankName: string;
  };
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const BankTransferForm = ({ details, onChange }: BankTransferFormProps) => {
  return (
    <div className="space-y-4">
      <div className="space-y-2">
        <Label htmlFor="accountName">Account Holder Name</Label>
        <Input
          id="accountName"
          name="accountName"
          value={details.accountName}
          onChange={onChange}
        />
      </div>
      <div className="space-y-2">
        <Label htmlFor="accountNumber">Account Number</Label>
        <Input
          id="accountNumber"
          name="accountNumber"
          value={details.accountNumber}
          onChange={onChange}
        />
      </div>
      <div className="space-y-2">
        <Label htmlFor="bankName">Bank Name</Label>
        <Input
          id="bankName"
          name="bankName"
          value={details.bankName}
          onChange={onChange}
        />
      </div>
    </div>
  );
};

export default BankTransferForm;
