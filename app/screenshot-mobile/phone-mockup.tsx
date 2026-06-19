"use client"

/**
 * Phone mockup that renders a real route inside a CSS-built iPhone frame.
 * The route renders in an iframe at an iPhone logical width (390px) and is
 * scaled down to fit the screen, so it looks exactly like the live mobile site.
 */

// --- Phone geometry --------------------------------------------------------
// Rendered width of the screen (the visible glass area) in CSS pixels.
const SCREEN_WIDTH = 300

// Logical viewport the site is rendered at inside the iframe (iPhone width).
const IFRAME_LOGICAL_WIDTH = 390
// Logical height (iPhone 14-ish aspect ratio: 390 x 844).
const IFRAME_LOGICAL_HEIGHT = 844

const scale = SCREEN_WIDTH / IFRAME_LOGICAL_WIDTH
const SCREEN_HEIGHT = IFRAME_LOGICAL_HEIGHT * scale

// Status-bar height (in rendered px) reserved at the top of the screen so the
// dynamic-island notch sits in empty space instead of over the site header.
const STATUS_BAR = 30

// Dark bezel thickness around the screen.
const BEZEL = 12
const PHONE_WIDTH = SCREEN_WIDTH + BEZEL * 2
const PHONE_HEIGHT = SCREEN_HEIGHT + BEZEL * 2

const PHONE_RADIUS = 52
const SCREEN_RADIUS = 42

interface PhoneMockupProps {
  src: string
  title: string
}

export function PhoneMockup({ src, title }: PhoneMockupProps) {
  return (
    <div
      className="relative shrink-0"
      style={{
        width: PHONE_WIDTH,
        height: PHONE_HEIGHT,
        borderRadius: PHONE_RADIUS,
        // Dark phone body with a subtle metallic edge highlight.
        background: "linear-gradient(145deg, #2a2a2e 0%, #0d0d0f 55%, #000 100%)",
        padding: BEZEL,
        boxShadow:
          "0 30px 55px rgba(15, 23, 42, 0.30), inset 0 0 0 1.5px rgba(255,255,255,0.08)",
      }}
      aria-label={`${title} auf einem Smartphone`}
    >
      {/* Screen */}
      <div
        className="relative flex h-full w-full flex-col overflow-hidden bg-white"
        style={{ borderRadius: SCREEN_RADIUS }}
      >
        {/* Status bar spacer keeps the site header clear of the notch */}
        <div className="shrink-0 bg-white" style={{ height: STATUS_BAR }} />

        <div className="relative flex-1 overflow-hidden">
          <iframe
            src={src}
            title={title}
            loading="lazy"
            scrolling="no"
            className="origin-top-left border-0"
            style={{
              width: IFRAME_LOGICAL_WIDTH,
              height: IFRAME_LOGICAL_HEIGHT,
              transform: `scale(${scale})`,
            }}
          />
        </div>

        {/* Dynamic island / notch */}
        <div
          className="absolute left-1/2 top-2 -translate-x-1/2 rounded-full bg-black"
          style={{ width: 86, height: 24 }}
          aria-hidden="true"
        />
      </div>
    </div>
  )
}
