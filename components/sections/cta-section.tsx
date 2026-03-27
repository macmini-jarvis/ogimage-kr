"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

export function CtaSection() {
  return (
    <section className="py-24 md:py-32 relative overflow-hidden">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-emerald-600/10 via-transparent to-cyan-600/10" />
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-emerald-500/30 to-transparent" />

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.5 }}
        className="relative max-w-2xl mx-auto px-6 text-center"
      >
        <h2 className="text-3xl md:text-4xl font-bold text-white tracking-tight">
          지금 무료로<br />
          OG 이미지를 만들어보세요
        </h2>
        <p className="mt-4 text-base text-white/40">
          회원가입 없이, 3초 만에 완성
        </p>

        <Link
          href="/editor"
          className="mt-8 inline-flex items-center gap-2 px-8 py-3.5 text-sm font-semibold rounded-xl bg-emerald-500 hover:bg-emerald-400 text-black transition-all hover:shadow-lg hover:shadow-emerald-500/20"
        >
          에디터 시작하기
          <ArrowRight size={16} />
        </Link>
      </motion.div>
    </section>
  );
}
