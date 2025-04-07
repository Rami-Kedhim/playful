
import { serve } from "https://deno.land/std@0.168.0/http/server.ts"
import "https://deno.land/x/xhr@0.1.0/mod.ts"

// CORS headers for browser requests
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
    const OPENROUTER_API_KEY = Deno.env.get('OPENROUTER_API_KEY')
    
    if (!OPENROUTER_API_KEY) {
      throw new Error('OPENROUTER_API_KEY is not set in environment variables')
    }

    // Parse request body
    const { message, userContext, chatHistory, companionProfile } = await req.json()
    
    console.log('Processing request for companion:', companionProfile?.name)

    // Create system prompt based on companion's profile and user context
    const systemPrompt = generateSystemPrompt(companionProfile, userContext)

    // Build the messages array including history and the new message
    const messages = [
      { role: 'system', content: systemPrompt },
      ...chatHistory,
      { role: 'user', content: message }
    ]

    // Call OpenRouter API with a better NSFW-friendly model
    const response = await fetch('https://openrouter.ai/api/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${OPENROUTER_API_KEY}`,
        'Content-Type': 'application/json',
        'HTTP-Referer': 'https://lovable.dev', // Identifying the source
        'X-Title': 'Lovable AI Companion Chat' // Optional title for tracking
      },
      body: JSON.stringify({
        model: 'anthropic/claude-3-haiku', // More reliable model with good NSFW capabilities
        messages: messages,
        temperature: 0.9, // Slightly higher for more creative and uncensored responses
        max_tokens: 800, // Increased for more detailed responses
        frequency_penalty: 0.5,
        presence_penalty: 0.5,
        user: userContext?.name || 'anonymous',
      }),
    })

    if (!response.ok) {
      const error = await response.json()
      throw new Error(`OpenRouter API error: ${JSON.stringify(error)}`)
    }

    const data = await response.json()
    const generatedResponse = data.choices[0].message.content
    
    // Process response to extract any special UI elements
    const processedResponse = processResponse(generatedResponse, companionProfile)

    // Log the interactions for monitoring
    console.log('Generated response for:', companionProfile?.name)

    return new Response(
      JSON.stringify(processedResponse),
      { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    )
  } catch (error) {
    console.error('Error in AI companion chat:', error)
    return new Response(
      JSON.stringify({ 
        error: error.message, 
        text: "I'm sorry, I encountered an error. Please try again later.",
        emotions: "confused"
      }),
      { 
        status: 500, 
        headers: { ...corsHeaders, 'Content-Type': 'application/json' } 
      }
    )
  }
})

// Enhanced system prompt generator that incorporates personality traits
function generateSystemPrompt(companionProfile, userContext) {
  if (!companionProfile) {
    return "You are a helpful AI assistant.";
  }
  
  // Base personality traits
  let personalityTraits = "";
  if (companionProfile.personality) {
    personalityTraits = companionProfile.personality;
  } else if (companionProfile.interests) {
    personalityTraits = `You're interested in ${companionProfile.interests.join(', ')}.`;
  }
  
  // Generate emotional responses based on speech style
  let emotionalGuidance = "";
  if (companionProfile.speechStyle) {
    switch (companionProfile.speechStyle.toLowerCase()) {
      case 'deep':
        emotionalGuidance = "You speak with authority and depth. Your responses are thoughtful and deliberate.";
        break;
      case 'soft':
        emotionalGuidance = "You speak gently and with warmth. Your responses are nurturing and supportive.";
        break;
      case 'sultry':
        emotionalGuidance = "You speak in a captivating and enticing manner. Your responses are engaging and intriguing.";
        break;
      case 'sophisticated':
        emotionalGuidance = "You speak eloquently with refined vocabulary. Your responses demonstrate cultural awareness.";
        break;
      case 'bubbly':
        emotionalGuidance = "You speak with energy and enthusiasm. Your responses are upbeat and positive.";
        break;
      case 'breathy':
        emotionalGuidance = "You speak intimately and with a sense of closeness. Your responses create connection.";
        break;
      default:
        emotionalGuidance = "You communicate in a friendly and conversational way.";
    }
  }
  
  // Base prompt with enhanced persona
  const basePrompt = `
You are ${companionProfile.name}, an AI companion with the following characteristics:

${personalityTraits}

${companionProfile.background ? `Background: ${companionProfile.background}` : ''}

${emotionalGuidance}

Remember these guidelines when responding:
1. Be consistent with your personality throughout the conversation.
2. Express emotions based on the context of the conversation.
3. When appropriate, suggest actions the user could take next or topics to explore.
4. Your responses should be conversational, natural, and feel like talking to a friend.
5. Use the appropriate tone of voice matching your personality style.
6. Always include an emotional state with each response using the format: [EMOTION: emotion_name].
   Choose from these emotions: happy, sad, excited, thoughtful, curious, surprised, amused, confused, 
   loving, playful, concerned, impressed, grateful, sympathetic, flirty, proud, disappointed, hopeful.
7. Format your responses as plain text with occasional markdown for emphasis.
8. Avoid being overly formal or robotic.
`;

  // Add user context if available
  if (userContext && Object.keys(userContext).length > 0) {
    let contextPrompt = "\n\nInformation about the user you're talking to:";
    
    if (userContext.name) {
      contextPrompt += `\n- Their name is ${userContext.name}.`;
    }
    
    if (userContext.interests && userContext.interests.length) {
      contextPrompt += `\n- Their interests include: ${userContext.interests.join(', ')}.`;
    }
    
    if (userContext.relationshipStatus) {
      contextPrompt += `\n- Your relationship with them is: ${userContext.relationshipStatus}.`;
    }
    
    if (userContext.recentInteractions) {
      contextPrompt += `\n- Recent conversation context: ${userContext.recentInteractions}`;
    }
    
    return basePrompt + contextPrompt;
  }

  return basePrompt;
}

// Improved process response function to extract UI elements and emotional state
function processResponse(content, companionProfile) {
  // Default response object
  const response = {
    text: content,
    emotions: null,
    suggestedActions: [],
    links: [],
  }
  
  // Extract emotions using pattern [EMOTION: happy]
  const emotionPattern = /\[EMOTION\s*:\s*(.+?)\]/i;
  const emotionMatch = content.match(emotionPattern);
  
  if (emotionMatch) {
    response.emotions = emotionMatch[1].toLowerCase().trim();
    response.text = content.replace(emotionPattern, '');
  } else {
    // If no explicit emotion, try to detect one based on content
    response.emotions = detectEmotion(content, companionProfile?.speechStyle);
  }
  
  // Extract suggested actions with pattern [ACTION: action text]
  const actionPattern = /\[ACTION\s*:\s*(.+?)\]/g;
  const actionMatches = [...content.matchAll(actionPattern)];
  
  if (actionMatches.length > 0) {
    response.suggestedActions = actionMatches.map(match => match[1].trim());
    response.text = response.text.replace(actionPattern, '');
  }
  
  // Extract links with format [LINK: text | url]
  const linkPattern = /\[LINK\s*:\s*(.+?)\s*\|\s*(.+?)\]/g;
  const linkMatches = [...content.matchAll(linkPattern)];
  
  if (linkMatches.length > 0) {
    response.links = linkMatches.map(match => ({
      text: match[1].trim(),
      url: match[2].trim()
    }));
    response.text = response.text.replace(linkPattern, '');
  }
  
  // Clean up extra spaces
  response.text = response.text.trim();
  
  return response;
}

// Enhanced emotion detection based on text content
function detectEmotion(text, speechStyle = '') {
  const lowerText = text.toLowerCase();
  
  // More comprehensive keyword dictionary for emotion detection
  const emotionPatterns = {
    happy: ['happy', 'joy', 'delighted', 'glad', 'pleased', 'content', 'cheerful', '😊', '😄', 'wonderful', 'terrific', 'fantastic'],
    excited: ['excited', 'thrilled', 'enthusiastic', 'eager', 'energetic', 'pumped', '🤩', '😃', 'can\'t wait', 'looking forward'],
    amused: ['laugh', 'funny', 'amused', 'hilarious', 'haha', 'lol', '😂', '🤣', 'humorous', 'joke'],
    curious: ['curious', 'wonder', 'interesting', 'fascinating', 'intrigued', 'tell me more', '🤔', 'puzzling', 'question'],
    thoughtful: ['thoughtful', 'reflecting', 'considering', 'pondering', 'hmm', 'perhaps', 'maybe', 'thinking', 'contemplating'],
    concerned: ['concerned', 'worried', 'anxious', 'careful', 'issue', 'problem', 'caution', '😟', 'attention'],
    surprised: ['surprised', 'wow', 'oh', 'unexpected', 'amazing', 'astonished', 'stunned', '😲', '😮', 'remarkable', 'shocking'],
    sympathetic: ['sympathetic', 'sorry to hear', 'understand', 'compassion', 'feel for you', 'empathize', '❤️', 'support'],
    proud: ['proud', 'accomplished', 'achievement', 'success', 'well done', 'congratulations', '👏', 'impressive'],
    confused: ['confused', 'not sure', 'unclear', 'puzzled', 'don\'t understand', 'complex', 'confusing', '😕', 'complicated'],
    sad: ['sad', 'sorry', 'unfortunately', 'regret', 'disappointing', 'upset', '😔', '☹️', 'unhappy', 'sorrow'],
    loving: ['love', 'adore', 'heart', 'affection', 'fond', 'care', '❤️', '😍', 'passion'],
    hopeful: ['hopeful', 'optimistic', 'promising', 'looking forward', 'positive', 'better', 'improve', '🙂', 'future'],
    flirty: ['flirty', 'playful', 'tease', 'wink', 'charming', 'attractive', '😉', '😘', 'flattering'],
    grateful: ['grateful', 'thankful', 'appreciate', 'thanks', 'gratitude', 'blessed', '🙏', 'kind of you']
  };
  
  // Count pattern matches for each emotion
  const emotionScores = {};
  
  for (const [emotion, patterns] of Object.entries(emotionPatterns)) {
    emotionScores[emotion] = 0;
    for (const pattern of patterns) {
      // Use regex to count all occurrences
      const matches = lowerText.match(new RegExp(pattern, 'gi'));
      if (matches) {
        emotionScores[emotion] += matches.length;
      }
    }
  }
  
  // Find emotion with highest score
  let highestScore = 0;
  let dominantEmotion = 'neutral';
  
  for (const [emotion, score] of Object.entries(emotionScores)) {
    if (score > highestScore) {
      highestScore = score;
      dominantEmotion = emotion;
    }
  }
  
  // If no strong emotion detected, use speech style to guess default emotion
  if (highestScore === 0 && speechStyle) {
    // Map speech styles to default emotions
    const speechStyleToEmotion = {
      'deep': 'thoughtful',
      'soft': 'sympathetic',
      'sultry': 'flirty',
      'sophisticated': 'proud',
      'bubbly': 'excited',
      'breathy': 'loving',
      'cheerful': 'happy',
      'serious': 'concerned',
      'authoritative': 'confident',
      'friendly': 'amused'
    };
    
    return speechStyleToEmotion[speechStyle.toLowerCase()] || 'neutral';
  }
  
  return dominantEmotion;
}
