import type { ImageSize, OgConfig } from "./types";

export const IMAGE_SIZES: Record<ImageSize, { w: number; h: number; label: string }> = {
  og: { w: 1200, h: 630, label: "OG (1200×630)" },
  twitter: { w: 1200, h: 675, label: "Twitter (1200×675)" },
  instagram: { w: 1080, h: 1080, label: "Instagram (1080×1080)" },
  facebook: { w: 1200, h: 628, label: "Facebook (1200×628)" },
};

export const defaultConfig: OgConfig = {
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

export const TEMPLATES = [
  { id: "modern", name: "모던", pro: false },
  { id: "centered", name: "센터", pro: false },
  { id: "split", name: "스플릿", pro: false },
  { id: "minimal", name: "미니멀", pro: false },
  { id: "glass", name: "글래스", pro: true },
  { id: "bold", name: "볼드", pro: true },
  { id: "blog", name: "블로그", pro: true },
  { id: "brand", name: "브랜드", pro: true },
] as const;
