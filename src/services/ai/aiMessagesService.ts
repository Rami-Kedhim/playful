
import { supabase } from "@/integrations/supabase/client";
import { AIMessage, AIProfile } from "@/types/ai-profile";
import { v4 as uuidv4 } from 'uuid';

/**
 * Send a message to an AI profile and get a response
 */
export const sendMessageToAI = async (
  conversationId: string,
  userId: string,
  message: string
): Promise<{
  userMessage: AIMessage;
  aiResponse: AIMessage | null;
  requiresPayment: boolean;
  error?: string;
}> => {
  try {
    // First, save the user's message
    const { data: userMessage, error: msgError } = await (supabase
      .from('ai_messages')
      .insert({
        conversation_id: conversationId,
        sender_id: userId,
        content: message,
        is_ai: false
      })
      .select()
      .single() as any);
    
    if (msgError) {
      throw msgError;
    }
    
    // Get conversation with AI profile 
    const { data: conversation, error: convError } = await (supabase
      .from('ai_conversations')
      .select(`
        *,
        ai_profile:ai_profiles(*)
      `)
      .eq('id', conversationId)
      .single() as any);
    
    if (convError) {
      throw convError;
    }

    // Check if user has enough credits or if they're within free message limit
    const { data: messageCount, error: countError } = await (supabase
      .from('ai_messages')
      .select('id', { count: 'exact' })
      .eq('conversation_id', conversationId) as any);
    
    if (countError) {
      throw countError;
    }
    
    const freeMessageCount = 3; // First 3 messages are free
    const isFreeTier = messageCount?.length <= freeMessageCount;
    
    if (!isFreeTier) {
      // Check if user has enough Lucoins
      const { data: profile, error: profileError } = await (supabase
        .from('profiles')
        .select('lucoin_balance')
        .eq('id', userId)
        .single() as any);
      
      if (profileError) {
        throw profileError;
      }
      
      const aiProfile = conversation?.ai_profile as AIProfile;
      const messagePrice = aiProfile?.lucoin_chat_price || 5;
      
      if ((profile?.lucoin_balance || 0) < messagePrice) {
        // User doesn't have enough Lucoins
        // Create a payment required message from AI
        const { data: aiMessage, error: aiMsgError } = await (supabase
          .from('ai_messages')
          .insert({
            conversation_id: conversationId,
            sender_id: conversation?.ai_profile_id,
            content: "I'd love to continue our conversation. To chat more with me, you'll need to spend Lucoins.",
            is_ai: true,
            requires_payment: true,
            price: messagePrice,
            payment_status: 'pending'
          })
          .select()
          .single() as any);
        
        if (aiMsgError) {
          throw aiMsgError;
        }
        
        return {
          userMessage: userMessage as AIMessage,
          aiResponse: aiMessage as AIMessage,
          requiresPayment: true
        };
      }
      
      // If user has enough balance, call our Supabase Edge Function to generate AI response
      try {
        const { data: aiResponse, error } = await supabase.functions.invoke('generate-ai-content', {
          body: {
            user_id: userId,
            conversation_id: conversationId,
            user_message: message,
            ai_profile_id: conversation?.ai_profile_id,
            type: 'message'
          }
        });
        
        if (error) throw new Error(error.message);

        // If message requires payment, return without deducting balance
        if (aiResponse.requiresPayment) {
          // Save the AI response to database
          const { data: savedMessage, error: saveError } = await (supabase
            .from('ai_messages')
            .insert(aiResponse.message)
            .select()
            .single() as any);
            
          if (saveError) throw saveError;
          
          return {
            userMessage: userMessage as AIMessage,
            aiResponse: savedMessage as AIMessage,
            requiresPayment: true
          };
        }

        // If not requiring payment, deduct Lucoins
        const { error: updateError } = await (supabase
          .from('profiles')
          .update({ lucoin_balance: (profile?.lucoin_balance || 0) - messagePrice })
          .eq('id', userId) as any);
        
        if (updateError) {
          throw updateError;
        }
        
        // Record the transaction
        await (supabase
          .from('lucoin_transactions')
          .insert({
            user_id: userId,
            amount: -messagePrice,
            transaction_type: 'ai_chat',
            description: `Chat with ${aiProfile?.name}`,
            metadata: { conversation_id: conversationId }
          }) as any);

        // Save the AI response message
        const { data: savedMessage, error: saveError } = await (supabase
          .from('ai_messages')
          .insert(aiResponse.message)
          .select()
          .single() as any);
          
        if (saveError) throw saveError;
        
        return {
          userMessage: userMessage as AIMessage,
          aiResponse: savedMessage as AIMessage,
          requiresPayment: false
        };
      } catch (error) {
        // If there's an error with the edge function, fall back to mock responses
        console.error("Edge function error:", error);
        
        // Simulate delay for realism
        const aiProfile = conversation?.ai_profile as AIProfile;
        const minDelay = aiProfile?.delayed_response_min || 2000;
        const maxDelay = aiProfile?.delayed_response_max || 5000;
        const delay = Math.floor(Math.random() * (maxDelay - minDelay + 1)) + minDelay;
        await new Promise(resolve => setTimeout(resolve, delay));
        
        // Generate a mock response as fallback
        const aiResponseText = generateMockAIResponse(message, aiProfile, true);
        
        // Save the AI response
        const { data: aiMessage, error: aiMsgError } = await (supabase
          .from('ai_messages')
          .insert({
            conversation_id: conversationId,
            sender_id: conversation?.ai_profile_id,
            content: aiResponseText,
            is_ai: true
          })
          .select()
          .single() as any);
        
        if (aiMsgError) {
          throw aiMsgError;
        }
        
        return {
          userMessage: userMessage as AIMessage,
          aiResponse: aiMessage as AIMessage,
          requiresPayment: false
        };
      }
    } else {
      // For free tier messages, use the same Edge Function but with simpler prompts
      try {
        const { data: aiResponse, error } = await supabase.functions.invoke('generate-ai-content', {
          body: {
            user_id: userId,
            conversation_id: conversationId,
            user_message: message,
            ai_profile_id: conversation?.ai_profile_id,
            type: 'message'
          }
        });
        
        if (error) throw new Error(error.message);
        
        // Save the AI response message
        const { data: savedMessage, error: saveError } = await (supabase
          .from('ai_messages')
          .insert(aiResponse.message)
          .select()
          .single() as any);
          
        if (saveError) throw saveError;
        
        return {
          userMessage: userMessage as AIMessage,
          aiResponse: savedMessage as AIMessage,
          requiresPayment: false
        };
      } catch (error) {
        // Fallback to mock responses
        console.error("Edge function error:", error);
        
        // Simulate delay for realism
        const aiProfile = conversation?.ai_profile as AIProfile;
        const minDelay = aiProfile?.delayed_response_min || 2000;
        const maxDelay = aiProfile?.delayed_response_max || 5000;
        const delay = Math.floor(Math.random() * (maxDelay - minDelay + 1)) + minDelay;
        await new Promise(resolve => setTimeout(resolve, delay));
        
        // Generate a mock response as fallback
        const aiResponseText = generateMockAIResponse(message, aiProfile);
        
        // Save the AI response
        const { data: aiMessage, error: aiMsgError } = await (supabase
          .from('ai_messages')
          .insert({
            conversation_id: conversationId,
            sender_id: conversation?.ai_profile_id,
            content: aiResponseText,
            is_ai: true
          })
          .select()
          .single() as any);
        
        if (aiMsgError) {
          throw aiMsgError;
        }
        
        return {
          userMessage: userMessage as AIMessage,
          aiResponse: aiMessage as AIMessage,
          requiresPayment: false
        };
      }
    }
  } catch (error: any) {
    console.error("Error sending message to AI:", error);
    
    return {
      userMessage: {
        id: uuidv4(),
        conversation_id: conversationId,
        sender_id: userId,
        content: message,
        created_at: new Date().toISOString(),
        is_ai: false
      } as AIMessage,
      aiResponse: null,
      requiresPayment: false,
      error: error.message
    };
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
    const { data: message, error: msgError } = await (supabase
      .from('ai_messages')
      .select(`
        *,
        conversation:ai_conversations(
          *,
          ai_profile:ai_profiles(*)
        )
      `)
      .eq('id', messageId)
      .single() as any);
    
    if (msgError) {
      throw msgError;
    }
    
    if (!(message as any)?.requires_payment) {
      throw new Error("This message doesn't require payment");
    }
    
    // Check if user has enough Lucoins
    const { data: profile, error: profileError } = await (supabase
      .from('profiles')
      .select('lucoin_balance')
      .eq('id', userId)
      .single() as any);
    
    if (profileError) {
      throw profileError;
    }
    
    if ((profile?.lucoin_balance || 0) < ((message as any)?.price || 0)) {
      return {
        success: false,
        aiResponse: null,
        error: "Insufficient Lucoins"
      };
    }
    
    // Deduct Lucoins
    const { error: updateError } = await (supabase
      .from('profiles')
      .update({ lucoin_balance: (profile?.lucoin_balance || 0) - ((message as any)?.price || 0) })
      .eq('id', userId) as any);
    
    if (updateError) {
      throw updateError;
    }
    
    // Record the transaction
    await (supabase
      .from('lucoin_transactions')
      .insert({
        user_id: userId,
        amount: -((message as any)?.price || 0),
        transaction_type: 'ai_chat',
        description: `Chat with ${(message as any)?.conversation?.ai_profile?.name}`,
        metadata: { conversation_id: (message as any)?.conversation_id }
      }) as any);
    
    // Update message payment status
    const { error: statusError } = await (supabase
      .from('ai_messages')
      .update({ payment_status: 'completed' })
      .eq('id', messageId) as any);
    
    if (statusError) {
      throw statusError;
    }
    
    // Generate and save AI response
    const aiProfile = (message as any)?.conversation?.ai_profile as AIProfile;
    const lastUserMessage = await (supabase
      .from('ai_messages')
      .select('*')
      .eq('conversation_id', (message as any)?.conversation_id)
      .eq('is_ai', false)
      .order('created_at', { ascending: false })
      .limit(1)
      .single() as any);
    
    const aiResponseText = generateMockAIResponse(
      (lastUserMessage?.data as any)?.content,
      aiProfile,
      true
    );
    
    // Simulate delay for realism
    const minDelay = aiProfile?.delayed_response_min || 2000;
    const maxDelay = aiProfile?.delayed_response_max || 5000;
    const delay = Math.floor(Math.random() * (maxDelay - minDelay + 1)) + minDelay;
    
    // In a real implementation, we would process this in the background
    // For the mock, we'll just wait
    await new Promise(resolve => setTimeout(resolve, delay));
    
    // Save the AI response
    const { data: aiMessage, error: aiMsgError } = await (supabase
      .from('ai_messages')
      .insert({
        conversation_id: (message as any)?.conversation_id,
        sender_id: (message as any)?.conversation?.ai_profile_id,
        content: aiResponseText,
        is_ai: true
      })
      .select()
      .single() as any);
    
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
 * Helper function to generate a mock AI response based on the AI profile personality
 */
export function generateMockAIResponse(
  userMessage: string,
  aiProfile: AIProfile | null | undefined,
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
  
  if (!aiProfile || !aiProfile.personality) {
    responses = professionalResponses; // Default to professional if no personality data
  } else {
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
