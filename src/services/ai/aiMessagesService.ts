
import { supabase } from "@/integrations/supabase/client";
import { AIMessage } from "@/types/ai-profile";
import { toast } from "@/components/ui/use-toast";

/**
 * Send a message to an AI profile and get a response
 */
export const sendMessageToAI = async (
  userId: string,
  conversationId: string,
  messageContent: string,
  aiProfileId: string
): Promise<AIMessage | null> => {
  try {
    // First, save user message to database - using any to bypass type issues
    const userMessage: Partial<AIMessage> = {
      conversation_id: conversationId,
      sender_id: userId,
      content: messageContent,
      is_ai: false,
      has_read: true
    };
    
    const { data: savedUserMessage, error: userMessageError } = await supabase
      .from('ai_messages' as any)
      .insert(userMessage)
      .select('*')
      .single() as any;
    
    if (userMessageError) {
      console.error("Error saving user message:", userMessageError);
      toast({
        title: "Message failed",
        description: "Your message couldn't be saved. Please try again.",
        variant: "destructive",
      });
      throw userMessageError;
    }
    
    // Get AI response from edge function
    const { data: aiResponse, error: aiResponseError } = await supabase.functions.invoke(
      'generate-ai-content',
      {
        body: {
          user_id: userId,
          conversation_id: conversationId,
          user_message: messageContent,
          ai_profile_id: aiProfileId,
          type: 'message'
        }
      }
    );
    
    if (aiResponseError) {
      console.error("Error getting AI response:", aiResponseError);
      toast({
        title: "AI response failed",
        description: "Could not get a response from the AI. Please try again.",
        variant: "destructive",
      });
      throw aiResponseError;
    }
    
    if (aiResponse.error) {
      toast({
        title: "AI response error",
        description: aiResponse.error,
        variant: "destructive",
      });
      return null;
    }
    
    const aiMessage = aiResponse.message;
    
    // Handle payment requirement
    if (aiResponse.requiresPayment) {
      toast({
        title: "Payment required",
        description: `This response requires ${aiResponse.price} Lucoins to view`,
      });
      
      // Save AI message to database - using any to bypass type issues
      await supabase
        .from('ai_messages' as any)
        .insert({
          conversation_id: conversationId,
          sender_id: aiProfileId,
          content: "This message requires payment to view. Please unlock it to continue the conversation.",
          is_ai: true,
          has_read: false,
          requires_payment: true,
          price: aiResponse.price,
          payment_status: 'pending'
        });
      
      return {
        id: `temp-payment-${Date.now()}`,
        conversation_id: conversationId,
        sender_id: aiProfileId,
        content: "This message requires payment to view. Please unlock it to continue the conversation.",
        created_at: new Date().toISOString(),
        is_ai: true,
        has_read: false,
        requires_payment: true,
        price: aiResponse.price,
        payment_status: 'pending'
      } as AIMessage;
    }
    
    // Save AI message to database - using any to bypass type issues
    const { data: savedAiMessage, error: saveError } = await supabase
      .from('ai_messages' as any)
      .insert({
        conversation_id: conversationId,
        sender_id: aiProfileId,
        content: aiMessage.content,
        is_ai: true,
        has_read: false,
        requires_payment: false,
        payment_status: 'completed'
      })
      .select('*')
      .single() as any;
    
    if (saveError) {
      console.error("Error saving AI message:", saveError);
      toast({
        title: "Failed to save response",
        description: "The AI response was received but couldn't be saved",
        variant: "destructive",
      });
      // Return unsaved message so conversation can continue
      return aiMessage;
    }
    
    return savedAiMessage as AIMessage;
  } catch (error: any) {
    console.error("Error in sendMessageToAI:", error);
    toast({
      title: "Message error",
      description: error.message || "Something went wrong. Please try again.",
      variant: "destructive",
    });
    return null;
  }
};

/**
 * Mark an AI message as read
 */
export const markMessageAsRead = async (messageId: string): Promise<boolean> => {
  try {
    const { error } = await supabase
      .from('ai_messages' as any)
      .update({ has_read: true })
      .eq('id', messageId);
    
    if (error) {
      console.error("Error marking message as read:", error);
      return false;
    }
    
    return true;
  } catch (error) {
    console.error("Error in markMessageAsRead:", error);
    return false;
  }
};

/**
 * Pay for a premium AI message to unlock it
 */
export const unlockPaidMessage = async (
  userId: string,
  messageId: string
): Promise<boolean> => {
  try {
    // Get message details first - using any to bypass type issues
    const { data: message, error: fetchError } = await supabase
      .from('ai_messages' as any)
      .select('*')
      .eq('id', messageId)
      .single() as any;
    
    if (fetchError || !message) {
      console.error("Error fetching message:", fetchError);
      toast({
        title: "Message not found",
        description: "Could not find the message to unlock",
        variant: "destructive",
      });
      return false;
    }
    
    // Process payment using user's Lucoin balance
    const { data: paymentResult, error: paymentError } = await supabase.functions.invoke(
      'process-ai-payment',
      {
        body: {
          user_id: userId,
          item_id: messageId,
          item_type: 'message',
          amount: message.price
        }
      }
    );
    
    if (paymentError || (paymentResult && paymentResult.error)) {
      const errorMessage = paymentResult?.error || paymentError?.message || "Payment failed";
      toast({
        title: "Payment failed",
        description: errorMessage,
        variant: "destructive",
      });
      return false;
    }
    
    // Update message status - using any to bypass type issues
    const { error: updateError } = await supabase
      .from('ai_messages' as any)
      .update({ 
        payment_status: 'completed' 
      })
      .eq('id', messageId);
    
    if (updateError) {
      console.error("Error updating message status:", updateError);
      toast({
        title: "Status update failed",
        description: "Payment processed but message status could not be updated",
        variant: "destructive",
      });
      // Payment was processed, so still return true
      return true;
    }
    
    toast({
      title: "Message unlocked",
      description: "You can now view this message",
    });
    
    return true;
  } catch (error: any) {
    console.error("Error unlocking paid message:", error);
    toast({
      title: "Unlock failed",
      description: error.message || "Something went wrong unlocking this message",
      variant: "destructive",
    });
    return false;
  }
};
