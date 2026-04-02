"use client";

import { motion } from "framer-motion";
import Image from "next/image";

const careers = [
    "사범대 미술교육학과 졸업",
    "사단법인 한국캘리그라피디자인협회(KCDA) 교육위원",
    "글씨인아트센터 대표 (2020~)",
    "글씨인 커뮤니티 대표 운영작가",
    "대한민국 서예술대전 초대작가",
    "대한민국 김호연재 여성휘호대회 초대작가",
    "대한민국 예술대전 초대작가",
    "한국서화협회 추천작가",
    "국가보훈문화예술협회 추천작가",
    "대한민국 예술대전 심사위원",
    "캘리그라피 디자인그룹 어울림 전문위원",
    "묵묵히 먹아트센터 소속작가",
];

const awards = [
    "대한민국 미술대전(국전) 캘리그라피 부문 특선 외 다수",
    "대한민국 서예술대전 우수상",
    "대한민국창작미술대전 금상",
    "대한민국 여성미술대전 동상",
    "국제현대미술대전 동상",
    "대한민국 서예·문인화공모대전 우수상",
    "대한민국 김호연재 여성휘호대회 차상",
    "경기미술대전 특선",
    "전국 각종 캘리그라피·서예대전 우수상 다수",
];

const activities = [
    "KCDA 정기회원전 다수 참여",
    "묵묵히 시리즈 전시 다수",
    "글씨인아트센터 회원전시 아름다운 처음이여",
    "공모전, 협회전, 초대전, 단체전 등 다양한 전시 활동",
    "관공서 및 교육기관 캘리그라피 & 펜그림 출강 다수",
];

const ease = [0.25, 0.0, 0.0, 1.0] as const;
const viewport = { once: true, margin: "-80px" };

function ListItem({ text }: { text: string }) {
    return (
        <div style={{ display: "flex", alignItems: "flex-start", gap: "var(--space-3)" }}>
            <span style={{
                marginTop: "8px",
                width: "4px",
                height: "4px",
                flexShrink: 0,
                backgroundColor: "var(--ink-100)",
            }} />
            <p style={{
                fontFamily: "var(--font-sans)",
                fontSize: "var(--text-sm)",
                color: "var(--ink-500)",
                lineHeight: "var(--lh-relaxed)",
                letterSpacing: "var(--ls-normal)",
            }}>
                {text}
            </p>
        </div>
    );
}

function SectionLabel({ children }: { children: React.ReactNode }) {
    return (
        <div style={{ display: "flex", alignItems: "center", gap: "var(--space-4)", marginBottom: "var(--space-6)" }}>
            <span style={{ width: "20px", height: "1px", backgroundColor: "var(--ink-950)" }} />
            <p style={{
                fontFamily: "var(--font-sans)",
                fontSize: "var(--text-xs)",
                color: "var(--ink-950)",
                letterSpacing: "var(--ls-wider)",
            }}>
                {children}
            </p>
        </div>
    );
}

export function DirectorProfile() {
    return (
        <section className="section-lg" style={{ borderTop: "var(--line-default)" }}>
            <div className="container">

                {/* Header */}
                <motion.div
                    initial={{ opacity: 0, y: 12 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={viewport}
                    transition={{ duration: 0.6, ease }}
                    style={{ marginBottom: "var(--space-16)" }}
                >
                    <p style={{
                        fontFamily: "var(--font-sans)",
                        fontSize: "var(--text-xs)",
                        color: "var(--ink-300)",
                        letterSpacing: "var(--ls-wider)",
                        marginBottom: "var(--space-4)",
                    }}>
                        DIRECTOR
                    </p>
                    <h2 style={{
                        fontFamily: "var(--font-serif)",
                        fontSize: "clamp(var(--text-xl), 3vw, var(--text-2xl))",
                        fontWeight: 300,
                        color: "var(--ink-950)",
                        letterSpacing: "var(--ls-snug)",
                    }}>
                        이보영
                    </h2>
                </motion.div>

                <div style={{
                    display: "grid",
                    gridTemplateColumns: "1fr",
                    gap: "var(--space-16)",
                }}>
                    {/* Responsive: portrait left, text right on md+ */}
                    <div className="md:grid" style={{ display: "contents" }}>
                        <div style={{
                            display: "grid",
                            gridTemplateColumns: "1fr",
                            gap: "var(--space-16)",
                        }}>
                            {/* Image */}
                            <motion.div
                                initial={{ opacity: 0, y: 12 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={viewport}
                                transition={{ duration: 0.8, ease }}
                                style={{ maxWidth: "320px" }}
                            >
                                <div style={{
                                    position: "relative",
                                    aspectRatio: "3/4",
                                    overflow: "hidden",
                                    backgroundColor: "var(--paper-100)",
                                    border: "var(--line-default)",
                                }}>
                                    <Image
                                        src="/profile.jpeg"
                                        alt="이보영 대표"
                                        fill
                                        style={{ objectFit: "cover" }}
                                    />
                                </div>
                            </motion.div>

                            {/* Text content */}
                            <motion.div
                                initial={{ opacity: 0, y: 12 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={viewport}
                                transition={{ duration: 0.8, delay: 0.15, ease }}
                                style={{ display: "flex", flexDirection: "column", gap: "var(--space-12)" }}
                            >
                                <div>
                                    <SectionLabel>자격 및 경력</SectionLabel>
                                    <div style={{ display: "flex", flexDirection: "column", gap: "var(--space-3)" }}>
                                        {careers.map((item, i) => <ListItem key={i} text={item} />)}
                                    </div>
                                </div>

                                <div>
                                    <SectionLabel>수상 경력</SectionLabel>
                                    <div style={{ display: "flex", flexDirection: "column", gap: "var(--space-3)" }}>
                                        {awards.map((item, i) => <ListItem key={i} text={item} />)}
                                    </div>
                                </div>

                                <div>
                                    <SectionLabel>전시 및 활동</SectionLabel>
                                    <div style={{ display: "flex", flexDirection: "column", gap: "var(--space-3)" }}>
                                        {activities.map((item, i) => <ListItem key={i} text={item} />)}
                                    </div>
                                </div>

                                {/* Quote */}
                                <div style={{
                                    paddingTop: "var(--space-8)",
                                    borderTop: "var(--line-default)",
                                    borderLeft: "2px solid var(--ink-100)",
                                    paddingLeft: "var(--space-6)",
                                }}>
                                    <p style={{
                                        fontFamily: "var(--font-serif)",
                                        fontSize: "var(--text-sm)",
                                        color: "var(--ink-300)",
                                        lineHeight: "var(--lh-relaxed)",
                                        letterSpacing: "var(--ls-normal)",
                                    }}>
                                        글씨는 마음의 거울입니다.<br />
                                        진실된 마음으로 쓰고, 아름답게 표현하는 길을 함께 걷겠습니다.
                                    </p>
                                </div>
                            </motion.div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
