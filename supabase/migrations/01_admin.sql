-- Create agent_config table
CREATE TABLE public.agent_config (
  id integer PRIMARY KEY DEFAULT 1,
  prompt text NOT NULL DEFAULT 'A Pokémon card deal has been found! Write a short, hype tweet about this underpriced card.'
);

-- Ensure there is only ever one row for config
ALTER TABLE public.agent_config ADD CONSTRAINT single_row CHECK (id = 1);
INSERT INTO public.agent_config (id) VALUES (1) ON CONFLICT DO NOTHING;

-- Create agent_logs table
CREATE TABLE public.agent_logs (
  id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
  card_name text NOT NULL,
  set_name text NOT NULL,
  target_price numeric NOT NULL,
  actual_price numeric NOT NULL,
  tweet_text text,
  tweet_url text,
  created_at timestamp with time zone DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- Create user_roles table to determine admins
CREATE TABLE public.user_roles (
  user_id uuid REFERENCES auth.users(id) ON DELETE CASCADE PRIMARY KEY,
  role text NOT NULL DEFAULT 'user'
);

-- Enable RLS
ALTER TABLE public.agent_config ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.agent_logs ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.user_roles ENABLE ROW LEVEL SECURITY;

-- Only admins can read/write agent_config
CREATE POLICY "Admins can manage agent config" ON public.agent_config
  USING (EXISTS (SELECT 1 FROM public.user_roles WHERE user_id = auth.uid() AND role = 'admin'));

-- Only admins can read agent_logs
CREATE POLICY "Admins can view agent logs" ON public.agent_logs
  FOR SELECT USING (EXISTS (SELECT 1 FROM public.user_roles WHERE user_id = auth.uid() AND role = 'admin'));

-- Only admins can read user_roles
CREATE POLICY "Admins can view roles" ON public.user_roles
  FOR SELECT USING (EXISTS (SELECT 1 FROM public.user_roles WHERE user_id = auth.uid() AND role = 'admin'));

-- The background agent (using Service Role Key) will bypass RLS automatically.
