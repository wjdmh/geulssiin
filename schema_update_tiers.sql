-- Add new columns to profiles
DO $$
BEGIN
    IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'profiles' AND column_name = 'role') THEN
        ALTER TABLE public.profiles ADD COLUMN role text DEFAULT 'user';
    END IF;
    IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'profiles' AND column_name = 'join_motivation') THEN
        ALTER TABLE public.profiles ADD COLUMN join_motivation text;
    END IF;
    IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'profiles' AND column_name = 'referral_source') THEN
        ALTER TABLE public.profiles ADD COLUMN referral_source text;
    END IF;
END $$;

-- Update the handle_new_user function to map metadata
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS trigger AS $$
BEGIN
  INSERT INTO public.profiles (id, email, role, join_motivation, referral_source, is_admin)
  VALUES (
    new.id,
    new.email,
    COALESCE(new.raw_user_meta_data->>'role', 'user'),
    new.raw_user_meta_data->>'join_motivation',
    new.raw_user_meta_data->>'referral_source',
    false -- always default to false for security, admin must set manually
  );
  RETURN new;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;
