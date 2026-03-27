export type ImageSize = "og" | "twitter" | "instagram" | "facebook";

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
