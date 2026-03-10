"use client";

import type { OgConfig, ImageSize } from "@/app/page";
import { IMAGE_SIZES } from "@/app/page";
import { useRef } from "react";

interface ControlPanelProps {
  config: OgConfig;
  setConfig: React.Dispatch<React.SetStateAction<OgConfig>>;
  isPro: boolean;
  requirePro: () => void;
}

const FREE_GRADIENTS = [
  { name: "에메랄드", value: "from-emerald-600 to-cyan-600" },
  { name: "오션", value: "from-blue-600 to-cyan-500" },
  { name: "선셋", value: "from-orange-500 to-rose-500" },
  { name: "퍼플", value: "from-purple-600 to-pink-500" },
  { name: "라임", value: "from-lime-500 to-emerald-500" },
  { name: "골드", value: "from-amber-500 to-orange-500" },
];

const PRO_GRADIENTS = [
  { name: "네온", value: "from-green-400 to-blue-500" },
  { name: "로즈", value: "from-rose-500 to-purple-600" },
  { name: "미드나잇", value: "from-slate-800 to-slate-900" },
  { name: "포레스트", value: "from-green-800 to-emerald-900" },
  { name: "인디고", value: "from-indigo-600 to-violet-600" },
  { name: "코랄", value: "from-pink-400 to-red-500" },
];

const DIRECTIONS = [
  { label: "↗", value: "to-tr" },
  { label: "→", value: "to-r" },
  { label: "↘", value: "to-br" },
  { label: "↓", value: "to-b" },
  { label: "↙", value: "to-bl" },
  { label: "←", value: "to-l" },
  { label: "↖", value: "to-tl" },
  { label: "↑", value: "to-t" },
];

const FREE_TEMPLATES = [
  { id: "modern", name: "모던", desc: "좌측 정렬, 깔끔한 레이아웃" },
  { id: "centered", name: "센터", desc: "중앙 정렬, 임팩트 있는 제목" },
  { id: "split", name: "스플릿", desc: "좌우 분할, 이미지 영역 포함" },
  { id: "minimal", name: "미니멀", desc: "타이틀만, 최소한의 요소" },
];

const PRO_TEMPLATES = [
  { id: "glass", name: "글래스", desc: "글래스모피즘 카드 스타일" },
  { id: "bold", name: "볼드", desc: "초대형 타이틀, 강렬한 인상" },
  { id: "blog", name: "블로그", desc: "블로그 포스트 최적화" },
  { id: "brand", name: "브랜드", desc: "로고 중심 브랜드 카드" },
];

const FONTS = [
  { id: "default", name: "기본 (Geist)", pro: false },
  { id: "pretendard", name: "Pretendard", pro: true },
  { id: "noto-sans", name: "Noto Sans KR", pro: true },
  { id: "nanum-gothic", name: "나눔고딕", pro: true },
  { id: "nanum-myeongjo", name: "나눔명조", pro: true },
  { id: "black-han-sans", name: "블랙한산스", pro: true },
];

function SectionTitle({ children }: { children: React.ReactNode }) {
  return (
    <h3 className="text-[11px] font-semibold text-white/50 uppercase tracking-wider mb-2">
      {children}
    </h3>
  );
}

function ProBadge() {
  return (
    <span className="ml-1 px-1 py-0.5 text-[8px] font-bold bg-amber-500 text-black rounded">
      PRO
    </span>
  );
}

function LockOverlay({ onClick }: { onClick: () => void }) {
  return (
    <div
      onClick={onClick}
      className="absolute inset-0 bg-black/40 backdrop-blur-[1px] rounded-lg flex items-center justify-center cursor-pointer z-10"
    >
      <span className="text-[10px] font-medium text-amber-400 flex items-center gap-1">
        🔒 Pro
      </span>
    </div>
  );
}

export function ControlPanel({
  config,
  setConfig,
  isPro,
  requirePro,
}: ControlPanelProps) {
  const logoInputRef = useRef<HTMLInputElement>(null);
  const imageInputRef = useRef<HTMLInputElement>(null);

  const update = (partial: Partial<OgConfig>) =>
    setConfig((prev) => ({ ...prev, ...partial }));

  const MAX_FILE_SIZE = 5 * 1024 * 1024; // 5MB
  const ALLOWED_TYPES = ["image/jpeg", "image/png", "image/webp", "image/gif"];

  const handleFileUpload = (
    e: React.ChangeEvent<HTMLInputElement>,
    key: "logoUrl" | "imageUrl"
  ) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (!ALLOWED_TYPES.includes(file.type)) {
      alert("JPG, PNG, WebP, GIF 이미지만 업로드 가능합니다.");
      e.target.value = "";
      return;
    }

    if (file.size > MAX_FILE_SIZE) {
      alert("파일 크기는 5MB 이하만 가능합니다.");
      e.target.value = "";
      return;
    }

    const reader = new FileReader();
    reader.onload = () => update({ [key]: reader.result as string });
    reader.readAsDataURL(file);
  };

  const allTemplates: { id: string; name: string; desc: string; pro?: boolean }[] = [
    ...FREE_TEMPLATES,
    ...PRO_TEMPLATES.map((t) => ({ ...t, pro: true as const })),
  ];

  return (
    <aside className="w-80 shrink-0 border-r border-white/5 bg-[#0d0d0d] overflow-y-auto">
      <div className="p-5 space-y-6">
        {/* 템플릿 선택 */}
        <section>
          <SectionTitle>템플릿</SectionTitle>
          <div className="grid grid-cols-2 gap-2">
            {allTemplates.map((t) => {
              const isProTemplate = t.pro === true;
              const locked = isProTemplate && !isPro;
              return (
                <button
                  key={t.id}
                  onClick={() => {
                    if (locked) {
                      requirePro();
                    } else {
                      update({ template: t.id });
                    }
                  }}
                  className={`relative p-2.5 rounded-lg border text-left transition-all ${
                    config.template === t.id
                      ? "border-emerald-500 bg-emerald-500/10"
                      : locked
                        ? "border-white/5 opacity-60"
                        : "border-white/10 hover:border-white/20"
                  }`}
                >
                  <p className="text-xs font-medium">
                    {t.name}
                    {isProTemplate && <ProBadge />}
                  </p>
                  <p className="text-[10px] text-white/40 mt-0.5">{t.desc}</p>
                  {locked && <LockOverlay onClick={requirePro} />}
                </button>
              );
            })}
          </div>
        </section>

        {/* 텍스트 */}
        <section>
          <SectionTitle>텍스트</SectionTitle>
          <div className="space-y-3">
            <div>
              <label className="text-xs text-white/60 mb-1 block">태그</label>
              <input
                type="text"
                value={config.tag}
                onChange={(e) => update({ tag: e.target.value })}
                placeholder="예: Next.js, 블로그"
                className="w-full px-3 py-2 rounded-lg bg-white/5 border border-white/10 text-sm text-white placeholder:text-white/20 focus:outline-none focus:border-emerald-500/50"
              />
            </div>
            <div>
              <label className="text-xs text-white/60 mb-1 block">제목</label>
              <textarea
                value={config.title}
                onChange={(e) => update({ title: e.target.value })}
                rows={3}
                placeholder="OG 이미지에 표시할 제목"
                className="w-full px-3 py-2 rounded-lg bg-white/5 border border-white/10 text-sm text-white placeholder:text-white/20 focus:outline-none focus:border-emerald-500/50 resize-none"
              />
            </div>
            <div>
              <label className="text-xs text-white/60 mb-1 block">작성자</label>
              <input
                type="text"
                value={config.author}
                onChange={(e) => update({ author: e.target.value })}
                placeholder="예: @username"
                className="w-full px-3 py-2 rounded-lg bg-white/5 border border-white/10 text-sm text-white placeholder:text-white/20 focus:outline-none focus:border-emerald-500/50"
              />
            </div>
            <div>
              <label className="text-xs text-white/60 mb-1 block">
                글자 크기: {config.fontSize}px
              </label>
              <input
                type="range"
                min={24}
                max={64}
                value={config.fontSize}
                onChange={(e) =>
                  update({ fontSize: Number(e.target.value) })
                }
                className="w-full"
              />
            </div>
          </div>
        </section>

        {/* 폰트 선택 */}
        <section>
          <SectionTitle>
            폰트
          </SectionTitle>
          <div className="space-y-1">
            {FONTS.map((f) => {
              const locked = f.pro && !isPro;
              return (
                <button
                  key={f.id}
                  onClick={() => {
                    if (locked) {
                      requirePro();
                    } else {
                      update({ fontFamily: f.id });
                    }
                  }}
                  className={`w-full px-3 py-2 rounded-lg text-left text-xs transition-colors flex items-center justify-between ${
                    config.fontFamily === f.id
                      ? "bg-emerald-500/10 text-emerald-400 border border-emerald-500/30"
                      : locked
                        ? "text-white/30 hover:text-white/40"
                        : "text-white/60 hover:bg-white/5"
                  }`}
                >
                  <span>{f.name}</span>
                  {f.pro && !isPro && <ProBadge />}
                </button>
              );
            })}
          </div>
        </section>

        {/* 이미지 업로드 */}
        <section>
          <SectionTitle>이미지</SectionTitle>
          <div className="flex gap-2">
            <input
              ref={logoInputRef}
              type="file"
              accept="image/jpeg,image/png,image/webp,image/gif"
              className="hidden"
              onChange={(e) => handleFileUpload(e, "logoUrl")}
            />
            <button
              onClick={() => logoInputRef.current?.click()}
              className="flex-1 py-2 rounded-lg border border-white/10 hover:border-white/20 text-xs text-white/60 transition-colors"
            >
              {config.logoUrl ? "✓ 로고 변경" : "로고 업로드"}
            </button>
            <input
              ref={imageInputRef}
              type="file"
              accept="image/jpeg,image/png,image/webp,image/gif"
              className="hidden"
              onChange={(e) => handleFileUpload(e, "imageUrl")}
            />
            <button
              onClick={() => imageInputRef.current?.click()}
              className="flex-1 py-2 rounded-lg border border-white/10 hover:border-white/20 text-xs text-white/60 transition-colors"
            >
              {config.imageUrl ? "✓ 이미지 변경" : "이미지 업로드"}
            </button>
          </div>
          {(config.logoUrl || config.imageUrl) && (
            <button
              onClick={() => update({ logoUrl: null, imageUrl: null })}
              className="mt-2 text-[10px] text-white/30 hover:text-white/50 transition-colors"
            >
              이미지 모두 제거
            </button>
          )}
        </section>

        {/* 이미지 사이즈 */}
        <section>
          <SectionTitle>이미지 사이즈</SectionTitle>
          <div className="grid grid-cols-2 gap-1.5">
            {(Object.entries(IMAGE_SIZES) as [ImageSize, { w: number; h: number; label: string }][]).map(
              ([key, size]) => {
                const locked = key !== "og" && !isPro;
                return (
                  <button
                    key={key}
                    onClick={() => {
                      if (locked) {
                        requirePro();
                      } else {
                        update({ imageSize: key });
                      }
                    }}
                    className={`relative px-2.5 py-2 rounded-lg text-xs transition-colors ${
                      config.imageSize === key
                        ? "bg-emerald-500/10 text-emerald-400 border border-emerald-500/30"
                        : locked
                          ? "text-white/30 border border-white/5"
                          : "text-white/60 border border-white/10 hover:border-white/20"
                    }`}
                  >
                    {size.label}
                    {locked && (
                      <span className="ml-1 text-[8px] text-amber-400">PRO</span>
                    )}
                  </button>
                );
              }
            )}
          </div>
        </section>

        {/* 배경 */}
        <section>
          <SectionTitle>배경</SectionTitle>
          <div className="flex gap-1 mb-3">
            <button
              onClick={() => update({ bgType: "gradient" })}
              className={`flex-1 py-1.5 rounded-md text-xs font-medium transition-colors ${
                config.bgType === "gradient"
                  ? "bg-emerald-500/20 text-emerald-400"
                  : "text-white/40 hover:text-white/60"
              }`}
            >
              그라디언트
            </button>
            <button
              onClick={() => update({ bgType: "solid" })}
              className={`flex-1 py-1.5 rounded-md text-xs font-medium transition-colors ${
                config.bgType === "solid"
                  ? "bg-emerald-500/20 text-emerald-400"
                  : "text-white/40 hover:text-white/60"
              }`}
            >
              단색
            </button>
          </div>

          {config.bgType === "gradient" ? (
            <>
              {/* 무료 그라디언트 */}
              <div className="grid grid-cols-6 gap-1.5 mb-2">
                {FREE_GRADIENTS.map((g) => (
                  <button
                    key={g.value}
                    onClick={() =>
                      update({ bgGradient: g.value, bgCustomGradient: null })
                    }
                    title={g.name}
                    className={`h-8 rounded-md bg-gradient-to-br ${g.value} ring-1 transition-all ${
                      config.bgGradient === g.value && !config.bgCustomGradient
                        ? "ring-emerald-400 ring-2 scale-110"
                        : "ring-white/10 hover:ring-white/30"
                    }`}
                  />
                ))}
              </div>

              {/* Pro 그라디언트 */}
              <div className="relative">
                <div className="grid grid-cols-6 gap-1.5 mb-3">
                  {PRO_GRADIENTS.map((g) => (
                    <button
                      key={g.value}
                      onClick={() => {
                        if (!isPro) {
                          requirePro();
                        } else {
                          update({
                            bgGradient: g.value,
                            bgCustomGradient: null,
                          });
                        }
                      }}
                      title={`${g.name} (Pro)`}
                      className={`h-8 rounded-md bg-gradient-to-br ${g.value} ring-1 transition-all ${
                        config.bgGradient === g.value && !config.bgCustomGradient
                          ? "ring-emerald-400 ring-2 scale-110"
                          : "ring-white/10 hover:ring-white/30"
                      } ${!isPro ? "opacity-50" : ""}`}
                    />
                  ))}
                </div>
                {!isPro && (
                  <div className="absolute top-0 right-0">
                    <ProBadge />
                  </div>
                )}
              </div>

              {/* 커스텀 그라디언트 (Pro) */}
              <div className="relative">
                <p className="text-[10px] text-white/40 mb-1.5">
                  커스텀 그라디언트 {!isPro && <ProBadge />}
                </p>
                <div className="flex gap-2">
                  <input
                    type="color"
                    value={config.bgCustomGradient?.from ?? "#10b981"}
                    disabled={!isPro}
                    onChange={(e) =>
                      update({
                        bgCustomGradient: {
                          from: e.target.value,
                          to: config.bgCustomGradient?.to ?? "#06b6d4",
                        },
                      })
                    }
                    className="flex-1 h-8 rounded cursor-pointer bg-transparent disabled:opacity-30"
                  />
                  <input
                    type="color"
                    value={config.bgCustomGradient?.to ?? "#06b6d4"}
                    disabled={!isPro}
                    onChange={(e) =>
                      update({
                        bgCustomGradient: {
                          from: config.bgCustomGradient?.from ?? "#10b981",
                          to: e.target.value,
                        },
                      })
                    }
                    className="flex-1 h-8 rounded cursor-pointer bg-transparent disabled:opacity-30"
                  />
                </div>
              </div>

              {/* 방향 */}
              <div className="flex gap-1 mt-3">
                {DIRECTIONS.map((d) => (
                  <button
                    key={d.value}
                    onClick={() => update({ gradientDirection: d.value })}
                    className={`flex-1 py-1.5 rounded text-xs transition-colors ${
                      config.gradientDirection === d.value
                        ? "bg-emerald-500/20 text-emerald-400"
                        : "text-white/30 hover:text-white/50"
                    }`}
                  >
                    {d.label}
                  </button>
                ))}
              </div>
            </>
          ) : (
            <input
              type="color"
              value={config.bgSolid}
              onChange={(e) => update({ bgSolid: e.target.value })}
              className="w-full h-10 rounded-lg cursor-pointer bg-transparent"
            />
          )}
        </section>

        {/* 효과 */}
        <section>
          <SectionTitle>효과</SectionTitle>
          <div className="space-y-3">
            <label className="flex items-center justify-between">
              <span className="text-xs text-white/60">그리드 오버레이</span>
              <button
                onClick={() => update({ gridOverlay: !config.gridOverlay })}
                className={`w-9 h-5 rounded-full transition-colors ${
                  config.gridOverlay ? "bg-emerald-500" : "bg-white/10"
                }`}
              >
                <div
                  className={`w-4 h-4 rounded-full bg-white transition-transform mx-0.5 ${
                    config.gridOverlay ? "translate-x-4" : "translate-x-0"
                  }`}
                />
              </button>
            </label>
            <div>
              <label className="text-xs text-white/60 mb-1 block">
                노이즈: {Math.round(config.noise * 100)}%
              </label>
              <input
                type="range"
                min={0}
                max={1}
                step={0.05}
                value={config.noise}
                onChange={(e) =>
                  update({ noise: Number(e.target.value) })
                }
                className="w-full"
              />
            </div>
          </div>
        </section>
      </div>
    </aside>
  );
}
