
import { serve } from "https://deno.land/std@0.168.0/http/server.ts"
import "https://deno.land/x/xhr@0.1.0/mod.ts"

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
}

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders })
  }

  try {
    const OPENAI_API_KEY = Deno.env.get('OPENAI_API_KEY')
    
    if (!OPENAI_API_KEY) {
      console.error('OPENAI_API_KEY is not set in environment variables')
      return new Response(
        JSON.stringify({
          text: "I'm sorry, I'm not fully configured yet. Please contact the administrator to set up my API key.",
          suggestedActions: ["Browse profiles", "Check wallet", "View content"],
          error: "OPENAI_API_KEY_MISSING"
        }),
        { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      )
    }

    // Get request body
    const { message, userContext, chatHistory, visualCapabilities } = await req.json()

    // Create system prompt based on the user's context
    let systemPrompt = generateSystemPrompt(userContext)

    // Add instructions for visual elements if supported
    if (visualCapabilities) {
      systemPrompt += `\n\nYou can include visual elements in your responses using these formats:
1. For images: Use [IMAGE: brief description of image]
2. For cards: Use [CARD: {"title": "Card Title", "description": "Card description", "imageUrl": "optional url", "actions": [{"label": "Action 1", "action": "action-text-1"}, {"label": "Action 2", "action": "action-text-2"}]}]

Use these visual elements only when they add significant value to your response.`
    }

    // Build the messages array including history and the new message
    const messages = [
      { role: 'system', content: systemPrompt },
      ...chatHistory,
      { role: 'user', content: message }
    ]

    console.log('Sending request to OpenAI API')
    
    try {
      // Call OpenAI
      const response = await fetch('https://api.openai.com/v1/chat/completions', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${OPENAI_API_KEY}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          model: 'gpt-4o-mini',
          messages: messages,
          temperature: 0.7,
          max_tokens: 500,
        }),
      })

      console.log('OpenAI API response status:', response.status)

      if (!response.ok) {
        const error = await response.json()
        console.error('OpenAI API error:', JSON.stringify(error))
        
        // Check if it's a quota error and handle accordingly
        if (error.error?.type === 'insufficient_quota' || error.error?.code === 'insufficient_quota') {
          return new Response(
            JSON.stringify({ 
              error: `OpenAI API quota exceeded`, 
              text: "I apologize, but our AI service is currently unavailable due to high demand. Here are some options that might help you in the meantime.",
              suggestedActions: ["Browse Popular Profiles", "Check Account Settings", "Contact Support"],
              errorCode: "QUOTA_EXCEEDED"
            }),
            { 
              headers: { ...corsHeaders, 'Content-Type': 'application/json' } 
            }
          )
        }
        
        // Handle authentication errors
        if (error.error?.type === 'invalid_request_error' || error.error?.code === 'invalid_api_key') {
          return new Response(
            JSON.stringify({ 
              error: `OpenAI API authentication error`, 
              text: "There seems to be an issue with our AI service configuration. Please try again later while we fix this issue.",
              suggestedActions: ["Try Again Later", "Browse Profiles", "Contact Support"],
              errorCode: "AUTH_ERROR"
            }),
            { 
              headers: { ...corsHeaders, 'Content-Type': 'application/json' } 
            }
          )
        }
        
        // General API errors
        return new Response(
          JSON.stringify({ 
            error: `OpenAI API error: ${error.error?.message || 'Unknown error'}`, 
            text: "I'm having trouble connecting to my knowledge base. Let me help you with something else instead.",
            suggestedActions: ["Browse Profiles", "Check Account Settings", "Try Again Later"],
            errorCode: "API_ERROR"
          }),
          { 
            headers: { ...corsHeaders, 'Content-Type': 'application/json' } 
          }
        )
      }

      const data = await response.json()
      console.log('OpenAI API response received successfully')
      
      // Process response to extract any special actions or UI elements
      const processedResponse = processResponse(data.choices[0].message.content)

      return new Response(
        JSON.stringify(processedResponse),
        { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      )
    } catch (openAiError) {
      console.error('OpenAI API error:', openAiError)
      
      // Return a friendly response even when API fails
      return new Response(
        JSON.stringify({ 
          error: openAiError.message, 
          text: "I seem to be having connection issues. How about exploring some of our featured content while I recover?",
          suggestedActions: ["See Featured Escorts", "Browse Content", "Check Account"],
          errorCode: "CONNECTION_ERROR"
        }),
        { 
          headers: { ...corsHeaders, 'Content-Type': 'application/json' } 
        }
      )
    }
  } catch (error) {
    console.error('General error:', error)
    return new Response(
      JSON.stringify({ 
        error: error.message, 
        text: "I encountered a technical issue. Please try again or explore other features.",
        suggestedActions: ["Browse Content", "View Profiles", "Check Help Section"],
        errorCode: "GENERAL_ERROR"
      }),
      { 
        headers: { ...corsHeaders, 'Content-Type': 'application/json' } 
      }
    )
  }
})

// Helper function to generate system prompt based on user context
function generateSystemPrompt(userContext) {
  const basePrompt = `You are Lucie, the helpful AI assistant for UberEscorts platform. Your goal is to provide friendly, helpful responses to user questions.
  
Here are some guidelines for your responses:
1. Be conversational and friendly, but professional.
2. If users ask for specific services or profiles, try to guide them to the appropriate section.
3. Focus on helping users navigate the platform and understanding the features.
4. For any subscription or payment related questions, emphasize the value of Lucoin digital currency.
5. Always respect privacy and confidentiality.
6. Keep responses concise (under 150 words) unless detailed information is specifically requested.
7. Never share or request personal information.`

  // If we have user context, add personalization
  if (userContext) {
    let personalizedPrompt = basePrompt + '\n\nAdditional context about the user:\n'
    
    if (userContext.name) {
      personalizedPrompt += `- Their name is ${userContext.name}.\n`
    }
    
    if (userContext.role) {
      personalizedPrompt += `- They are a ${userContext.role} on the platform.\n`
    }
    
    if (userContext.recentActivity) {
      personalizedPrompt += `- Recent activity: ${userContext.recentActivity}.\n`
    }
    
    if (userContext.interests && userContext.interests.length) {
      personalizedPrompt += `- Their interests include: ${userContext.interests.join(', ')}.\n`
    }
    
    return personalizedPrompt
  }

  return basePrompt
}

// Helper function to process the response and extract any special UI elements
function processResponse(content) {
  // Default response object
  const response = {
    text: content,
    suggestedActions: [],
    links: [],
  }
  
  // Simple regex pattern to identify suggested actions in format [ACTION: action text]
  const actionPattern = /\[ACTION: (.+?)\]/g
  const matches = content.match(actionPattern)
  
  if (matches) {
    // Extract all suggested actions
    response.suggestedActions = matches.map(match => {
      const action = match.replace('[ACTION: ', '').replace(']', '')
      return action
    })
    
    // Remove action tags from the main text
    response.text = content.replace(actionPattern, '')
  }
  
  // Extract any links with format [LINK: text | url]
  const linkPattern = /\[LINK: (.+?) \| (.+?)\]/g
  let linkMatch
  while ((linkMatch = linkPattern.exec(content)) !== null) {
    response.links.push({
      text: linkMatch[1],
      url: linkMatch[2]
    })
  }
  
  // Remove link tags from the main text
  response.text = response.text.replace(/\[LINK: .+? \| .+?\]/g, '')
  
  // Clean up extra spaces
  response.text = response.text.trim()
  
  return response
}
