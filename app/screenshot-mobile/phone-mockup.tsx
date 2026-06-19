"use client"

/**
 * Phone mockup that renders a real route inside the provided phone SVG frame.
 * The route is rendered in an iframe at an iPhone logical width (390px) and
 * scaled to fit the screen cut-out of the SVG.
 */

// --- Phone geometry --------------------------------------------------------
// Native aspect ratio of the SVG asset (viewBox 884.25 x 1917).
const PHONE_ASPECT = 884.25 / 1917

// Rendered width of the phone body in CSS pixels.
const PHONE_WIDTH = 300
const PHONE_HEIGHT = PHONE_WIDTH / PHONE_ASPECT

// Screen cut-out insets (in px, relative to PHONE_WIDTH) — tuned to the SVG.
const INSET_TOP = 16
const INSET_BOTTOM = 16
const INSET_LEFT = 12
const INSET_RIGHT = 12
const SCREEN_RADIUS = 38

// Logical viewport width the site is rendered at inside the iframe.
const IFRAME_LOGICAL_WIDTH = 390

const screenWidth = PHONE_WIDTH - INSET_LEFT - INSET_RIGHT
const screenHeight = PHONE_HEIGHT - INSET_TOP - INSET_BOTTOM
const scale = screenWidth / IFRAME_LOGICAL_WIDTH
const iframeLogicalHeight = screenHeight / scale

interface PhoneMockupProps {
  src: string
  title: string
}

export function PhoneMockup({ src, title }: PhoneMockupProps) {
  return (
    <div
      className="relative shrink-0"
      style={{ width: PHONE_WIDTH, height: PHONE_HEIGHT }}
    >
      {/* Phone body / frame (background) */}
      <img
        src="/images/mockup-phone.svg"
        alt={`${title} auf einem Smartphone`}
        className="pointer-events-none absolute inset-0 h-full w-full select-none"
        draggable={false}
        style={{ filter: "drop-shadow(0 30px 45px rgba(15, 23, 42, 0.28))" }}
      />

      {/* Screen content sits on top, clipped to the screen cut-out */}
      <div
        className="absolute overflow-hidden bg-white"
        style={{
          top: INSET_TOP,
          left: INSET_LEFT,
          width: screenWidth,
          height: screenHeight,
          borderRadius: SCREEN_RADIUS,
        }}
      >
        <iframe
          src={src}
          title={title}
          loading="lazy"
          className="origin-top-left border-0"
          style={{
            width: IFRAME_LOGICAL_WIDTH,
            height: iframeLogicalHeight,
            transform: `scale(${scale})`,
          }}
        />
      </div>
    </div>
  )
}
