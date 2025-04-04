
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

interface CryptoFormProps {
  walletAddress: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const CryptoForm = ({ walletAddress, onChange }: CryptoFormProps) => {
  return (
    <div className="space-y-2">
      <Label htmlFor="walletAddress">Wallet Address</Label>
      <Input
        id="walletAddress"
        name="walletAddress"
        value={walletAddress}
        onChange={onChange}
      />
    </div>
  );
};

export default CryptoForm;
