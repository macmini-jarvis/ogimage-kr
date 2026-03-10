"use client";

import { forwardRef } from "react";
import type { OgConfig } from "@/app/page";
import { IMAGE_SIZES } from "@/app/page";

interface OgPreviewProps {
  config: OgConfig;
  isPro: boolean;
}

const FONT_MAP: Record<string, string> = {
  default: "var(--font-geist-sans), sans-serif",
  pretendard: "'Pretendard', sans-serif",
  "noto-sans": "'Noto Sans KR', sans-serif",
  "nanum-gothic": "'NanumGothic', sans-serif",
  "nanum-myeongjo": "'NanumMyeongjo', serif",
  "black-han-sans": "'Black Han Sans', sans-serif",
};

function getGradientClass(direction: string, gradient: string) {
  const dirMap: Record<string, string> = {
    "to-t": "bg-gradient-to-t",
    "to-tr": "bg-gradient-to-tr",
    "to-r": "bg-gradient-to-r",
    "to-br": "bg-gradient-to-br",
    "to-b": "bg-gradient-to-b",
    "to-bl": "bg-gradient-to-bl",
    "to-l": "bg-gradient-to-l",
    "to-tl": "bg-gradient-to-tl",
  };
  return `${dirMap[direction] ?? "bg-gradient-to-br"} ${gradient}`;
}

function getGradientDirectionCSS(direction: string): string {
  const map: Record<string, string> = {
    "to-t": "to top",
    "to-tr": "to top right",
    "to-r": "to right",
    "to-br": "to bottom right",
    "to-b": "to bottom",
    "to-bl": "to bottom left",
    "to-l": "to left",
    "to-tl": "to top left",
  };
  return map[direction] ?? "to bottom right";
}

/* ── 템플릿 컴포넌트들 ── */

function ModernTemplate({ config }: { config: OgConfig }) {
  return (
    <div className="flex flex-col justify-between h-full p-12">
      <div className="flex items-center gap-3">
        {config.logoUrl && (
          <img src={config.logoUrl} alt="" className="w-10 h-10 rounded-lg object-cover" />
        )}
        {config.tag && (
          <span className="px-3 py-1 rounded-full bg-white/20 text-white text-sm font-medium backdrop-blur-sm">
            {config.tag}
          </span>
        )}
      </div>
      <div>
        <h1 className="font-bold text-white leading-tight max-w-[80%]" style={{ fontSize: `${config.fontSize}px` }}>
          {config.title}
        </h1>
        {config.author && <p className="text-white/60 text-base mt-4">{config.author}</p>}
      </div>
    </div>
  );
}

function CenteredTemplate({ config }: { config: OgConfig }) {
  return (
    <div className="flex flex-col items-center justify-center h-full p-12 text-center">
      {config.logoUrl && (
        <img src={config.logoUrl} alt="" className="w-14 h-14 rounded-xl object-cover mb-6" />
      )}
      {config.tag && (
        <span className="px-3 py-1 rounded-full bg-white/20 text-white text-sm font-medium backdrop-blur-sm mb-4">
          {config.tag}
        </span>
      )}
      <h1 className="font-bold text-white leading-tight max-w-[85%]" style={{ fontSize: `${config.fontSize}px` }}>
        {config.title}
      </h1>
      {config.author && <p className="text-white/60 text-base mt-4">{config.author}</p>}
    </div>
  );
}

function SplitTemplate({ config }: { config: OgConfig }) {
  return (
    <div className="flex h-full">
      <div className="flex-1 flex flex-col justify-between p-12">
        <div className="flex items-center gap-3">
          {config.logoUrl && (
            <img src={config.logoUrl} alt="" className="w-10 h-10 rounded-lg object-cover" />
          )}
          {config.tag && (
            <span className="px-3 py-1 rounded-full bg-white/20 text-white text-sm font-medium backdrop-blur-sm">
              {config.tag}
            </span>
          )}
        </div>
        <div>
          <h1 className="font-bold text-white leading-tight" style={{ fontSize: `${config.fontSize * 0.85}px` }}>
            {config.title}
          </h1>
          {config.author && <p className="text-white/60 text-base mt-4">{config.author}</p>}
        </div>
      </div>
      <div className="w-[45%] bg-white/5 flex items-center justify-center">
        {config.imageUrl ? (
          <img src={config.imageUrl} alt="" className="w-full h-full object-cover" />
        ) : (
          <div className="text-white/20 text-sm">이미지 영역</div>
        )}
      </div>
    </div>
  );
}

function MinimalTemplate({ config }: { config: OgConfig }) {
  return (
    <div className="flex items-center justify-center h-full p-16">
      <h1 className="font-bold text-white leading-tight text-center" style={{ fontSize: `${config.fontSize * 1.1}px` }}>
        {config.title}
      </h1>
    </div>
  );
}

/* ── Pro 템플릿 ── */

function GlassTemplate({ config }: { config: OgConfig }) {
  return (
    <div className="flex items-center justify-center h-full p-12">
      <div className="bg-white/10 backdrop-blur-md rounded-2xl border border-white/20 p-10 max-w-[80%]">
        {config.tag && (
          <span className="px-3 py-1 rounded-full bg-white/20 text-white text-xs font-medium mb-4 inline-block">
            {config.tag}
          </span>
        )}
        <h1 className="font-bold text-white leading-tight" style={{ fontSize: `${config.fontSize * 0.9}px` }}>
          {config.title}
        </h1>
        {config.author && <p className="text-white/60 text-sm mt-4">{config.author}</p>}
      </div>
    </div>
  );
}

function BoldTemplate({ config }: { config: OgConfig }) {
  return (
    <div className="flex items-center justify-center h-full p-8">
      <h1
        className="font-black text-white leading-none text-center uppercase tracking-tight"
        style={{ fontSize: `${config.fontSize * 1.4}px` }}
      >
        {config.title}
      </h1>
    </div>
  );
}

function BlogTemplate({ config }: { config: OgConfig }) {
  return (
    <div className="flex flex-col h-full p-12">
      <div className="flex items-center gap-3 mb-auto">
        {config.logoUrl && (
          <img src={config.logoUrl} alt="" className="w-8 h-8 rounded-full object-cover" />
        )}
        {config.author && <span className="text-white/70 text-sm font-medium">{config.author}</span>}
      </div>
      <div>
        {config.tag && (
          <span className="text-emerald-300 text-sm font-semibold mb-3 block">{config.tag}</span>
        )}
        <h1 className="font-bold text-white leading-tight max-w-[90%]" style={{ fontSize: `${config.fontSize}px` }}>
          {config.title}
        </h1>
      </div>
      <div className="mt-auto pt-6 border-t border-white/10">
        <div className="w-16 h-1 rounded-full bg-emerald-400" />
      </div>
    </div>
  );
}

function BrandTemplate({ config }: { config: OgConfig }) {
  return (
    <div className="flex flex-col items-center justify-center h-full p-12 text-center">
      {config.logoUrl ? (
        <img src={config.logoUrl} alt="" className="w-20 h-20 rounded-2xl object-cover mb-8 shadow-lg" />
      ) : (
        <div className="w-20 h-20 rounded-2xl bg-white/20 mb-8 flex items-center justify-center text-white/40 text-2xl font-bold">
          {config.title.charAt(0)}
        </div>
      )}
      <h1 className="font-bold text-white leading-tight" style={{ fontSize: `${config.fontSize}px` }}>
        {config.title}
      </h1>
      {config.tag && (
        <span className="mt-4 px-4 py-1.5 rounded-full border border-white/20 text-white/70 text-sm">
          {config.tag}
        </span>
      )}
    </div>
  );
}

const TEMPLATE_MAP: Record<string, React.FC<{ config: OgConfig }>> = {
  modern: ModernTemplate,
  centered: CenteredTemplate,
  split: SplitTemplate,
  minimal: MinimalTemplate,
  glass: GlassTemplate,
  bold: BoldTemplate,
  blog: BlogTemplate,
  brand: BrandTemplate,
};

export const OgPreview = forwardRef<HTMLDivElement, OgPreviewProps>(
  function OgPreview({ config, isPro }, ref) {
    const size = IMAGE_SIZES[config.imageSize];
    const aspectRatio = `${size.w}/${size.h}`;

    const useCustomGradient = config.bgCustomGradient && config.bgType === "gradient";

    const bgStyle: React.CSSProperties = {};
    let bgClass = "";

    if (config.bgType === "solid") {
      bgStyle.backgroundColor = config.bgSolid;
    } else if (useCustomGradient) {
      bgStyle.background = `linear-gradient(${getGradientDirectionCSS(config.gradientDirection)}, ${config.bgCustomGradient!.from}, ${config.bgCustomGradient!.to})`;
    } else {
      bgClass = getGradientClass(config.gradientDirection, config.bgGradient);
    }

    if (config.fontFamily !== "default") {
      bgStyle.fontFamily = FONT_MAP[config.fontFamily] ?? undefined;
    }

    const Template = TEMPLATE_MAP[config.template] ?? ModernTemplate;

    return (
      <div
        ref={ref}
        className={`relative w-full ${bgClass}`}
        style={{ ...bgStyle, aspectRatio }}
      >
        {/* 노이즈 */}
        {config.noise > 0 && (
          <div
            className="absolute inset-0 pointer-events-none"
            style={{
              opacity: config.noise * 0.4,
              backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='1'/%3E%3C/svg%3E")`,
              backgroundSize: "128px 128px",
            }}
          />
        )}

        {/* 그리드 */}
        {config.gridOverlay && (
          <div
            className="absolute inset-0 pointer-events-none"
            style={{
              backgroundImage: `linear-gradient(rgba(255,255,255,0.05) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.05) 1px, transparent 1px)`,
              backgroundSize: "40px 40px",
            }}
          />
        )}

        {/* 콘텐츠 */}
        <div className="relative z-10 h-full">
          <Template config={config} />
        </div>

        {/* 워터마크 (무료 사용자) */}
        {!isPro && (
          <div className="absolute bottom-3 right-4 z-20">
            <span className="text-[10px] text-white/30 font-medium">
              ogmaker.co.kr
            </span>
          </div>
        )}
      </div>
    );
  }
);
