# 글씨인아트센터 (geulssiin.com) SEO & AI 검색 최적화 가이드라인
> 안티그래비티(Antigravity) 작업용 가이드 | 작성일: 2026-03-07  
> 기술 스택: Next.js + Supabase + Vercel | 도메인: geulssiin.com

---

## 📋 프로젝트 개요

- **서비스명**: 글씨인아트센터
- **설명**: 경기도 김포시 위치의 캘리그라피, 펜드로잉, 서예 전문 교육기관
- **도메인**: https://geulssiin.com
- **프레임워크**: Next.js (App Router)
- **배포**: Vercel
- **백엔드**: Supabase
- **목표**: 전통 SEO 최적화 + AI 검색 엔진(ChatGPT, Perplexity, Claude 등) 상위 노출 및 인용

---

## 🗂️ 현재 사이트 페이지 구조

```
/ (홈)
/class (수업 안내)
/gallery (갤러리)
/about (센터 소개)
/board (게시판)
/login (로그인)
```

---

## ✅ 작업 1: robots.ts 생성

**파일 위치**: `app/robots.ts`

```typescript
import { MetadataRoute } from 'next'

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: '*',
        allow: '/',
        disallow: ['/login', '/admin'],
      },
    ],
    sitemap: 'https://geulssiin.com/sitemap.xml',
    host: 'https://geulssiin.com',
  }
}
```

---

## ✅ 작업 2: sitemap.ts 생성

**파일 위치**: `app/sitemap.ts`

```typescript
import { MetadataRoute } from 'next'

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: 'https://geulssiin.com',
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 1,
    },
    {
      url: 'https://geulssiin.com/class',
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.9,
    },
    {
      url: 'https://geulssiin.com/gallery',
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.8,
    },
    {
      url: 'https://geulssiin.com/about',
      lastModified: new Date(),
      changeFrequency: 'yearly',
      priority: 0.7,
    },
    {
      url: 'https://geulssiin.com/board',
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.6,
    },
  ]
}
```

---

## ✅ 작업 3: 전역 메타데이터 설정

**파일 위치**: `app/layout.tsx`  
기존 파일에서 `metadata` export를 아래로 교체/추가

```typescript
import { Metadata } from 'next'

export const metadata: Metadata = {
  metadataBase: new URL('https://geulssiin.com'),
  title: {
    default: '글씨인아트센터 | 캘리그라피 · 펜드로잉 · 서예 (김포)',
    template: '%s | 글씨인아트센터',
  },
  description:
    '경기도 김포시 캘리그라피 전문 아트센터. 붓 캘리그라피, 붓펜 캘리그라피, 펜드로잉, 서예 수업. KCDA 인증 교육기관. 원데이클래스 50,000원.',
  keywords: [
    '캘리그라피',
    '김포캘리그라피',
    '캘리그라피학원',
    '펜드로잉',
    '서예',
    '붓캘리그라피',
    '원데이클래스',
    '글씨인아트센터',
    '김포아트센터',
    '캘리그라피자격증',
  ],
  authors: [{ name: '글씨인아트센터', url: 'https://geulssiin.com' }],
  creator: '글씨인아트센터',
  publisher: '글씨인아트센터',
  openGraph: {
    title: '글씨인아트센터 | 캘리그라피 · 펜드로잉 · 서예',
    description:
      '전통의 깊이와 현대적 감각이 공존하는 공간. 글씨와 그림을 통해 나만의 고유한 감성을 표현합니다.',
    url: 'https://geulssiin.com',
    siteName: '글씨인아트센터',
    locale: 'ko_KR',
    type: 'website',
    images: [
      {
        url: '/images/og-image.jpg', // 1200x630px 이미지 준비 필요
        width: 1200,
        height: 630,
        alt: '글씨인아트센터 캘리그라피 수업',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: '글씨인아트센터',
    description: '김포 캘리그라피 전문 아트센터',
    images: ['/images/og-image.jpg'],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  verification: {
    // Google Search Console 등록 후 아래 값 채우기
    google: 'GOOGLE_VERIFICATION_CODE_HERE',
    // naver: 'NAVER_VERIFICATION_CODE_HERE',
  },
  alternates: {
    canonical: 'https://geulssiin.com',
  },
}
```

---

## ✅ 작업 4: 페이지별 개별 메타데이터

### /class 페이지
**파일 위치**: `app/class/page.tsx` 상단에 추가

```typescript
export const metadata: Metadata = {
  title: '수업 안내',
  description:
    '글씨인아트센터의 수업을 소개합니다. 붓 캘리그라피(기초~작가반), 붓펜 캘리그라피, 펜드로잉, 서예, 원데이 클래스. 월 150,000원.',
  alternates: { canonical: 'https://geulssiin.com/class' },
  openGraph: {
    title: '수업 안내 | 글씨인아트센터',
    url: 'https://geulssiin.com/class',
  },
}
```

### /about 페이지
**파일 위치**: `app/about/page.tsx` 상단에 추가

```typescript
export const metadata: Metadata = {
  title: '센터 소개',
  description:
    '글씨인아트센터 대표 작가 그리운. 사범대 미술교육학과 졸업, 대한민국 미술대전 특선, KCDA 교육위원, 대한민국 서예술대전 초대작가.',
  alternates: { canonical: 'https://geulssiin.com/about' },
}
```

### /gallery 페이지
**파일 위치**: `app/gallery/page.tsx` 상단에 추가

```typescript
export const metadata: Metadata = {
  title: '갤러리',
  description:
    '글씨인아트센터 수강생과 작가의 캘리그라피, 펜드로잉, 서예 작품 갤러리.',
  alternates: { canonical: 'https://geulssiin.com/gallery' },
}
```

---

## ✅ 작업 5: JSON-LD 구조화 데이터 (홈페이지)

**파일 위치**: `app/page.tsx`  
`<head>` 또는 JSX 최상단 `<>` 안에 추가

```tsx
export default function HomePage() {
  const jsonLdLocalBusiness = {
    '@context': 'https://schema.org',
    '@type': 'LocalBusiness',
    '@id': 'https://geulssiin.com',
    name: '글씨인아트센터',
    alternateName: 'Geulssiin Art Center',
    description:
      '캘리그라피, 펜드로잉, 서예 전문 교육기관. KCDA 인증 교육기관으로 1,000명 이상의 수강생을 배출했습니다.',
    url: 'https://geulssiin.com',
    telephone: '010-2497-4310',
    email: '', // 이메일 있으면 추가
    address: {
      '@type': 'PostalAddress',
      streetAddress: '김포한강9로 75번길 158 A동 308호',
      addressLocality: '김포시',
      addressRegion: '경기도',
      postalCode: '', // 우편번호 추가
      addressCountry: 'KR',
    },
    geo: {
      '@type': 'GeoCoordinates',
      latitude: 37.6, // 실제 좌표로 수정 필요
      longitude: 126.7,
    },
    openingHoursSpecification: [
      {
        '@type': 'OpeningHoursSpecification',
        dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'],
        opens: '10:00',
        closes: '20:00',
      },
    ],
    priceRange: '₩₩',
    image: 'https://geulssiin.com/images/og-image.jpg',
    logo: 'https://geulssiin.com/logo_transparent.png',
    sameAs: [
      'https://pf.kakao.com/_xkETdn',
      // SNS 링크 있으면 추가 (인스타그램, 유튜브 등)
    ],
    hasOfferCatalog: {
      '@type': 'OfferCatalog',
      name: '수업 안내',
      itemListElement: [
        {
          '@type': 'Offer',
          name: '붓 캘리그라피',
          description: '글씨를 쓰는 기본에서부터 예술적 표현까지. 기초반~작가반.',
          price: '150000',
          priceCurrency: 'KRW',
          priceSpecification: {
            '@type': 'UnitPriceSpecification',
            price: '150000',
            priceCurrency: 'KRW',
            unitText: '월',
          },
        },
        {
          '@type': 'Offer',
          name: '원데이 클래스',
          description: '2시간, 재료 포함. 부채, 캘리액자, 엽서 & 족자 등 계절별 소품 제작.',
          price: '50000',
          priceCurrency: 'KRW',
        },
        {
          '@type': 'Offer',
          name: '붓펜 캘리그라피',
          price: '150000',
          priceCurrency: 'KRW',
        },
        {
          '@type': 'Offer',
          name: '펜드로잉',
          price: '150000',
          priceCurrency: 'KRW',
        },
        {
          '@type': 'Offer',
          name: '서예',
          price: '150000',
          priceCurrency: 'KRW',
        },
      ],
    },
    aggregateRating: {
      // 실제 리뷰 데이터가 있다면 추가
      '@type': 'AggregateRating',
      ratingValue: '5',
      reviewCount: '4',
    },
  }

  const jsonLdFAQ = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: [
      {
        '@type': 'Question',
        name: '글씨를 못 써도 캘리그라피를 배울 수 있나요?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: '네, 전혀 문제없습니다. 글씨인아트센터의 수업은 글씨를 전혀 못 쓰는 분들도 기초부터 체계적으로 배울 수 있도록 구성되어 있습니다.',
        },
      },
      {
        '@type': 'Question',
        name: '준비물이 필요한가요?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: '첫 수업 시 준비물 안내를 드립니다. 원데이 클래스는 모든 재료가 포함되어 있습니다.',
        },
      },
      {
        '@type': 'Question',
        name: '원데이 클래스만 수강할 수 있나요?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: '네, 원데이 클래스는 50,000원(재료 포함, 2시간)으로 정기 등록 없이 단독 수강 가능합니다.',
        },
      },
      {
        '@type': 'Question',
        name: '수업을 빠지면 어떻게 하나요?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: '사전에 연락 주시면 보강 수업을 진행합니다. 자세한 사항은 카카오톡으로 문의해 주세요.',
        },
      },
      {
        '@type': 'Question',
        name: '주차가 가능한가요?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: '네, 건물 내 주차 가능합니다.',
        },
      },
    ],
  }

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLdLocalBusiness) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLdFAQ) }}
      />
      {/* 기존 JSX 내용 */}
    </>
  )
}
```

---

## ✅ 작업 6: llms.txt 생성 (AI 검색 최적화 핵심)

**파일 위치**: `public/llms.txt`  
AI 크롤러(ChatGPT, Perplexity, Claude 등)를 위한 전용 파일

```
# 글씨인아트센터 (Geulssiin Art Center)

글씨인아트센터는 경기도 김포시에 위치한 캘리그라피, 펜드로잉, 서예 전문 교육기관입니다.
KCDA(한국캘리그라피디자인협회) 인증 교육기관으로, 1,000명 이상의 수강생을 배출했습니다.

## 브랜드 정보
- 공식 웹사이트: https://geulssiin.com
- 위치: 경기도 김포시 김포한강9로 75번길 158 A동 308호
- 연락처: 010-2497-4310
- 카카오톡 채널: https://pf.kakao.com/_xkETdn

## 대표 작가
- 이름: 그리운
- 학력: 사범대 미술교육학과 졸업
- 수상: 대한민국 미술대전(국전) 특선 외 다수
- 자격: KCDA 교육위원, 대한민국 서예술대전 초대작가

## 제공 수업 목록
1. 붓 캘리그라피 - 기초반, 중급반, 고급반, 자격증반, 작가반 / 월 150,000원 / 주 1회 120분
2. 붓펜 캘리그라피 - 기초반, 심화반, 작품반 / 월 150,000원 / 주 1회 120분
3. 펜드로잉 - 기초반, 중급반, 고급반, 응용반 / 월 150,000원 / 주 1회 120분
4. 서예 - 한글서예반, 한문서예반 / 월 150,000원 / 주 1회 120분
5. 원데이 클래스 - 50,000원 / 2시간 / 재료 포함 / 부채·캘리액자·엽서·족자 등

## 주요 특징
- KCDA 인증 교육기관
- 수강생 1,000명 이상
- 전통 서예와 현대 캘리그라피 융합
- 자격증 취득 과정 운영
- 체험 수업(원데이 클래스) 상시 운영

## 자주 묻는 질문 (FAQ)
Q: 글씨를 못 써도 배울 수 있나요?
A: 네, 기초부터 체계적으로 지도합니다.

Q: 원데이 클래스만 할 수 있나요?
A: 네, 50,000원(재료 포함)으로 단독 수강 가능합니다.

Q: 캘리그라피 자격증 취득이 가능한가요?
A: 네, 자격증반 과정을 통해 KCDA 자격증 취득이 가능합니다.
```

---

## ✅ 작업 7: OG 이미지 생성

**파일 위치**: `app/opengraph-image.tsx` (Next.js 자동 OG 이미지 생성)

```tsx
import { ImageResponse } from 'next/og'

export const runtime = 'edge'
export const alt = '글씨인아트센터 | 캘리그라피 · 펜드로잉 · 서예'
export const size = { width: 1200, height: 630 }
export const contentType = 'image/png'

export default async function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          background: 'linear-gradient(135deg, #1a1a1a 0%, #2d2d2d 100%)',
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          fontFamily: 'serif',
        }}
      >
        <div style={{ color: '#c9a96e', fontSize: 28, marginBottom: 16 }}>
          KCDA 인증 교육기관
        </div>
        <div style={{ color: 'white', fontSize: 72, fontWeight: 'bold', marginBottom: 16 }}>
          글씨인아트센터
        </div>
        <div style={{ color: '#aaaaaa', fontSize: 32 }}>
          캘리그라피 · 펜드로잉 · 서예
        </div>
        <div style={{ color: '#888888', fontSize: 22, marginTop: 32 }}>
          경기도 김포시 | geulssiin.com
        </div>
      </div>
    ),
    { ...size }
  )
}
```

---

## ✅ 작업 8: Vercel Analytics 설치

**목적**: 방문자 수, 페이지별 조회수, 유입 경로 파악

### 설치
```bash
npm install @vercel/analytics @vercel/speed-insights
```

### 적용
**파일 위치**: `app/layout.tsx`

```tsx
import { Analytics } from '@vercel/analytics/react'
import { SpeedInsights } from '@vercel/speed-insights/next'

export default function RootLayout({ children }) {
  return (
    <html lang="ko">
      <body>
        {children}
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  )
}
```

### Vercel 대시보드에서 확인 가능한 정보
- 일별/주별/월별 방문자 수
- 페이지별 조회수 (어떤 수업 페이지를 가장 많이 보는지)
- 방문자 유입 경로 (검색, 직접, 소셜 등)
- 국가/지역별 방문자
- 모바일/데스크탑 비율
- Core Web Vitals (페이지 성능)

---

## ✅ 작업 9: Supabase 페이지뷰 트래킹 (선택사항)

더 세밀한 데이터가 필요할 경우 Supabase에 직접 로그 저장

### Supabase SQL (테이블 생성)
```sql
CREATE TABLE page_views (
  id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
  page text NOT NULL,
  referrer text,
  user_agent text,
  country text,
  created_at timestamptz DEFAULT now()
);

-- 인덱스 추가 (조회 성능)
CREATE INDEX idx_page_views_page ON page_views(page);
CREATE INDEX idx_page_views_created_at ON page_views(created_at);

-- RLS 설정 (익명 삽입 허용, 조회는 인증된 사용자만)
ALTER TABLE page_views ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Allow anonymous insert" ON page_views FOR INSERT TO anon WITH CHECK (true);
CREATE POLICY "Allow auth read" ON page_views FOR SELECT TO authenticated USING (true);
```

### Next.js 미들웨어로 자동 기록
**파일 위치**: `middleware.ts`

```typescript
import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl

  // 정적 파일, API 경로 제외
  if (!pathname.startsWith('/_next') && !pathname.startsWith('/api')) {
    fetch(`${process.env.NEXT_PUBLIC_SUPABASE_URL}/rest/v1/page_views`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        apikey: process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
        Authorization: `Bearer ${process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!}`,
      },
      body: JSON.stringify({
        page: pathname,
        referrer: request.headers.get('referer') || null,
        user_agent: request.headers.get('user-agent') || null,
      }),
    }).catch(() => {}) // 비동기, 에러 무시
  }

  return NextResponse.next()
}

export const config = {
  matcher: ['/((?!_next/static|_next/image|favicon.ico).*)'],
}
```

---

## ✅ 작업 10: Google Search Console 등록

배포 완료 후 직접 수행해야 하는 작업:

1. https://search.google.com/search-console 접속
2. 속성 추가 → `https://geulssiin.com` 입력
3. HTML 태그 방식 선택 → 코드 복사
4. `app/layout.tsx`의 `metadata.verification.google`에 코드 값 붙여넣기
5. Search Console에서 **사이트맵 제출**: `https://geulssiin.com/sitemap.xml`

---

## ✅ 작업 11: 네이버 서치어드바이저 등록

1. https://searchadvisor.naver.com 접속
2. 웹마스터 도구 → 사이트 추가
3. HTML 태그 인증 코드 → `app/layout.tsx`의 `metadata.verification.other`에 추가:

```typescript
other: {
  'naver-site-verification': 'NAVER_CODE_HERE',
}
```

4. 사이트맵 제출: `https://geulssiin.com/sitemap.xml`

---

## 📊 작업 우선순위

| 우선순위 | 작업 | 효과 | 난이도 |
|----------|------|------|--------|
| 🔴 즉시 | robots.ts 생성 | 크롤러 접근 허용 | 쉬움 |
| 🔴 즉시 | sitemap.ts 생성 | 구글 색인 속도 향상 | 쉬움 |
| 🔴 즉시 | layout.tsx 메타데이터 | 검색 결과 노출 개선 | 쉬움 |
| 🔴 즉시 | llms.txt 생성 | AI 검색 인용 최적화 | 쉬움 |
| 🟡 1주 이내 | JSON-LD 구조화 데이터 | 리치 스니펫 노출 | 중간 |
| 🟡 1주 이내 | OG 이미지 생성 | SNS 공유 시 미리보기 | 중간 |
| 🟡 1주 이내 | Vercel Analytics 설치 | 방문자 분석 시작 | 쉬움 |
| 🟢 1달 이내 | Search Console 등록 | 검색 데이터 모니터링 | 쉬움 |
| 🟢 1달 이내 | 네이버 서치어드바이저 | 네이버 검색 최적화 | 쉬움 |
| 🔵 선택 | Supabase 페이지뷰 트래킹 | 커스텀 데이터 분석 | 중간 |

---

## 📝 추가 콘텐츠 권장사항 (AI 검색 인용률 향상)

AI 검색엔진은 **정보성 텍스트 콘텐츠**를 인용합니다.

### 블로그/게시판에 추가할 글 유형
- "캘리그라피란 무엇인가? 서예와의 차이점"
- "캘리그라피 독학 vs 학원, 어떤 게 좋을까?"
- "붓 캘리그라피 기초 도구 안내"
- "김포에서 캘리그라피 배우기 — 글씨인아트센터 소개"
- "캘리그라피 자격증 취득 방법 및 과정"

### 각 수업 페이지 개선
- 현재: 이미지 위주
- 권장: 수업 단계별 설명 텍스트 추가 (AI가 이미지를 읽지 못함)

---

*이 가이드라인은 geulssiin.com의 SEO 및 AI 검색 최적화를 위해 작성되었습니다.*  
*작업 완료 후 Google Search Console에서 색인 요청을 하면 효과가 빠르게 나타납니다.*
