-- ==========================================
-- SITE CONFIG TABLE (For Dynamic Text)
-- ==========================================

create table if not exists public.site_config (
  key text primary key,
  value text,
  description text
);

alter table public.site_config enable row level security;

-- Policies
drop policy if exists "Config viewable by everyone" on site_config;
create policy "Config viewable by everyone" on site_config for select using ( true );

drop policy if exists "Only admin can update config" on site_config;
create policy "Only admin can update config" on site_config for update
  using ( exists ( select 1 from profiles where id = auth.uid() and is_admin = true ) )
  with check ( exists ( select 1 from profiles where id = auth.uid() and is_admin = true ) );

-- Insert Initial Data (Idempotent)
insert into public.site_config (key, value, description)
values
  ('hero_title', '예술이 되는 글씨, 감성이 되는 그림', '메인 화면 큰 문구'),
  ('hero_subtitle', '글씨인아트센터', '메인 화면 작은 문구'),
  ('about_title', '여백 속에 담긴 묵직한 울림', '소개 페이지 제목'),
  ('about_content', '글씨인아트센터는 전통 서예의 깊이와 현대적 감각을 잇는 예술 공간입니다.\n\n붓끝에서 피어나는 기록...\n(관리자 페이지에서 수정하세요)', '소개 페이지 본문')
on conflict (key) do nothing;
