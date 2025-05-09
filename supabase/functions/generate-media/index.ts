
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import "https://deno.land/x/xhr@0.1.0/mod.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.45.0";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

// Map of model types to their Hugging Face model IDs
const MODEL_MAP = {
  // Image models
  "image": {
    "default": "black-forest-labs/FLUX.1-schnell",
    "realistic": "stablediffusionapi/realistic-vision-v5",
    "artistic": "lykon/dreamshaper-8",
    "fantasy": "stabilityai/stable-diffusion-xl-base-1.0",
  },
  // Video models
  "video": {
    "default": "cerspense/zeroscope_v2_576w",
  },
  // Text models
  "text": {
    "default": "deepseek-ai/deepseek-llm-67b-chat",
  },
  // Multimodal models
  "multimodal": {
    "default": "deepseek-ai/deepseek-vl-7b-chat",
  }
};

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    // Get environment variables
    const HUGGING_FACE_API_KEY = Deno.env.get("HUGGING_FACE_API_KEY");
    
    if (!HUGGING_FACE_API_KEY) {
      throw new Error("HUGGING_FACE_API_KEY is not set in environment variables");
    }

    // Get request body
    const { 
      type = "image", 
      prompt, 
      modelId, 
      modelType,
      negative_prompt,
      guidance_scale = 7.5,
      num_inference_steps = 30,
      width = 1024,
      height = 1024,
      options = {} 
    } = await req.json();

    if (!prompt) {
      throw new Error("Missing required parameter: prompt");
    }

    // Determine model type and get appropriate model ID
    const contentType = modelType || type;
    
    // Get model ID from provided ID, model map, or default
    const selectedModelId = modelId || 
      (MODEL_MAP[contentType as keyof typeof MODEL_MAP]?.default || 
      MODEL_MAP.image.default);
    
    console.log(`Generating ${contentType} with prompt: "${prompt}" using model: ${selectedModelId}`);

    // Configure request body based on model type
    let requestBody: any = {
      inputs: prompt
    };
    
    // Add parameters based on content type
    if (contentType === "image") {
      requestBody.parameters = {
        negative_prompt: negative_prompt || "deformed, bad anatomy, disfigured, poorly drawn, extra limbs, blurry, watermark, logo, bad lighting",
        guidance_scale,
        num_inference_steps,
        width,
        height,
        ...options
      };
      requestBody.options = {
        wait_for_model: true,
        use_gpu: true
      };
    } else if (contentType === "text") {
      // Config for text generation models
      requestBody.parameters = {
        max_new_tokens: 4096,
        temperature: 0.7,
        top_p: 0.9,
        ...options
      };
    } else if (contentType === "multimodal") {
      // Config for multimodal models like DeepSeek VL
      requestBody.parameters = {
        max_new_tokens: 4096,
        temperature: 0.7,
        ...options
      };
    }

    // Make request to Hugging Face API
    const apiUrl = `https://api-inference.huggingface.co/models/${selectedModelId}`;
    const response = await fetch(apiUrl, {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${HUGGING_FACE_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(requestBody)
    });

    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(`Hugging Face API error: ${response.status} - ${errorText}`);
    }

    // Handle different response types
    if (contentType === "text" || selectedModelId.includes("deepseek")) {
      const jsonResponse = await response.json();
      
      let generatedText = "";
      if (Array.isArray(jsonResponse) && jsonResponse[0]?.generated_text) {
        generatedText = jsonResponse[0].generated_text;
      } else if (jsonResponse.generated_text) {
        generatedText = jsonResponse.generated_text;
      } else {
        generatedText = JSON.stringify(jsonResponse);
      }
      
      return new Response(
        JSON.stringify({ text: generatedText }),
        { headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }
    
    // For image/video, return binary data
    const mediaData = await response.arrayBuffer();
    const contentTypeHeader = contentType === "video" ? "video/mp4" : "image/png";

    // Return the generated media
    return new Response(mediaData, {
      headers: {
        ...corsHeaders,
        "Content-Type": contentTypeHeader,
        "Cache-Control": "public, max-age=86400"
      }
    });
  } catch (error) {
    console.error(`Error generating media:`, error);
    
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
