
import { useNavigate } from 'react-router-dom';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { AlertCircle } from 'lucide-react';

export default function PaymentCancelPage() {
  const navigate = useNavigate();

  return (
    <div className="container mx-auto px-4 py-16 h-[80vh] flex items-center justify-center">
      <Card className="max-w-md w-full p-8 text-center">
        <CardContent className="p-0">
          <div className="flex flex-col items-center">
            <div className="p-3 rounded-full bg-red-100 text-red-500 mb-6">
              <AlertCircle className="h-16 w-16" />
            </div>
            
            <h1 className="text-2xl font-bold mb-4">Payment Cancelled</h1>
            
            <p className="text-gray-600 mb-8">
              Your payment process was cancelled. No charges were made to your account.
            </p>
            
            <div className="space-y-4 w-full">
              <Button 
                className="w-full bg-gradient-to-r from-amber-500 to-yellow-400 hover:from-amber-600 hover:to-yellow-500"
                onClick={() => navigate('/wallet')}
              >
                Try Again
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
