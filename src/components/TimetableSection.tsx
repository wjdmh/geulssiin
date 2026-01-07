"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";
import { Plus, Minus, X, Clock, Users } from "lucide-react";
import { cn } from "@/lib/utils";
import { createClient } from "@/lib/supabase/client";
import { classCurriculum } from "@/lib/data";

const SCHEDULE_COLS = ['월', '화', '수', '목', '금', '토'];

interface ClassItem {
    id: number;
    day: string;
    start_time: string;
    end_time: string;
    class_name: string;
    description: string;
    max_capacity: number;
    current_enrollment: number;
}

export function TimetableSection() {
    const [openCurriculum, setOpenCurriculum] = useState<number | null>(null);
    const [classes, setClasses] = useState<ClassItem[]>([]);
    const [selectedClass, setSelectedClass] = useState<ClassItem | null>(null);
    const supabase = createClient();

    useEffect(() => {
        async function fetchClasses() {
            const { data } = await supabase.from('classes').select('*');
            if (data) {
                // Client-side sort to ensure time order
                const sorted = (data as ClassItem[]).sort((a, b) => a.start_time.localeCompare(b.start_time));
                setClasses(sorted);
            }
        }
        fetchClasses();
    }, []);

    // Helper to get classes for a specific day
    const getClassesForDay = (day: string) => {
        return classes.filter(c => c.day === day);
    };

    return (
        <section className="py-32 bg-white text-black relative overflow-hidden">
            {/* Background Elements */}
            <div className="absolute inset-0 z-0 pointer-events-none opacity-30">
                <div className="absolute top-0 left-1/4 w-[1px] h-full bg-gradient-to-b from-transparent via-black/5 to-transparent" />
                <div className="absolute top-0 right-1/4 w-[1px] h-full bg-gradient-to-b from-transparent via-black/5 to-transparent" />
            </div>

            <div className="container mx-auto px-6 relative z-10">
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8 }}
                    className="mb-24 text-center"
                >
                    <span className="inline-block py-1 px-3 mb-6 border border-black/10 rounded-full text-[10px] tracking-[0.2em] font-medium text-gray-500 uppercase">
                        Curriculum
                    </span>
                    <h2 className="text-4xl md:text-6xl font-serif font-light text-black mb-6">
                        교육 과정 <span className="text-black/20">&</span> 시간표
                    </h2>
                    <p className="text-gray-500 max-w-xl mx-auto font-light leading-relaxed">
                        전통과 현대가 공존하는 공간에서 글씨의 본질을 탐구합니다.
                    </p>
                </motion.div>

                {/* 1. Chronological Schedule Grid (Columns Only) */}
                <div className="mb-32">
                    <div className="flex items-end justify-between mb-8 border-b border-black/10 pb-4">
                        <h3 className="text-xl font-serif text-black/90">수업 시간표</h3>
                        <p className="text-xs text-gray-400 font-mono hidden md:block">CLICK FOR DETAILS</p>
                    </div>

                    <div className="overflow-x-auto pb-4 scrollbar-thin scrollbar-thumb-gray-200">
                        <div className="min-w-[800px] grid grid-cols-6 gap-0 border-t border-l border-black/10">
                            {/* Header Row */}
                            {SCHEDULE_COLS.map(day => (
                                <div key={day} className="p-4 border-b border-r border-black/10 text-center text-sm font-serif font-bold bg-gray-50">
                                    {day}
                                </div>
                            ))}

                            {/* Class Columns */}
                            {SCHEDULE_COLS.map((day) => {
                                const dayClasses = getClassesForDay(day);
                                return (
                                    <div key={day} className="border-r border-b border-black/10 min-h-[300px] p-2 bg-white flex flex-col gap-2">
                                        {dayClasses.length > 0 ? (
                                            dayClasses.map((cls) => (
                                                <motion.button
                                                    key={cls.id}
                                                    initial={{ opacity: 0, y: 10 }}
                                                    whileInView={{ opacity: 1, y: 0 }}
                                                    viewport={{ once: true }}
                                                    onClick={() => setSelectedClass(cls)}
                                                    className="w-full text-left p-3 rounded border border-gray-100 bg-gray-50/50 hover:bg-black hover:text-white hover:border-black transition-all group"
                                                >
                                                    <div className="font-bold text-sm mb-1 group-hover:text-white transition-colors">{cls.class_name}</div>
                                                    <div className="flex items-center gap-1.5 text-xs text-gray-500 font-mono group-hover:text-white/70">
                                                        <Clock size={10} />
                                                        {cls.start_time} - {cls.end_time}
                                                    </div>
                                                </motion.button>
                                            ))
                                        ) : (
                                            <div className="h-full flex items-center justify-center text-xs text-gray-300 font-light italic">
                                                -
                                            </div>
                                        )}
                                    </div>
                                );
                            })}
                        </div>
                    </div>
                </div>

                {/* 2. Curtain Curriculum (Static) */}
                <div className="max-w-4xl mx-auto">
                    <div className="flex items-end justify-between mb-12">
                        <h3 className="text-xl font-serif text-black/90">상세 커리큘럼</h3>
                        <p className="text-xs text-gray-400 font-mono">STEP BY STEP</p>
                    </div>

                    <div className="space-y-px">
                        {classCurriculum.map((cls, index) => {
                            const isOpen = openCurriculum === index;
                            return (
                                <motion.div
                                    key={cls.title}
                                    initial={{ opacity: 0, x: -20 }}
                                    whileInView={{ opacity: 1, x: 0 }}
                                    transition={{ duration: 0.5, delay: index * 0.1 }}
                                >
                                    <button
                                        onClick={() => setOpenCurriculum(isOpen ? null : index)}
                                        className={cn(
                                            "w-full flex items-center justify-between p-6 md:p-8 text-left transition-all duration-500 border border-black/10 bg-white shadow-sm",
                                            isOpen ? "bg-gray-50 border-black/20" : "hover:bg-gray-50 hover:border-black/20"
                                        )}
                                    >
                                        <div className="flex items-center gap-6">
                                            <span className="text-xs font-mono text-gray-400">0{index + 1}</span>
                                            <h4 className={cn("text-xl md:text-2xl font-serif", isOpen ? "text-black font-bold" : "text-gray-600")}>{cls.title}</h4>
                                        </div>
                                        <div className={cn("w-8 h-8 flex items-center justify-center rounded-full border transition-all", isOpen ? "bg-black text-white border-black" : "border-black/10")}>
                                            {isOpen ? <Minus size={14} /> : <Plus size={14} />}
                                        </div>
                                    </button>
                                    <AnimatePresence>
                                        {isOpen && (
                                            <motion.div
                                                initial={{ height: 0, opacity: 0 }}
                                                animate={{ height: "auto", opacity: 1 }}
                                                exit={{ height: 0, opacity: 0 }}
                                                className="overflow-hidden"
                                            >
                                                <div className="p-6 md:p-8 bg-gray-50/50 border-x border-b border-black/10">
                                                    <p className="text-gray-600 mb-8 font-light">{cls.description}</p>
                                                    <div className="grid md:grid-cols-3 gap-4">
                                                        {cls.details.map((d, i) => (
                                                            <div key={i} className="p-4 bg-white border border-black/5 rounded">
                                                                <span className="text-xs font-bold text-black block mb-2">{d.level}</span>
                                                                <span className="text-sm text-gray-500">{d.content}</span>
                                                            </div>
                                                        ))}
                                                    </div>
                                                </div>
                                            </motion.div>
                                        )}
                                    </AnimatePresence>
                                </motion.div>
                            );
                        })}
                    </div>
                </div>
            </div>

            {/* Class Detail Modal */}
            <AnimatePresence>
                {selectedClass && (
                    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
                        <motion.div
                            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                            className="fixed inset-0 bg-black/40 backdrop-blur-sm"
                            onClick={() => setSelectedClass(null)}
                        />
                        <motion.div
                            initial={{ opacity: 0, scale: 0.95, y: 20 }}
                            animate={{ opacity: 1, scale: 1, y: 0 }}
                            exit={{ opacity: 0, scale: 0.95, y: 20 }}
                            className="bg-white w-full max-w-md rounded-2xl shadow-2xl overflow-hidden relative z-10"
                        >
                            <div className="p-6 md:p-8">
                                <button
                                    onClick={() => setSelectedClass(null)}
                                    className="absolute top-4 right-4 text-gray-400 hover:text-black transition-colors"
                                >
                                    <X size={24} />
                                </button>

                                <div className="mb-2 text-xs font-bold tracking-widest text-blue-600 uppercase">Class Detail</div>
                                <h3 className="text-2xl font-serif font-bold text-black mb-6">{selectedClass.class_name}</h3>

                                <div className="space-y-4">
                                    <div className="flex items-start gap-3">
                                        <Clock size={20} className="text-gray-400 mt-0.5" />
                                        <div>
                                            <span className="block font-medium text-black">{selectedClass.day}요일</span>
                                            <span className="text-sm text-gray-500">{selectedClass.start_time} - {selectedClass.end_time}</span>
                                        </div>
                                    </div>

                                    <div className="flex items-start gap-3">
                                        <Users size={20} className="text-gray-400 mt-0.5" />
                                        <div>
                                            <span className="block font-medium text-black">수강 인원</span>
                                            <div className="text-sm text-gray-500 mt-1">
                                                <div className="flex items-center gap-2 mb-1">
                                                    <div className="flex-1 h-2 bg-gray-100 rounded-full overflow-hidden w-32">
                                                        <div
                                                            className="h-full bg-black rounded-full"
                                                            style={{ width: `${Math.min((selectedClass.current_enrollment / (selectedClass.max_capacity || 1)) * 100, 100)}%` }}
                                                        />
                                                    </div>
                                                    <span className="text-xs font-mono">{selectedClass.current_enrollment} / {selectedClass.max_capacity || '∞'}</span>
                                                </div>
                                                {selectedClass.current_enrollment >= (selectedClass.max_capacity || 999) && (
                                                    <span className="text-xs text-red-500 font-bold">마감되었습니다</span>
                                                )}
                                            </div>
                                        </div>
                                    </div>

                                    {selectedClass.description && (
                                        <div className="pt-4 border-t border-gray-100 mt-4">
                                            <p className="text-gray-600 leading-relaxed text-sm">{selectedClass.description}</p>
                                        </div>
                                    )}
                                </div>

                                <div className="mt-8 pt-6 border-t border-gray-100">
                                    <button
                                        onClick={() => setSelectedClass(null)}
                                        className="w-full py-3 bg-black text-white rounded-lg font-medium hover:bg-gray-800 transition-colors"
                                    >
                                        확인
                                    </button>
                                </div>
                            </div>
                        </motion.div>
                    </div>
                )}
            </AnimatePresence>
        </section>
    );
}
