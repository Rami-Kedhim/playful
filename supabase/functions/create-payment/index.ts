
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.49.4";
import Stripe from "https://esm.sh/stripe@14.21.0?target=deno";

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

    // Parse request body
    const { packageId } = await req.json();
    
    if (!packageId) {
      return new Response(
        JSON.stringify({ error: 'Bad Request', message: 'Package ID is required' }),
        { status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    // Get package details from database
    const { data: packageData, error: packageError } = await supabase
      .from('lucoin_packages')
      .select('*')
      .eq('id', packageId)
      .single();
    
    if (packageError || !packageData) {
      return new Response(
        JSON.stringify({ 
          error: 'Not Found', 
          message: 'Package not found or inactive',
          details: packageError 
        }),
        { status: 404, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    // Initialize Stripe
    const stripe = new Stripe(Deno.env.get('STRIPE_SECRET_KEY') || '', {
      apiVersion: '2023-10-16',
    });

    // Create a payment intent/session using Stripe
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      line_items: [
        {
          price_data: {
            currency: packageData.currency.toLowerCase(),
            product_data: {
              name: `${packageData.amount} Lucoins`,
              description: `Purchase ${packageData.amount} Lucoins${packageData.bonus_amount > 0 ? ` + ${packageData.bonus_amount} bonus` : ''}`,
            },
            unit_amount: Math.round(packageData.price * 100), // Convert to cents
          },
          quantity: 1,
        },
      ],
      mode: 'payment',
      success_url: `${req.headers.get('origin')}/wallet/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${req.headers.get('origin')}/wallet/cancel`,
      client_reference_id: user.id,
      metadata: {
        packageId: packageData.id,
        lucoins: packageData.amount,
        bonus: packageData.bonus_amount || 0
      },
    });

    // Create a payment order record in the database
    const { data: orderData, error: orderError } = await supabase
      .from('payment_orders')
      .insert([{
        user_id: user.id,
        external_order_id: session.id,
        amount: packageData.amount + (packageData.bonus_amount || 0),
        price_fiat: packageData.price,
        currency: packageData.currency,
        payment_details: {
          package_id: packageData.id,
          package_name: packageData.name,
          checkout_session_id: session.id,
        }
      }])
      .select()
      .single();

    if (orderError) {
      console.error('Error creating payment order:', orderError);
      
      return new Response(
        JSON.stringify({ 
          error: 'Internal Server Error', 
          message: 'Failed to create payment order',
          details: orderError 
        }),
        { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    // Return the Stripe checkout URL
    return new Response(
      JSON.stringify({ 
        url: session.url,
        orderId: orderData.id
      }),
      { headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  } catch (error) {
    console.error('Error in create-payment function:', error);
    
    return new Response(
      JSON.stringify({ 
        error: 'Internal Server Error', 
        message: error.message
      }),
      { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  }
});
