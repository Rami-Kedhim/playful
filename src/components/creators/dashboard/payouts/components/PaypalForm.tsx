
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

interface PaypalFormProps {
  email: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const PaypalForm = ({ email, onChange }: PaypalFormProps) => {
  return (
    <div className="space-y-2">
      <Label htmlFor="paypalEmail">PayPal Email</Label>
      <Input
        id="paypalEmail"
        name="paypalEmail"
        type="email"
        value={email}
        onChange={onChange}
      />
    </div>
  );
};

export default PaypalForm;
