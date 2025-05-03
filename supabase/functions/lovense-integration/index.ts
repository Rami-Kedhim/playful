
import { serve } from "https://deno.land/std@0.168.0/http/server.ts"
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2.7.1'

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
}

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const CAM4_API_KEY = Deno.env.get('CAM4_API_KEY');
    const LOVENSE_API_KEY = Deno.env.get('ELEVENLABS_API_KEY'); // Repurposing an existing key for this example
    
    if (!CAM4_API_KEY || !LOVENSE_API_KEY) {
      throw new Error('Required API keys not set');
    }

    const { action, deviceId, command, params = {} } = await req.json();

    // Create a mock response for Lovense device control
    let response;
    const timestamp = new Date().toISOString();

    switch (action) {
      case 'connect':
        response = {
          success: true,
          deviceId,
          status: 'connected',
          timestamp,
          message: 'Device connected successfully'
        };
        break;

      case 'disconnect':
        response = {
          success: true,
          deviceId,
          status: 'disconnected',
          timestamp,
          message: 'Device disconnected successfully'
        };
        break;

      case 'control':
        if (!command) {
          throw new Error('Command parameter is required for control action');
        }

        let feedbackMsg;
        switch (command) {
          case 'vibrate':
            feedbackMsg = `Vibration intensity set to ${params.intensity || 'default'}`;
            break;
          case 'rotate':
            feedbackMsg = `Rotation speed set to ${params.speed || 'default'}`;
            break;
          case 'pulse':
            feedbackMsg = `Pulse pattern ${params.pattern || 'default'} activated`;
            break;
          case 'stop':
            feedbackMsg = 'All device actions stopped';
            break;
          default:
            feedbackMsg = `Command "${command}" executed`;
        }

        response = {
          success: true,
          deviceId,
          command,
          params,
          executed: true,
          timestamp,
          message: feedbackMsg,
          deviceStatus: 'active'
        };
        break;

      case 'status':
        response = {
          success: true,
          deviceId,
          status: 'active',
          battery: Math.floor(Math.random() * 100),
          timestamp,
          connectionStrength: 'good',
          message: 'Device status retrieved successfully'
        };
        break;

      default:
        throw new Error(`Unknown action: ${action}`);
    }

    return new Response(JSON.stringify(response), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' }
    });
  } catch (error) {
    console.error('Error processing Lovense request:', error);
    
    return new Response(
      JSON.stringify({
        error: 'Error processing request',
        details: error.message
      }),
      {
        status: 400,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' }
      }
    );
  }
});
