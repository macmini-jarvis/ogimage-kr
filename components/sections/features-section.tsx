"use client";

import { motion } from "framer-motion";
import { Palette, Paintbrush, Type, Monitor } from "lucide-react";

const features = [
  {
    icon: Palette,
    title: "8종 프리미엄 템플릿",
    description: "모던, 센터, 스플릿, 미니멀 + 글래스, 볼드, 블로그, 브랜드 Pro 템플릿",
  },
  {
    icon: Paintbrush,
    title: "커스텀 그라디언트",
    description: "12종 그라디언트 프리셋과 무한한 커스텀 색상 조합으로 나만의 배경 제작",
  },
  {
    icon: Type,
    title: "한국어 폰트 5종",
    description: "Pretendard, 나눔고딕, 나눔명조, 노토산스, 블랙한산스 등 한국어 전용 폰트",
  },
  {
    icon: Monitor,
    title: "다양한 사이즈",
    description: "OG, Twitter, Instagram, Facebook 등 플랫폼별 최적화 사이즈 지원",
  },
];

export function FeaturesSection() {
  return (
    <section id="features" className="py-24 md:py-32">
      <div className="max-w-6xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.5 }}
          className="text-center mb-14"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-white tracking-tight">
            강력한 기능
          </h2>
          <p className="mt-3 text-base text-white/40 max-w-md mx-auto">
            전문 디자이너 없이도 고퀄리티 OG 이미지를 만들 수 있습니다
          </p>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {features.map((feature, i) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className="group p-6 rounded-2xl border border-white/[0.06] bg-white/[0.02] hover:bg-white/[0.04] hover:border-white/10 transition-all"
            >
              <div className="w-10 h-10 rounded-xl bg-emerald-500/10 flex items-center justify-center mb-4">
                <feature.icon size={20} className="text-emerald-400" />
              </div>
              <h3 className="text-sm font-semibold text-white mb-2">{feature.title}</h3>
              <p className="text-xs text-white/40 leading-relaxed">{feature.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
