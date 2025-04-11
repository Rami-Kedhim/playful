
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.7.1";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

interface RequestBody {
  user_id: string;
}

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    // Get the user_id from the request body
    const { user_id } = await req.json() as RequestBody;
    
    if (!user_id) {
      return new Response(
        JSON.stringify({ error: 'User ID is required' }),
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
    
    // Generate a unique IOTA address for this session
    // In a real implementation, this would call an IOTA node API to get a new address
    const mockIotaAddress = `iota1${crypto.randomUUID().replace(/-/g, '').substring(0, 56)}`;
    
    // Create a recharge session using the provided function in the database
    const { data, error } = await supabaseClient.rpc(
      'create_iota_recharge_session',
      {
        p_user_id: user_id,
        p_address: mockIotaAddress
      }
    );
    
    if (error) {
      console.error('Error creating IOTA session:', error);
      
      return new Response(
        JSON.stringify({ error: 'Failed to create IOTA recharge session' }),
        { 
          status: 500, 
          headers: { ...corsHeaders, 'Content-Type': 'application/json' }
        }
      );
    }
    
    // Get the created session details
    const { data: sessionData, error: fetchError } = await supabaseClient
      .from('iota_recharge_sessions')
      .select('*')
      .eq('id', data)
      .single();
    
    if (fetchError) {
      console.error('Error fetching session details:', fetchError);
      
      return new Response(
        JSON.stringify({ error: 'Created session but failed to fetch details' }),
        { 
          status: 500, 
          headers: { ...corsHeaders, 'Content-Type': 'application/json' }
        }
      );
    }
    
    return new Response(
      JSON.stringify(sessionData),
      { 
        status: 200, 
        headers: { ...corsHeaders, 'Content-Type': 'application/json' }
      }
    );
    
  } catch (error) {
    console.error('Error in create-iota-session function:', error);
    
    return new Response(
      JSON.stringify({ error: 'Internal server error', details: error.message }),
      { 
        status: 500, 
        headers: { ...corsHeaders, 'Content-Type': 'application/json' }
      }
    );
  }
});
