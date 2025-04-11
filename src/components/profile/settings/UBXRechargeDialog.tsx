
import { useState, useEffect } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Loader2, QrCode, Copy, Check, RefreshCw } from 'lucide-react';
import { useToast } from '@/components/ui/use-toast';
import { useAuth } from '@/contexts/AuthContext';
import { blockchainService } from '@/services/blockchainService';
import QRCode from 'qrcode.react';

interface UBXRechargeDialogProps {
  open: boolean;
  onClose: () => void;
}

const UBXRechargeDialog = ({ open, onClose }: UBXRechargeDialogProps) => {
  const { user, refreshProfile } = useAuth();
  const { toast } = useToast();
  const [loading, setLoading] = useState(false);
  const [checking, setChecking] = useState(false);
  const [copied, setCopied] = useState(false);
  const [sessionData, setSessionData] = useState<{
    id: string;
    address: string;
    expires_at: string;
    status: string;
    amount_received: number;
    ubx_credited: number;
  } | null>(null);

  // Create IOTA session on dialog open
  useEffect(() => {
    if (open && user) {
      createIOTASession();
    }

    return () => {
      // Cleanup if needed
    };
  }, [open, user]);

  // Check session status periodically
  useEffect(() => {
    let intervalId: NodeJS.Timeout;
    
    if (sessionData && sessionData.status === 'pending') {
      intervalId = setInterval(() => {
        checkSessionStatus();
      }, 15000); // Check every 15 seconds
    }

    return () => {
      if (intervalId) clearInterval(intervalId);
    };
  }, [sessionData]);

  const createIOTASession = async () => {
    if (!user) return;
    
    try {
      setLoading(true);
      const session = await blockchainService.createIOTARechargeSession(user.id);
      setSessionData(session);
    } catch (error) {
      console.error('Error creating IOTA session:', error);
      toast({
        title: "Error",
        description: "Failed to create IOTA recharge session",
        variant: "destructive"
      });
    } finally {
      setLoading(false);
    }
  };

  const checkSessionStatus = async () => {
    if (!sessionData) return;
    
    try {
      setChecking(true);
      const updatedSession = await blockchainService.checkIOTASessionStatus(sessionData.id);
      setSessionData(updatedSession);
      
      // If payment received, refresh profile to update balance
      if (updatedSession.status === 'completed' && updatedSession.amount_received > 0) {
        await refreshProfile();
        toast({
          title: "Payment Received!",
          description: `${updatedSession.ubx_credited} UBX tokens added to your account`,
          variant: "success"
        });
      }
    } catch (error) {
      console.error('Error checking session status:', error);
    } finally {
      setChecking(false);
    }
  };

  const copyAddressToClipboard = () => {
    if (!sessionData) return;
    
    navigator.clipboard.writeText(sessionData.address);
    setCopied(true);
    
    toast({
      title: "Address Copied",
      description: "IOTA address copied to clipboard"
    });
    
    setTimeout(() => setCopied(false), 3000);
  };

  const handleClose = () => {
    onClose();
  };

  return (
    <Dialog open={open} onOpenChange={handleClose}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Recharge UBX with IOTA</DialogTitle>
          <DialogDescription>
            Send IOTA to this address to receive UBX tokens (5:1 conversion rate)
          </DialogDescription>
        </DialogHeader>

        <div className="py-4">
          {loading ? (
            <div className="flex flex-col items-center justify-center py-8">
              <Loader2 className="h-8 w-8 animate-spin text-primary mb-4" />
              <p className="text-sm text-muted-foreground">Creating payment session...</p>
            </div>
          ) : sessionData ? (
            <div className="space-y-6">
              {/* QR Code */}
              <div className="flex justify-center bg-white p-3 rounded-lg">
                <QRCode
                  value={sessionData.address}
                  size={200}
                  level="H"
                  includeMargin={true}
                  renderAs="svg"
                />
              </div>

              {/* IOTA Address */}
              <div className="space-y-2">
                <div className="text-sm font-medium">IOTA Address:</div>
                <div className="flex items-center space-x-2">
                  <div className="bg-muted p-3 rounded-md text-xs break-all flex-1">
                    {sessionData.address}
                  </div>
                  <Button
                    variant="outline"
                    size="icon"
                    onClick={copyAddressToClipboard}
                    className="shrink-0"
                  >
                    {copied ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
                  </Button>
                </div>
              </div>

              {/* Status */}
              <div className="bg-muted rounded-md p-4 space-y-2">
                <div className="flex justify-between">
                  <span className="text-sm">Status:</span>
                  <span className="font-medium capitalize">{sessionData.status}</span>
                </div>
                
                {sessionData.status === 'completed' && (
                  <>
                    <div className="flex justify-between">
                      <span className="text-sm">IOTA Received:</span>
                      <span className="font-medium">{sessionData.amount_received} MIOTA</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm">UBX Credited:</span>
                      <span className="font-medium">{sessionData.ubx_credited} UBX</span>
                    </div>
                  </>
                )}
                
                {sessionData.status === 'pending' && (
                  <p className="text-xs text-muted-foreground">
                    This address will expire in 24 hours. Payments will be processed automatically.
                  </p>
                )}
              </div>

              {/* Actions */}
              <div className="flex justify-between">
                {sessionData.status === 'pending' && (
                  <Button
                    variant="outline"
                    onClick={checkSessionStatus}
                    disabled={checking}
                    className="gap-2"
                  >
                    {checking ? (
                      <Loader2 className="h-4 w-4 animate-spin" />
                    ) : (
                      <RefreshCw className="h-4 w-4" />
                    )}
                    Check Status
                  </Button>
                )}
                
                <Button
                  variant={sessionData.status === 'completed' ? "default" : "outline"}
                  className="ml-auto"
                  onClick={handleClose}
                >
                  {sessionData.status === 'completed' ? 'Done' : 'Close'}
                </Button>
              </div>
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center py-8">
              <p className="text-sm text-muted-foreground">Failed to create payment session.</p>
              <Button onClick={createIOTASession} className="mt-4">
                Try Again
              </Button>
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default UBXRechargeDialog;
