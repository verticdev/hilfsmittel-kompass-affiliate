import { ImageResponse } from "next/og"

export const runtime = "edge"

export const size = {
  width: 32,
  height: 32,
}

export const contentType = "image/png"

export default function Icon() {
  // Default primary/secondary colors - these will be the fallback
  const primaryColor = "#0F4386"
  const secondaryColor = "#FDDC3F"

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background: primaryColor,
          borderRadius: "6px",
        }}
      >
        {/* Compass/Helper icon - stylized "H" or compass design */}
        <svg
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
        >
          {/* Compass circle */}
          <circle
            cx="12"
            cy="12"
            r="10"
            stroke={secondaryColor}
            strokeWidth="2"
            fill="none"
          />
          {/* Compass needle pointing up */}
          <path
            d="M12 6L14 12L12 14L10 12L12 6Z"
            fill={secondaryColor}
          />
          {/* Compass needle pointing down */}
          <path
            d="M12 18L10 12L12 10L14 12L12 18Z"
            fill={secondaryColor}
            opacity="0.6"
          />
          {/* Center dot */}
          <circle
            cx="12"
            cy="12"
            r="2"
            fill={secondaryColor}
          />
        </svg>
      </div>
    ),
    {
      ...size,
    }
  )
}
