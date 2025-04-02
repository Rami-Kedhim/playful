
import { Switch } from "@/components/ui/switch";

interface VerifiedFilterProps {
  verifiedOnly: boolean;
  setVerifiedOnly: (value: boolean) => void;
}

const VerifiedFilter = ({ verifiedOnly, setVerifiedOnly }: VerifiedFilterProps) => {
  return (
    <div className="flex items-center space-x-2">
      <Switch
        checked={verifiedOnly}
        onCheckedChange={setVerifiedOnly}
      />
      <label className="text-sm font-medium">Verified only</label>
    </div>
  );
};

export default VerifiedFilter;
