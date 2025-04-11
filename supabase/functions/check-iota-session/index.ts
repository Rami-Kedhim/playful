
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.7.1";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

interface RequestBody {
  session_id: string;
}

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    // Get the session_id from the request body
    const { session_id } = await req.json() as RequestBody;
    
    if (!session_id) {
      return new Response(
        JSON.stringify({ error: 'Session ID is required' }),
        { 
          status: 400, 
          headers: { ...corsHeaders, 'Content-Type': 'application/json' }
        }
      );
    }
    
    // Initialize Supabase client
    const supabaseClient = createClient(
      Deno.env.get('SUPABASE_URL') ?? '',
      Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') ?? '',
    );
    
    // Get the session details
    const { data: sessionData, error: fetchError } = await supabaseClient
      .from('iota_recharge_sessions')
      .select('*')
      .eq('id', session_id)
      .single();
    
    if (fetchError) {
      console.error('Error fetching session details:', fetchError);
      
      return new Response(
        JSON.stringify({ error: 'Failed to fetch session details' }),
        { 
          status: 404, 
          headers: { ...corsHeaders, 'Content-Type': 'application/json' }
        }
      );
    }
    
    // In a real implementation, we'd query the IOTA node to check for incoming transactions
    // For this implementation, we'll randomly simulate a completed transaction around 10% of the time
    if (sessionData.status === 'pending' && Math.random() < 0.1) {
      // Generate a mock amount of IOTA and a transaction hash
      const mockAmount = parseFloat((Math.random() * 5 + 1).toFixed(2)); // 1-6 MIOTA
      const mockTransactionHash = `IOTA${crypto.randomUUID().replace(/-/g, '').toUpperCase()}`;
      
      // Process the transaction using the database function
      const { error: processError } = await supabaseClient.rpc(
        'process_iota_transaction',
        {
          p_address: sessionData.address,
          p_amount: mockAmount,
          p_transaction_hash: mockTransactionHash
        }
      );
      
      if (processError) {
        console.error('Error processing transaction:', processError);
      } else {
        // If successful, fetch the updated session
        const { data: updatedSession, error: updateError } = await supabaseClient
          .from('iota_recharge_sessions')
          .select('*')
          .eq('id', session_id)
          .single();
        
        if (!updateError) {
          return new Response(
            JSON.stringify(updatedSession),
            { 
              status: 200, 
              headers: { ...corsHeaders, 'Content-Type': 'application/json' }
            }
          );
        }
      }
    }
    
    // Return the current session data
    return new Response(
      JSON.stringify(sessionData),
      { 
        status: 200, 
        headers: { ...corsHeaders, 'Content-Type': 'application/json' }
      }
    );
    
  } catch (error) {
    console.error('Error in check-iota-session function:', error);
    
    return new Response(
      JSON.stringify({ error: 'Internal server error', details: error.message }),
      { 
        status: 500, 
        headers: { ...corsHeaders, 'Content-Type': 'application/json' }
      }
    );
  }
});
