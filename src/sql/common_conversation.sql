
-- This SQL function finds a conversation that two users have in common
CREATE OR REPLACE FUNCTION public.find_common_conversation(user1_id UUID, user2_id UUID)
RETURNS TABLE(conversation_id UUID) AS $$
BEGIN
  RETURN QUERY
  SELECT cp1.conversation_id
  FROM conversation_participants cp1
  JOIN conversation_participants cp2 ON cp1.conversation_id = cp2.conversation_id
  WHERE cp1.user_id = user1_id AND cp2.user_id = user2_id
  LIMIT 1;
END;
$$ LANGUAGE plpgsql;
