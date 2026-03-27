"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { Lock } from "lucide-react";
import { TEMPLATES } from "@/lib/constants";

const templateColors: Record<string, string> = {
  modern: "from-emerald-600 to-cyan-600",
  centered: "from-violet-600 to-fuchsia-600",
  split: "from-amber-500 to-orange-600",
  minimal: "from-slate-700 to-slate-900",
  glass: "from-blue-600 to-indigo-600",
  bold: "from-rose-500 to-pink-600",
  blog: "from-teal-500 to-emerald-500",
  brand: "from-purple-600 to-blue-600",
};

export function TemplateGallerySection() {
  return (
    <section id="templates" className="py-24 md:py-32 border-t border-white/5">
      <div className="max-w-6xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.5 }}
          className="text-center mb-14"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-white tracking-tight">
            템플릿 갤러리
          </h2>
          <p className="mt-3 text-base text-white/40">
            무료 4종 + Pro 4종, 총 8종 템플릿
          </p>
        </motion.div>

        {/* Mobile: horizontal scroll / Desktop: grid */}
        <div className="flex md:grid md:grid-cols-4 gap-4 overflow-x-auto md:overflow-visible snap-x snap-mandatory pb-4 md:pb-0 -mx-6 px-6 md:mx-0 md:px-0">
          {TEMPLATES.map((template, i) => (
            <motion.div
              key={template.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-30px" }}
              transition={{ duration: 0.4, delay: i * 0.05 }}
              className="snap-start shrink-0 w-[70vw] sm:w-[45vw] md:w-auto"
            >
              <Link
                href={`/editor?template=${template.id}`}
                className="group block"
              >
                <div className={`relative aspect-[1200/630] rounded-xl overflow-hidden border border-white/[0.06] bg-gradient-to-br ${templateColors[template.id]} transition-all group-hover:border-white/15 group-hover:shadow-lg`}>
                  {/* Template preview content */}
                  <div className="absolute inset-0 flex flex-col items-center justify-center p-4">
                    <span className="text-lg font-bold text-white">{template.name}</span>
                    <span className="text-xs text-white/50 mt-1">템플릿</span>
                  </div>

                  {/* Pro overlay */}
                  {template.pro && (
                    <div className="absolute inset-0 bg-black/30 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                      <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-amber-500/90 text-xs font-semibold text-black">
                        <Lock size={12} />
                        Pro
                      </div>
                    </div>
                  )}
                </div>

                <div className="mt-2.5 flex items-center justify-between px-1">
                  <span className="text-xs font-medium text-white/70">{template.name}</span>
                  {template.pro ? (
                    <span className="text-[10px] font-bold px-1.5 py-0.5 rounded bg-amber-500/20 text-amber-400">PRO</span>
                  ) : (
                    <span className="text-[10px] font-medium text-emerald-400">무료</span>
                  )}
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
