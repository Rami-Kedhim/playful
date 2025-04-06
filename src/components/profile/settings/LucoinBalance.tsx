
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowUpRight, Plus } from "lucide-react";

interface LucoinBalanceProps {
  balance: number;
}

const LucoinBalance = ({ balance }: LucoinBalanceProps) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-xl">Lucoin Balance</CardTitle>
        <CardDescription>
          Your cryptocurrency balance for platform transactions
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-full bg-lucoin flex items-center justify-center">
              <span className="font-bold text-lucoin-foreground">LC</span>
            </div>
            <div>
              <div className="text-2xl font-bold">{balance}</div>
              <div className="text-xs text-muted-foreground">LC</div>
            </div>
          </div>
          
          <div className="text-sm text-muted-foreground">
            <div className="font-medium">~${(balance * 0.89).toFixed(2)} USD</div>
            <div className="text-xs text-right text-green-500">+2.4%</div>
          </div>
        </div>
        
        <div className="flex gap-2 w-full">
          <Button className="flex-1">
            <Plus className="h-4 w-4 mr-2" />
            Add Funds
          </Button>
          <Button variant="outline" className="flex-1">
            <ArrowUpRight className="h-4 w-4 mr-2" />
            Send
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default LucoinBalance;
