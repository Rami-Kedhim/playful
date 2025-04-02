import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.49.4";
import * as web3 from "https://esm.sh/@solana/web3.js@1.87.6";

// Define CORS headers
const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

serve(async (req: Request) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response(null, {
      headers: corsHeaders,
    });
  }

  try {
    // Create Supabase admin client (using service role to bypass RLS)
    const supabase = createClient(
      Deno.env.get('SUPABASE_URL') ?? '',
      Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') ?? '',
      {
        auth: { persistSession: false }
      }
    );

    // Parse request body
    const { userId, transactionId, action } = await req.json();
    
    if (!userId || !transactionId || !action) {
      return new Response(
        JSON.stringify({ error: 'Bad Request', message: 'Missing required parameters' }),
        { status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    // Get transaction details
    const { data: transaction, error: txError } = await supabase
      .from('lucoin_transactions')
      .select('*')
      .eq('id', transactionId)
      .eq('user_id', userId)
      .single();
    
    if (txError || !transaction) {
      return new Response(
        JSON.stringify({ 
          error: 'Not Found', 
          message: 'Transaction not found',
          details: txError 
        }),
        { status: 404, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    // Connect to Solana through Chainstack
    const connection = new web3.Connection(
      Deno.env.get('CHAINSTACK_SOLANA_RPC_URL') || '',
      'confirmed'
    );

    // Convert secret key from base58 to Uint8Array
    const privateKeyBase58 = Deno.env.get('SOLANA_PRIVATE_KEY') || '';
    const secretKey = web3.Keypair.fromSecretKey(
      new Uint8Array(Buffer.from(privateKeyBase58, 'base58'))
    );

    // Get user's Solana wallet address or create one if it doesn't exist
    let { data: wallet, error: walletError } = await supabase
      .from('lucoin_wallets')
      .select('solana_wallet_address')
      .eq('user_id', userId)
      .single();
    
    if (walletError) {
      return new Response(
        JSON.stringify({ 
          error: 'Not Found', 
          message: 'Wallet not found',
          details: walletError 
        }),
        { status: 404, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    // Create a Solana wallet for the user if they don't have one already
    if (!wallet.solana_wallet_address) {
      const newKeypair = web3.Keypair.generate();
      wallet.solana_wallet_address = newKeypair.publicKey.toString();
      
      // Update the user's wallet with the new Solana address
      const { error: updateError } = await supabase
        .from('lucoin_wallets')
        .update({ solana_wallet_address: wallet.solana_wallet_address })
        .eq('user_id', userId);
      
      if (updateError) {
        return new Response(
          JSON.stringify({ 
            error: 'Internal Server Error', 
            message: 'Failed to update wallet',
            details: updateError 
          }),
          { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
        );
      }
    }

    // Perform the requested blockchain action
    let txHash = '';
    
    switch (action) {
      case 'mint': {
        // This is a simplified example. In a real implementation, you would:
        // 1. Call your Solana token contract to mint tokens to the user's wallet
        // 2. Track the transaction on the blockchain
        // For now, we'll simulate a successful mint
        
        // Example transaction that would transfer SOL (not actual token minting)
        // In production, this would be a call to your token contract's mint function
        const destinationPubkey = new web3.PublicKey(wallet.solana_wallet_address);
        const lamports = web3.LAMPORTS_PER_SOL * 0.001; // small amount for demo
        
        const transaction = new web3.Transaction().add(
          web3.SystemProgram.transfer({
            fromPubkey: secretKey.publicKey,
            toPubkey: destinationPubkey,
            lamports,
          }),
        );
        
        // Sign and send the transaction
        const signature = await web3.sendAndConfirmTransaction(
          connection,
          transaction,
          [secretKey],
        );
        
        txHash = signature;
        break;
      }
      
      // Other actions could be implemented here (withdraw, etc.)
      
      default:
        return new Response(
          JSON.stringify({ error: 'Bad Request', message: 'Invalid action' }),
          { status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" } }
        );
    }

    // Update the transaction record with the blockchain transaction hash
    const { error: updateTxError } = await supabase
      .from('lucoin_transactions')
      .update({ 
        blockchain_tx_hash: txHash,
        metadata: { 
          ...transaction.metadata,
          blockchain_processed: true,
          blockchain_processed_at: new Date().toISOString()
        }
      })
      .eq('id', transactionId);
    
    if (updateTxError) {
      return new Response(
        JSON.stringify({ 
          error: 'Internal Server Error', 
          message: 'Failed to update transaction',
          details: updateTxError 
        }),
        { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    // Return success response with transaction hash
    return new Response(
      JSON.stringify({ 
        success: true, 
        tx_hash: txHash,
        solana_address: wallet.solana_wallet_address
      }),
      { headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  } catch (error) {
    console.error('Error in Solana integration:', error);
    
    return new Response(
      JSON.stringify({ 
        error: 'Internal Server Error', 
        message: error.message || 'An unknown error occurred'
      }),
      { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  }
});
