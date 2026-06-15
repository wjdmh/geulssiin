-- 어드민 ↔ 로컬 에이전트(글씨인 비서/오케스트레이터) 비동기 지시 큐
-- 웹(어드민)은 행을 INSERT/SELECT만, 실행은 로컬 워커가 service_role로 처리한다.
-- 보안: RLS로 관리자만 접근. 워커는 service_role 키라 RLS를 우회한다.

create table if not exists public.agent_jobs (
  id          uuid primary key default gen_random_uuid(),
  created_at  timestamptz not null default now(),
  updated_at  timestamptz not null default now(),
  created_by  uuid references auth.users(id) on delete set null,
  kind        text not null default 'chat',          -- chat | campaign | retro
  prompt      text not null,
  status      text not null default 'pending'         -- pending | running | done | error
              check (status in ('pending','running','done','error')),
  reply       text,                                    -- 최종 답변(사람이 읽는 텍스트)
  events      jsonb not null default '[]'::jsonb       -- 도구 호출·결과 등 진행 로그
);

create index if not exists agent_jobs_status_idx on public.agent_jobs (status, created_at);
create index if not exists agent_jobs_created_idx on public.agent_jobs (created_at desc);

-- updated_at 자동 갱신
create or replace function public.touch_agent_jobs()
returns trigger language plpgsql as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

drop trigger if exists agent_jobs_touch on public.agent_jobs;
create trigger agent_jobs_touch before update on public.agent_jobs
  for each row execute function public.touch_agent_jobs();

-- ── RLS: 관리자만 ──
alter table public.agent_jobs enable row level security;

drop policy if exists "admin can read agent_jobs" on public.agent_jobs;
create policy "admin can read agent_jobs"
  on public.agent_jobs for select
  using (public.is_admin());

drop policy if exists "admin can insert agent_jobs" on public.agent_jobs;
create policy "admin can insert agent_jobs"
  on public.agent_jobs for insert
  with check (public.is_admin() and created_by = auth.uid());

drop policy if exists "admin can update agent_jobs" on public.agent_jobs;
create policy "admin can update agent_jobs"
  on public.agent_jobs for update
  using (public.is_admin());

drop policy if exists "admin can delete agent_jobs" on public.agent_jobs;
create policy "admin can delete agent_jobs"
  on public.agent_jobs for delete
  using (public.is_admin());

-- ── 실시간 구독 ──
-- (이미 추가돼 있으면 무시되도록 안전하게 시도)
do $$
begin
  begin
    alter publication supabase_realtime add table public.agent_jobs;
  exception when duplicate_object then null;
  end;
end$$;
