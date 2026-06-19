"use client"

/**
 * Phone mockup that uses the provided iPhone SVG frame
 * (public/images/mockup-phone.svg).
 *
 * The SVG is a detailed iPhone render with a fully TRANSPARENT screen cut-out
 * and a built-in dynamic island. We render the live route BEHIND the SVG and
 * let it show through the screen, so the frame edges and the island naturally
 * overlap the content like a real device.
 *
 * The screen cut-out geometry was measured from the SVG's transparent region
 * and expressed as fractions of the full image box, so it stays correct at any
 * render width.
 */

// SVG intrinsic aspect ratio (viewBox 884.25 x 1917)
const PHONE_ASPECT = 1917 / 884.25 // height / width

// Measured screen cut-out as fractions of the full phone image
const SCREEN_LEFT = 0.0984
const SCREEN_TOP = 0.0934
const SCREEN_WIDTH_FRAC = 0.7986
const SCREEN_HEIGHT_FRAC = 0.8039

// iPhone logical viewport width the embedded site renders at
const IFRAME_LOGICAL_WIDTH = 390

export function PhoneMockup({
  src,
  title,
  width = 300,
}: {
  src: string
  title: string
  width?: number
}) {
  const phoneHeight = width * PHONE_ASPECT

  const screenLeft = width * SCREEN_LEFT
  const screenTop = phoneHeight * SCREEN_TOP
  const screenWidth = width * SCREEN_WIDTH_FRAC
  const screenHeight = phoneHeight * SCREEN_HEIGHT_FRAC

  // Scale the logical iPhone-width iframe down to fit the screen cut-out
  const scale = screenWidth / IFRAME_LOGICAL_WIDTH
  const iframeLogicalHeight = screenHeight / scale

  return (
    <div className="relative shrink-0" style={{ width, height: phoneHeight }}>
      {/* Live route, sitting behind the frame and clipped to the screen */}
      <div
        className="absolute overflow-hidden bg-white"
        style={{
          left: screenLeft,
          top: screenTop,
          width: screenWidth,
          height: screenHeight,
          borderRadius: screenWidth * 0.16,
        }}
      >
        <iframe
          src={src}
          title={title}
          loading="lazy"
          scrolling="no"
          className="origin-top-left border-0"
          style={{
            width: IFRAME_LOGICAL_WIDTH,
            height: iframeLogicalHeight,
            transform: `scale(${scale})`,
          }}
        />
      </div>

      {/* iPhone frame on top — transparent screen reveals the content,
          and the built-in dynamic island overlaps it like a real device */}
      <img
        src="/images/mockup-phone.svg"
        alt={`${title} auf einem Smartphone`}
        className="pointer-events-none absolute inset-0 h-full w-full select-none"
        draggable={false}
        style={{ filter: "drop-shadow(0 25px 40px rgba(15, 23, 42, 0.22))" }}
      />
    </div>
  )
}
