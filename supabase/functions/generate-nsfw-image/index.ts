
// NSFW Image Generator using Hugging Face API
import { serve } from "https://deno.land/std@0.168.0/http/server.ts"
import { createClient } from "https://esm.sh/@supabase/supabase-js@2"

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
}

// List of supported models for NSFW content
const SUPPORTED_MODELS = {
  'realistic': 'stablediffusionapi/realistic-vision-v5',
  'deepseek': 'deepseek-ai/deepseek-vl-7b-chat',
  'realistic_xl': 'stabilityai/stable-diffusion-xl-base-1.0',
  'dream_shaper': 'lykon/dreamshaper-8',
  'photo_real': 'minimaxir/sdxl-wrong-lora',
  'anime': 'hakurei/waifu-diffusion'
};

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders })
  }

  try {
    const HF_TOKEN = Deno.env.get('HUGGING_FACE_API_KEY');
    
    if (!HF_TOKEN) {
      throw new Error('HUGGING_FACE_API_KEY environment variable not set');
    }

    // Parse request body
    const { 
      model = 'realistic',
      modelId,
      name = 'Lucia',
      age = '25',
      ethnicity = 'Latina',
      style = 'Glamour',
      skinTone = 'Light',
      clothing = 'Elegant dress',
      background = 'Luxury hotel suite',
      pose = 'Seductive',
      tags = [],
      customPrompt = '',
      negativePrompt = 'deformed, bad anatomy, disfigured, poorly drawn, extra limbs, blurry, watermark, logo, bad lighting'
    } = await req.json();

    // Get model ID from supported models or use custom provided modelId
    const selectedModelId = modelId || SUPPORTED_MODELS[model] || SUPPORTED_MODELS.realistic;

    // Construct the prompt - use custom if provided or build from parameters
    const prompt = customPrompt || 
      `${name}, ${age} years old, ${ethnicity}, ${style} style, ${skinTone} skin tone, wearing ${clothing}, in ${background}, ${pose} pose, ${tags.join(', ')}, high resolution, professional photography, detailed skin texture, photorealistic, 8k`;

    console.log(`Generating image with prompt: ${prompt}`);
    console.log(`Using model: ${selectedModelId}`);

    // Configure the parameters based on the selected model
    const requestBody = {
      inputs: prompt,
      parameters: {
        negative_prompt: negativePrompt,
        guidance_scale: 7.5,
        num_inference_steps: 30,
        width: 1024,
        height: 1024,
        safety_checker: false  // Disable safety checker for NSFW content
      },
      options: {
        wait_for_model: true,
        use_gpu: true
      }
    };

    // Special handling for DeepSeek model which has a different API structure
    if (selectedModelId.includes('deepseek')) {
      requestBody.parameters = {
        max_new_tokens: 4096,
        temperature: 0.7,
        top_p: 0.9
      };
    }

    // Make request to Hugging Face API
    const apiUrl = `https://api-inference.huggingface.co/models/${selectedModelId}`;
    const response = await fetch(apiUrl, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${HF_TOKEN}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(requestBody)
    });

    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(`Hugging Face API error: ${response.status} - ${errorText}`);
    }

    // Get response as array buffer
    const imageData = await response.arrayBuffer();

    // Return the image
    return new Response(imageData, {
      headers: {
        ...corsHeaders,
        'Content-Type': 'image/png',
        'Cache-Control': 'public, max-age=86400'
      }
    });
  } catch (error) {
    console.error('Error generating image:', error);
    
    return new Response(
      JSON.stringify({
        error: 'Failed to generate image',
        details: error.message
      }),
      {
        status: 500,
        headers: { 
          ...corsHeaders, 
          'Content-Type': 'application/json' 
        }
      }
    );
  }
});
