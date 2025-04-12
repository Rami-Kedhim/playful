
/**
 * This file contains the code snippet for the Supabase Edge Function for ElevenLabs TTS.
 * It's not used directly in the application, but can be shared with users who want to set up
 * their own ElevenLabs TTS Edge Function in Supabase.
 */

export const elevenlabsEdgeFunctionCode = `
// Supabase Edge Function for ElevenLabs TTS
import { serve } from "https://deno.land/std@0.168.0/http/server.ts"

const ELEVENLABS_API_KEY = Deno.env.get('ELEVENLABS_API_KEY')
const ELEVENLABS_API_URL = 'https://api.elevenlabs.io/v1/text-to-speech'

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
}

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders })
  }

  try {
    const { text, voiceId = "21m00Tcm4TlvDq8ikWAM", modelId = "eleven_multilingual_v2", voiceSettings } = await req.json()

    if (!text) {
      throw new Error('Text is required')
    }

    if (!ELEVENLABS_API_KEY) {
      throw new Error('ELEVENLABS_API_KEY environment variable is not set')
    }

    // Prepare the request to ElevenLabs API
    const response = await fetch(\`\${ELEVENLABS_API_URL}/\${voiceId}\`, {
      method: 'POST',
      headers: {
        'Accept': 'audio/mpeg',
        'Content-Type': 'application/json',
        'xi-api-key': ELEVENLABS_API_KEY
      },
      body: JSON.stringify({
        text,
        model_id: modelId,
        voice_settings: voiceSettings || {
          stability: 0.75,
          similarity_boost: 0.75
        }
      })
    })

    if (!response.ok) {
      const errorText = await response.text()
      console.error('ElevenLabs API error:', errorText)
      throw new Error(\`ElevenLabs API error: \${response.status} \${errorText}\`)
    }

    // Get audio as ArrayBuffer
    const audioBuffer = await response.arrayBuffer()
    
    // Convert to base64
    const audioBase64 = btoa(String.fromCharCode(...new Uint8Array(audioBuffer)))

    return new Response(
      JSON.stringify({ 
        audio: audioBase64,
        audioFormat: 'mp3',
        metadata: {
          requestId: crypto.randomUUID(),
          timestamp: new Date().toISOString(),
          processingTime: Date.now()
        }
      }),
      { 
        headers: { 
          ...corsHeaders,
          'Content-Type': 'application/json' 
        } 
      }
    )
  } catch (error) {
    console.error('Error:', error)
    
    return new Response(
      JSON.stringify({ error: error.message }),
      { 
        status: 400, 
        headers: { 
          ...corsHeaders,
          'Content-Type': 'application/json' 
        } 
      }
    )
  }
})
`

export const setupInstructions = `
To set up the ElevenLabs TTS Edge Function in Supabase:

1. Go to your Supabase dashboard
2. Navigate to Edge Functions
3. Click "Create a new function" and name it "elevenlabs-tts"
4. Paste the code above
5. Set the ELEVENLABS_API_KEY secret:
   \`\`\`
   supabase secrets set ELEVENLABS_API_KEY=your_elevenlabs_api_key
   \`\`\`
6. Deploy the function
`;
