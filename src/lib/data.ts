export const galleryItems = [
    { id: 1, title: "무제 (Untitled)", desc: "먹의 농담이 만들어낸 우연의 미", src: "/images/g1.jpeg", size: "col-span-1 row-span-1" },
    { id: 2, title: "비상 (Soar)", desc: "거침없는 붓터치의 에너지", src: "/images/g2.jpeg", size: "col-span-1 md:col-span-2 row-span-1" },
    { id: 3, title: "정적 (Static)", desc: "채움보다 비움이 주는 무게", src: "/images/g3.JPG", size: "col-span-1 row-span-2" },
    { id: 4, title: "흐름 (Flow)", desc: "물과 잉크의 자연스러운 섞임", src: "/images/g4.JPEG", size: "col-span-1 row-span-1" },
    { id: 5, title: "공명 (Resonance)", desc: "소리 없는 울림", src: "/images/g5.JPG", size: "col-span-1 row-span-1" },
    { id: 6, title: "여명 (Dawn)", desc: "어둠 속에서 피어나는 빛", src: "/images/g6.JPG", size: "col-span-1 md:col-span-2 row-span-1" },
    { id: 7, title: "심연 (Abyss)", desc: "깊은 내면의 세계", src: "/images/g7.JPG", size: "col-span-1 row-span-1" },
];

export const scheduleCols = ["화요일", "수요일", "목요일", "금요일", "토요일"];
export const scheduleRows = ["10:00 ~ 12:00", "12:00 ~ 2:00", "3:00~ 5:00", "5:00~ 7:00", "7:00 ~ 9:00"];

// Data representation: Row -> Column -> Content
// Rows: 10-12, 12-2, 3-5, 5-7, 7-9
// Cols: Tue, Wed, Thu, Fri, Sat
export const scheduleData = [
    // 10:00 ~ 12:00
    ["", "10:00 ~\n12:00", "", "10:00 ~\n12:00", "10:00 ~\n12:00"],
    // 12:00 ~ 2:00 (Lunch / Break?)
    ["", "", "", "", "12:00 ~\n2:00"],
    // 3:00 ~ 5:00
    ["3:00~\n5:00", "3:00~\n5:00", "3:00~\n5:00", "", ""],
    // 5:00 ~ 7:00
    ["", "5:00~\n7:00", "5:00~\n7:00", "", ""],
    // 7:00 ~ 9:00
    ["7:00 ~\n9:00", "", "", "", ""]
];

export const mergedCells = [
    // Example for merging if needed. For now, we will render simple grid based on the image visual.
    // The image has some large empty blocks. We can handle it by CSS grid or just rendering empty cells.
];

export const classCurriculum = [
    {
        title: "붓 캘리그라피 클래스",
        description: "글씨를 쓰는 기본에서부터 예술적 표현까지. 단계별 수업을 통해 감성과 구조를 함께 익힙니다.",
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
        details: [
            { level: "기초반", content: "기본서체 연습 & 실용 소품" },
            { level: "심화반", content: "흘림서체 & 수채 배경 기법" },
            { level: "작품반", content: "창작 표현 & 굿즈 제작 등" },
        ]
    },
    {
        title: "펜드로잉 클래스",
        description: "선으로 표현하는 일상의 풍경. 그림을 처음 시작하는 분들도 편안하게 배우실 수 있습니다.",
        details: [
            { level: "기초반", content: "기본 선연습 & 간단한 사물 및 풍경표현" },
            { level: "중급반", content: "구조있는 풍경 및 대상 표현" },
            { level: "고급반", content: "공간 구성 및 다양한 풍경 심화표현" },
            { level: "응용반", content: "창작 드로잉, 엽서 & 작품 제작 등" },
        ]
    },
    {
        title: "서예 클래스",
        description: "붓과 먹으로 마음을 담는 전통 서예수업입니다.",
        details: [
            { level: "한글서예반", content: "한글 궁서의 다양한 서체 및 판본" },
            { level: "한문서예반", content: "전통 운필 중심의 한문 서예" },
        ]
    },
    {
        title: "원데이 클래스",
        description: "가볍게 체험해 보고 싶은 분들을 위한 하루 완성 클래스입니다. 계절에 어울리는 소품을 만듭니다.",
        details: [
            { level: "체험내용", content: "부채, 캘리액자, 엽서 & 족자 등 (계절/시즌별 상이)" },
            { level: "일정안내", content: "블로그 및 인스타 공지 확인" },
        ]
    }
];
