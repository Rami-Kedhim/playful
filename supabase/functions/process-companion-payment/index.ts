
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.7.1";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

interface PaymentRequest {
  user_id: string;
  companion_id: string;
  content_type: string;
  amount: number;
}

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    // Get request body
    const { user_id, companion_id, content_type, amount } = await req.json() as PaymentRequest;
    
    if (!user_id || !companion_id || !content_type || !amount) {
      return new Response(
        JSON.stringify({ error: 'Missing required fields' }),
        { 
          status: 400, 
          headers: { ...corsHeaders, 'Content-Type': 'application/json' }
        }
      );
    }
    
    // Initialize Supabase client
    const supabaseClient = createClient(
      // Supabase API URL - uses the SUPABASE_URL environment variable
      Deno.env.get('SUPABASE_URL') ?? '',
      // Supabase API SERVICE ROLE KEY - uses the SUPABASE_SERVICE_ROLE_KEY environment variable
      Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') ?? '',
    );
    
    // 1. Check user's Lucoin balance
    const { data: userWallet, error: walletError } = await supabaseClient
      .from('lucoin_wallets')
      .select('balance')
      .eq('user_id', user_id)
      .single();
    
    if (walletError || !userWallet) {
      return new Response(
        JSON.stringify({ error: 'User wallet not found', details: walletError }),
        { 
          status: 404, 
          headers: { ...corsHeaders, 'Content-Type': 'application/json' }
        }
      );
    }
    
    // Check if user has sufficient balance
    if (userWallet.balance < amount) {
      return new Response(
        JSON.stringify({ error: 'Insufficient balance', current_balance: userWallet.balance, required: amount }),
        { 
          status: 400, 
          headers: { ...corsHeaders, 'Content-Type': 'application/json' }
        }
      );
    }
    
    // 2. Deduct Lucoins from user's wallet
    const { error: updateError } = await supabaseClient
      .from('lucoin_wallets')
      .update({ balance: userWallet.balance - amount })
      .eq('user_id', user_id);
    
    if (updateError) {
      return new Response(
        JSON.stringify({ error: 'Failed to update wallet balance', details: updateError }),
        { 
          status: 500, 
          headers: { ...corsHeaders, 'Content-Type': 'application/json' }
        }
      );
    }
    
    // 3. Record the transaction in lucoin_transactions
    const { error: transactionError } = await supabaseClient
      .from('lucoin_transactions')
      .insert({
        user_id,
        amount: -amount, // Negative amount for spending
        transaction_type: 'ai_companion_content',
        description: `Purchased ${content_type} from companion ${companion_id}`,
        metadata: {
          companion_id,
          content_type
        }
      });
    
    if (transactionError) {
      console.error('Error recording transaction:', transactionError);
      // Note: We don't return an error here since the payment was already processed
    }
    
    // 4. Record companion interaction in companion_interactions (optional)
    try {
      await supabaseClient
        .from('companion_interactions')
        .insert({
          user_id,
          companion_id,
          interaction_type: 'premium_content',
          amount_paid: amount,
          content_type
        });
    } catch (error) {
      console.error('Error recording companion interaction:', error);
      // Don't fail the request for this
    }
    
    // 5. Return success response
    return new Response(
      JSON.stringify({ 
        success: true, 
        message: 'Payment processed successfully',
        new_balance: userWallet.balance - amount
      }),
      { 
        status: 200, 
        headers: { ...corsHeaders, 'Content-Type': 'application/json' }
      }
    );
    
  } catch (error) {
    console.error('Error processing payment:', error);
    
    return new Response(
      JSON.stringify({ error: 'Internal server error', details: error.message }),
      { 
        status: 500, 
        headers: { ...corsHeaders, 'Content-Type': 'application/json' }
      }
    );
  }
});
