
// IOTA Node Service - Edge Function
// This service integrates with the Hornet node for UBX recharge functionality

import { serve } from 'https://deno.land/std@0.177.0/http/server.ts'
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2'

// CORS headers for browser requests
const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
}

// IOTA Node configuration
const IOTA_NODE_URL = Deno.env.get('IOTA_NODE_URL') || 'http://localhost:14265'
const IOTA_NODE_API_KEY = Deno.env.get('IOTA_NODE_API_KEY')
const UBX_TO_IOTA_RATE = 5 // 1 IOTA = 5 UBX

// Helper to handle CORS preflight requests
function handleCORS(req: Request): Response | null {
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders })
  }
  return null
}

// Helper for authenticated Supabase client
function getSupabaseClient(req: Request) {
  const authHeader = req.headers.get('Authorization')
  
  if (!authHeader) {
    throw new Error('Missing Authorization header')
  }
  
  const supabaseUrl = Deno.env.get('SUPABASE_URL') || ''
  const supabaseAnonKey = Deno.env.get('SUPABASE_ANON_KEY') || ''
  
  return createClient(
    supabaseUrl,
    supabaseAnonKey,
    {
      global: {
        headers: {
          Authorization: authHeader,
        },
      },
    }
  )
}

// Generate a new IOTA address for receiving funds
async function generateAddress(userId: string): Promise<{address: string, qrCodeData: string}> {
  console.log(`Generating address for user ${userId}`)
  
  try {
    // In production, this would call the actual IOTA node API
    // For development or if node integration is not ready, fall back to a secure method
    // that generates a valid formatted address
    
    if (!IOTA_NODE_URL || IOTA_NODE_URL === 'http://localhost:14265') {
      // Development fallback - generate a deterministic but secure address
      // In production, remove this and only use the actual node API
      const timestamp = Date.now().toString()
      const randomSuffix = Array.from(crypto.getRandomValues(new Uint8Array(8)))
        .map(b => b.toString(16).padStart(2, '0')).join('')
      
      const mockAddress = `iota${timestamp.substring(timestamp.length - 6)}${randomSuffix}`
      const qrCodeData = `iota:${mockAddress}`
      
      // Store this address in Supabase for later reference
      // This will be used to map incoming transactions to user accounts
      // Implement when creating the recharge_sessions table
      
      return { address: mockAddress, qrCodeData }
    }
    
    // Production implementation would call the IOTA node API
    // Replace with actual API call when node is set up
    const response = await fetch(`${IOTA_NODE_URL}/api/v1/addresses/generate`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'X-API-Key': IOTA_NODE_API_KEY || '',
      },
      body: JSON.stringify({
        // Parameters for address generation
        // Exact format depends on the IOTA API version
      }),
    })
    
    if (!response.ok) {
      throw new Error(`IOTA node error: ${response.status}`)
    }
    
    const data = await response.json()
    // Process the response and format the address correctly
    
    return {
      address: data.address,
      qrCodeData: `iota:${data.address}`
    }
  } catch (error) {
    console.error('Error generating IOTA address:', error)
    throw error
  }
}

// Check transaction status
async function checkTransactionStatus(txHash: string): Promise<boolean> {
  console.log(`Checking transaction status: ${txHash}`)
  
  try {
    // In production, this would call the actual IOTA node API
    // For development or if node integration is not ready, fall back to a testing method
    
    if (!IOTA_NODE_URL || IOTA_NODE_URL === 'http://localhost:14265') {
      // Development fallback - 90% chance of success for testing
      await new Promise(resolve => setTimeout(resolve, 500 + Math.random() * 1000))
      return Math.random() > 0.1
    }
    
    // Production implementation would call the IOTA node API
    const response = await fetch(`${IOTA_NODE_URL}/api/v1/transactions/${txHash}`, {
      headers: {
        'X-API-Key': IOTA_NODE_API_KEY || '',
      }
    })
    
    if (!response.ok) {
      throw new Error(`IOTA node error: ${response.status}`)
    }
    
    const data = await response.json()
    // Check if transaction is confirmed
    return data.confirmed === true
  } catch (error) {
    console.error('Error checking transaction status:', error)
    throw error
  }
}

// Process a UBX recharge
async function processRecharge(
  req: Request, 
  supabase: any
): Promise<{success: boolean, address?: string, qrCodeData?: string, error?: string}> {
  try {
    const { user_id } = await req.json()
    
    if (!user_id) {
      return { success: false, error: 'Missing user ID' }
    }
    
    // Generate a new address for this recharge session
    const { address, qrCodeData } = await generateAddress(user_id)
    
    // In a production system, store this address in a recharge_sessions table
    // to map it back to the user when a transaction is detected
    // For now we'll just return the address
    
    return {
      success: true,
      address,
      qrCodeData
    }
  } catch (error) {
    console.error('Error processing recharge:', error)
    return {
      success: false,
      error: error.message
    }
  }
}

// Process a webhook from the IOTA node notifying of a received transaction
async function processTransactionWebhook(
  req: Request, 
  supabase: any
): Promise<{success: boolean, error?: string}> {
  try {
    const { address, amount, txHash } = await req.json()
    
    if (!address || !amount || !txHash) {
      return { 
        success: false, 
        error: 'Missing required transaction details' 
      }
    }
    
    // Verify the transaction with the IOTA node
    const isConfirmed = await checkTransactionStatus(txHash)
    
    if (!isConfirmed) {
      return { 
        success: false, 
        error: 'Transaction not confirmed' 
      }
    }
    
    // Convert IOTA amount to UBX
    const ubxAmount = amount * UBX_TO_IOTA_RATE
    
    // In a production system, look up the user associated with this address
    // from the recharge_sessions table and credit their account
    // For now we'll assume you would implement this functionality
    
    console.log(`Received ${amount} IOTA (${ubxAmount} UBX) at address ${address}`)
    
    // Return success response
    return { 
      success: true 
    }
  } catch (error) {
    console.error('Error processing transaction webhook:', error)
    return {
      success: false,
      error: error.message
    }
  }
}

// Main handler function
serve(async (req) => {
  // Handle CORS preflight
  const corsResponse = handleCORS(req)
  if (corsResponse) return corsResponse
  
  try {
    // Extract the endpoint from the URL path
    const url = new URL(req.url)
    const endpoint = url.pathname.split('/').pop()
    
    // Get Supabase client with user's JWT
    const supabase = getSupabaseClient(req)
    
    let result
    
    // Route to appropriate handler
    switch (endpoint) {
      case 'generate-address':
        result = await processRecharge(req, supabase)
        break
        
      case 'transaction-webhook':
        // This endpoint would be called by the IOTA node when it detects a transaction
        result = await processTransactionWebhook(req, supabase)
        break
        
      default:
        return new Response(
          JSON.stringify({ error: 'Unknown endpoint' }),
          { 
            status: 400, 
            headers: { 
              'Content-Type': 'application/json',
              ...corsHeaders
            }
          }
        )
    }
    
    // Return result
    return new Response(
      JSON.stringify(result),
      { 
        status: 200, 
        headers: { 
          'Content-Type': 'application/json',
          ...corsHeaders
        }
      }
    )
  } catch (error) {
    console.error('Unhandled error:', error)
    
    return new Response(
      JSON.stringify({ error: error.message }),
      { 
        status: 500, 
        headers: { 
          'Content-Type': 'application/json',
          ...corsHeaders
        }
      }
    )
  }
})
