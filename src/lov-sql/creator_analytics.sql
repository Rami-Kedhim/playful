
-- This file contains SQL that would be used in a real implementation
-- It's not used in the mock implementation, but serves as a reference

-- Create creator_analytics table
CREATE TABLE IF NOT EXISTS creator_analytics (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  creator_id UUID NOT NULL REFERENCES profiles(id),
  date DATE NOT NULL,
  views INTEGER DEFAULT 0,
  likes INTEGER DEFAULT 0,
  shares INTEGER DEFAULT 0,
  earnings DECIMAL(10, 2) DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Create creator_content table
CREATE TABLE IF NOT EXISTS creator_content (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  creator_id UUID NOT NULL REFERENCES profiles(id),
  title TEXT NOT NULL,
  description TEXT,
  content_type TEXT NOT NULL,
  url TEXT NOT NULL,
  thumbnail_url TEXT,
  is_premium BOOLEAN DEFAULT FALSE,
  price DECIMAL(10, 2) DEFAULT 0,
  status TEXT DEFAULT 'draft',
  published_at TIMESTAMP WITH TIME ZONE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Create content_views table
CREATE TABLE IF NOT EXISTS content_views (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  content_id UUID NOT NULL,
  user_id UUID NOT NULL,
  viewed_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Create track_content_view function
CREATE OR REPLACE FUNCTION track_content_view(
  p_content_id UUID,
  p_viewer_id UUID
)
RETURNS VOID AS $$
BEGIN
  -- Insert view record
  INSERT INTO content_views (content_id, user_id)
  VALUES (p_content_id, p_viewer_id)
  ON CONFLICT DO NOTHING;
  
  -- Update content views count
  UPDATE creator_content
  SET views_count = views_count + 1
  WHERE id = p_content_id;
END;
$$ LANGUAGE plpgsql;
