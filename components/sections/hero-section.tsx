"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { TEMPLATES } from "@/lib/constants";

const showcaseSlides = TEMPLATES.map((t) => ({
  id: t.id,
  name: t.name,
  pro: t.pro,
}));

// 미리 정의된 쇼케이스 색상
const slideColors = [
  "from-emerald-600 to-cyan-600",
  "from-violet-600 to-fuchsia-600",
  "from-amber-500 to-orange-600",
  "from-blue-600 to-indigo-600",
  "from-rose-500 to-pink-600",
  "from-teal-500 to-emerald-500",
  "from-purple-600 to-blue-600",
  "from-orange-500 to-red-600",
];

export function HeroSection() {
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrent((prev) => (prev + 1) % showcaseSlides.length);
    }, 4000);
    return () => clearInterval(timer);
  }, []);

  return (
    <section className="relative min-h-screen flex items-center overflow-hidden">
      {/* Background effects */}
      <div className="absolute inset-0 dot-grid" />
      <div className="absolute top-1/4 -left-32 w-96 h-96 rounded-full bg-emerald-500 gradient-blob" />
      <div className="absolute bottom-1/4 -right-32 w-80 h-80 rounded-full bg-cyan-500 gradient-blob" />

      <div className="relative max-w-6xl mx-auto px-6 py-32 grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
        {/* Left: Copy */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
        >
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/20 mb-6">
            <div className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
            <span className="text-xs font-medium text-emerald-400">무료 OG 이미지 생성기</span>
          </div>

          <h1 className="text-4xl md:text-5xl lg:text-[3.5rem] font-bold text-white leading-tight tracking-tight">
            블로그 SNS용{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-cyan-400">
              OG 이미지
            </span>
            를<br />
            3초 만에 만드세요
          </h1>

          <p className="mt-5 text-base md:text-lg text-white/50 leading-relaxed max-w-lg">
            8종 템플릿, 한국어 폰트, 커스텀 그라디언트.
            회원가입 없이 바로 다운로드.
          </p>

          <div className="mt-8 flex flex-col sm:flex-row gap-3">
            <Link
              href="/editor"
              className="inline-flex items-center justify-center gap-2 px-6 py-3 text-sm font-semibold rounded-xl bg-emerald-500 hover:bg-emerald-400 text-black transition-all hover:shadow-lg hover:shadow-emerald-500/20"
            >
              무료로 시작하기
              <ArrowRight size={16} />
            </Link>
            <a
              href="#features"
              className="inline-flex items-center justify-center px-6 py-3 text-sm font-medium rounded-xl border border-white/10 text-white/70 hover:text-white hover:border-white/20 transition-all"
            >
              기능 살펴보기
            </a>
          </div>

          <div className="mt-6 flex items-center gap-4 text-xs text-white/30">
            <span>회원가입 불필요</span>
            <span className="w-1 h-1 rounded-full bg-white/20" />
            <span>무료 4종 템플릿</span>
            <span className="w-1 h-1 rounded-full bg-white/20" />
            <span>즉시 다운로드</span>
          </div>
        </motion.div>

        {/* Right: Template Showcase */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.7, delay: 0.2 }}
          className="relative"
        >
          <div className="relative aspect-[1200/630] rounded-2xl overflow-hidden border border-white/10 shadow-2xl shadow-emerald-500/5">
            <AnimatePresence mode="wait">
              <motion.div
                key={current}
                initial={{ opacity: 0, scale: 1.05 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.5 }}
                className={`absolute inset-0 bg-gradient-to-br ${slideColors[current]} flex flex-col items-center justify-center p-8`}
              >
                <span className="text-xs font-medium text-white/70 mb-2 px-3 py-1 rounded-full bg-white/10">
                  {showcaseSlides[current].pro ? "Pro" : "무료"} 템플릿
                </span>
                <span className="text-2xl md:text-3xl font-bold text-white text-center">
                  {showcaseSlides[current].name} 템플릿
                </span>
                <span className="text-sm text-white/60 mt-2">OGMaker로 제작</span>
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Slide indicators */}
          <div className="flex justify-center gap-1.5 mt-4">
            {showcaseSlides.map((_, i) => (
              <button
                key={i}
                onClick={() => setCurrent(i)}
                className={`h-1 rounded-full transition-all ${
                  i === current
                    ? "w-6 bg-emerald-400"
                    : "w-1.5 bg-white/20 hover:bg-white/40"
                }`}
              />
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
