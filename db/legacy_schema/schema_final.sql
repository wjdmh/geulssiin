-- ==========================================
-- FINAL SCHEMA UPDATE (Includes Name, Birthdate, Admin Fixes)
-- ==========================================

-- 1. Update Profiles Table
do $$
begin
    if not exists (select 1 from information_schema.columns where table_name = 'profiles' and column_name = 'name') then
        alter table public.profiles add column name text;
    end if;
    if not exists (select 1 from information_schema.columns where table_name = 'profiles' and column_name = 'birthdate') then
        alter table public.profiles add column birthdate text;
    end if;
end $$;

-- 2. Fix Admin Permissions (Crucial for User Management)
drop policy if exists "Admins can update any profile" on profiles;
create policy "Admins can update any profile"
  on profiles for update
  using ( exists ( select 1 from profiles where id = auth.uid() and is_admin = true ) );

-- 3. Update Trigger for New Fields
create or replace function public.handle_new_user()
returns trigger as $$
begin
  insert into public.profiles (id, email, role, join_motivation, referral_source, is_admin, name, birthdate)
  values (
    new.id,
    new.email,
    COALESCE(new.raw_user_meta_data->>'role', 'user'),
    new.raw_user_meta_data->>'join_motivation',
    new.raw_user_meta_data->>'referral_source',
    false,
    new.raw_user_meta_data->>'name',
    new.raw_user_meta_data->>'birthdate'
  );
  return new;
end;
$$ language plpgsql security definer;

-- 4. Ensure Gallery Admin Policies (Delete)
drop policy if exists "Only admin can delete gallery" on gallery;
create policy "Only admin can delete gallery" on gallery for delete
  using ( exists ( select 1 from profiles where id = auth.uid() and is_admin = true ) );

-- 5. Ensure Schedule Admin Policies
drop policy if exists "Only admin can update schedule" on schedule;
create policy "Only admin can update schedule" on schedule for update
  using ( exists ( select 1 from profiles where id = auth.uid() and is_admin = true ) )
  with check ( exists ( select 1 from profiles where id = auth.uid() and is_admin = true ) );
