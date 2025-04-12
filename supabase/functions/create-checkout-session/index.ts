
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.7.1";
import Stripe from "https://esm.sh/stripe@14.21.0";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const supabase = createClient(
      Deno.env.get('SUPABASE_URL') ?? '',
      Deno.env.get('SUPABASE_ANON_KEY') ?? '',
      {
        global: {
          headers: { Authorization: req.headers.get('Authorization')! },
        },
      }
    );

    // Get the current user
    const {
      data: { user },
      error: userError,
    } = await supabase.auth.getUser();

    if (userError || !user) {
      throw new Error('Unauthorized');
    }

    // Get request data
    const { priceId, returnUrl, productData } = await req.json();

    if (!priceId && !productData) {
      throw new Error('Missing price ID or product data');
    }

    // Initialize Stripe
    const stripe = new Stripe(Deno.env.get('STRIPE_SECRET_KEY') || '', {
      apiVersion: '2023-10-16',
    });

    // Create checkout session
    let session;

    if (priceId) {
      // Use existing price
      session = await stripe.checkout.sessions.create({
        customer_email: user.email,
        line_items: [
          {
            price: priceId,
            quantity: 1,
          },
        ],
        mode: 'payment',
        success_url: `${returnUrl || req.headers.get('origin')}?success=true&session_id={CHECKOUT_SESSION_ID}`,
        cancel_url: `${returnUrl || req.headers.get('origin')}?canceled=true`,
        metadata: {
          user_id: user.id,
        },
      });
    } else {
      // Create a one-time product/price
      session = await stripe.checkout.sessions.create({
        customer_email: user.email,
        line_items: [
          {
            price_data: {
              currency: 'usd',
              product_data: {
                name: productData.name,
                description: productData.description || undefined,
                images: productData.images || undefined,
              },
              unit_amount: productData.amount, // in cents
            },
            quantity: 1,
          },
        ],
        mode: 'payment',
        success_url: `${returnUrl || req.headers.get('origin')}?success=true&session_id={CHECKOUT_SESSION_ID}`,
        cancel_url: `${returnUrl || req.headers.get('origin')}?canceled=true`,
        metadata: {
          user_id: user.id,
          ...productData.metadata,
        },
      });
    }

    return new Response(JSON.stringify({ url: session.url }), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      status: 200,
    });
  } catch (error) {
    console.error(error);
    return new Response(JSON.stringify({ error: error.message }), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      status: 400,
    });
  }
});
