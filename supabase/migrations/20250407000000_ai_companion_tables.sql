
-- Create tables for AI companion emotional memory system

-- AI Emotional Memories table
CREATE TABLE IF NOT EXISTS public.ai_emotional_memories (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  companion_id TEXT NOT NULL,
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  memory_data JSONB NOT NULL DEFAULT '{}',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
  last_updated TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
  UNIQUE(companion_id, user_id)
);

-- AI Companion Interactions table (for monetization tracking)
CREATE TABLE IF NOT EXISTS public.companion_interactions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  companion_id TEXT NOT NULL,
  interaction_type TEXT NOT NULL,
  amount_paid NUMERIC DEFAULT 0,
  content_type TEXT,
  metadata JSONB DEFAULT '{}',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- Enable Row Level Security
ALTER TABLE public.ai_emotional_memories ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.companion_interactions ENABLE ROW LEVEL SECURITY;

-- Create RLS policies
CREATE POLICY "Users can view their own emotional memories"
  ON public.ai_emotional_memories
  FOR SELECT
  USING (auth.uid() = user_id);

CREATE POLICY "Service can insert emotional memories"
  ON public.ai_emotional_memories
  FOR INSERT
  WITH CHECK (true);

CREATE POLICY "Service can update emotional memories"
  ON public.ai_emotional_memories
  FOR UPDATE
  USING (true);

CREATE POLICY "Users can view their own interactions"
  ON public.companion_interactions
  FOR SELECT
  USING (auth.uid() = user_id);

CREATE POLICY "Service can insert interactions"
  ON public.companion_interactions
  FOR INSERT
  WITH CHECK (true);
