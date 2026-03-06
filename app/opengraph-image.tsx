import { ImageResponse } from "next/og";

export const runtime = "edge";
export const alt = "dot life — Visualiza tu vida en puntos";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OgImage() {
  // Generate a mini dot grid for visual effect
  const cols = 52;
  const rows = 6;
  const lived = 28 * 52; // ~28 years as example
  const total = cols * rows;

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
          backgroundColor: "#18181b",
          fontFamily: "system-ui, sans-serif",
        }}
      >
        {/* Dot grid preview */}
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: "4px",
            marginBottom: "40px",
          }}
        >
          {Array.from({ length: rows }).map((_, row) => (
            <div
              key={row}
              style={{
                display: "flex",
                gap: "4px",
              }}
            >
              {Array.from({ length: cols }).map((_, col) => {
                const idx = row * cols + col;
                const isLived = idx < lived / (80 / rows);
                return (
                  <div
                    key={col}
                    style={{
                      width: "12px",
                      height: "12px",
                      borderRadius: "50%",
                      backgroundColor: isLived ? "#e4e4e7" : "#3f3f46",
                    }}
                  />
                );
              })}
            </div>
          ))}
        </div>

        {/* Title */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "12px",
            marginBottom: "16px",
          }}
        >
          <span
            style={{
              fontSize: "56px",
              fontWeight: 800,
              color: "#fafafa",
              letterSpacing: "-0.02em",
            }}
          >
            dot life
          </span>
        </div>

        {/* Subtitle */}
        <span
          style={{
            fontSize: "24px",
            color: "#a1a1aa",
          }}
        >
          Visualiza tu vida en puntos
        </span>
      </div>
    ),
    { ...size },
  );
}
