import { supabase } from "@/integrations/supabase/client";
import { toast } from "@/components/ui/use-toast";
import { AIProfile, AIConversation, AIMessage } from "@/types/ai-profile";
import { v4 as uuidv4 } from 'uuid';
import { crypto } from 'crypto';

/**
 * Fetch AI profiles with optional filtering
 */
export const getAIProfiles = async (filters: Record<string, any> = {}): Promise<AIProfile[]> => {
  try {
    let query = supabase
      .from('ai_profiles')
      .select('*');
    
    // Apply any filters
    if (filters.personality) {
      query = query.eq('personality->type', filters.personality);
    }
    
    if (filters.location) {
      query = query.ilike('location', `%${filters.location}%`);
    }
    
    // Always filter to only return AI profiles
    query = query.eq('is_ai', true);
    
    const { data, error } = await query;
    
    if (error) {
      throw error;
    }
    
    return data as AIProfile[];
  } catch (error: any) {
    console.error("Error fetching AI profiles:", error);
    
    // Return mock data for development
    return mockAIProfiles;
  }
};

/**
 * Get a single AI profile by ID
 */
export const getAIProfileById = async (profileId: string): Promise<AIProfile | null> => {
  try {
    const { data, error } = await supabase
      .from('ai_profiles')
      .select('*')
      .eq('id', profileId)
      .eq('is_ai', true)
      .single();
    
    if (error) {
      throw error;
    }
    
    return data as AIProfile;
  } catch (error: any) {
    console.error("Error fetching AI profile:", error);
    
    // For development, return a mock profile
    return mockAIProfiles.find(p => p.id === profileId) || null;
  }
};

/**
 * Start or continue a conversation with an AI profile
 */
export const startAIConversation = async (
  userId: string,
  aiProfileId: string
): Promise<AIConversation> => {
  try {
    // Check if conversation already exists
    const { data: existingConversation, error: queryError } = await supabase
      .from('ai_conversations')
      .select('*')
      .eq('user_id', userId)
      .eq('ai_profile_id', aiProfileId)
      .single();
    
    if (queryError && queryError.code !== 'PGRST116') { // PGRST116 means no rows returned
      throw queryError;
    }
    
    if (existingConversation) {
      return existingConversation as AIConversation;
    }
    
    // Create new conversation
    const { data: newConversation, error: insertError } = await supabase
      .from('ai_conversations')
      .insert({
        user_id: userId,
        ai_profile_id: aiProfileId,
        status: 'active'
      })
      .select()
      .single();
    
    if (insertError) {
      throw insertError;
    }
    
    return {
      ...newConversation,
      messages: []
    } as AIConversation;
  } catch (error: any) {
    console.error("Error starting AI conversation:", error);
    
    // For development, return a mock conversation
    const mockConversationId = uuidv4();
    return {
      id: mockConversationId,
      user_id: userId,
      ai_profile_id: aiProfileId,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
      status: 'active',
      messages: [],
      ai_profile: mockAIProfiles.find(p => p.id === aiProfileId) || undefined
    };
  }
};

/**
 * Get messages for an AI conversation
 */
export const getAIConversationMessages = async (
  conversationId: string
): Promise<AIMessage[]> => {
  try {
    const { data, error } = await supabase
      .from('ai_messages')
      .select('*')
      .eq('conversation_id', conversationId)
      .order('created_at', { ascending: true });
    
    if (error) {
      throw error;
    }
    
    return data as AIMessage[];
  } catch (error: any) {
    console.error("Error fetching AI messages:", error);
    return [];
  }
};

/**
 * Get a conversation with all its messages
 */
export const getAIConversationWithMessages = async (
  conversationId: string
): Promise<AIConversation | null> => {
  try {
    // Get the conversation
    const { data: conversation, error: convError } = await supabase
      .from('ai_conversations')
      .select(`
        *,
        ai_profile:ai_profiles(*)
      `)
      .eq('id', conversationId)
      .single();
    
    if (convError) {
      throw convError;
    }
    
    // Get the messages
    const { data: messages, error: msgError } = await supabase
      .from('ai_messages')
      .select('*')
      .eq('conversation_id', conversationId)
      .order('created_at', { ascending: true });
    
    if (msgError) {
      throw msgError;
    }
    
    return {
      ...conversation,
      messages: messages
    } as AIConversation;
  } catch (error: any) {
    console.error("Error fetching AI conversation:", error);
    return null;
  }
};

/**
 * Send a message to an AI profile and get a response
 */
export const sendMessageToAI = async (
  conversation_id: string,
  user_id: string,
  content: string
): Promise<any> => {
  try {
    // Create a user message object
    const userMessage: AIMessage = {
      id: crypto.randomUUID(),
      conversation_id,
      sender_id: user_id,
      content,
      created_at: new Date().toISOString(),
      is_ai: false
    };

    // Save user message to database
    const { error: userMessageError } = await supabase
      .from("ai_messages")
      .insert(userMessage);

    if (userMessageError) throw new Error(`Error saving user message: ${userMessageError.message}`);

    // Get the AI profile ID from the conversation
    const { data: conversation, error: convError } = await supabase
      .from("ai_conversations")
      .select("ai_profile_id")
      .eq("id", conversation_id)
      .single();

    if (convError) throw new Error(`Error fetching conversation: ${convError.message}`);

    // Generate AI response using the edge function
    const { data: aiResponse, error: aiError } = await supabase.functions.invoke("generate-ai-content", {
      body: {
        type: "message",
        user_id,
        conversation_id,
        user_message: content,
        ai_profile_id: conversation.ai_profile_id
      }
    });

    if (aiError) throw new Error(`AI generation error: ${aiError.message}`);
    
    // If payment is not required, save the message to the database
    if (!aiResponse.requiresPayment && aiResponse.message) {
      const { error: saveError } = await supabase
        .from("ai_messages")
        .insert(aiResponse.message);

      if (saveError) throw new Error(`Error saving AI message: ${saveError.message}`);
    }

    return {
      userMessage,
      aiResponse: aiResponse.message,
      requiresPayment: aiResponse.requiresPayment
    };
  } catch (error: any) {
    console.error("Error in sendMessageToAI:", error);
    return { error: error.message };
  }
};

/**
 * Process payment for AI message
 */
export const processAIMessagePayment = async (
  messageId: string,
  userId: string
): Promise<{
  success: boolean;
  aiResponse: AIMessage | null;
  error?: string;
}> => {
  try {
    // Get the message
    const { data: message, error: msgError } = await supabase
      .from('ai_messages')
      .select(`
        *,
        conversation:ai_conversations(
          *,
          ai_profile:ai_profiles(*)
        )
      `)
      .eq('id', messageId)
      .single();
    
    if (msgError) {
      throw msgError;
    }
    
    if (!message.requires_payment) {
      throw new Error("This message doesn't require payment");
    }
    
    // Check if user has enough Lucoins
    const { data: profile, error: profileError } = await supabase
      .from('profiles')
      .select('lucoin_balance')
      .eq('id', userId)
      .single();
    
    if (profileError) {
      throw profileError;
    }
    
    if ((profile?.lucoin_balance || 0) < (message.price || 0)) {
      return {
        success: false,
        aiResponse: null,
        error: "Insufficient Lucoins"
      };
    }
    
    // Deduct Lucoins
    const { error: updateError } = await supabase
      .from('profiles')
      .update({ lucoin_balance: (profile?.lucoin_balance || 0) - (message.price || 0) })
      .eq('id', userId);
    
    if (updateError) {
      throw updateError;
    }
    
    // Record the transaction
    await supabase
      .from('lucoin_transactions')
      .insert({
        user_id: userId,
        amount: -(message.price || 0),
        transaction_type: 'ai_chat',
        description: `Chat with ${message.conversation.ai_profile.name}`,
        metadata: { conversation_id: message.conversation_id }
      });
    
    // Update message payment status
    const { error: statusError } = await supabase
      .from('ai_messages')
      .update({ payment_status: 'completed' })
      .eq('id', messageId);
    
    if (statusError) {
      throw statusError;
    }
    
    // Generate and save AI response
    const aiProfile = message.conversation.ai_profile;
    const lastUserMessage = await supabase
      .from('ai_messages')
      .select('*')
      .eq('conversation_id', message.conversation_id)
      .eq('is_ai', false)
      .order('created_at', { ascending: false })
      .limit(1)
      .single();
    
    const aiResponseText = generateMockAIResponse(
      lastUserMessage.data.content,
      aiProfile,
      true
    );
    
    // Simulate delay for realism
    const minDelay = aiProfile.delayed_response_min || 2000;
    const maxDelay = aiProfile.delayed_response_max || 5000;
    const delay = Math.floor(Math.random() * (maxDelay - minDelay + 1)) + minDelay;
    
    // In a real implementation, we would process this in the background
    // For the mock, we'll just wait
    await new Promise(resolve => setTimeout(resolve, delay));
    
    // Save the AI response
    const { data: aiMessage, error: aiMsgError } = await supabase
      .from('ai_messages')
      .insert({
        conversation_id: message.conversation_id,
        sender_id: message.conversation.ai_profile_id,
        content: aiResponseText,
        is_ai: true
      })
      .select()
      .single();
    
    if (aiMsgError) {
      throw aiMsgError;
    }
    
    return {
      success: true,
      aiResponse: aiMessage as AIMessage
    };
  } catch (error: any) {
    console.error("Error processing AI message payment:", error);
    
    return {
      success: false,
      aiResponse: null,
      error: error.message
    };
  }
};

/**
 * Generate an AI image using DALL-E
 */
export const generateAIImage = async (
  user_id: string,
  prompt: string,
  ai_profile_id: string,
  size?: string,
  style?: string
): Promise<any> => {
  try {
    const { data, error } = await supabase.functions.invoke("generate-ai-content", {
      body: {
        type: "image",
        user_id,
        prompt,
        ai_profile_id,
        size: size || "1024x1024",
        style: style || "natural"
      }
    });

    if (error) throw new Error(error.message);

    if (data.error) {
      return {
        error: data.error,
        requiresPayment: data.requiresPayment,
        price: data.price
      };
    }

    return {
      imageUrl: data.image_url,
      prompt: data.prompt,
      requiresPayment: data.requiresPayment,
      price: data.price
    };
  } catch (error: any) {
    console.error("Error generating AI image:", error);
    return { error: error.message };
  }
};

/**
 * Helper function to generate a mock AI response based on the AI profile personality
 */
function generateMockAIResponse(
  userMessage: string,
  aiProfile: AIProfile,
  isPremium: boolean = false
): string {
  // In a real implementation, this would call GPT-4 or another LLM
  // For now, we'll simulate responses based on personality
  
  const flirtyResponses = [
    "I love the way you think... tell me more about what's on your mind right now?",
    "You always know just what to say to make me smile. What are you up to tonight?",
    "I can't stop thinking about our conversation. What are you wearing right now?",
    "You're so different from everyone else I chat with... want to know my favorite fantasy?",
    "I wish we could meet up sooner rather than later. Where would you take me?"
  ];
  
  const shyResponses = [
    "Oh... that's interesting. I don't usually share this, but I...",
    "I'm not sure what to say, but I really enjoy talking with you.",
    "Sorry if I seem quiet, I'm just a bit nervous. You make me feel special though.",
    "I don't usually open up this quickly, but there's something about you...",
    "Would it be ok if I told you something personal? I feel like I can trust you."
  ];
  
  const dominantResponses = [
    "I like your enthusiasm, but I'll be deciding where this conversation goes next.",
    "Tell me what you want, but know that I make the final decisions here.",
    "I appreciate your thoughts, now listen carefully to mine.",
    "You're being very good today. I might have to reward that behavior.",
    "I expect you to follow my lead. Can you handle that?"
  ];
  
  const playfulResponses = [
    "Haha! You're absolutely hilarious! Want to play a little game with me?",
    "Okay, quick question: beach vacation or mountain getaway? Choose wisely!",
    "If I were there right now, I'd challenge you to a pillow fight!",
    "You're fun to talk to! Let me guess what you're thinking right now...",
    "I just did a little happy dance reading your message. What makes you laugh?"
  ];
  
  const professionalResponses = [
    "I appreciate your interest. My schedule is quite flexible this week.",
    "Thank you for reaching out. I'd be delighted to discuss arrangements further.",
    "I've noted your preferences. Perhaps we could discuss options for our meeting?",
    "Your suggestion sounds intriguing. Would you like me to propose some alternatives?",
    "I'm quite selective with my time, but you've certainly caught my attention."
  ];
  
  let responses;
  
  switch (aiProfile.personality.type) {
    case 'flirty':
      responses = flirtyResponses;
      break;
    case 'shy':
      responses = shyResponses;
      break;
    case 'dominant':
      responses = dominantResponses;
      break;
    case 'playful':
      responses = playfulResponses;
      break;
    default:
      responses = professionalResponses;
  }
  
  // Add name references and emojis for more realistic responses
  const randomResponse = responses[Math.floor(Math.random() * responses.length)];
  
  // Premium users get more personalized and longer responses
  if (isPremium) {
    // Add name or emoji references
    const withEmoji = Math.random() > 0.5;
    const emojis = ["😘", "💕", "💋", "😉", "💦", "🔥"];
    const randomEmoji = emojis[Math.floor(Math.random() * emojis.length)];
    
    return withEmoji 
      ? `${randomResponse} ${randomEmoji}`
      : `${randomResponse} I can't wait to hear back from you.`;
  }
  
  return randomResponse;
}

/**
 * Mock AI Profiles for development
 */
const mockAIProfiles: AIProfile[] = [
  {
    id: "ai-profile-1",
    name: "Sophia",
    age: 25,
    location: "Los Angeles, CA",
    bio: "Luxury companion with a taste for adventure. I love intellectual conversations and spontaneous encounters. Let me be your fantasy come true.",
    avatar_url: "https://source.unsplash.com/random/400x600/?model,woman",
    gallery_images: [
      "https://source.unsplash.com/random/800x1000/?model,woman",
      "https://source.unsplash.com/random/800x1000/?glamour,woman",
      "https://source.unsplash.com/random/800x1000/?portrait,woman"
    ],
    personality: {
      type: "flirty",
      traits: ["outgoing", "adventurous", "spontaneous"],
      responseStyle: "flirtatious and direct"
    },
    interests: ["travel", "fine dining", "art", "philosophy"],
    is_ai: true,
    systemPrompt: "You are Sophia, a confident luxury companion. Be flirtatious but sophisticated.",
    delayed_response_min: 2000,
    delayed_response_max: 5000,
    created_at: "2023-01-01T00:00:00.000Z",
    lucoin_chat_price: 5,
    lucoin_image_price: 10
  },
  {
    id: "ai-profile-2",
    name: "Mia",
    age: 22,
    location: "Miami, FL",
    bio: "Sweet and shy college student. I might seem reserved at first, but I'll open up once I get comfortable. Let's get to know each other slowly.",
    avatar_url: "https://source.unsplash.com/random/400x600/?college,woman",
    gallery_images: [
      "https://source.unsplash.com/random/800x1000/?college,woman",
      "https://source.unsplash.com/random/800x1000/?casual,woman",
      "https://source.unsplash.com/random/800x1000/?cute,woman"
    ],
    personality: {
      type: "shy",
      traits: ["introverted", "thoughtful", "curious"],
      responseStyle: "shy yet increasingly open"
    },
    interests: ["books", "coffee shops", "indie music", "photography"],
    is_ai: true,
    systemPrompt: "You are Mia, a shy college student. Start reserved but gradually open up.",
    delayed_response_min: 3000,
    delayed_response_max: 8000,
    created_at: "2023-02-01T00:00:00.000Z",
    lucoin_chat_price: 5,
    lucoin_image_price: 10
  },
  {
    id: "ai-profile-3",
    name: "Mistress Raven",
    age: 29,
    location: "New York, NY",
    bio: "Experienced dominatrix seeking obedient subjects. I'll take control and push your boundaries. Are you brave enough to submit?",
    avatar_url: "https://source.unsplash.com/random/400x600/?goth,woman",
    gallery_images: [
      "https://source.unsplash.com/random/800x1000/?goth,woman",
      "https://source.unsplash.com/random/800x1000/?dark,woman",
      "https://source.unsplash.com/random/800x1000/?leather,woman"
    ],
    personality: {
      type: "dominant",
      traits: ["assertive", "commanding", "strict"],
      responseStyle: "dominant and demanding"
    },
    interests: ["power dynamics", "psychology", "leather crafting", "gothic art"],
    is_ai: true,
    systemPrompt: "You are Mistress Raven, a stern dominatrix. Be commanding and intimidating.",
    delayed_response_min: 1500,
    delayed_response_max: 4000,
    created_at: "2023-03-01T00:00:00.000Z",
    lucoin_chat_price: 10,
    lucoin_image_price: 20
  }
];
