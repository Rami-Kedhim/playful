
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.49.4";

// Define CORS headers
const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

// Supabase client setup function
const getSupabaseClient = (req: Request) => {
  const authHeader = req.headers.get('Authorization');
  
  return createClient(
    Deno.env.get('SUPABASE_URL') ?? '',
    Deno.env.get('SUPABASE_ANON_KEY') ?? '',
    {
      global: { headers: { Authorization: authHeader ?? '' } },
      auth: { persistSession: false }
    }
  );
};

serve(async (req: Request) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response(null, {
      headers: corsHeaders,
    });
  }

  // Get the URL path
  const url = new URL(req.url);
  const path = url.pathname.split('/').pop();

  try {
    const supabase = getSupabaseClient(req);
    
    // Get user from auth header
    const { data: { user }, error: userError } = await supabase.auth.getUser();
    
    if (userError || !user) {
      return new Response(
        JSON.stringify({ error: 'Unauthorized', message: 'User not authenticated' }),
        { status: 401, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    // Handle different endpoints
    switch (path) {
      case 'balance':
        // Get wallet balance
        const { data: wallet, error: walletError } = await supabase
          .from('lucoin_wallets')
          .select('balance, solana_wallet_address')
          .eq('user_id', user.id)
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

        return new Response(
          JSON.stringify(wallet),
          { headers: { ...corsHeaders, "Content-Type": "application/json" } }
        );

      case 'history':
        // Get transaction history with pagination
        const page = parseInt(url.searchParams.get('page') || '1');
        const pageSize = parseInt(url.searchParams.get('pageSize') || '10');
        const offset = (page - 1) * pageSize;

        const { data: transactions, error: txError, count } = await supabase
          .from('lucoin_transactions')
          .select('*', { count: 'exact' })
          .eq('user_id', user.id)
          .order('created_at', { ascending: false })
          .range(offset, offset + pageSize - 1);

        if (txError) {
          return new Response(
            JSON.stringify({ 
              error: 'Internal Server Error', 
              message: 'Failed to fetch transaction history',
              details: txError 
            }),
            { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
          );
        }

        return new Response(
          JSON.stringify({
            transactions,
            pagination: {
              page,
              pageSize,
              total: count,
              totalPages: Math.ceil(count / pageSize)
            }
          }),
          { headers: { ...corsHeaders, "Content-Type": "application/json" } }
        );

      case 'spend':
        // Process a spending transaction
        if (req.method !== 'POST') {
          return new Response(
            JSON.stringify({ error: 'Method Not Allowed', message: 'Only POST method is allowed' }),
            { status: 405, headers: { ...corsHeaders, "Content-Type": "application/json" } }
          );
        }

        const { amount, description, metadata } = await req.json();
        
        if (!amount || amount <= 0) {
          return new Response(
            JSON.stringify({ error: 'Bad Request', message: 'Invalid amount' }),
            { status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" } }
          );
        }

        // Process the transaction with negative amount (spending)
        const { data: spendData, error: spendError } = await supabase.rpc(
          'process_lucoin_transaction',
          {
            p_user_id: user.id,
            p_amount: -amount, // Negative amount for spending
            p_transaction_type: 'spend',
            p_description: description || 'Spending Lucoins',
            p_metadata: metadata || {}
          }
        );

        if (spendError) {
          return new Response(
            JSON.stringify({ 
              error: 'Internal Server Error', 
              message: spendError.message || 'Failed to process transaction',
              details: spendError 
            }),
            { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
          );
        }

        return new Response(
          JSON.stringify({ 
            success: true, 
            transaction_id: spendData 
          }),
          { headers: { ...corsHeaders, "Content-Type": "application/json" } }
        );

      case 'packages':
        // Get available lucoin packages
        const { data: packages, error: packagesError } = await supabase
          .from('lucoin_packages')
          .select('*')
          .eq('is_active', true)
          .order('amount', { ascending: true });

        if (packagesError) {
          return new Response(
            JSON.stringify({ 
              error: 'Internal Server Error', 
              message: 'Failed to fetch packages',
              details: packagesError 
            }),
            { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
          );
        }

        return new Response(
          JSON.stringify(packages),
          { headers: { ...corsHeaders, "Content-Type": "application/json" } }
        );

      default:
        return new Response(
          JSON.stringify({ error: 'Not Found', message: 'Endpoint not found' }),
          { status: 404, headers: { ...corsHeaders, "Content-Type": "application/json" } }
        );
    }
  } catch (error) {
    console.error('Error in wallet API:', error);
    
    return new Response(
      JSON.stringify({ 
        error: 'Internal Server Error', 
        message: error.message || 'An unknown error occurred'
      }),
      { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  }
});
