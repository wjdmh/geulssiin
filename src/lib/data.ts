export const galleryItems = [
    { id: 1, title: "무제 (Untitled)", desc: "먹의 농담이 만들어낸 우연의 미", src: "/images/g1.jpeg", size: "col-span-1 row-span-1" },
    { id: 2, title: "비상 (Soar)", desc: "거침없는 붓터치의 에너지", src: "/images/g2.jpeg", size: "col-span-1 md:col-span-2 row-span-1" },
    { id: 3, title: "정적 (Static)", desc: "채움보다 비움이 주는 무게", src: "/images/g3.JPG", size: "col-span-1 row-span-2" },
    { id: 4, title: "흐름 (Flow)", desc: "물과 잉크의 자연스러운 섞임", src: "/images/g4.JPEG", size: "col-span-1 row-span-1" },
    { id: 5, title: "공명 (Resonance)", desc: "소리 없는 울림", src: "/images/g5.JPG", size: "col-span-1 row-span-1" },
    { id: 6, title: "여명 (Dawn)", desc: "어둠 속에서 피어나는 빛", src: "/images/g6.JPG", size: "col-span-1 md:col-span-2 row-span-1" },
    { id: 7, title: "심연 (Abyss)", desc: "깊은 내면의 세계", src: "/images/g7.JPG", size: "col-span-1 row-span-1" },
];

// 시간표는 Supabase `classes` 테이블이 단일 진실원이다 (admin/schedule에서 편집).
// 확정 운영 요일: 수·목·금·토 (2026 수업일정표 기준 — 월·화·일 정규 수업 없음).
// 이전에 있던 하드코딩 schedule 배열(화요일 포함, 미사용 레거시)은 2026-06-12 제거됨.

// 분류: 글씨(붓·붓펜 캘리그라피) / 드로잉(펜·수묵) / 서예 / 단기 클래스(글씨교정·필사) / 원데이
export const classCurriculum = [
    {
        title: "붓 캘리그라피 클래스",
        description: "글씨를 쓰는 기본에서부터 예술적 표현까지. 단계별 수업을 통해 감성과 구조를 함께 익힙니다.",
        meta: "주 1회 · 120분 · 수강료 문의",
        details: [
            { level: "기초반", content: "붓 잡는 법부터 기본 획, 서체 기초 표현" },
            { level: "중급반", content: "다양한 서체 표현, 감정 표현 훈련" },
            { level: "고급반", content: "고급 서체 표현, 작품 응용" },
            { level: "자격증반", content: "협회 인증교육기관 자체 시험대비" },
            { level: "작가반", content: "작품 활동 및 전시, 공모전, 서체연구 등" },
        ]
    },
    {
        title: "붓펜 캘리그라피 클래스",
        description: "가볍고 실용적인 붓펜을 활용한 글씨 수업입니다. 일상에서도 활용 가능한 표현법을 배웁니다.",
        meta: "주 1회 · 120분 · 수강료 문의",
        details: [
            { level: "기초반", content: "기본서체 연습 & 실용 소품" },
            { level: "심화반", content: "흘림서체 & 수채 배경 기법" },
            { level: "작품반", content: "창작 표현 & 굿즈 제작 등" },
        ]
    },
    {
        title: "펜드로잉 클래스",
        description: "단일 과정으로 개별 맞춤 진행됩니다.",
        meta: "단일 과정 · 수강료 문의",
        details: []
    },
    {
        title: "수묵 드로잉 클래스",
        description: "단일 과정으로 개별 맞춤 진행됩니다.",
        meta: "단일 과정 · 수강료 문의",
        details: []
    },
    {
        title: "서예 클래스",
        description: "붓과 먹으로 마음을 담는 전통 서예수업입니다. 서예 선생님 지정 시간(수요일 15–19시)에만 운영됩니다.",
        meta: "수요일 지정 시간 · 수강료 문의",
        details: [
            { level: "한글서예반", content: "한글 궁서의 다양한 서체 및 판본" },
            { level: "한문서예반", content: "전통 운필 중심의 한문 서예" },
        ]
    },
    {
        title: "글씨교정 클래스",
        description: "또박또박 바른 손글씨를 잡아주는 단기 클래스입니다. 기본 12주 과정이며 기간 조정 및 문의가 가능합니다.",
        meta: "단기 12주 · 기간 조정 가능 · 수강료 문의",
        details: []
    },
    {
        title: "필사 클래스",
        description: "좋은 글귀를 손으로 옮겨 적으며 마음을 다듬는 단기 클래스입니다. 한 달 단위로 수강할 수 있고, 4인 이상이 모이면 주제를 정해 원하는 시간을 문의해 진행할 수 있습니다. (공간·재료·체본집·글씨 교육·차 제공)",
        meta: "한 달 단위 · 4인 이상 주제반 가능 · 수강료 문의",
        details: []
    },
    {
        title: "원데이 클래스",
        description: "가볍게 체험해 보고 싶은 분들을 위한 하루 완성 클래스입니다. 주제별로 시즌에 맞춰 진행됩니다.",
        meta: "2시간 · 재료 포함 · 비용 문의",
        details: [
            { level: "체험내용", content: "부채, 캘리액자, 엽서 & 족자 등 (계절/시즌별 상이)" },
            { level: "일정안내", content: "블로그 및 인스타 공지 확인" },
        ]
    }
];
