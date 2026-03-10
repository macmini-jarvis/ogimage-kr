"use client";

import { usePaddle } from "@/components/paddle-provider";
import { createClient } from "@/lib/supabase/client";
import type { User } from "@supabase/supabase-js";

interface ProModalProps {
  onClose: () => void;
  user: User | null;
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

export function ProModal({ onClose, user }: ProModalProps) {
  const { openCheckout } = usePaddle();
  const handleLogin = async () => {
    const supabase = createClient();
    if (!supabase) return;
    await supabase.auth.signInWithOAuth({
      provider: "google",
      options: {
        redirectTo: `${window.location.origin}/api/auth/callback`,
      },
    });
  };

  const handlePurchase = () => {
    openCheckout({
      email: user?.email,
      userId: user?.id,
    });
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
        {user ? (
          <button
            onClick={handlePurchase}
            className="w-full py-3 rounded-xl bg-gradient-to-r from-amber-500 to-orange-500 text-black font-semibold text-sm hover:opacity-90 transition-opacity"
          >
            Pro 시작하기
          </button>
        ) : (
          <button
            onClick={handleLogin}
            className="w-full py-3 rounded-xl bg-white text-black font-semibold text-sm hover:opacity-90 transition-opacity flex items-center justify-center gap-2"
          >
            <svg className="w-4 h-4" viewBox="0 0 24 24">
              <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92a5.06 5.06 0 0 1-2.2 3.32v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.1z"/>
              <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
              <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
              <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
            </svg>
            Google로 로그인 후 구독
          </button>
        )}
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
