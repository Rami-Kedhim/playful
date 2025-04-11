
-- Add AI profile related fields to profiles table
ALTER TABLE public.profiles
ADD COLUMN IF NOT EXISTS is_ai_profile BOOLEAN DEFAULT FALSE,
ADD COLUMN IF NOT EXISTS ai_settings JSONB DEFAULT '{}'::JSONB,
ADD COLUMN IF NOT EXISTS profile_type TEXT DEFAULT 'real' CHECK (profile_type IN ('real', 'ai', 'provisional', 'private', 'protected'));

-- Create a new view for improved profile filtering
CREATE OR REPLACE VIEW public.filtered_profiles AS
SELECT 
  p.*,
  CASE 
    WHEN p.is_verified AND p.is_ai_profile THEN 'ai'::TEXT
    WHEN p.is_verified AND NOT p.is_ai_profile THEN 'verified'::TEXT
    ELSE 'provisional'::TEXT
  END as display_profile_type,
  (p.is_verified OR p.is_ai_profile) as has_verification
FROM 
  public.profiles p;

-- Create a function to handle updating profile verification status
CREATE OR REPLACE FUNCTION public.update_profile_verification()
RETURNS TRIGGER AS $$
BEGIN
  -- Logic to update verification display status based on profile type
  IF NEW.is_verified AND NEW.is_ai_profile THEN
    NEW.profile_type := 'ai';
  ELSIF NEW.is_verified AND NOT NEW.is_ai_profile THEN
    NEW.profile_type := 'verified';
  ELSE
    NEW.profile_type := 'provisional';
  END IF;
  
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Add a trigger to automatically update profile_type
DROP TRIGGER IF EXISTS on_profile_verification_update ON public.profiles;
CREATE TRIGGER on_profile_verification_update
  BEFORE UPDATE OF is_verified, is_ai_profile ON public.profiles
  FOR EACH ROW EXECUTE FUNCTION public.update_profile_verification();

-- Add RLS policies for new fields
CREATE POLICY "Users can update their AI profile settings"
  ON public.profiles
  FOR UPDATE
  TO authenticated
  USING (auth.uid() = id);

-- Ensure profile owners can read their own AI settings
CREATE POLICY "Users can read their AI profile settings"
  ON public.profiles
  FOR SELECT
  TO authenticated
  USING (auth.uid() = id);
