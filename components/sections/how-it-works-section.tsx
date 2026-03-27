"use client";

import { motion } from "framer-motion";
import { MousePointerClick, Sliders, Download } from "lucide-react";

const steps = [
  {
    icon: MousePointerClick,
    step: "01",
    title: "템플릿 선택",
    description: "8종 템플릿 중 원하는 스타일을 선택하세요",
  },
  {
    icon: Sliders,
    step: "02",
    title: "커스터마이즈",
    description: "텍스트, 배경, 폰트, 효과를 자유롭게 조절하세요",
  },
  {
    icon: Download,
    step: "03",
    title: "다운로드",
    description: "PNG, JPEG, WebP 포맷으로 즉시 다운로드하세요",
  },
];

export function HowItWorksSection() {
  return (
    <section className="py-24 md:py-32 border-t border-white/5">
      <div className="max-w-6xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.5 }}
          className="text-center mb-14"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-white tracking-tight">
            3단계로 완성
          </h2>
          <p className="mt-3 text-base text-white/40">
            복잡한 디자인 도구 없이 누구나 쉽게
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {steps.map((step, i) => (
            <motion.div
              key={step.step}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.5, delay: i * 0.15 }}
              className="relative text-center"
            >
              {/* Connector line (desktop) */}
              {i < steps.length - 1 && (
                <div className="hidden md:block absolute top-10 left-[60%] w-[80%] border-t border-dashed border-white/10" />
              )}

              <div className="relative inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-emerald-500/10 border border-emerald-500/20 mb-5">
                <step.icon size={24} className="text-emerald-400" />
                <span className="absolute -top-2 -right-2 w-6 h-6 rounded-full bg-emerald-500 text-[10px] font-bold text-black flex items-center justify-center">
                  {step.step}
                </span>
              </div>

              <h3 className="text-base font-semibold text-white mb-2">{step.title}</h3>
              <p className="text-sm text-white/40">{step.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
