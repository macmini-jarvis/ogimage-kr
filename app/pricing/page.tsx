import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "가격 - 무료 vs Pro 비교",
  description:
    "OGMaker 요금제를 비교하세요. 무료로 기본 OG 이미지 생성, Pro로 프리미엄 템플릿, 워터마크 제거, 다양한 사이즈를 이용하세요.",
  alternates: {
    canonical: "https://ogmaker.co.kr/pricing",
  },
  openGraph: {
    title: "OGMaker 가격 - 무료 vs Pro 비교",
    description:
      "무료로 기본 OG 이미지 생성, Pro로 프리미엄 템플릿과 워터마크 제거까지.",
    url: "https://ogmaker.co.kr/pricing",
  },
};

const FREE_FEATURES = [
  "4종 기본 템플릿",
  "PNG 다운로드",
  "6종 그라디언트 프리셋",
  "OG 사이즈 (1200×630)",
  "노이즈 · 그리드 효과",
  "회원가입 불필요",
];

const PRO_FEATURES = [
  "8종+ 프리미엄 템플릿",
  "PNG · JPEG · WebP 다운로드",
  "워터마크 제거",
  "커스텀 폰트 5종 (한국어 포함)",
  "커스텀 그라디언트",
  "12종 그라디언트 프리셋",
  "다양한 이미지 사이즈 (Twitter, Instagram, Facebook)",
  "14일 무조건 환불 보장",
];

export default function PricingPage() {
  return (
    <main className="max-w-3xl mx-auto px-6 py-16">
      <Link href="/" className="text-emerald-400 text-xs hover:underline">&larr; OGMaker로 돌아가기</Link>

      <div className="text-center mt-8 mb-12">
        <h1 className="text-3xl font-bold text-white">가격</h1>
        <p className="text-white/50 text-sm mt-2">필요에 맞는 플랜을 선택하세요</p>
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        {/* 무료 */}
        <div className="rounded-2xl border border-white/10 bg-[#151515] p-8">
          <h2 className="text-lg font-bold text-white">무료</h2>
          <div className="flex items-baseline gap-1 mt-3">
            <span className="text-3xl font-bold text-white">₩0</span>
            <span className="text-white/40 text-sm">/영구</span>
          </div>
          <p className="text-white/40 text-xs mt-2">회원가입 없이 바로 사용</p>

          <Link
            href="/"
            className="block w-full text-center py-2.5 mt-6 rounded-xl bg-white/10 hover:bg-white/15 text-white text-sm font-medium transition-colors"
          >
            무료로 시작
          </Link>

          <ul className="mt-8 space-y-3">
            {FREE_FEATURES.map((f) => (
              <li key={f} className="flex items-center gap-2.5 text-sm">
                <span className="w-4 h-4 rounded-full bg-white/10 flex items-center justify-center shrink-0">
                  <span className="text-white/50 text-[10px]">&#10003;</span>
                </span>
                <span className="text-white/60">{f}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Pro */}
        <div className="rounded-2xl border border-amber-500/30 bg-[#151515] p-8 relative">
          <span className="absolute -top-3 left-6 px-3 py-0.5 rounded-full bg-amber-500 text-black text-[10px] font-bold">
            추천
          </span>
          <h2 className="text-lg font-bold text-white">Pro</h2>
          <div className="flex items-baseline gap-1 mt-3">
            <span className="text-3xl font-bold text-white">₩3,900</span>
            <span className="text-white/40 text-sm">/월</span>
          </div>
          <p className="text-white/40 text-xs mt-2">연간 결제 시 ₩29,000/년 (38% 할인)</p>

          <Link
            href="/"
            className="block w-full text-center py-2.5 mt-6 rounded-xl bg-gradient-to-r from-amber-500 to-orange-500 text-black text-sm font-semibold hover:opacity-90 transition-opacity"
          >
            Pro 시작하기
          </Link>

          <ul className="mt-8 space-y-3">
            {PRO_FEATURES.map((f) => (
              <li key={f} className="flex items-center gap-2.5 text-sm">
                <span className="w-4 h-4 rounded-full bg-emerald-500/20 flex items-center justify-center shrink-0">
                  <span className="text-emerald-400 text-[10px]">&#10003;</span>
                </span>
                <span className="text-white/80">{f}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div className="text-center mt-12 text-white/30 text-xs space-y-1">
        <p>결제는 Paddle을 통해 안전하게 처리됩니다.</p>
        <p>구매 후 14일 이내 무조건 전액 환불 보장.</p>
        <div className="flex items-center justify-center gap-4 mt-4">
          <Link href="/terms" className="hover:text-white/50 transition-colors">이용약관</Link>
          <span>·</span>
          <Link href="/privacy" className="hover:text-white/50 transition-colors">개인정보처리방침</Link>
          <span>·</span>
          <Link href="/refund" className="hover:text-white/50 transition-colors">환불정책</Link>
        </div>
      </div>

      <div className="mt-8 pt-6 border-t border-white/5 text-center text-white/20 text-[10px]">
        운영: soulmateai · 문의: <a href="mailto:openwebside@gmail.com" className="underline">openwebside@gmail.com</a>
      </div>
    </main>
  );
}
