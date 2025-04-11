
-- Create the IOTA recharge sessions table
CREATE TABLE public.iota_recharge_sessions (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  address TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now() NOT NULL,
  expires_at TIMESTAMP WITH TIME ZONE DEFAULT (now() + interval '24 hours') NOT NULL,
  status TEXT NOT NULL DEFAULT 'pending',
  amount_received NUMERIC DEFAULT 0,
  transaction_hash TEXT,
  completed_at TIMESTAMP WITH TIME ZONE,
  ubx_credited NUMERIC DEFAULT 0
);

-- Add indexes for performance
CREATE INDEX idx_iota_recharge_sessions_user_id ON public.iota_recharge_sessions(user_id);
CREATE INDEX idx_iota_recharge_sessions_address ON public.iota_recharge_sessions(address);
CREATE INDEX idx_iota_recharge_sessions_status ON public.iota_recharge_sessions(status);

-- Add RLS policies
ALTER TABLE public.iota_recharge_sessions ENABLE ROW LEVEL SECURITY;

-- Users can view their own recharge sessions
CREATE POLICY "Users can view own recharge sessions" 
ON public.iota_recharge_sessions FOR SELECT 
USING (auth.uid() = user_id);

-- Only the service role can insert/update recharge sessions
CREATE POLICY "Service role can manage recharge sessions"
ON public.iota_recharge_sessions FOR ALL
USING (auth.jwt() ->> 'role' = 'service_role')
WITH CHECK (auth.jwt() ->> 'role' = 'service_role');

-- Create function to process IOTA transactions
CREATE OR REPLACE FUNCTION public.process_iota_transaction(
  p_address TEXT,
  p_amount NUMERIC,
  p_transaction_hash TEXT
) RETURNS JSONB
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
DECLARE
  v_session RECORD;
  v_ubx_amount NUMERIC;
  v_response JSONB;
BEGIN
  -- Find the recharge session for this address
  SELECT * INTO v_session
  FROM public.iota_recharge_sessions
  WHERE address = p_address
    AND status = 'pending'
    AND expires_at > now();
    
  IF NOT FOUND THEN
    RETURN jsonb_build_object(
      'success', false,
      'message', 'No active recharge session found for this address'
    );
  END IF;
  
  -- Convert IOTA to UBX (using 5:1 conversion rate)
  v_ubx_amount := p_amount * 5;
  
  -- Update the recharge session
  UPDATE public.iota_recharge_sessions
  SET 
    status = 'completed',
    amount_received = p_amount,
    transaction_hash = p_transaction_hash,
    completed_at = now(),
    ubx_credited = v_ubx_amount
  WHERE id = v_session.id;
  
  -- Credit the user's UBX balance
  UPDATE public.profiles
  SET lucoin_balance = lucoin_balance + v_ubx_amount
  WHERE id = v_session.user_id;
  
  -- Record the transaction
  INSERT INTO public.lucoin_transactions (
    user_id,
    amount,
    transaction_type,
    description,
    metadata
  ) VALUES (
    v_session.user_id,
    v_ubx_amount,
    'deposit',
    'UBX deposit via IOTA',
    jsonb_build_object(
      'txHash', p_transaction_hash,
      'network', 'iota',
      'address', p_address,
      'originalAmount', p_amount,
      'conversionRate', 5
    )
  );
  
  RETURN jsonb_build_object(
    'success', true,
    'user_id', v_session.user_id,
    'ubx_credited', v_ubx_amount
  );
END;
$$;

-- Create function to generate a new recharge session
CREATE OR REPLACE FUNCTION public.create_iota_recharge_session(
  p_user_id UUID,
  p_address TEXT
) RETURNS UUID
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
DECLARE
  v_session_id UUID;
BEGIN
  -- Create a new recharge session
  INSERT INTO public.iota_recharge_sessions (
    user_id,
    address
  ) VALUES (
    p_user_id,
    p_address
  ) RETURNING id INTO v_session_id;
  
  RETURN v_session_id;
END;
$$;
