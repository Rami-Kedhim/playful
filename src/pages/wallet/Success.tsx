
import { useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { useWallet } from '@/contexts/WalletContext';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { CheckCircle } from 'lucide-react';
import { toast } from '@/hooks/use-toast';

export default function PaymentSuccessPage() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const { refreshBalance } = useWallet();
  
  // Get session_id from URL
  const sessionId = searchParams.get('session_id');

  useEffect(() => {
    // Refresh wallet balance after successful payment
    if (sessionId) {
      refreshBalance();
      
      // Show success toast
      toast({
        title: 'Payment Successful',
        description: 'Your Lucoins have been added to your wallet.',
        variant: 'default',
      });
    }
  }, [sessionId, refreshBalance]);

  return (
    <div className="container mx-auto px-4 py-16 h-[80vh] flex items-center justify-center">
      <Card className="max-w-md w-full p-8 text-center">
        <CardContent className="p-0">
          <div className="flex flex-col items-center">
            <div className="p-3 rounded-full bg-green-100 text-green-500 mb-6">
              <CheckCircle className="h-16 w-16" />
            </div>
            
            <h1 className="text-2xl font-bold mb-4">Payment Successful!</h1>
            
            <p className="text-gray-600 mb-8">
              Thank you for your purchase. Your Lucoins have been successfully added to your wallet.
            </p>
            
            <div className="space-y-4 w-full">
              <Button 
                className="w-full bg-gradient-to-r from-amber-500 to-yellow-400 hover:from-amber-600 hover:to-yellow-500"
                onClick={() => navigate('/wallet')}
              >
                Go to My Wallet
              </Button>
              
              <Button 
                variant="outline" 
                className="w-full"
                onClick={() => navigate('/')}
              >
                Back to Home
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
