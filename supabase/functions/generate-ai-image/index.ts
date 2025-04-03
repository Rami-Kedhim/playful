
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import "https://deno.land/x/xhr@0.1.0/mod.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.45.0";

// Define response headers for CORS
const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    // Get environment variables
    const OPENAI_API_KEY = Deno.env.get("OPENAI_API_KEY");
    const SUPABASE_URL = Deno.env.get("SUPABASE_URL") || "";
    const SUPABASE_ANON_KEY = Deno.env.get("SUPABASE_ANON_KEY") || "";

    if (!OPENAI_API_KEY) {
      throw new Error("OPENAI_API_KEY is not set in environment variables");
    }

    // Initialize Supabase client
    const supabaseAdmin = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

    // Get request body
    const { prompt, user_id, ai_profile_id, size = "1024x1024", style = "natural" } = await req.json();

    if (!prompt || !user_id) {
      throw new Error("Missing required parameters: prompt and user_id");
    }

    // Check if user has enough credits for image generation
    const { data: userProfile, error: userError } = await supabaseAdmin
      .from("profiles")
      .select("lucoin_balance")
      .eq("id", user_id)
      .single();

    if (userError) {
      throw new Error(`Failed to fetch user profile: ${userError.message}`);
    }

    // Set image price based on AI profile or default
    let imagePrice = 10; // Default price
    
    if (ai_profile_id) {
      const { data: aiProfile, error: profileError } = await supabaseAdmin
        .from("ai_profiles")
        .select("lucoin_image_price")
        .eq("id", ai_profile_id)
        .single();
      
      if (!profileError && aiProfile) {
        imagePrice = aiProfile.lucoin_image_price || imagePrice;
      }
    }

    // Check if payment is required (always for images)
    const requiresPayment = true;
    
    // Check if user has enough balance
    if ((userProfile?.lucoin_balance || 0) < imagePrice) {
      return new Response(
        JSON.stringify({ 
          requiresPayment, 
          price: imagePrice,
          error: "Insufficient Lucoin balance" 
        }),
        { headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    // Call DALL-E API to generate image
    const openAIResponse = await fetch("https://api.openai.com/v1/images/generations", {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${OPENAI_API_KEY}`,
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        model: "dall-e-3",
        prompt,
        n: 1,
        size,
        style,
      })
    });

    if (!openAIResponse.ok) {
      const errorData = await openAIResponse.json();
      throw new Error(`OpenAI Image API error: ${JSON.stringify(errorData)}`);
    }

    const imageData = await openAIResponse.json();
    const imageUrl = imageData.data[0].url;
    const revisedPrompt = imageData.data[0].revised_prompt;

    // Deduct Lucoins from user balance
    const { error: updateError } = await supabaseAdmin
      .from("profiles")
      .update({ lucoin_balance: (userProfile.lucoin_balance || 0) - imagePrice })
      .eq("id", user_id);

    if (updateError) {
      throw new Error(`Failed to update user balance: ${updateError.message}`);
    }

    // Record the transaction
    await supabaseAdmin
      .from("lucoin_transactions")
      .insert({
        user_id,
        amount: -imagePrice,
        transaction_type: "ai_image",
        description: "AI Image Generation",
        metadata: { ai_profile_id, prompt }
      });

    // Save the generated image to AI profile gallery if applicable
    if (ai_profile_id) {
      // Get existing gallery images
      const { data: aiProfile, error: profileError } = await supabaseAdmin
        .from("ai_profiles")
        .select("gallery_images")
        .eq("id", ai_profile_id)
        .single();
      
      if (!profileError && aiProfile && aiProfile.gallery_images) {
        // Add new image to gallery
        const updatedGallery = [...aiProfile.gallery_images, imageUrl];
        
        await supabaseAdmin
          .from("ai_profiles")
          .update({ gallery_images: updatedGallery })
          .eq("id", ai_profile_id);
      }
    }

    // Return the response
    return new Response(
      JSON.stringify({
        image_url: imageUrl,
        prompt: revisedPrompt || prompt,
        price: imagePrice,
        requiresPayment: false // Already paid
      }),
      { headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  } catch (error) {
    console.error("Error in generate-ai-image function:", error);
    return new Response(
      JSON.stringify({ error: error.message }),
      { 
        status: 500, 
        headers: { ...corsHeaders, "Content-Type": "application/json" } 
      }
    );
  }
});
