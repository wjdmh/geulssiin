-- ==========================================
-- FIX: Enable Cascading Deletes for User Removal
-- ==========================================

-- 1. Posts: Drop and Re-add Constraint
ALTER TABLE public.posts
DROP CONSTRAINT IF EXISTS posts_author_id_fkey;

ALTER TABLE public.posts
ADD CONSTRAINT posts_author_id_fkey
FOREIGN KEY (author_id)
REFERENCES public.profiles(id)
ON DELETE CASCADE;

-- 2. Comments: Drop and Re-add Constraint
ALTER TABLE public.comments
DROP CONSTRAINT IF EXISTS comments_author_id_fkey;

ALTER TABLE public.comments
ADD CONSTRAINT comments_author_id_fkey
FOREIGN KEY (author_id)
REFERENCES public.profiles(id)
ON DELETE CASCADE;

-- 3. Schedule: Drop and Re-add Constraint
ALTER TABLE public.schedule
DROP CONSTRAINT IF EXISTS schedule_updated_by_fkey;

ALTER TABLE public.schedule
ADD CONSTRAINT schedule_updated_by_fkey
FOREIGN KEY (updated_by)
REFERENCES public.profiles(id)
ON DELETE SET NULL; -- Schedule shouldn't be deleted if admin leaves, just unset author

-- 4. Gallery: Usually no user ref, but check if needed (schema has no user ref for gallery, checked previously)
-- (Gallery uses auth.uid() in policies but doesn't store author_id in schema provided earlier)
