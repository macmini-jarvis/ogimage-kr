"use client";

import { Suspense, useState, useRef, useCallback, useEffect, useMemo } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import { OgPreview } from "@/components/og-preview";
import { ControlPanel } from "@/components/control-panel";
import { EditorHeader } from "@/components/editor/editor-header";
import { ProModal } from "@/components/pro-modal";
import PaddleProvider, { checkProStatus } from "@/components/paddle-provider";
import { createClient } from "@/lib/supabase/client";
import type { OgConfig } from "@/lib/types";
import { IMAGE_SIZES, defaultConfig } from "@/lib/constants";
import type { User } from "@supabase/supabase-js";

export default function EditorPage() {
  return (
    <Suspense>
      <EditorContent />
    </Suspense>
  );
}

function EditorContent() {
  const searchParams = useSearchParams();
  const [config, setConfig] = useState<OgConfig>(() => {
    const template = searchParams.get("template");
    if (template) {
      return { ...defaultConfig, template };
    }
    return defaultConfig;
  });
  const [isPro, setIsPro] = useState(false);
  const [showProModal, setShowProModal] = useState(false);
  const [user, setUser] = useState<User | null>(null);
  const previewRef = useRef<HTMLDivElement>(null);
  const [downloading, setDownloading] = useState(false);

  useEffect(() => {
    const supabase = createClient();

    if (supabase) {
      supabase.auth.getUser().then(({ data: { user: u } }) => {
        setUser(u);
      });

      const {
        data: { subscription },
      } = supabase.auth.onAuthStateChange((_event, session) => {
        setUser(session?.user ?? null);
      });

      checkProStatus().then((pro) => {
        if (pro) setIsPro(true);
      });

      return () => subscription.unsubscribe();
    }

    checkProStatus().then((pro) => {
      if (pro) setIsPro(true);
    });
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

  const [mobileTab, setMobileTab] = useState<"settings" | "preview">("settings");

  const previewSection = useMemo(() => (
    <div className="w-full max-w-[720px]">
      <div className="rounded-xl overflow-hidden border border-white/10 shadow-2xl">
        <OgPreview ref={previewRef} config={config} isPro={isPro} />
      </div>

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
    </div>
  ), [config, isPro, downloading, handleDownload]);

  return (
    <PaddleProvider onSubscribed={handleSubscribed}>
      <div className="flex flex-col h-screen">
        <EditorHeader isPro={isPro} onUpgrade={() => setShowProModal(true)} user={user} />

        {/* 모바일 탭 전환 */}
        <div className="lg:hidden flex border-b border-white/10 bg-[#0d0d0d]">
          <button
            onClick={() => setMobileTab("settings")}
            className={`flex-1 py-3 text-sm font-medium transition-colors ${
              mobileTab === "settings"
                ? "text-emerald-400 border-b-2 border-emerald-400"
                : "text-white/50"
            }`}
          >
            설정
          </button>
          <button
            onClick={() => setMobileTab("preview")}
            className={`flex-1 py-3 text-sm font-medium transition-colors ${
              mobileTab === "preview"
                ? "text-emerald-400 border-b-2 border-emerald-400"
                : "text-white/50"
            }`}
          >
            미리보기
          </button>
        </div>

        {/* 데스크톱: 좌우 레이아웃 / 모바일: 탭 전환 */}
        <div className="flex flex-1 overflow-hidden">
          <div className={`lg:block ${mobileTab === "settings" ? "block w-full lg:w-auto" : "hidden"}`}>
            <ControlPanel
              config={config}
              setConfig={setConfig}
              isPro={isPro}
              requirePro={requirePro}
            />
          </div>

          <main className={`flex-1 flex-col items-center justify-center p-4 lg:p-8 bg-[#111] ${
            mobileTab === "preview" ? "flex" : "hidden lg:flex"
          }`}>
            {previewSection}

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
          </main>
        </div>

        {showProModal && (
          <ProModal
            onClose={() => setShowProModal(false)}
            user={user}
          />
        )}
      </div>
    </PaddleProvider>
  );
}
