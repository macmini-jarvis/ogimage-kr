import { ImageResponse } from "next/og";

export const runtime = "edge";
export const alt = "OGMaker - 무료 OG 이미지 생성기 | SNS 미리보기 이미지";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          background: "linear-gradient(135deg, #0f172a, #1e1b4b)",
          fontFamily: "sans-serif",
        }}
      >
        <div
          style={{
            fontSize: 72,
            fontWeight: 700,
            color: "white",
            marginBottom: 16,
          }}
        >
          OGMaker
        </div>
        <div style={{ fontSize: 32, color: "rgba(255,255,255,0.8)" }}>
          무료 OG 이미지 생성기 | SNS 미리보기 이미지
        </div>
      </div>
    ),
    { ...size }
  );
}
