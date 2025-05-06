
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import "https://deno.land/x/xhr@0.1.0/mod.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.45.0";

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
    const HUGGING_FACE_API_KEY = Deno.env.get("HUGGING_FACE_API_KEY");
    const SUPABASE_URL = Deno.env.get("SUPABASE_URL") || "";
    const SUPABASE_ANON_KEY = Deno.env.get("SUPABASE_ANON_KEY") || "";

    if (!HUGGING_FACE_API_KEY) {
      throw new Error("HUGGING_FACE_API_KEY is not set in environment variables");
    }

    // Initialize Supabase client
    const supabaseAdmin = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

    // Get request body
    const { type, prompt, user_id, modelId, options = {} } = await req.json();

    if (!prompt || !user_id) {
      throw new Error("Missing required parameters: prompt and user_id");
    }

    if (type !== "image" && type !== "video") {
      throw new Error("Invalid media type. Must be 'image' or 'video'");
    }

    // Define appropriate model based on type
    const model = type === "image" 
      ? modelId || "black-forest-labs/FLUX.1-schnell" 
      : modelId || "cerspense/zeroscope_v2_576w";

    // Make API request to Hugging Face
    console.log(`Generating ${type} with prompt: "${prompt}" using model: ${model}`);

    const apiUrl = `https://api-inference.huggingface.co/models/${model}`;
    const response = await fetch(apiUrl, {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${HUGGING_FACE_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        inputs: prompt,
        options: {
          wait_for_model: true,
          ...options
        }
      })
    });

    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(`Hugging Face API error: ${response.status} - ${errorText}`);
    }

    // Get media data
    const mediaData = await response.arrayBuffer();

    // Create a content type based on media type
    const contentType = type === "image" ? "image/png" : "video/mp4";

    // Return the generated media
    return new Response(mediaData, {
      headers: {
        ...corsHeaders,
        "Content-Type": contentType,
        "Cache-Control": "public, max-age=86400"
      }
    });
  } catch (error) {
    console.error(`Error generating ${error.mediaType || "media"}:`, error);
    
    return new Response(
      JSON.stringify({
        error: `Failed to generate media`,
        details: error.message
      }),
      {
        status: 500,
        headers: { 
          ...corsHeaders, 
          "Content-Type": "application/json" 
        }
      }
    );
  }
});
