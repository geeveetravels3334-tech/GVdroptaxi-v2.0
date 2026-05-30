-- SQL Script to initialize Supabase database for GVdroptaxi

-- 1. Create Drivers Table
CREATE TABLE IF NOT EXISTS public.drivers (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    name TEXT NOT NULL,
    mobile TEXT NOT NULL,
    license TEXT,
    vehicle_model TEXT,
    vehicle_number TEXT,
    status TEXT DEFAULT 'available',
    joined_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()),
    total_trips INTEGER DEFAULT 0
);

-- 2. Create Bookings Table
CREATE TABLE IF NOT EXISTS public.bookings (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    booking_display_id TEXT UNIQUE NOT NULL,
    service_type TEXT NOT NULL,
    pickup_location TEXT NOT NULL,
    drop_location TEXT NOT NULL,
    pickup_date TEXT,
    return_date TEXT,
    pickup_time TEXT,
    mobile TEXT NOT NULL,
    customer_name TEXT,
    vehicle TEXT,
    price TEXT,
    applied_referral_code TEXT,
    discount_amount NUMERIC(10,2) DEFAULT 0,
    status TEXT DEFAULT 'pending',
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()),
    assigned_driver JSONB
);

-- 3. Create Customers Table for Loyalty & Referrals
CREATE TABLE IF NOT EXISTS public.customers (
    mobile TEXT PRIMARY KEY,
    name TEXT,
    email TEXT,
    referral_code TEXT UNIQUE,
    referred_by TEXT,
    total_points INTEGER DEFAULT 0,
    redeemed_points INTEGER DEFAULT 0,
    loyalty_tier TEXT DEFAULT 'Silver',
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now())
);

-- 4. Create Referral History Table
CREATE TABLE IF NOT EXISTS public.referrals (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    referrer_mobile TEXT NOT NULL,
    referred_mobile TEXT NOT NULL UNIQUE,
    points_awarded INTEGER DEFAULT 0,
    status TEXT DEFAULT 'pending',
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now())
);

-- 5. Create Reviews Table
CREATE TABLE IF NOT EXISTS public.reviews (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    booking_id TEXT NOT NULL,
    customer_mobile TEXT NOT NULL,
    customer_name TEXT NOT NULL,
    rating INTEGER NOT NULL CHECK (rating >= 1 AND rating <= 5),
    title TEXT,
    comment TEXT,
    route TEXT,
    status TEXT DEFAULT 'pending', -- pending, approved, rejected
    is_featured BOOLEAN DEFAULT false,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now())
);

-- 6. Set up Row Level Security (RLS)
-- We will enable RLS but set up permissive policies to allow your app's frontend 
-- to read/write using the ANON KEY. For production, you may want to restrict this.
ALTER TABLE public.drivers ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.bookings ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.customers ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.referrals ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.reviews ENABLE ROW LEVEL SECURITY;

-- Allow all operations for now (Since the platform relies on the frontend client)
CREATE POLICY "Allow all access to drivers" ON public.drivers FOR ALL USING (true);
CREATE POLICY "Allow all access to bookings" ON public.bookings FOR ALL USING (true);
CREATE POLICY "Allow all access to customers" ON public.customers FOR ALL USING (true);
CREATE POLICY "Allow all access to referrals" ON public.referrals FOR ALL USING (true);
CREATE POLICY "Allow all access to reviews" ON public.reviews FOR ALL USING (true);

