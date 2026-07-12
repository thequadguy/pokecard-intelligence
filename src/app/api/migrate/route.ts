import { NextResponse } from 'next/server';
import { Client } from 'pg';

export async function GET() {
  const connectionString = 'postgresql://postgres:Xah47ePvtHcKmsBT@db.oiljhflysimhcwhbjish.supabase.co:5432/postgres';
  
  const sql = `
-- 1. Create collections table
CREATE TABLE IF NOT EXISTS public.collections (
  id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id uuid REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  card_id text NOT NULL,
  card_name text NOT NULL,
  set_name text NOT NULL,
  image_url text,
  condition text DEFAULT 'Ungraded',
  purchase_price numeric,
  created_at timestamp with time zone DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- 2. Create watchlists table
CREATE TABLE IF NOT EXISTS public.watchlists (
  id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id uuid REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  card_id text NOT NULL,
  card_name text NOT NULL,
  set_name text NOT NULL,
  image_url text,
  target_price numeric NOT NULL,
  alert_active boolean DEFAULT true,
  created_at timestamp with time zone DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- 3. Enable Row Level Security (RLS)
ALTER TABLE public.collections ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.watchlists ENABLE ROW LEVEL SECURITY;

-- 4. Create Policies for collections (ignore if exist)
DO $$
BEGIN
    IF NOT EXISTS (SELECT 1 FROM pg_policies WHERE policyname = 'Users can view their own collection') THEN
        CREATE POLICY "Users can view their own collection" ON public.collections FOR SELECT USING (auth.uid() = user_id);
        CREATE POLICY "Users can insert into their own collection" ON public.collections FOR INSERT WITH CHECK (auth.uid() = user_id);
        CREATE POLICY "Users can update their own collection" ON public.collections FOR UPDATE USING (auth.uid() = user_id);
        CREATE POLICY "Users can delete from their own collection" ON public.collections FOR DELETE USING (auth.uid() = user_id);
    END IF;
END
$$;

-- 5. Create Policies for watchlists (ignore if exist)
DO $$
BEGIN
    IF NOT EXISTS (SELECT 1 FROM pg_policies WHERE policyname = 'Users can view their own watchlist') THEN
        CREATE POLICY "Users can view their own watchlist" ON public.watchlists FOR SELECT USING (auth.uid() = user_id);
        CREATE POLICY "Users can insert into their own watchlist" ON public.watchlists FOR INSERT WITH CHECK (auth.uid() = user_id);
        CREATE POLICY "Users can update their own watchlist" ON public.watchlists FOR UPDATE USING (auth.uid() = user_id);
        CREATE POLICY "Users can delete from their own watchlist" ON public.watchlists FOR DELETE USING (auth.uid() = user_id);
    END IF;
END
$$;
  `;

  const client = new Client({
    connectionString,
    ssl: { rejectUnauthorized: false },
    connectionTimeoutMillis: 10000,
  });

  try {
    await client.connect();
    await client.query(sql);
    await client.end();
    return NextResponse.json({ success: true, message: "Migration completed successfully" });
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}
