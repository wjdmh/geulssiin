-- Add access_level to posts
DO $$
BEGIN
    IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'posts' AND column_name = 'access_level') THEN
        ALTER TABLE public.posts ADD COLUMN access_level text DEFAULT 'general';
    END IF;
END $$;

-- Update RLS for Posts
DROP POLICY IF EXISTS "Posts are viewable by members" ON posts;
DROP POLICY IF EXISTS "Members can create posts" ON posts;
DROP POLICY IF EXISTS "Users can update own posts" ON posts;
DROP POLICY IF EXISTS "Users can delete own posts" ON posts;

-- New SELECT Policy
CREATE POLICY "View posts based on access level" ON posts FOR SELECT
USING (
  (access_level = 'general' AND auth.role() = 'authenticated') OR
  (access_level = 'student' AND exists (
      select 1 from profiles 
      where id = auth.uid() 
      and (role = 'student' or is_admin = true)
  )) OR
  (exists (select 1 from profiles where id = auth.uid() and is_admin = true))
);

-- New WRITE Policies (Admin Only)
CREATE POLICY "Admins can insert posts" ON posts FOR INSERT
WITH CHECK ( exists (select 1 from profiles where id = auth.uid() and is_admin = true) );

CREATE POLICY "Admins can update posts" ON posts FOR UPDATE
USING ( exists (select 1 from profiles where id = auth.uid() and is_admin = true) );

CREATE POLICY "Admins can delete posts" ON posts FOR DELETE
USING ( exists (select 1 from profiles where id = auth.uid() and is_admin = true) );
