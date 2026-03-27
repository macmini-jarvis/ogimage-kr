"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { Check } from "lucide-react";

const plans = [
  {
    name: "무료",
    price: "₩0",
    period: "영구 무료",
    cta: "무료로 시작",
    ctaStyle: "border border-white/10 text-white hover:border-white/20",
    features: [
      "4종 기본 템플릿",
      "PNG 다운로드",
      "6종 그라디언트 프리셋",
      "OG 사이즈 (1200×630)",
      "노이즈 & 그리드 효과",
      "회원가입 불필요",
    ],
  },
  {
    name: "Pro",
    price: "₩3,900",
    period: "/월",
    badge: "추천",
    cta: "Pro 시작하기",
    ctaStyle: "bg-gradient-to-r from-amber-500 to-orange-500 text-black font-semibold hover:shadow-lg hover:shadow-amber-500/20",
    features: [
      "8종+ 프리미엄 템플릿",
      "PNG / JPEG / WebP 다운로드",
      "워터마크 제거",
      "한국어 폰트 5종",
      "커스텀 그라디언트",
      "Twitter / Instagram / Facebook 사이즈",
      "14일 무조건 환불 보장",
    ],
  },
];

export function PricingSection() {
  return (
    <section id="pricing" className="py-24 md:py-32 border-t border-white/5">
      <div className="max-w-4xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.5 }}
          className="text-center mb-14"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-white tracking-tight">
            심플한 가격
          </h2>
          <p className="mt-3 text-base text-white/40">
            무료로 시작하고, 필요할 때 업그레이드
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {plans.map((plan, i) => (
            <motion.div
              key={plan.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className={`relative p-7 rounded-2xl border transition-all ${
                plan.badge
                  ? "border-amber-500/30 bg-amber-500/[0.03] shadow-lg shadow-amber-500/5"
                  : "border-white/[0.06] bg-white/[0.02]"
              }`}
            >
              {plan.badge && (
                <span className="absolute -top-3 left-6 px-3 py-1 text-xs font-bold bg-amber-500 text-black rounded-full">
                  {plan.badge}
                </span>
              )}

              <h3 className="text-lg font-semibold text-white">{plan.name}</h3>
              <div className="mt-3 flex items-baseline gap-1">
                <span className="text-3xl font-bold text-white">{plan.price}</span>
                <span className="text-sm text-white/40">{plan.period}</span>
              </div>

              <Link
                href="/editor"
                className={`mt-6 block w-full py-2.5 text-sm text-center rounded-xl transition-all ${plan.ctaStyle}`}
              >
                {plan.cta}
              </Link>

              <ul className="mt-6 flex flex-col gap-3">
                {plan.features.map((feature) => (
                  <li key={feature} className="flex items-start gap-2.5">
                    <div className="mt-0.5 w-4 h-4 rounded-full bg-emerald-500/15 flex items-center justify-center shrink-0">
                      <Check size={10} className="text-emerald-400" />
                    </div>
                    <span className="text-xs text-white/50">{feature}</span>
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
