
-- Create table for creator_analytics
CREATE TABLE IF NOT EXISTS public.creator_analytics (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  creator_id UUID NOT NULL REFERENCES profiles(id),
  date DATE NOT NULL,
  views INTEGER DEFAULT 0,
  likes INTEGER DEFAULT 0,
  shares INTEGER DEFAULT 0,
  earnings DECIMAL(10, 2) DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Create index on creator_id and date for faster lookups
CREATE INDEX IF NOT EXISTS creator_analytics_creator_id_date_idx 
ON public.creator_analytics(creator_id, date);

-- Create table for creator_reviews
CREATE TABLE IF NOT EXISTS public.creator_reviews (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  creator_id UUID NOT NULL REFERENCES profiles(id),
  reviewer_id UUID NOT NULL REFERENCES profiles(id),
  rating INTEGER NOT NULL CHECK (rating BETWEEN 1 AND 5),
  comment TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
  UNIQUE (creator_id, reviewer_id)
);

-- Create index on creator_id for faster lookups
CREATE INDEX IF NOT EXISTS creator_reviews_creator_id_idx 
ON public.creator_reviews(creator_id);

-- Create table for creator_payouts
CREATE TABLE IF NOT EXISTS public.creator_payouts (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  creator_id UUID NOT NULL REFERENCES profiles(id),
  amount DECIMAL(10, 2) NOT NULL,
  payout_method TEXT NOT NULL,
  status TEXT NOT NULL DEFAULT 'pending',
  notes TEXT,
  requested_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
  processed_at TIMESTAMP WITH TIME ZONE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Create index on creator_id for faster lookups
CREATE INDEX IF NOT EXISTS creator_payouts_creator_id_idx 
ON public.creator_payouts(creator_id);

-- Add Row Level Security (RLS) to ensure creators can only see their own data
ALTER TABLE public.creator_analytics ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.creator_reviews ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.creator_payouts ENABLE ROW LEVEL SECURITY;

-- RLS Policies for creator_analytics
CREATE POLICY "Creators can view their own analytics" 
  ON public.creator_analytics 
  FOR SELECT 
  USING (auth.uid() = creator_id);

-- RLS Policies for creator_reviews
CREATE POLICY "Anyone can view creator reviews" 
  ON public.creator_reviews 
  FOR SELECT 
  USING (true);

CREATE POLICY "Users can create reviews" 
  ON public.creator_reviews 
  FOR INSERT 
  WITH CHECK (auth.uid() = reviewer_id);

CREATE POLICY "Users can update their own reviews" 
  ON public.creator_reviews 
  FOR UPDATE 
  USING (auth.uid() = reviewer_id);

-- RLS Policies for creator_payouts
CREATE POLICY "Creators can view their own payouts" 
  ON public.creator_payouts 
  FOR SELECT 
  USING (auth.uid() = creator_id);

CREATE POLICY "Creators can request payouts" 
  ON public.creator_payouts 
  FOR INSERT 
  WITH CHECK (auth.uid() = creator_id);
