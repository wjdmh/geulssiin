# 글씨인 디자인 토큰

> 이 파일은 판단 기준이다. 구현 코드는 `src/app/globals.css`에 있다.

---

## 색상

| 토큰 | 값 | 용도 |
|------|-----|------|
| `--ink-950` | `#0f0e0d` | 주 텍스트, 버튼 배경 |
| `--ink-800` | `#2a2825` | strong 선 |
| `--ink-500` | `#6b6764` | 보조 텍스트, 네비 링크 |
| `--ink-300` | `#b5b1ae` | 힌트, 캡션, 푸터 하단 |
| `--ink-100` | `#e8e5e2` | default 선 |
| `--paper-50` | `#faf8f5` | 메인 배경, 버튼 텍스트 |
| `--paper-100` | `#f2efe9` | 카드 배경, 구분 영역 |
| `--paper-200` | `#e5e0d8` | subtle 선 |

그라디언트 없음. 색상 포인트 없음. hover는 opacity로만.

---

## 폰트

| 토큰 | 값 | 용도 |
|------|-----|------|
| `--font-serif` | Noto Serif KR, Cormorant Garamond, serif | h1~h3, 헤드라인 |
| `--font-sans` | Pretendard, -apple-system, sans-serif | 본문, UI, 레이블 |

h1~h3에 sans-serif 금지. 헤드라인 기본 weight는 300~400.

---

## 타이포 스케일

| 토큰 | 값 | 용도 |
|------|-----|------|
| `--text-xs` | 11px | 태그, 캡션 |
| `--text-sm` | 13px | 네비, 레이블, 버튼 |
| `--text-base` | 15px | 본문 |
| `--text-lg` | 18px | 소형 헤드라인, 카드 제목 |
| `--text-xl` | 24px | 중형 헤드라인 |
| `--text-2xl` | 32px | — |
| `--text-3xl` | 40px | 섹션 헤드라인 |
| `--text-4xl` | 56px | 대형 헤드라인 |
| `--text-5xl` | 72px | 히어로 |

---

## 줄간격 / 자간

| 토큰 | 값 | 용도 |
|------|-----|------|
| `--lh-tight` | 1.2 | 대형 헤드라인 |
| `--lh-snug` | 1.4 | 소형 헤드라인 |
| `--lh-normal` | 1.7 | 보조 텍스트 |
| `--lh-relaxed` | 1.8 | 본문 |
| `--lh-loose` | 2.0 | 긴 철학/스토리 텍스트 |
| `--ls-tight` | -0.02em | 대형 헤드라인 |
| `--ls-snug` | -0.01em | 중형 헤드라인 |
| `--ls-normal` | 0.01em | 본문 |
| `--ls-wide` | 0.06em | 레이블, 네비 |
| `--ls-wider` | 0.10em | 극소 캡션, 태그 |

---

## 스페이싱 (8px 그리드)

| 토큰 | 값 |
|------|-----|
| `--space-1` | 4px |
| `--space-2` | 8px |
| `--space-3` | 12px |
| `--space-4` | 16px |
| `--space-5` | 20px |
| `--space-6` | 24px |
| `--space-8` | 32px |
| `--space-10` | 40px |
| `--space-12` | 48px |
| `--space-16` | 64px |
| `--space-20` | 80px (섹션 패딩 최소) |
| `--space-24` | 96px |
| `--space-30` | 120px |
| `--space-40` | 160px |
| `--space-48` | 192px |

---

## 선

| 토큰 | 값 | 용도 |
|------|-----|------|
| `--line-strong` | `1px solid #2a2825` | 강조 경계 |
| `--line-default` | `1px solid #e8e5e2` | 일반 구분선 |
| `--line-subtle` | `1px solid #f0ece6` | 배경에 가까운 구분 |

그림자(box-shadow) 사용 금지. 선으로 대체.

---

## 레이아웃

| 토큰 | 값 |
|------|-----|
| `--container-max` | 960px |
| `--container-pad-mobile` | 24px |
| `--container-pad-tablet` | 48px |
| `--container-pad-desktop` | 80px |

컨테이너 960px 초과 금지. 섹션 패딩 80px 미만 금지.

---

## 모션

| 토큰 | 값 |
|------|-----|
| `--ease-default` | `cubic-bezier(0.25, 0.0, 0.0, 1.0)` |
| `--duration-fast` | 300ms |
| `--duration-base` | 400ms |
| `--duration-slow` | 600ms |
| `--duration-slower` | 800ms |

200ms 미만 금지. bounce / scale / 가로 슬라이드 금지.
요소 등장: `translateY(12px) + opacity 0 → 제자리 + 1`

---

## Border radius

| 토큰 | 값 | 용도 |
|------|-----|------|
| `--radius-none` | 0 | 기본 (모든 UI) |
| `--radius-xs` | 2px | 입력창, 태그에만 예외 허용 |

8px 이상 금지.
