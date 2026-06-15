-- 회원 개인정보(PII) 잠금 + 게시글 작성자 스냅샷
-- 적용일: 2026-06-15 (Supabase project: wwtokoyhnfhwyarzmahj)
-- 목적:
--   1) profiles 테이블이 "전체 공개 SELECT"라 익명 키로도 회원 이름/이메일/생년월일이
--      조회되던 개인정보 노출을 차단한다(본인+관리자만 조회).
--   2) 게시판이 작성자 표시를 위해 profiles를 조인하던 의존을 끊고,
--      posts에 author_name/author_role 스냅샷을 저장하도록 한다.

-- 1) 재귀 안전 admin 판정 함수 (RLS 우회 — 정책 안에서 profiles를 직접 참조하면 무한재귀)
create or replace function public.is_admin()
returns boolean
language sql
security definer
set search_path = public
as $$
  select coalesce((select is_admin from public.profiles where id = auth.uid()), false);
$$;
revoke all on function public.is_admin() from public;
grant execute on function public.is_admin() to anon, authenticated;

-- 2) 게시글 작성자 스냅샷 컬럼
alter table public.posts add column if not exists author_name text;
alter table public.posts add column if not exists author_role text;

-- 3) 기존 글 백필 (profiles에서 이름/역할 복사)
update public.posts p set
  author_name = coalesce(pr.name, split_part(pr.email, '@', 1), '익명'),
  author_role = pr.role
from public.profiles pr
where p.author_id = pr.id and p.author_name is null;

-- 4) profiles 개인정보 잠금: 전체공개 SELECT 정책 제거 → 본인+관리자만
drop policy if exists "Public profiles are viewable by everyone." on public.profiles;
create policy "Own profile or admin can view profiles"
  on public.profiles for select
  using (auth.uid() = id or public.is_admin());
