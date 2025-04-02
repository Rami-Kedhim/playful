
import { useAuth } from "@/contexts/AuthContext";
import { Coins } from "lucide-react";
import LucoinPackageDialog from "./LucoinPackageDialog";

interface LucoinBalanceProps {
  balance: number;
}

const LucoinBalance = ({ balance = 0 }: LucoinBalanceProps) => {
  const { refreshProfile } = useAuth();

  return (
    <div className="space-y-2">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Coins className="h-5 w-5 text-yellow-500" />
          <div>
            <h3 className="font-medium">Lucoin Balance</h3>
            <p className="text-sm text-muted-foreground">{balance} LC</p>
          </div>
        </div>
        <LucoinPackageDialog onSuccess={refreshProfile} />
      </div>
    </div>
  );
};

export default LucoinBalance;
