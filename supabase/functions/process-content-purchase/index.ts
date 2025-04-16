
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.43.3";

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
    // Create Supabase client with admin privileges
    const supabaseClient = createClient(
      // Replace with these with your project's URL and service role key
      Deno.env.get('SUPABASE_URL') ?? '',
      Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') ?? ''
    );

    // Get request body
    const { userId, contentId, price } = await req.json();

    if (!userId || !contentId || price === undefined) {
      return new Response(
        JSON.stringify({ 
          success: false, 
          message: "Missing required parameters" 
        }),
        { headers: { ...corsHeaders, 'Content-Type': 'application/json' }, status: 400 }
      );
    }

    // Start a database transaction
    const { data: walletData, error: walletError } = await supabaseClient
      .from('wallets')
      .select('id, balance')
      .eq('user_id', userId)
      .single();

    if (walletError) {
      throw new Error(`Wallet error: ${walletError.message}`);
    }

    if (walletData.balance < price) {
      return new Response(
        JSON.stringify({ 
          success: false, 
          message: "Insufficient funds" 
        }),
        { headers: { ...corsHeaders, 'Content-Type': 'application/json' }, status: 400 }
      );
    }

    // Get content details for creator payment
    const { data: contentData, error: contentError } = await supabaseClient
      .from('content_monetization')
      .select('creator_id, price')
      .eq('id', contentId)
      .single();

    if (contentError && contentError.code !== 'PGRST116') {
      // If the error is not "no rows returned" then it's a real error
      throw new Error(`Content error: ${contentError.message}`);
    }

    // Get creator ID (if this is content from the monetization table)
    const creatorId = contentData?.creator_id;

    // Update user's wallet balance
    const { error: updateError } = await supabaseClient
      .from('wallets')
      .update({ 
        balance: walletData.balance - price,
        updated_at: new Date().toISOString()
      })
      .eq('id', walletData.id);

    if (updateError) {
      throw new Error(`Update wallet error: ${updateError.message}`);
    }

    // Record transaction
    const { error: transactionError } = await supabaseClient
      .from('transactions')
      .insert({
        wallet_id: walletData.id,
        amount: -price,
        type: 'content_purchase',
        status: 'completed',
        metadata: { 
          contentId,
          transactionType: 'purchase'
        }
      });

    if (transactionError) {
      throw new Error(`Transaction error: ${transactionError.message}`);
    }

    // If we have a creator, add funds to their wallet
    if (creatorId) {
      // Get creator wallet
      const { data: creatorWallet, error: creatorWalletError } = await supabaseClient
        .from('wallets')
        .select('id, balance')
        .eq('user_id', creatorId)
        .single();

      if (creatorWalletError && creatorWalletError.code !== 'PGRST116') {
        console.error("Error finding creator wallet:", creatorWalletError);
      } else if (creatorWallet) {
        // Calculate creator earnings (e.g. 80% of the price)
        const platformFeePercentage = 20;
        const creatorEarnings = price * (1 - platformFeePercentage / 100);
        
        // Update creator wallet
        await supabaseClient
          .from('wallets')
          .update({ 
            balance: creatorWallet.balance + creatorEarnings,
            updated_at: new Date().toISOString()
          })
          .eq('id', creatorWallet.id);
        
        // Record transaction for creator
        await supabaseClient
          .from('transactions')
          .insert({
            wallet_id: creatorWallet.id,
            amount: creatorEarnings,
            type: 'content_sale',
            status: 'completed',
            metadata: { 
              contentId,
              transactionType: 'sale',
              buyerId: userId
            }
          });
      }
    }

    // Create access record
    const { error: accessError } = await supabaseClient
      .from('content_access_records')
      .insert({
        user_id: userId,
        content_id: contentId,
        access_type: 'purchase',
        price: price,
        payment_status: 'completed',
      });

    if (accessError) {
      console.error("Error creating access record:", accessError);
      // Non-blocking - the purchase is still considered successful
    }

    // Return success response
    return new Response(
      JSON.stringify({ 
        success: true, 
        message: "Purchase successful" 
      }),
      { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );
  } catch (error) {
    console.error("Error processing purchase:", error);
    
    return new Response(
      JSON.stringify({ 
        success: false, 
        message: error.message || "Internal server error" 
      }),
      { headers: { ...corsHeaders, 'Content-Type': 'application/json' }, status: 500 }
    );
  }
});
