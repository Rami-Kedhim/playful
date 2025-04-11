
import React, { useState, useEffect } from 'react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { QRCode } from "react-qrcode-logo";
import { Copy, Shield, LoaderCircle, AlertTriangle } from "lucide-react";
import { useToast } from '@/components/ui/use-toast';
import { blockchainService, NETWORK_CONFIG } from '@/services/blockchainService';
import { useAuth } from '@/contexts/AuthContext';

export interface UBXRechargeDialogProps {
  open: boolean;
  onClose: () => void;
}

const UBXRechargeDialog: React.FC<UBXRechargeDialogProps> = ({ open, onClose }) => {
  const [activeTab, setActiveTab] = useState<'iota' | 'solana'>('iota');
  const [rechargeSession, setRechargeSession] = useState<any>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);
  const [checkingStatus, setCheckingStatus] = useState(false);
  const { toast } = useToast();
  const { user, refreshProfile } = useAuth();
  
  // Create IOTA session when dialog opens
  useEffect(() => {
    if (open) {
      createIOTASession();
    }
  }, [open]);

  // Check session status periodically
  useEffect(() => {
    let interval: NodeJS.Timeout | null = null;
    
    if (rechargeSession?.id) {
      interval = setInterval(() => {
        checkSessionStatus();
      }, 15000); // Check every 15 seconds
    }
    
    return () => {
      if (interval) clearInterval(interval);
    };
  }, [rechargeSession]);

  const createIOTASession = async () => {
    setLoading(true);
    setError(null);
    
    try {
      if (!user?.id) {
        throw new Error('User not authenticated');
      }
      
      const session = await blockchainService.createIOTARechargeSession(user.id);
      setRechargeSession(session);
    } catch (err: any) {
      console.error('Failed to create IOTA session:', err);
      setError('Failed to create recharge session. Please try again.');
      toast({
        title: "Session Creation Failed",
        description: err.message || "Could not create recharge session",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const checkSessionStatus = async () => {
    if (!rechargeSession?.id || checkingStatus) return;
    
    setCheckingStatus(true);
    try {
      const updatedSession = await blockchainService.checkIOTASessionStatus(rechargeSession.id);
      
      setRechargeSession(updatedSession);
      
      // If tokens were received, show success toast and refresh profile
      if (updatedSession.amount_received > 0 && updatedSession.ubx_credited > 0) {
        toast({
          title: "UBX Tokens Received!",
          description: `${updatedSession.ubx_credited} UBX credited to your account`,
          variant: "default",
        });
        
        // Refresh the user profile to update token balance
        refreshProfile();
        
        // Close the dialog after a successful transaction
        setTimeout(() => {
          onClose();
        }, 3000);
      }
    } catch (err: any) {
      console.error('Error checking session status:', err);
    } finally {
      setCheckingStatus(false);
    }
  };

  const handleCopyAddress = async () => {
    if (!rechargeSession?.address) return;
    
    try {
      await navigator.clipboard.writeText(rechargeSession.address);
      setCopied(true);
      toast({
        title: "Address Copied",
        description: "IOTA address copied to clipboard",
      });
      
      setTimeout(() => setCopied(false), 3000);
    } catch (err) {
      toast({
        title: "Copy Failed",
        description: "Failed to copy address to clipboard",
        variant: "destructive",
      });
    }
  };

  const resetSession = () => {
    createIOTASession();
  };

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Shield className="h-5 w-5 text-primary" />
            Recharge UBX with IOTA
          </DialogTitle>
          <DialogDescription>
            Add UBX tokens to your account using the {NETWORK_CONFIG.displayName} blockchain.
          </DialogDescription>
        </DialogHeader>
        
        <Tabs value={activeTab} onValueChange={(value) => setActiveTab(value as 'iota' | 'solana')}>
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="iota" className="flex items-center gap-1">
              <Shield className="h-4 w-4" />
              IOTA
            </TabsTrigger>
            <TabsTrigger value="solana" disabled className="flex items-center gap-1">
              Coming soon
            </TabsTrigger>
          </TabsList>
          
          <TabsContent value="iota" className="space-y-4 mt-4">
            {loading ? (
              <div className="flex flex-col items-center justify-center p-8 space-y-4">
                <LoaderCircle className="h-8 w-8 animate-spin text-primary" />
                <p className="text-center">Creating recharge session...</p>
              </div>
            ) : error ? (
              <div className="flex flex-col items-center justify-center p-8 space-y-4">
                <AlertTriangle className="h-8 w-8 text-destructive" />
                <p className="text-center text-destructive">{error}</p>
                <Button onClick={resetSession}>Try Again</Button>
              </div>
            ) : (
              <>
                <div className="rounded-lg border p-4">
                  <div className="space-y-3">
                    <div>
                      <p className="text-sm font-medium mb-1">Your unique deposit address:</p>
                      <div className="flex items-center gap-2">
                        <div className="bg-secondary p-2 rounded text-xs font-mono overflow-x-auto flex-1 whitespace-nowrap">
                          {rechargeSession?.address}
                        </div>
                        <Button 
                          variant="ghost" 
                          size="icon"
                          className="flex-shrink-0"
                          onClick={handleCopyAddress}
                        >
                          <Copy className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                    
                    <div className="flex justify-center pt-2">
                      {rechargeSession?.address ? (
                        <div className="bg-white p-2 rounded-lg">
                          <QRCode
                            value={rechargeSession.address}
                            size={180}
                            qrStyle="dots"
                            eyeRadius={5}
                          />
                        </div>
                      ) : null}
                    </div>
                    
                    <div className="text-center">
                      <p className="text-sm">
                        Scan this QR code or copy the address to your IOTA wallet
                      </p>
                    </div>
                  </div>
                </div>
                
                <div className="rounded-lg bg-background/50 border p-4 space-y-3">
                  <h4 className="text-sm font-medium">Transaction Details</h4>
                  
                  <div className="grid grid-cols-2 gap-2 text-sm">
                    <div className="text-muted-foreground">Minimum Amount:</div>
                    <div>{NETWORK_CONFIG.minRecharge} MIOTA</div>
                    
                    <div className="text-muted-foreground">Exchange Rate:</div>
                    <div>1 MIOTA = {NETWORK_CONFIG.conversionRate} UBX</div>
                    
                    <div className="text-muted-foreground">Network Fee:</div>
                    <div>0.00 MIOTA (Feeless)</div>
                    
                    <div className="text-muted-foreground">Status:</div>
                    <div className="flex items-center gap-1">
                      {rechargeSession?.amount_received > 0 ? (
                        <>
                          <span className="w-2 h-2 rounded-full bg-green-500"></span>
                          <span>Received {rechargeSession.amount_received} MIOTA</span>
                        </>
                      ) : checkingStatus ? (
                        <>
                          <LoaderCircle className="h-3 w-3 animate-spin" />
                          <span>Checking...</span>
                        </>
                      ) : (
                        <>
                          <span className="w-2 h-2 rounded-full bg-yellow-500"></span>
                          <span>Awaiting payment</span>
                        </>
                      )}
                    </div>
                    
                    {rechargeSession?.ubx_credited > 0 && (
                      <>
                        <div className="text-muted-foreground">UBX Credited:</div>
                        <div className="font-medium">{rechargeSession.ubx_credited} UBX</div>
                      </>
                    )}
                  </div>
                </div>
              </>
            )}
          </TabsContent>
          
          <TabsContent value="solana">
            <div className="text-center p-8">
              <p>Solana integration coming soon!</p>
            </div>
          </TabsContent>
        </Tabs>
        
        <DialogFooter className="sm:justify-between">
          <div className="text-xs text-muted-foreground flex items-center gap-1">
            <Shield className="h-3 w-3" />
            Private & Secure
          </div>
          <Button 
            variant="outline" 
            onClick={onClose}
          >
            Close
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default UBXRechargeDialog;
