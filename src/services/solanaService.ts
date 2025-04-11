import { toast } from "@/components/ui/use-toast";
import { supabase } from '@/integrations/supabase/client';

// The Solana RPC endpoint from Chainstack
const SOLANA_RPC_URL = "https://solana-mainnet.core.chainstack.com";
const SOLANA_RPC_USERNAME = "confident-kilby";
const SOLANA_RPC_PASSWORD = "talcum-macaw-cure-manned-brink-decay";

// Base64 encode the username and password for Basic Auth
const credentials = btoa(`${SOLANA_RPC_USERNAME}:${SOLANA_RPC_PASSWORD}`);

// Headers for JSON RPC calls
const headers = {
  'Content-Type': 'application/json',
  'Authorization': `Basic ${credentials}`
};

// Function to get SOL balance for a wallet address
export const getSolanaBalance = async (walletAddress: string): Promise<number> => {
  try {
    const response = await fetch(SOLANA_RPC_URL, {
      method: 'POST',
      headers,
      body: JSON.stringify({
        jsonrpc: '2.0',
        id: 1,
        method: 'getBalance',
        params: [walletAddress]
      })
    });

    if (!response.ok) {
      throw new Error(`Network error: ${response.status} ${response.statusText}`);
    }

    const data = await response.json();
    
    if (data.error) {
      console.error('Error getting SOL balance:', data.error);
      toast({
        title: "Error retrieving balance",
        description: data.error.message || "Could not fetch your SOL balance",
        variant: "destructive",
      });
      return 0;
    }
    
    // SOL balance is returned in lamports (1 SOL = 1,000,000,000 lamports)
    return data.result.value / 1000000000;
  } catch (error: any) {
    console.error('Error getting SOL balance:', error);
    toast({
      title: "Connection error",
      description: error.message || "Failed to connect to Solana network",
      variant: "destructive",
    });
    return 0;
  }
};

// Function to get current SOL/USD price using CoinGecko API
export const getSolanaPrice = async (): Promise<number> => {
  try {
    const response = await fetch('https://api.coingecko.com/api/v3/simple/price?ids=solana&vs_currencies=usd', {
      method: 'GET',
      headers: {
        'Accept': 'application/json',
      }
    });

    if (!response.ok) {
      throw new Error(`Network error: ${response.status} ${response.statusText}`);
    }

    const data = await response.json();
    return data.solana.usd;
  } catch (error: any) {
    console.error('Error getting SOL price:', error);
    // Fallback to a placeholder price
    return 20.5;
  }
};

// Calculate the USD value of Solana
export const calculateSolanaUsdValue = (solBalance: number, solPrice: number): number => {
  return solBalance * solPrice;
};

// Function to send UBX tokens to the user's account after a successful Solana payment
export const processUbxPurchase = async (
  userId: string,
  packageId: string,
  amount: number
): Promise<{ success: boolean, message: string, ubxAmount?: number }> => {
  try {
    const { data, error } = await supabase.functions.invoke('process-ubx-transaction', {
      body: {
        user_id: userId,
        amount: amount, // Amount of UBX to credit
        transaction_type: 'purchase',
        description: `Purchase of ${amount} UBX tokens`,
        metadata: { 
          package_id: packageId,
          source: 'solana'
        }
      }
    });
    
    if (error) throw new Error(error.message);
    
    return {
      success: true,
      message: `Successfully purchased ${amount} UBX tokens`,
      ubxAmount: amount
    };
  } catch (error: any) {
    console.error('Error processing UBX purchase:', error);
    return {
      success: false,
      message: error.message || 'Failed to process your purchase'
    };
  }
};

// Add missing function for purchasing Lucoins with Solana
export const purchaseLucoinsWithSol = async (
  packageId: string,
  solAmount: number,
  walletAddress: string
): Promise<{ success: boolean, transactionId: string | null }> => {
  try {
    // Simulate transaction processing delay
    toast({
      title: "Processing transaction",
      description: "Your SOL transaction is being processed.",
    });
    
    // Simulate blockchain delay
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    // Simulate success (90% success rate for demo)
    const success = Math.random() > 0.1;
    
    if (success) {
      // Generate a fake transaction ID
      const transactionId = Array.from({ length: 64 }, () => 
        '0123456789abcdef'[Math.floor(Math.random() * 16)]
      ).join('');
      
      toast({
        title: "Transaction successful",
        description: `Your transaction has been confirmed.`,
      });
      
      return { success: true, transactionId };
    } else {
      throw new Error("Transaction could not be confirmed");
    }
  } catch (error: any) {
    console.error('Error sending SOL transaction:', error);
    toast({
      title: "Transaction failed",
      description: error.message || "There was an error processing your transaction",
      variant: "destructive",
    });
    return { success: false, transactionId: null };
  }
};

// Add the missing getSolanaTransactionDetails function
export const getSolanaTransactionDetails = async (signature: string): Promise<any> => {
  try {
    const response = await fetch(SOLANA_RPC_URL, {
      method: 'POST',
      headers,
      body: JSON.stringify({
        jsonrpc: '2.0',
        id: 1,
        method: 'getTransaction',
        params: [
          signature,
          { encoding: 'json', maxSupportedTransactionVersion: 0 }
        ]
      })
    });

    if (!response.ok) {
      throw new Error(`Network error: ${response.status} ${response.statusText}`);
    }

    const data = await response.json();
    
    if (data.error) {
      console.error('Error getting transaction details:', data.error);
      return null;
    }
    
    return data.result;
  } catch (error: any) {
    console.error('Error getting transaction details:', error);
    return null;
  }
};

// Mock function to simulate sending a Solana transaction
// In production, this would use a real wallet adapter to create and send transactions
export const simulateSolanaTransaction = async (
  amount: number,
  memo: string = ''
): Promise<{ success: boolean, txId: string | null }> => {
  try {
    // Simulate transaction processing delay
    toast({
      title: "Processing transaction",
      description: "Your SOL transaction is being processed.",
    });
    
    // Simulate blockchain delay
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    // Simulate success (90% success rate for demo)
    const success = Math.random() > 0.1;
    
    if (success) {
      // Generate a fake transaction ID
      const txId = Array.from({ length: 64 }, () => 
        '0123456789abcdef'[Math.floor(Math.random() * 16)]
      ).join('');
      
      toast({
        title: "Transaction successful",
        description: `Your transaction has been confirmed.`,
      });
      
      return { success: true, txId };
    } else {
      throw new Error("Transaction could not be confirmed");
    }
  } catch (error: any) {
    console.error('Error sending SOL transaction:', error);
    toast({
      title: "Transaction failed",
      description: error.message || "There was an error processing your transaction",
      variant: "destructive",
    });
    return { success: false, txId: null };
  }
};

// Function to get transaction history for a wallet address
export const getSolanaTransactionHistory = async (walletAddress: string, limit: number = 10): Promise<any[]> => {
  try {
    const response = await fetch(SOLANA_RPC_URL, {
      method: 'POST',
      headers,
      body: JSON.stringify({
        jsonrpc: '2.0',
        id: 1,
        method: 'getSignaturesForAddress',
        params: [walletAddress, { limit }]
      })
    });

    if (!response.ok) {
      throw new Error(`Network error: ${response.status} ${response.statusText}`);
    }

    const data = await response.json();
    
    if (data.error) {
      console.error('Error getting transaction history:', data.error);
      return [];
    }
    
    return data.result || [];
  } catch (error: any) {
    console.error('Error getting transaction history:', error);
    return [];
  }
};
