
import { useWallet } from '@/contexts/WalletContext';
import { Wallet, Loader2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

interface WalletBalanceProps {
  onRecharge?: () => void;
  showRechargeButton?: boolean;
  className?: string;
}

export default function WalletBalance({ 
  onRecharge, 
  showRechargeButton = true,
  className = ''
}: WalletBalanceProps) {
  const { balance, isLoading, refreshBalance } = useWallet();

  return (
    <Card className={`overflow-hidden ${className}`}>
      <CardHeader className="bg-gradient-to-r from-amber-500 to-yellow-400 text-white py-4">
        <CardTitle className="flex items-center justify-between">
          <span className="flex items-center">
            <Wallet className="mr-2 h-5 w-5" />
            Your Lucoin Balance
          </span>
          <Button
            variant="ghost"
            size="icon"
            onClick={refreshBalance}
            className="text-white hover:text-white/80 hover:bg-white/10"
            disabled={isLoading}
          >
            {isLoading ? <Loader2 className="h-4 w-4 animate-spin" /> : (
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M21 2v6h-6"></path>
                <path d="M3 12a9 9 0 0 1 15-6.7L21 8"></path>
                <path d="M3 12a9 9 0 0 0 6.7 15L13 21"></path>
                <path d="M21 22v-6h-6"></path>
              </svg>
            )}
          </Button>
        </CardTitle>
        <CardDescription className="text-white/80">
          Use Lucoins to access premium features
        </CardDescription>
      </CardHeader>
      <CardContent className="p-6">
        <div className="flex flex-col items-center justify-center">
          <div className="text-center">
            {isLoading ? (
              <Loader2 className="h-6 w-6 animate-spin mx-auto mb-2" />
            ) : (
              <div className="flex items-center justify-center">
                <span className="text-4xl font-bold text-amber-500">{balance}</span>
                <img
                  src="/lucoin-icon.png" 
                  alt="Lucoin"
                  className="h-6 w-6 ml-2"
                  onError={(e) => {
                    e.currentTarget.src = 'https://placehold.co/24x24/ffc107/ffffff?text=LC';
                  }}
                />
              </div>
            )}
            <p className="text-gray-500 mt-2">Available Lucoins</p>
          </div>
          
          {showRechargeButton && (
            <Button 
              className="mt-4 bg-gradient-to-r from-amber-500 to-yellow-400 hover:from-amber-600 hover:to-yellow-500"
              onClick={onRecharge}
            >
              Recharge Lucoins
            </Button>
          )}
        </div>
      </CardContent>
    </Card>
  );
}
