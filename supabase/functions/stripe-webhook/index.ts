
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import Stripe from "https://esm.sh/stripe@14.21.0";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.7.1";

// This is needed to make this function public (no JWT verification)
// Use `supabase secrets set STRIPE_WEBHOOK_SECRET=your-webhook-secret` to set the secret

serve(async (req) => {
  const signature = req.headers.get("stripe-signature");
  const body = await req.text();
  const stripe = new Stripe(Deno.env.get("STRIPE_SECRET_KEY") || "", {
    apiVersion: "2023-10-16",
  });

  // Create a Supabase client
  const supabaseUrl = Deno.env.get("SUPABASE_URL") || "";
  const supabaseServiceKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY") || "";
  const supabase = createClient(supabaseUrl, supabaseServiceKey);

  let event;

  try {
    // Verify the webhook signature
    const webhookSecret = Deno.env.get("STRIPE_WEBHOOK_SECRET") || "";
    if (!webhookSecret) {
      throw new Error("STRIPE_WEBHOOK_SECRET is not set");
    }

    if (!signature) {
      throw new Error("stripe-signature header is missing");
    }

    event = stripe.webhooks.constructEvent(
      body,
      signature,
      webhookSecret
    );
  } catch (err) {
    console.error(`Webhook signature verification failed: ${err.message}`);
    return new Response(JSON.stringify({ error: err.message }), {
      status: 400,
      headers: { "Content-Type": "application/json" }
    });
  }

  try {
    // Handle specific event types
    switch (event.type) {
      case 'checkout.session.completed':
        await handleCheckoutCompleted(event.data.object, supabase);
        break;
      case 'payment_intent.succeeded':
        await handlePaymentSucceeded(event.data.object, supabase);
        break;
      case 'payment_method.attached':
        await handlePaymentMethodAttached(event.data.object, supabase);
        break;
      // Add other webhook events you want to handle
    }

    return new Response(JSON.stringify({ received: true }), {
      headers: { "Content-Type": "application/json" },
      status: 200
    });
  } catch (err) {
    console.error(`Error processing webhook: ${err.message}`);
    return new Response(JSON.stringify({ error: err.message }), {
      status: 500,
      headers: { "Content-Type": "application/json" }
    });
  }
});

async function handleCheckoutCompleted(session, supabase) {
  // Extract metadata
  const userId = session.metadata?.user_id;
  const metadata = session.metadata || {};
  
  console.log('Processing checkout session:', session.id);
  console.log('User ID:', userId);
  console.log('Metadata:', metadata);
  
  if (!userId) {
    throw new Error('User ID not found in session metadata');
  }

  // Record the payment in the database
  const { error } = await supabase.from('payment_orders').insert({
    user_id: userId,
    amount: session.amount_total,
    currency: session.currency,
    status: 'completed',
    price_fiat: session.amount_total / 100, // Convert cents to dollars
    payment_details: {
      stripe_session_id: session.id,
      payment_intent: session.payment_intent,
      customer: session.customer,
      metadata: session.metadata
    },
    external_order_id: session.id,
    payment_method: 'stripe',
    completed_at: new Date().toISOString()
  });

  if (error) {
    console.error('Error recording payment:', error);
    throw new Error('Failed to record payment');
  }

  // Handle specific payment types based on metadata
  if (metadata.payment_type === 'credits') {
    await creditUserAccount(userId, metadata, supabase);
  } else if (metadata.payment_type === 'subscription') {
    await updateUserSubscription(userId, metadata, supabase);
  } else if (metadata.payment_type === 'booking') {
    await updateBookingStatus(metadata.booking_id, supabase);
  }
}

async function handlePaymentSucceeded(paymentIntent, supabase) {
  console.log('Payment succeeded:', paymentIntent.id);
  // Additional logic for payment intents
}

async function handlePaymentMethodAttached(paymentMethod, supabase) {
  console.log('Payment method attached:', paymentMethod.id);
  // Logic for saving payment method
}

async function creditUserAccount(userId, metadata, supabase) {
  const amount = parseInt(metadata.credit_amount || '0', 10);
  if (!amount) return;

  // Add credits to the user's profile
  const { error } = await supabase.rpc('increment_balance', {
    user_id: userId,
    amount: amount
  });

  if (error) {
    console.error('Error adding credits:', error);
    throw new Error('Failed to add credits to user account');
  }
}

async function updateUserSubscription(userId, metadata, supabase) {
  const { error } = await supabase.from('subscriptions').insert({
    subscriber_id: userId,
    creator_id: metadata.creator_id,
    status: 'active',
    amount: parseFloat(metadata.amount || '0'),
    price_paid: parseFloat(metadata.price_paid || '0'),
    started_at: new Date().toISOString(),
    ends_at: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString(), // 30 days from now
    tier: metadata.tier || 'standard'
  });

  if (error) {
    console.error('Error updating subscription:', error);
    throw new Error('Failed to update user subscription');
  }
}

async function updateBookingStatus(bookingId, supabase) {
  if (!bookingId) return;
  
  const { error } = await supabase
    .from('bookings')
    .update({ status: 'confirmed' })
    .eq('id', bookingId);

  if (error) {
    console.error('Error updating booking status:', error);
    throw new Error('Failed to update booking status');
  }
}
