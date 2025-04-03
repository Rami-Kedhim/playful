
import { toast } from "@/components/ui/use-toast";

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

// Function to simulate sending a transaction with a SOL payment
export const sendSolanaTransaction = async (
  fromWallet: string,
  amount: number,
  memo: string = ''
): Promise<{ success: boolean, transactionId: string | null }> => {
  // Since this would require a wallet adapter and signature in a real implementation,
  // we're simulating the transaction result for demonstration
  try {
    // Mock transaction processing delay
    toast({
      title: "Processing transaction",
      description: "Your SOL transaction is being processed.",
    });
    
    // Simulate blockchain delay
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    // Simulate success (in a real app, you'd verify transaction confirmation)
    const success = Math.random() > 0.1; // 90% success rate for demo
    
    if (success) {
      // Generate a fake transaction ID
      const txId = Array.from({ length: 64 }, () => 
        '0123456789abcdef'[Math.floor(Math.random() * 16)]
      ).join('');
      
      toast({
        title: "Transaction successful",
        description: `Your transaction has been confirmed.`,
      });
      
      return { success: true, transactionId: txId };
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

// Function to simulate a Lucoin purchase with SOL
export const purchaseLucoinsWithSol = async (
  packageId: string, 
  solAmount: number, 
  walletAddress: string
): Promise<{ success: boolean, transactionId: string | null }> => {
  try {
    // Status notification
    toast({
      title: "Purchase initiated",
      description: "Your Lucoin purchase is being processed. This may take a moment.",
    });
    
    // Step 1: Send the SOL transaction
    const { success, transactionId } = await sendSolanaTransaction(
      walletAddress,
      solAmount,
      `Purchase Lucoins Package: ${packageId}`
    );
    
    if (!success) {
      throw new Error("Could not complete SOL transaction");
    }
    
    // Status update
    toast({
      title: "Payment confirmed",
      description: "Your SOL payment has been confirmed. Adding Lucoins to your account...",
    });
    
    // Simulate processing delay
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    return { success: true, transactionId };
  } catch (error: any) {
    console.error('Error purchasing Lucoins with SOL:', error);
    toast({
      title: "Purchase failed",
      description: error.message || "There was an error processing your payment",
      variant: "destructive",
    });
    return { success: false, transactionId: null };
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

// Function to get transaction details
export const getSolanaTransactionDetails = async (transactionId: string): Promise<any> => {
  try {
    const response = await fetch(SOLANA_RPC_URL, {
      method: 'POST',
      headers,
      body: JSON.stringify({
        jsonrpc: '2.0',
        id: 1,
        method: 'getTransaction',
        params: [transactionId, { encoding: 'json', maxSupportedTransactionVersion: 0 }]
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
