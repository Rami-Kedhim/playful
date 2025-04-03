
-- Create table for Solana wallets if it doesn't exist
CREATE TABLE IF NOT EXISTS public.solana_wallets (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  wallet_address TEXT NOT NULL,
  is_primary BOOLEAN DEFAULT false,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
  last_used_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

-- Create index on user_id for faster lookups
CREATE INDEX IF NOT EXISTS solana_wallets_user_id_idx ON public.solana_wallets(user_id);

-- Create unique constraint on wallet address per user
ALTER TABLE public.solana_wallets
  DROP CONSTRAINT IF EXISTS solana_wallets_user_id_wallet_address_key;
ALTER TABLE public.solana_wallets
  ADD CONSTRAINT solana_wallets_user_id_wallet_address_key UNIQUE (user_id, wallet_address);

-- Create table for Lucoin package options if it doesn't exist
CREATE TABLE IF NOT EXISTS public.lucoin_package_options (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  amount INTEGER NOT NULL,
  price_sol NUMERIC,
  bonus_amount INTEGER DEFAULT 0,
  is_featured BOOLEAN DEFAULT false,
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

-- Insert default packages if table is empty
INSERT INTO public.lucoin_package_options (name, amount, price_sol, bonus_amount, is_featured)
SELECT 'Basic Pack', 100, 0.05, 0, false
WHERE NOT EXISTS (SELECT 1 FROM public.lucoin_package_options LIMIT 1);

INSERT INTO public.lucoin_package_options (name, amount, price_sol, bonus_amount, is_featured)
SELECT 'Standard Pack', 500, 0.2, 50, true
WHERE NOT EXISTS (SELECT 1 FROM public.lucoin_package_options WHERE name = 'Standard Pack');

INSERT INTO public.lucoin_package_options (name, amount, price_sol, bonus_amount, is_featured)
SELECT 'Premium Pack', 1000, 0.35, 150, false
WHERE NOT EXISTS (SELECT 1 FROM public.lucoin_package_options WHERE name = 'Premium Pack');

-- Add Row Level Security (RLS) to ensure users can only see their own wallets
ALTER TABLE public.solana_wallets ENABLE ROW LEVEL SECURITY;

-- Create policy that allows users to SELECT their own wallets
CREATE POLICY "Users can view their own wallets" 
  ON public.solana_wallets 
  FOR SELECT 
  USING (auth.uid() = user_id);

-- Create policy that allows users to INSERT their own wallets
CREATE POLICY "Users can create their own wallets" 
  ON public.solana_wallets 
  FOR INSERT 
  WITH CHECK (auth.uid() = user_id);

-- Create policy that allows users to UPDATE their own wallets
CREATE POLICY "Users can update their own wallets" 
  ON public.solana_wallets 
  FOR UPDATE 
  USING (auth.uid() = user_id);

-- Create policy that allows users to DELETE their own wallets
CREATE POLICY "Users can delete their own wallets" 
  ON public.solana_wallets 
  FOR DELETE 
  USING (auth.uid() = user_id);
