// 구조화 데이터(schema.org JSON-LD) — 구글 리치결과 + AI 검색(ChatGPT/Perplexity 등) 노출 강화.
// 사이트 전역에 LocalBusiness 1개 + 제공 수업 목록을 선언한다.

const SITE = "https://geulssiin.com";

const FAQ: { q: string; a: string }[] = [
    { q: "글씨를 못 써도 배울 수 있나요?", a: "네, 대부분의 수강생이 처음 시작하는 분들이에요. 기초부터 차근차근 안내해드립니다." },
    { q: "준비물이 필요한가요?", a: "기본 재료(붓, 먹물, 종이)는 모두 제공됩니다. 편한 마음만 가지고 오시면 돼요." },
    { q: "원데이 클래스만 할 수도 있나요?", a: "물론이요! 원데이 클래스는 2시간 과정이며 재료가 포함되어 있습니다. 비용은 문의해 주세요." },
    { q: "수업을 빠지면 어떻게 하나요?", a: "한 달 안에 4회를 채우시면 됩니다. 다른 요일로 자유롭게 보강 가능해요." },
    { q: "주차는 되나요?", a: "건물 내 주차장 이용 가능합니다." },
];

export function JsonLd() {
    const data = {
        "@context": "https://schema.org",
        "@graph": [
            {
                "@type": ["LocalBusiness", "EducationalOrganization"],
                "@id": `${SITE}/#organization`,
                name: "글씨인아트센터",
                alternateName: "Geulssiin Art Center",
                description:
                    "경기도 김포시 캘리그라피·펜드로잉·서예 전문 아트센터. 붓 캘리그라피, 붓펜 캘리그라피, 펜드로잉, 서예, 원데이클래스를 운영하는 KCDA 인증 교육기관.",
                url: SITE,
                image: `${SITE}/images/og-image.jpg`,
                logo: `${SITE}/logo_transparent.png`,
                telephone: "+82-10-2497-4310",
                priceRange: "₩₩",
                address: {
                    "@type": "PostalAddress",
                    streetAddress: "김포한강9로 75번길 158 A동 308호",
                    addressLocality: "김포시",
                    addressRegion: "경기도",
                    addressCountry: "KR",
                },
                areaServed: { "@type": "City", name: "김포" },
                openingHoursSpecification: [
                    {
                        "@type": "OpeningHoursSpecification",
                        dayOfWeek: ["Wednesday", "Thursday", "Friday", "Saturday"],
                        opens: "10:00",
                        closes: "19:30",
                    },
                ],
                sameAs: [
                    "https://blog.naver.com/griuncalli",
                    "https://www.instagram.com/griun_callidrawing",
                    "https://www.instagram.com/gulssiin",
                    "https://www.threads.com/@gulssiin_artcenter",
                    "https://www.youtube.com/@gulssiin_artcenter",
                    "https://pf.kakao.com/_xkETdn",
                ],
            },
            {
                "@type": "ItemList",
                "@id": `${SITE}/#courses`,
                name: "글씨인아트센터 수업",
                itemListElement: [
                    "붓 캘리그라피",
                    "붓펜 캘리그라피",
                    "펜드로잉",
                    "서예",
                    "원데이 클래스",
                ].map((courseName, i) => ({
                    "@type": "ListItem",
                    position: i + 1,
                    item: {
                        "@type": "Course",
                        name: courseName,
                        description: `${courseName} 수업 — 글씨인아트센터`,
                        provider: { "@id": `${SITE}/#organization` },
                        url: `${SITE}/class`,
                    },
                })),
            },
            {
                "@type": "FAQPage",
                "@id": `${SITE}/#faq`,
                mainEntity: FAQ.map((f) => ({
                    "@type": "Question",
                    name: f.q,
                    acceptedAnswer: { "@type": "Answer", text: f.a },
                })),
            },
        ],
    };

    return (
        <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
        />
    );
}
