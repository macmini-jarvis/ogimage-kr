"use client";

import { usePaddle } from "@/components/paddle-provider";

interface ProModalProps {
  onClose: () => void;
}

const PRO_FEATURES = [
  "프리미엄 템플릿 8종+",
  "JPEG / WebP 다운로드",
  "워터마크 제거",
  "커스텀 폰트 5종",
  "커스텀 그라디언트",
  "다양한 이미지 사이즈 (Twitter, Instagram 등)",
  "그라디언트 프리셋 전체 해금",
];

export function ProModal({ onClose }: ProModalProps) {
  const { openCheckout } = usePaddle();

  const handlePurchase = () => {
    openCheckout();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div
        className="absolute inset-0 bg-black/60 backdrop-blur-sm"
        onClick={onClose}
      />
      <div className="relative bg-[#151515] border border-white/10 rounded-2xl p-8 max-w-md w-full mx-4 shadow-2xl">
        {/* 헤더 */}
        <div className="text-center mb-6">
          <span className="inline-block px-3 py-1 rounded-full bg-amber-500/20 text-amber-400 text-xs font-bold mb-3">
            PRO
          </span>
          <h2 className="text-xl font-bold">Pro로 업그레이드</h2>
          <p className="text-sm text-white/50 mt-1">
            더 다양한 기능으로 멋진 OG 이미지를 만드세요
          </p>
        </div>

        {/* 가격 */}
        <div className="text-center mb-6">
          <div className="flex items-baseline justify-center gap-1">
            <span className="text-3xl font-bold">₩3,900</span>
            <span className="text-white/40 text-sm">/월</span>
          </div>
          <p className="text-xs text-white/30 mt-1">
            연간 결제 시 ₩29,000/년 (38% 할인)
          </p>
        </div>

        {/* 기능 목록 */}
        <ul className="space-y-2.5 mb-8">
          {PRO_FEATURES.map((feature) => (
            <li key={feature} className="flex items-center gap-2.5 text-sm">
              <span className="w-4 h-4 rounded-full bg-emerald-500/20 flex items-center justify-center shrink-0">
                <span className="text-emerald-400 text-[10px]">✓</span>
              </span>
              <span className="text-white/80">{feature}</span>
            </li>
          ))}
        </ul>

        {/* 버튼 */}
        <button
          onClick={handlePurchase}
          className="w-full py-3 rounded-xl bg-gradient-to-r from-amber-500 to-orange-500 text-black font-semibold text-sm hover:opacity-90 transition-opacity"
        >
          Pro 시작하기
        </button>
        <button
          onClick={onClose}
          className="w-full py-2.5 text-white/40 text-xs mt-2 hover:text-white/60 transition-colors"
        >
          나중에 할게요
        </button>
      </div>
    </div>
  );
}
