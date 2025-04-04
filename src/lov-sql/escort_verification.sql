
-- Create verification_requests table
CREATE TABLE IF NOT EXISTS public.verification_requests (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES auth.users(id) NOT NULL,
  document_type TEXT NOT NULL,
  document_front_image TEXT NOT NULL,
  document_back_image TEXT,
  selfie_image TEXT NOT NULL,
  status TEXT NOT NULL DEFAULT 'pending',
  submitted_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
  reviewed_at TIMESTAMP WITH TIME ZONE,
  reviewed_by UUID,
  expires_at TIMESTAMP WITH TIME ZONE,
  rejection_reason TEXT
);

-- Enable Row Level Security
ALTER TABLE public.verification_requests ENABLE ROW LEVEL SECURITY;

-- Create policy for users to view their own verification requests
CREATE POLICY "Users can view their own verification requests"
  ON public.verification_requests
  FOR SELECT
  TO authenticated
  USING (auth.uid() = user_id);

-- Create policy for users to insert their own verification requests
CREATE POLICY "Users can create their own verification requests"
  ON public.verification_requests
  FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = user_id);

-- Create escorts table
CREATE TABLE IF NOT EXISTS public.escorts (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES auth.users(id) NOT NULL,
  name TEXT NOT NULL,
  age INTEGER NOT NULL,
  location TEXT NOT NULL,
  price INTEGER NOT NULL,
  image_url TEXT NOT NULL,
  gallery JSONB,
  videos JSONB,
  rating NUMERIC(3,2) DEFAULT 0,
  reviews INTEGER DEFAULT 0,
  tags TEXT[] DEFAULT '{}',
  description TEXT,
  verified BOOLEAN DEFAULT false,
  gender TEXT,
  sexual_orientation TEXT,
  available_now BOOLEAN DEFAULT false,
  last_active TIMESTAMP WITH TIME ZONE DEFAULT now(),
  response_rate NUMERIC(5,2) DEFAULT 0,
  languages TEXT[] DEFAULT '{}',
  height TEXT,
  weight TEXT,
  measurements TEXT,
  hair_color TEXT,
  eye_color TEXT,
  ethnicity TEXT,
  availability JSONB DEFAULT '{"days": [], "hours": ""}',
  services TEXT[] DEFAULT '{}',
  rates JSONB DEFAULT '{"hourly": 0}',
  contact_info JSONB DEFAULT '{}',
  verification_level TEXT DEFAULT 'none',
  verification_date TIMESTAMP WITH TIME ZONE,
  has_virtual_content BOOLEAN DEFAULT false,
  virtual_username TEXT,
  provides_in_person_services BOOLEAN DEFAULT true,
  provides_virtual_content BOOLEAN DEFAULT false,
  provides_live_streams BOOLEAN DEFAULT false,
  is_ai_generated BOOLEAN DEFAULT false,
  content_stats JSONB DEFAULT '{"photos": 0, "videos": 0, "streams": 0}',
  subscription_price INTEGER,
  subscription_levels JSONB DEFAULT '[]',
  agency_id UUID,
  is_agency BOOLEAN DEFAULT false,
  managed_escorts JSONB DEFAULT '[]',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

-- Enable Row Level Security
ALTER TABLE public.escorts ENABLE ROW LEVEL SECURITY;

-- Create policy for clients to view escort profiles
CREATE POLICY "Anyone can view escort profiles"
  ON public.escorts
  FOR SELECT
  USING (true);

-- Create policy for users to create their own escort profiles
CREATE POLICY "Users can create their own escort profiles"
  ON public.escorts
  FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = user_id);

-- Create policy for users to update their own escort profiles
CREATE POLICY "Users can update their own escort profiles"
  ON public.escorts
  FOR UPDATE
  TO authenticated
  USING (auth.uid() = user_id);

-- Create availability table
CREATE TABLE IF NOT EXISTS public.escort_availability (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  escort_id UUID REFERENCES public.escorts(id) ON DELETE CASCADE,
  date DATE NOT NULL,
  start_time TIME NOT NULL,
  end_time TIME NOT NULL,
  is_booked BOOLEAN DEFAULT false,
  is_recurring BOOLEAN DEFAULT false,
  recurring_days TEXT[] DEFAULT '{}',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

-- Enable Row Level Security
ALTER TABLE public.escort_availability ENABLE ROW LEVEL SECURITY;

-- Create policy for anyone to view escort availability
CREATE POLICY "Anyone can view escort availability"
  ON public.escort_availability
  FOR SELECT
  USING (true);

-- Create policy for escorts to manage their own availability
CREATE POLICY "Escorts can manage their own availability"
  ON public.escort_availability
  FOR ALL
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 
      FROM public.escorts 
      WHERE id = escort_id 
      AND user_id = auth.uid()
    )
  );

-- Create escort reviews table
CREATE TABLE IF NOT EXISTS public.escort_reviews (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  escort_id UUID REFERENCES public.escorts(id) ON DELETE CASCADE,
  client_id UUID REFERENCES auth.users(id),
  rating INTEGER NOT NULL,
  comment TEXT,
  date TIMESTAMP WITH TIME ZONE DEFAULT now(),
  verified BOOLEAN DEFAULT false,
  response JSONB,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

-- Enable Row Level Security
ALTER TABLE public.escort_reviews ENABLE ROW LEVEL SECURITY;

-- Create policy for anyone to view escort reviews
CREATE POLICY "Anyone can view escort reviews"
  ON public.escort_reviews
  FOR SELECT
  USING (true);

-- Create policy for clients to create reviews
CREATE POLICY "Clients can create reviews"
  ON public.escort_reviews
  FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = client_id);

-- Create policy for clients to update their own reviews
CREATE POLICY "Clients can update their own reviews"
  ON public.escort_reviews
  FOR UPDATE
  TO authenticated
  USING (auth.uid() = client_id);

-- Create escort booking table
CREATE TABLE IF NOT EXISTS public.escort_bookings (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  escort_id UUID REFERENCES public.escorts(id) ON DELETE CASCADE,
  client_id UUID REFERENCES auth.users(id),
  client_name TEXT,
  date DATE NOT NULL,
  start_time TIME NOT NULL,
  end_time TIME NOT NULL,
  duration INTEGER NOT NULL,
  service TEXT NOT NULL,
  location TEXT,
  status TEXT DEFAULT 'pending',
  price INTEGER NOT NULL,
  is_paid BOOLEAN DEFAULT false,
  payment_method TEXT,
  special_requests TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

-- Enable Row Level Security
ALTER TABLE public.escort_bookings ENABLE ROW LEVEL SECURITY;

-- Create policy for escorts to view bookings for their profile
CREATE POLICY "Escorts can view their bookings"
  ON public.escort_bookings
  FOR SELECT
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 
      FROM public.escorts 
      WHERE id = escort_id 
      AND user_id = auth.uid()
    )
  );

-- Create policy for clients to view their own bookings
CREATE POLICY "Clients can view their own bookings"
  ON public.escort_bookings
  FOR SELECT
  TO authenticated
  USING (auth.uid() = client_id);

-- Create policy for clients to create bookings
CREATE POLICY "Clients can create bookings"
  ON public.escort_bookings
  FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = client_id);

-- Add verification_status field to profiles if not exists
ALTER TABLE IF EXISTS public.profiles
ADD COLUMN IF NOT EXISTS verification_status TEXT DEFAULT 'none';
