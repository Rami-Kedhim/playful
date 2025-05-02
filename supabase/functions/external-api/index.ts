
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import "https://deno.land/x/xhr@0.1.0/mod.ts";

const HUGGINGFACE_API_KEY = Deno.env.get('HUGGINGFACE_API_KEY') || '';
const ELEVENLABS_API_KEY = Deno.env.get('ELEVENLABS_API_KEY') || '';
const OPENAI_API_KEY = Deno.env.get('OPENAI_API_KEY') || '';
const ABSTRACT_API_KEY = Deno.env.get('ABSTRACT_API_KEY') || '';

// CORS headers
const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

// Error response helper
const errorResponse = (message: string, status = 400) => {
  return new Response(
    JSON.stringify({
      success: false,
      error: message,
    }),
    {
      status,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    }
  );
};

// Success response helper
const successResponse = (data: any) => {
  return new Response(
    JSON.stringify({
      success: true,
      data,
    }),
    {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    }
  );
};

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    // Get request body
    const { provider, endpoint, data, options } = await req.json();

    if (!provider) {
      return errorResponse('Provider is required');
    }

    switch (provider) {
      case 'huggingface':
        return await handleHuggingFace(endpoint, data, options);
      case 'elevenlabs':
        return await handleElevenLabs(endpoint, data, options);
      case 'openai':
        return await handleOpenAI(endpoint, data, options);
      case 'geolocation':
        return await handleGeolocation(data, options);
      case 'moderation':
        return await handleModeration(data, options);
      case 'translation':
        return await handleTranslation(data, options);
      default:
        return errorResponse(`Unsupported provider: ${provider}`);
    }
  } catch (error) {
    console.error('Error processing request:', error);
    return errorResponse(`Error processing request: ${error.message}`);
  }
});

// Hugging Face API handler
async function handleHuggingFace(model: string, data: any, options: any) {
  try {
    if (!HUGGINGFACE_API_KEY) {
      return errorResponse('Hugging Face API key not configured', 500);
    }

    const url = `https://api-inference.huggingface.co/models/${model}`;
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${HUGGINGFACE_API_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });

    if (!response.ok) {
      const error = await response.text();
      return errorResponse(`Hugging Face API error: ${error}`);
    }

    const contentType = response.headers.get('content-type');
    
    if (contentType && contentType.includes('application/json')) {
      const result = await response.json();
      return successResponse(result);
    } else {
      // For binary responses (like images)
      const result = await response.arrayBuffer();
      const base64 = btoa(String.fromCharCode(...new Uint8Array(result)));
      return successResponse({ 
        base64, 
        contentType 
      });
    }
  } catch (error) {
    return errorResponse(`Hugging Face error: ${error.message}`);
  }
}

// ElevenLabs API handler
async function handleElevenLabs(endpoint: string, data: any, options: any) {
  try {
    if (!ELEVENLABS_API_KEY) {
      return errorResponse('ElevenLabs API key not configured', 500);
    }

    const url = endpoint.startsWith('http') ? endpoint : `https://api.elevenlabs.io/v1/${endpoint}`;
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'xi-api-key': ELEVENLABS_API_KEY,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });

    if (!response.ok) {
      const error = await response.text();
      return errorResponse(`ElevenLabs API error: ${error}`);
    }

    // Handle text-to-speech binary response
    if (endpoint.includes('text-to-speech')) {
      const result = await response.arrayBuffer();
      const base64 = btoa(String.fromCharCode(...new Uint8Array(result)));
      return successResponse({ 
        base64, 
        contentType: 'audio/mpeg' 
      });
    } else {
      const result = await response.json();
      return successResponse(result);
    }
  } catch (error) {
    return errorResponse(`ElevenLabs error: ${error.message}`);
  }
}

// OpenAI API handler
async function handleOpenAI(endpoint: string, data: any, options: any) {
  try {
    if (!OPENAI_API_KEY) {
      return errorResponse('OpenAI API key not configured', 500);
    }

    const url = endpoint.startsWith('http') ? endpoint : `https://api.openai.com/v1/${endpoint}`;
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${OPENAI_API_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });

    if (!response.ok) {
      const error = await response.text();
      return errorResponse(`OpenAI API error: ${error}`);
    }

    const result = await response.json();
    return successResponse(result);
  } catch (error) {
    return errorResponse(`OpenAI error: ${error.message}`);
  }
}

// IP Geolocation API handler
async function handleGeolocation(data: { ipAddress?: string }, options: any) {
  try {
    if (!ABSTRACT_API_KEY) {
      return errorResponse('Geolocation API key not configured', 500);
    }

    const ipAddress = data.ipAddress || '';
    const url = `https://ipgeolocation.abstractapi.com/v1/?api_key=${ABSTRACT_API_KEY}&ip_address=${ipAddress}`;
    
    const response = await fetch(url);

    if (!response.ok) {
      const error = await response.text();
      return errorResponse(`Geolocation API error: ${error}`);
    }

    const result = await response.json();
    return successResponse(result);
  } catch (error) {
    return errorResponse(`Geolocation error: ${error.message}`);
  }
}

// Content Moderation API handler (using OpenAI)
async function handleModeration(data: { input: string | string[] }, options: any) {
  try {
    if (!OPENAI_API_KEY) {
      return errorResponse('OpenAI API key not configured (required for moderation)', 500);
    }

    const url = 'https://api.openai.com/v1/moderations';
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${OPENAI_API_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });

    if (!response.ok) {
      const error = await response.text();
      return errorResponse(`Moderation API error: ${error}`);
    }

    const result = await response.json();
    return successResponse(result);
  } catch (error) {
    return errorResponse(`Moderation error: ${error.message}`);
  }
}

// Translation API handler (LibreTranslate)
async function handleTranslation(data: { 
  q: string;
  source?: string;
  target: string;
}, options: any) {
  try {
    const requestData = {
      q: data.q,
      source: data.source || 'auto',
      target: data.target
    };
    
    const response = await fetch('https://libretranslate.com/translate', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(requestData),
    });

    if (!response.ok) {
      const error = await response.text();
      return errorResponse(`Translation API error: ${error}`);
    }

    const result = await response.json();
    return successResponse(result);
  } catch (error) {
    return errorResponse(`Translation error: ${error.message}`);
  }
}
