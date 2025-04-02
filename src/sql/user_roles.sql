
-- Create user role type
CREATE TYPE user_role AS ENUM ('user', 'escort', 'creator', 'admin', 'moderator');

-- Create user roles table
CREATE TABLE IF NOT EXISTS public.user_roles (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  role user_role NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  UNIQUE(user_id, role)
);

-- Enable RLS on the user_roles table
ALTER TABLE public.user_roles ENABLE ROW LEVEL SECURITY;

-- Only allow administrators to manage roles directly
CREATE POLICY "Admins can manage all roles" 
ON public.user_roles 
FOR ALL 
TO authenticated 
USING (
  EXISTS (
    SELECT 1 FROM public.user_roles
    WHERE user_id = auth.uid() AND role = 'admin'
  )
);

-- Allow users to view their own roles
CREATE POLICY "Users can view their own roles" 
ON public.user_roles 
FOR SELECT 
TO authenticated 
USING (user_id = auth.uid());

-- Create a function to check if a user has a specific role
CREATE OR REPLACE FUNCTION public.has_role(user_id UUID, role_name user_role)
RETURNS BOOLEAN
LANGUAGE SQL
STABLE
SECURITY DEFINER
SET search_path = ''
AS $$
  SELECT EXISTS (
    SELECT 1 FROM public.user_roles
    WHERE user_roles.user_id = user_id
    AND user_roles.role = role_name
  );
$$;

-- Create a trigger function to assign default role to new users
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
BEGIN
  -- Create initial profile
  INSERT INTO public.profiles (id, email, username)
  VALUES (NEW.id, NEW.email, NEW.raw_user_meta_data->>'username');
  
  -- Assign default user role
  INSERT INTO public.user_roles (user_id, role)
  VALUES (NEW.id, 'user');
  
  -- Assign additional role if specified in metadata
  IF NEW.raw_user_meta_data->>'user_type' = 'escort' THEN
    INSERT INTO public.user_roles (user_id, role)
    VALUES (NEW.id, 'escort');
  ELSIF NEW.raw_user_meta_data->>'user_type' = 'creator' THEN
    INSERT INTO public.user_roles (user_id, role)
    VALUES (NEW.id, 'creator');
  END IF;
  
  RETURN NEW;
END;
$$;

-- Create or replace the trigger
DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();
