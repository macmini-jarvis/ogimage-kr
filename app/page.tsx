"use client";

import { useState, useRef, useCallback, useEffect } from "react";
import Link from "next/link";
import { OgPreview } from "@/components/og-preview";
import { ControlPanel } from "@/components/control-panel";
import { Header } from "@/components/header";
import { ProModal } from "@/components/pro-modal";
import PaddleProvider, { usePaddle, isProStored } from "@/components/paddle-provider";

export type ImageSize = "og" | "twitter" | "instagram" | "facebook";

export const IMAGE_SIZES: Record<ImageSize, { w: number; h: number; label: string }> = {
  og: { w: 1200, h: 630, label: "OG (1200×630)" },
  twitter: { w: 1200, h: 675, label: "Twitter (1200×675)" },
  instagram: { w: 1080, h: 1080, label: "Instagram (1080×1080)" },
  facebook: { w: 1200, h: 628, label: "Facebook (1200×628)" },
};

export interface OgConfig {
  title: string;
  tag: string;
  author: string;
  template: string;
  bgType: "gradient" | "solid";
  bgGradient: string;
  bgSolid: string;
  bgCustomGradient: { from: string; to: string } | null;
  gradientDirection: string;
  noise: number;
  gridOverlay: boolean;
  logoUrl: string | null;
  imageUrl: string | null;
  fontSize: number;
  fontFamily: string;
  imageSize: ImageSize;
}

const defaultConfig: OgConfig = {
  title: "나만의 OG 이미지를 만들어보세요",
  tag: "OG Image",
  author: "",
  template: "modern",
  bgType: "gradient",
  bgGradient: "from-emerald-600 to-cyan-600",
  bgSolid: "#10b981",
  bgCustomGradient: null,
  gradientDirection: "to-br",
  noise: 0,
  gridOverlay: false,
  logoUrl: null,
  imageUrl: null,
  fontSize: 40,
  fontFamily: "default",
  imageSize: "og",
};

export default function HomePage() {
  return (
    <HomeContent />
  );
}

function HomeContent() {
  const [config, setConfig] = useState<OgConfig>(defaultConfig);
  const [isPro, setIsPro] = useState(false);
  const [showProModal, setShowProModal] = useState(false);
  const previewRef = useRef<HTMLDivElement>(null);
  const [downloading, setDownloading] = useState(false);

  useEffect(() => {
    if (isProStored()) {
      setIsPro(true);
    }
  }, []);

  const handleSubscribed = useCallback(() => {
    setIsPro(true);
    setShowProModal(false);
  }, []);

  const requirePro = useCallback(() => {
    setShowProModal(true);
  }, []);

  const handleDownload = useCallback(
    async (format: "png" | "jpeg" | "webp") => {
      if (!isPro && format !== "png") {
        setShowProModal(true);
        return;
      }
      if (!previewRef.current) return;
      setDownloading(true);

      const size = IMAGE_SIZES[config.imageSize];

      try {
        const { toBlob } = await import("html-to-image");
        const blob = await toBlob(previewRef.current, {
          width: size.w,
          height: size.h,
          pixelRatio: 2,
          type: `image/${format}`,
          quality: format === "jpeg" ? 0.95 : undefined,
        });

        if (blob) {
          const url = URL.createObjectURL(blob);
          const a = document.createElement("a");
          a.href = url;
          a.download = `og-image.${format}`;
          a.click();
          URL.revokeObjectURL(url);
        }
      } catch (err) {
        console.error("Download failed:", err);
      } finally {
        setDownloading(false);
      }
    },
    [isPro, config.imageSize]
  );

  return (
    <PaddleProvider onSubscribed={handleSubscribed}>
      <div className="flex flex-col h-screen">
        <Header isPro={isPro} onUpgrade={() => setShowProModal(true)} />
        <div className="flex flex-1 overflow-hidden">
          {/* 좌측: 컨트롤 패널 */}
          <ControlPanel
            config={config}
            setConfig={setConfig}
            isPro={isPro}
            requirePro={requirePro}
          />

          {/* 우측: 미리보기 + 다운로드 */}
          <main className="flex-1 flex flex-col items-center justify-center p-8 bg-[#111]">
            <div className="w-full max-w-[720px]">
              {/* 미리보기 */}
              <div className="rounded-xl overflow-hidden border border-white/10 shadow-2xl">
                <OgPreview ref={previewRef} config={config} isPro={isPro} />
              </div>

              {/* 다운로드 버튼 */}
              <div className="flex items-center gap-3 mt-6">
                <button
                  onClick={() => handleDownload("png")}
                  disabled={downloading}
                  className="flex-1 py-2.5 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white text-sm font-medium transition-colors disabled:opacity-50"
                >
                  {downloading ? "생성 중..." : "PNG 다운로드"}
                </button>
                <button
                  onClick={() => handleDownload("jpeg")}
                  disabled={downloading}
                  className="relative px-4 py-2.5 rounded-lg bg-white/10 hover:bg-white/15 text-white text-sm font-medium transition-colors disabled:opacity-50"
                >
                  JPEG
                  {!isPro && (
                    <span className="absolute -top-1.5 -right-1.5 px-1 py-0.5 text-[8px] font-bold bg-amber-500 text-black rounded">
                      PRO
                    </span>
                  )}
                </button>
                <button
                  onClick={() => handleDownload("webp")}
                  disabled={downloading}
                  className="relative px-4 py-2.5 rounded-lg bg-white/10 hover:bg-white/15 text-white text-sm font-medium transition-colors disabled:opacity-50"
                >
                  WebP
                  {!isPro && (
                    <span className="absolute -top-1.5 -right-1.5 px-1 py-0.5 text-[8px] font-bold bg-amber-500 text-black rounded">
                      PRO
                    </span>
                  )}
                </button>
              </div>

              <p className="text-xs text-white/30 text-center mt-3">
                {IMAGE_SIZES[config.imageSize].label} · 회원가입 없음 ·{" "}
                {isPro ? "워터마크 없음" : "무료 버전"} · 완전 무료
              </p>

              <div className="mt-10 pt-6 border-t border-white/5 text-center">
                <p className="text-[11px] text-white/30 leading-relaxed max-w-md mx-auto">
                  OGMaker는 블로그, SNS 공유용 오픈그래프(OG) 이미지를 생성하는 온라인 도구입니다.
                  무료로 PNG 이미지를 만들고, Pro 구독으로 프리미엄 템플릿, 커스텀 폰트, 다양한 포맷과 사이즈를 이용하세요.
                </p>
                <p className="text-[10px] text-white/20 mt-3">
                  문의: <a href="mailto:openwebside@gmail.com" className="hover:text-white/40 transition-colors underline">openwebside@gmail.com</a>
                </p>
                <div className="flex items-center justify-center gap-4 mt-3 text-[10px] text-white/20">
                  <Link href="/terms" className="hover:text-white/40 transition-colors">이용약관</Link>
                  <span>·</span>
                  <Link href="/privacy" className="hover:text-white/40 transition-colors">개인정보처리방침</Link>
                  <span>·</span>
                  <Link href="/refund" className="hover:text-white/40 transition-colors">환불정책</Link>
                </div>
              </div>
            </div>
          </main>
        </div>

        {/* Pro 업그레이드 모달 */}
        {showProModal && (
          <ProModal
            onClose={() => setShowProModal(false)}
          />
        )}
      </div>
    </PaddleProvider>
  );
}
