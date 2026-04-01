---
name: geulssiin-design
description: >
  글씨인아트센터(geulssiin.com) 홈페이지 개발 시 반드시 참조해야 하는 전용 디자인 시스템 스킬.

  다음 상황에서 반드시 이 스킬을 사용하라:
  - 글씨인 홈페이지 컴포넌트, 섹션, 페이지를 생성하거나 수정할 때
  - 글씨인 관련 UI 코드 리뷰 또는 개선 요청 시
  - 색상, 폰트, 여백, 레이아웃, 모션에 대한 판단이 필요할 때
  - "글씨인 스타일로", "글씨인 홈페이지처럼" 같은 요청 시

  범용 UI 스킬(ui-design-principles)보다 이 스킬이 항상 우선한다.
---

# 글씨인아트센터 디자인 시스템

## 브랜드 철학

> **서여기인(書如其人) — 글씨는 곧 그 사람이다**

모든 디자인 판단은 이 철학에서 출발한다.
덜어낼 수 있는 건 모두 덜어낸다. 남은 것만이 말한다.

**감각 키워드:** Minimal / Deliberate / Quiet / Craft

---

## 색상

토큰 정의 → `references/tokens.md`

```
배경:    --paper-50  (메인) / --paper-100 (카드, 구분 영역)
텍스트:  --ink-950   (주)   / --ink-500   (보조) / --ink-300 (힌트)
선:      --ink-100
버튼:    배경 --ink-950 / 텍스트 --paper-50
```

그라디언트 없음. 그림자 없음. 색상 포인트 없음.
hover는 opacity 변화로만 표현한다.

---

## 타이포그래피

```
헤드라인:  Noto Serif KR — weight 300~700
           Cormorant Garamond (영문/숫자)
본문/UI:   Pretendard — weight 300~500

헤드라인 기본은 300~400.
강조가 필요한 경우 600~700 허용.
단, 한 페이지에서 볼드 헤드라인은 절제한다.
```

명조 헤드라인이 글씨인의 정체성이다.
Sans-serif를 h1~h3에 쓰지 않는다.

스케일 및 줄간격 → `references/tokens.md`

---

## 여백

8px 그리드 기반. 여백이 콘텐츠다.

```
컨테이너 최대 너비: 960px
섹션 패딩 최소:     80px
```

공간이 아깝다는 이유로 요소를 추가하지 않는다.

---

## 선과 형태

```
border-radius: 0  (기본)
               2px (입력창, 태그에만 예외)

선:  1px solid — strong / default / subtle 3단계
     → references/tokens.md 참조

그림자(box-shadow): 사용하지 않는다. 선으로 대체한다.
```

---

## 모션

```
duration:  400ms 기본 (최소 300ms)
easing:    cubic-bezier(0.25, 0.0, 0.0, 1.0)
```

빠른 전환, bounce, scale 변환, 슬라이드(가로 이동) 없음.
요소 등장: translateY(12px) + opacity 0 → 제자리 + 1.

---

## 절대 금지

```
색상:     파랑/초록/빨강 계열 UI 색상 / 그라디언트 / 그림자
형태:     border-radius 8px 이상
모션:     200ms 미만 / bounce / scale / 가로 슬라이드
레이아웃: 컨테이너 960px 초과 / 섹션 패딩 80px 미만
```

---

## 참조 파일

- 코드 토큰 (색상/폰트/스페이싱 변수) → `references/tokens.md`
- 컴포넌트 패턴 코드 → `references/components.md`
