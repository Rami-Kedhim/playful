
import { Button } from "@/components/ui/button";

interface LucoinBalanceProps {
  balance: number;
}

const LucoinBalance = ({ balance = 0 }: LucoinBalanceProps) => {
  return (
    <div className="space-y-2">
      <div className="flex items-center justify-between">
        <div>
          <h3 className="font-medium">Lucoin Balance</h3>
          <p className="text-sm text-muted-foreground">{balance} LC</p>
        </div>
        <Button variant="outline" size="sm">Add Lucoins</Button>
      </div>
    </div>
  );
};

export default LucoinBalance;
