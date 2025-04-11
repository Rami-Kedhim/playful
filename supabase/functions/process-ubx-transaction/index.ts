
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.7.1";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

interface TransactionRequest {
  user_id: string;
  amount: number;
  transaction_type: string;
  description?: string;
  metadata?: Record<string, any>;
}

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    // Get request body
    const { user_id, amount, transaction_type, description, metadata } = await req.json() as TransactionRequest;
    
    if (!user_id || amount === undefined || !transaction_type) {
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
    
    // Check if this is an AI avatar generation transaction (costs UBX)
    const isDebit = amount < 0 || transaction_type === 'ai_avatar';
    const processAmount = isDebit ? -Math.abs(amount) : Math.abs(amount);
    
    // 1. Check user's UBX balance if this is a debit transaction
    if (isDebit) {
      const { data: userProfile, error: profileError } = await supabaseClient
        .from('profiles')
        .select('ubx_balance')
        .eq('id', user_id)
        .single();
      
      if (profileError || !userProfile) {
        return new Response(
          JSON.stringify({ error: 'User profile not found', details: profileError }),
          { 
            status: 404, 
            headers: { ...corsHeaders, 'Content-Type': 'application/json' }
          }
        );
      }
      
      // Check if user has sufficient balance
      if (userProfile.ubx_balance < Math.abs(processAmount)) {
        return new Response(
          JSON.stringify({ 
            error: 'Insufficient balance', 
            current_balance: userProfile.ubx_balance, 
            required: Math.abs(processAmount) 
          }),
          { 
            status: 400, 
            headers: { ...corsHeaders, 'Content-Type': 'application/json' }
          }
        );
      }
    }
    
    // 2. Process the transaction (update profile balance)
    const { error: updateError } = await supabaseClient
      .from('profiles')
      .update({ 
        ubx_balance: supabaseClient.rpc('increment_balance', { 
          user_id, 
          amount: processAmount 
        })
      })
      .eq('id', user_id);
    
    if (updateError) {
      return new Response(
        JSON.stringify({ error: 'Failed to update balance', details: updateError }),
        { 
          status: 500, 
          headers: { ...corsHeaders, 'Content-Type': 'application/json' }
        }
      );
    }
    
    // 3. Record the transaction in ubx_transactions
    const { error: transactionError } = await supabaseClient
      .from('ubx_transactions')
      .insert({
        user_id,
        amount: processAmount,
        transaction_type,
        description: description || `${transaction_type} transaction`,
        metadata: metadata || {}
      });
    
    if (transactionError) {
      console.error('Error recording transaction:', transactionError);
      // Note: We don't return an error here since the payment was already processed
    }
    
    // 4. Get the updated balance
    const { data: updatedProfile } = await supabaseClient
      .from('profiles')
      .select('ubx_balance')
      .eq('id', user_id)
      .single();
    
    // 5. Return success response
    return new Response(
      JSON.stringify({ 
        success: true, 
        message: 'Transaction processed successfully',
        new_balance: updatedProfile?.ubx_balance || 0
      }),
      { 
        status: 200, 
        headers: { ...corsHeaders, 'Content-Type': 'application/json' }
      }
    );
    
  } catch (error) {
    console.error('Error processing transaction:', error);
    
    return new Response(
      JSON.stringify({ error: 'Internal server error', details: error.message }),
      { 
        status: 500, 
        headers: { ...corsHeaders, 'Content-Type': 'application/json' }
      }
    );
  }
});
