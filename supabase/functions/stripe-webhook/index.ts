
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.49.4";
import Stripe from "https://esm.sh/stripe@14.21.0?target=deno";

// Define CORS headers
const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

const stripe = new Stripe(Deno.env.get('STRIPE_SECRET_KEY') || '', {
  apiVersion: '2023-10-16',
});

serve(async (req: Request) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response(null, {
      headers: corsHeaders,
    });
  }

  try {
    // Get the stripe signature from the request header
    const signature = req.headers.get('stripe-signature');
    
    if (!signature) {
      return new Response(
        JSON.stringify({ error: 'Unauthorized', message: 'Missing stripe signature' }),
        { status: 401, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    // Get the raw body as text
    const body = await req.text();
    
    // Verify the event using the signature and the webhook secret
    let event;
    try {
      event = stripe.webhooks.constructEvent(
        body,
        signature,
        Deno.env.get('STRIPE_WEBHOOK_SECRET') || ''
      );
    } catch (err) {
      console.error(`Webhook signature verification failed: ${err.message}`);
      return new Response(
        JSON.stringify({ error: 'Bad Request', message: 'Invalid signature' }),
        { status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    // Create Supabase client (with service role to bypass RLS)
    const supabase = createClient(
      Deno.env.get('SUPABASE_URL') ?? '',
      Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') ?? '',
      {
        auth: { persistSession: false }
      }
    );

    // Handle the event
    if (event.type === 'checkout.session.completed') {
      const session = event.data.object;
      
      // Verify the payment was successful
      if (session.payment_status === 'paid') {
        const userId = session.client_reference_id;
        const sessionId = session.id;
        const lucoins = session.metadata?.lucoins ? parseInt(session.metadata.lucoins) : 0;
        const bonus = session.metadata?.bonus ? parseInt(session.metadata.bonus) : 0;
        const totalAmount = lucoins + bonus;
        
        // Update payment order status
        const { error: orderError } = await supabase
          .from('payment_orders')
          .update({
            status: 'confirmed',
            completed_at: new Date().toISOString()
          })
          .eq('external_order_id', sessionId);
        
        if (orderError) {
          console.error('Error updating payment order:', orderError);
          throw new Error('Failed to update payment order');
        }

        // Add funds to user's wallet using the transaction function
        const { data: txData, error: txError } = await supabase.rpc(
          'process_lucoin_transaction',
          {
            p_user_id: userId,
            p_amount: totalAmount,
            p_transaction_type: 'recharge',
            p_description: `Purchase of ${lucoins} Lucoins${bonus > 0 ? ` + ${bonus} bonus` : ''}`,
            p_metadata: {
              payment_processor: 'stripe',
              checkout_session_id: sessionId,
              payment_amount: session.amount_total / 100
            }
          }
        );

        if (txError) {
          console.error('Error processing transaction:', txError);
          throw new Error('Failed to process transaction');
        }

        // TODO: Integrate with Solana blockchain via Chainstack to mint tokens
        // This would be implemented in a separate function or here
      }
    }

    // Return a 200 response to acknowledge receipt of the event
    return new Response(JSON.stringify({ received: true }), {
      headers: { ...corsHeaders, "Content-Type": "application/json" }
    });
  } catch (error) {
    console.error('Error in webhook handler:', error);
    
    return new Response(
      JSON.stringify({ 
        error: 'Internal Server Error', 
        message: error.message || 'An unknown error occurred'
      }),
      { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  }
});
