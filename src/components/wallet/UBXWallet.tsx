
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/hooks/auth";
import { useUBX } from "@/hooks/useUBX";
import { RefreshCw } from "lucide-react";

interface UBXWalletProps {
  compact?: boolean;
  showRefresh?: boolean;
  showHistory?: boolean;
  onRecharge?: () => void;
}

const UBXWallet = ({ 
  compact = true,
  showRefresh = false,
  showHistory = false,
  onRecharge
}: UBXWalletProps) => {
  const { user } = useAuth();
  const { balance, refreshBalance, isProcessing } = useUBX();
  const [isRefreshing, setIsRefreshing] = useState(false);

  const handleRefresh = async () => {
    setIsRefreshing(true);
    await refreshBalance();
    setIsRefreshing(false);
  };

  if (compact) {
    return (
      <div className="flex items-center space-x-2">
        <div className="font-medium">{balance} UBX</div>
        {showRefresh && (
          <Button 
            variant="ghost" 
            size="icon" 
            className="h-6 w-6" 
            onClick={handleRefresh}
            disabled={isRefreshing}
          >
            <RefreshCw className={`h-3 w-3 ${isRefreshing ? 'animate-spin' : ''}`} />
          </Button>
        )}
      </div>
    );
  }

  return (
    <Card>
      <CardHeader className="pb-3">
        <CardTitle className="text-base flex justify-between items-center">
          <div>UBX Balance</div>
          {showRefresh && (
            <Button 
              variant="outline" 
              size="sm" 
              onClick={handleRefresh}
              disabled={isRefreshing || isProcessing}
            >
              <RefreshCw className={`h-4 w-4 mr-2 ${isRefreshing ? 'animate-spin' : ''}`} />
              Refresh
            </Button>
          )}
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold mb-2">{balance} UBX</div>
        <p className="text-sm text-muted-foreground">
          Available for boosts, tips, and content purchases
        </p>
        
        {onRecharge && (
          <Button 
            variant="outline" 
            size="sm" 
            className="w-full mt-4"
            onClick={onRecharge}
          >
            Add UBX
          </Button>
        )}
      </CardContent>
    </Card>
  );
};

export default UBXWallet;

