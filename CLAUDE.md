# CLAUDE.md — 글씨인 아트센터 프로젝트

## 프로젝트 개요

글씨인 아트센터(Geulssiin Art Center) 공식 웹사이트. 캘리그라피·펜드로잉·서예 클래스를 운영하는 KCDA 인증 교육기관의 풀스택 웹 애플리케이션.

주요 기능: 메인 랜딩 페이지, 갤러리, 수업 일정, 게시판, 관리자 대시보드(회원/갤러리/시간표/텍스트 관리).

---

## 기술 스택

| 영역 | 기술 |
|------|------|
| 프레임워크 | Next.js 16 (App Router, TypeScript) |
| UI 라이브러리 | React 19 |
| 스타일링 | Tailwind CSS v4 (utility-first, CSS 모듈 없음) |
| 애니메이션 | Framer Motion 12 |
| 3D 렌더링 | Three.js + @react-three/fiber + @react-three/drei |
| 아이콘 | Lucide React |
| 클래스 병합 | clsx + tailwind-merge (`cn()` 유틸리티) |
| 백엔드/DB | Supabase (PostgreSQL + RLS) |
| 인증 | Supabase Auth + SSR 미들웨어 |
| 배포 | Vercel |
| Node.js | 22 (로컬 `.nvmrc`) / 24.x (Vercel 런타임) |

---

## 디렉토리 구조

```
src/
  app/           # Next.js App Router 페이지 및 API 라우트
    admin/       # 관리자 대시보드 (보호된 라우트)
    auth/        # 인증 콜백/로그아웃
    board/       # 게시판 (목록, 작성, 상세)
    class/       # 수업 안내
    gallery/     # 갤러리
    about/       # 센터 소개
    login/       # 로그인
    api/         # API 라우트 핸들러
  components/    # 재사용 가능한 React 컴포넌트
  lib/
    supabase/    # 클라이언트/서버 Supabase 인스턴스
    utils.ts     # cn() 등 유틸리티
    data.ts      # 정적 데이터
    getSiteConfig.ts
public/          # 정적 에셋 (이미지, SVG)
migrations/      # DB 마이그레이션 SQL
```

---

## 코딩 컨벤션

### 컴포넌트
- **PascalCase** 파일명: `Hero.tsx`, `Navbar.tsx`
- 클라이언트 컴포넌트는 파일 최상단에 `"use client"` 명시
- 서버 컴포넌트가 기본값 — 불필요하게 `"use client"` 추가 금지
- Props는 `interface`로 정의, 컴포넌트 바로 위에 위치

```tsx
interface ComponentProps {
  title?: string;
  subtitle?: string;
}

export function ComponentName({ title = "기본값" }: ComponentProps) {
  return <div>{title}</div>;
}
```

### 스타일링
- Tailwind 유틸리티 클래스만 사용 (CSS 모듈, CSS-in-JS 금지)
- 클래스 병합 시 반드시 `cn()` 사용 (`src/lib/utils.ts`)
- 반응형: `sm:` / `md:` / `lg:` 순서로 작성
- 글로벌 커스텀 CSS는 `globals.css`에만 작성

### 네이밍
- 컴포넌트: PascalCase
- 함수/변수/훅: camelCase
- 상수: SCREAMING_SNAKE_CASE
- 경로 별칭: `@/*` → `src/*` (절대경로 사용 권장)

### TypeScript
- strict 모드 활성화 — `any` 사용 금지
- 모든 컴포넌트 props에 타입 명시
- `as unknown as X` 같은 강제 캐스팅 최소화

### Supabase
- 클라이언트 사이드: `src/lib/supabase/client.ts`
- 서버 사이드: `src/lib/supabase/server.ts`
- RLS(Row Level Security) 정책을 항상 확인 후 쿼리 작성
- 민감한 서버 전용 키는 환경 변수에서만 참조

---

## context7 참조 규칙

**코드 관련 질문이나 구현 시 반드시 context7을 먼저 참조할 것.**

특히 다음 상황에서 context7로 최신 공식 문서 확인:
- Next.js App Router API (라우트 핸들러, 서버 액션, 미들웨어 등)
- Supabase SDK (인증, 스토리지, RLS 정책)
- Tailwind CSS v4 유틸리티
- Framer Motion API
- React 19 신규 기능 (use, Server Actions 등)

---

## 커밋 메시지 규칙

```
<type>: <한국어 또는 영어 짧은 설명>
```

| type | 용도 |
|------|------|
| `feat` | 새로운 기능 추가 |
| `fix` | 버그 수정 |
| `style` | UI/CSS 변경 (로직 무관) |
| `refactor` | 리팩토링 (기능 변경 없음) |
| `chore` | 설정, 패키지, 빌드 관련 |
| `docs` | 문서 변경 |
| `content` | 텍스트/이미지 등 콘텐츠 수정 |

**예시:**
```
feat: 관리자 갤러리 이미지 삭제 기능 추가
fix: 모바일 메뉴 닫힘 버그 수정
style: 히어로 섹션 다크 오버레이 강도 조정
chore: package.json 의존성 업데이트
```

- 제목 50자 이하
- 본문이 필요한 경우 빈 줄 후 추가
- 현재 시제 사용

---

## 프로젝트 연결 정보

| 서비스 | 이름 / ID |
|--------|-----------|
| GitHub 레포지토리 | [`wjdmh/geulssiin`](https://github.com/wjdmh/geulssiin) |
| Supabase 프로젝트 ID | `wwtokoyhnfhwyarzmahj` |
| Supabase URL | `https://wwtokoyhnfhwyarzmahj.supabase.co` |
| Vercel 프로젝트명 | `geulssiin` |
| Vercel 프로젝트 ID | `prj_wHS3NUus3HFO2WsZz3e0ly3ljIDm` |
| Vercel 팀 | `muhyun-jeongs-projects` (`team_2SPJZHMAouj1Ggu0BzHDmM0X`) |
| Vercel 도메인 | `geulssiin.com`, `geulssiin.vercel.app` |
| Vercel Node.js 버전 | `24.x` |
| 로컬 Node.js 버전 | `22` (`.nvmrc` 기준) |

---

## 배포 방식 및 주의사항

### 배포 환경
- **플랫폼:** Vercel (Next.js 공식 지원)
- **GitHub 연동:** `wjdmh/geulssiin` 레포의 `main` 브랜치 push → 자동 프로덕션 배포

### 배포 전 체크리스트
- [ ] `npm run build` 로컬에서 성공 확인
- [ ] `npm run lint` 오류 없음 확인
- [ ] 환경 변수 Vercel 대시보드에 등록 확인
- [ ] Supabase RLS 정책 검토
- [ ] 이미지 최적화 — `next/image` 사용 여부 확인
- [ ] `next.config.ts`의 `remotePatterns`에 새 이미지 도메인 추가 여부 확인

### 환경 변수
```
NEXT_PUBLIC_SUPABASE_URL=        # Supabase 프로젝트 URL (공개)
NEXT_PUBLIC_SUPABASE_ANON_KEY=   # Supabase anon 키 (공개, publishable)
```
- `NEXT_PUBLIC_` 접두사 변수는 클라이언트에 노출됨 — 민감 정보 절대 금지
- 서버 전용 민감 키는 `NEXT_PUBLIC_` 없이 선언하고 서버 컴포넌트/라우트 핸들러에서만 사용

### 주의사항
- `main` 브랜치에 직접 force push 금지
- `.env.local` 파일은 git에 올리지 않음 (`.gitignore` 확인)
- 관리자 라우트(`/admin/*`)는 미들웨어에서 인증 처리 — 수정 시 `src/middleware.ts` 반드시 확인

---

## 자주 쓰는 명령어

```bash
# 개발 서버 시작
npm run dev

# 프로덕션 빌드 (배포 전 반드시 확인)
npm run build

# 프로덕션 서버 로컬 실행
npm run start

# 린트 검사
npm run lint

# 의존성 설치
npm install

# 특정 패키지 추가
npm install <package-name>

# Supabase 마이그레이션 (migrations/ 디렉토리 참고)
# Supabase CLI 설치 후 사용
supabase db push
```

---

## CLAUDE.md 자동 업데이트 규칙

이 파일은 프로젝트의 살아있는 문서다. 아래 상황에서 **Claude가 자동으로 업데이트**한다:

| 트리거 | 업데이트 내용 |
|--------|-------------|
| 새로운 패키지/라이브러리 추가 | 기술 스택 표 갱신 |
| 환경 변수 추가/변경 | 환경 변수 섹션 갱신 |
| Vercel/Supabase/GitHub 프로젝트 정보 확인 | 프로젝트 연결 정보 갱신 |
| 코딩 컨벤션 관련 피드백 수신 | 코딩 컨벤션 섹션 갱신 |
| 새로운 디렉토리/주요 파일 추가 | 디렉토리 구조 갱신 |
| 배포 설정 변경 | 배포 방식 섹션 갱신 |
| Node.js 버전 변경 | 기술 스택 및 연결 정보 갱신 |

업데이트 시 사용자에게 **무엇을 왜 바꿨는지** 짧게 알린다.

---

## 프로젝트 전용 스킬

| 스킬 | 파일 | 용도 |
|------|------|------|
| `/geulssiin-design` | `.claude/commands/geulssiin-design.md` | UI 작업 시 반드시 참조하는 디자인 시스템. 색상·타이포·여백·모션·금지 규칙 정의 |

> 컴포넌트/페이지 작업 시 이 스킬이 범용 UI 판단보다 항상 우선한다.

---

## MCP / 스킬 제안 규칙

작업 중 아래 상황에 해당하면 Claude가 **먼저 MCP 또는 스킬 사용을 제안**한다:

| 상황 | 제안 |
|------|------|
| DB 스키마 변경, 마이그레이션 작업 | Supabase MCP로 직접 실행 여부 제안 |
| 배포 상태 확인, 환경 변수 설정 | Vercel MCP 활용 제안 |
| 디자인 시안 → 코드 변환 필요 | Figma MCP 활용 제안 |
| GitHub 이슈/PR 관련 작업 | GitHub MCP 또는 `gh` CLI 제안 |
| Next.js/Supabase/Tailwind 등 최신 문서 필요 | context7 MCP 활용 제안 |
| 반복 작업 자동화 필요 | `/loop` 또는 `/schedule` 스킬 제안 |
| 코드 품질 검토 필요 | `/simplify` 스킬 제안 |

---

## 기타 주의사항

- **한국어 UI:** 모든 사용자 대면 텍스트는 한국어로 작성
- **폰트:** Noto Serif KR (본문), Noto Sans KR — `globals.css`에서 Google Fonts로 로드
- **이미지:** 반드시 `next/image` 컴포넌트 사용 (외부 이미지는 `next.config.ts`에 도메인 등록 필요)
- **서버 컴포넌트 기본:** 상태/이벤트 핸들러 없으면 `"use client"` 추가 불필요
- **애니메이션:** Framer Motion 사용 시 해당 컴포넌트는 클라이언트 컴포넌트여야 함
- **SEO:** 각 페이지 `metadata` 객체 정의 권장 (`app/layout.tsx` 참고)
