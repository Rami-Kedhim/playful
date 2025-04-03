
import { supabase } from "@/integrations/supabase/client";

// Helper to detect which messaging schema is being used
export const getMessagingSchema = async (): Promise<'direct' | 'conversation' | 'none'> => {
  try {
    // Check if messages table exists at all
    try {
      const { data: messagesExist, error: messagesError } = await supabase
        .from('messages')
        .select('id')
        .limit(1);
        
      if (messagesError) {
        console.log("Messages table doesn't exist or is inaccessible:", messagesError);
        return 'none';
      }
    } catch (err) {
      console.log("Error checking messages table:", err);
      return 'none';
    }
    
    // Try to query a field that would only exist in direct messaging
    try {
      const { data: receiverTest, error: receiverError } = await supabase
        .from('messages')
        .select('receiver_id')
        .limit(1);
      
      if (!receiverError) {
        // If we can select receiver_id without error, it's direct messaging
        return 'direct';
      }
    } catch (err) {
      // This error is expected if using conversation model
      console.log("Receiver_id field doesn't exist, likely using conversation model");
    }
    
    // Check conversation-based (conversations and participants tables)
    try {
      const { data: convData, error: convError } = await supabase
        .from('conversations')
        .select('id')
        .limit(1);
      
      if (!convError && convData !== null) {
        return 'conversation';
      }
    } catch (err) {
      console.log("Error checking conversations table:", err);
    }
    
    return 'none';
  } catch (err) {
    console.error("Error detecting messaging schema:", err);
    return 'none';
  }
};
