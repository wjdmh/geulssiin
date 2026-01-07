-- ==========================================
-- FIX: Schedule Insert Error & Schema Cleanup
-- ==========================================

-- 1. Remove the legacy 'time_range' column requirement
-- The previous version of 'classes' table had 'time_range' as NOT NULL.
-- Since we now use 'start_time' and 'end_time', we should remove 'time_range'.
DO $$
BEGIN
    IF EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'classes' AND column_name = 'time_range') THEN
        ALTER TABLE public.classes DROP COLUMN time_range;
    END IF;
END $$;

-- 2. Ensure 'start_time' and 'end_time' are NOT NULL (just in case)
ALTER TABLE public.classes ALTER COLUMN start_time SET DEFAULT '00:00';
ALTER TABLE public.classes ALTER COLUMN end_time SET DEFAULT '00:00';

-- 3. Verify 'is_notice' column exists for posts (Idempotent check)
DO $$
BEGIN
    IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'posts' AND column_name = 'is_notice') THEN
        ALTER TABLE public.posts ADD COLUMN is_notice boolean DEFAULT false;
    END IF;
END $$;
