"use client"

import { SignalHigh, Wifi, BatteryFull } from "lucide-react"

/**
 * Phone mockup that uses the provided iPhone SVG frame
 * (public/images/mockup-phone.svg).
 *
 * The SVG is a detailed iPhone render with a fully TRANSPARENT screen cut-out
 * and a built-in dynamic island. We render the live route BEHIND the SVG and
 * let it show through the screen, so the frame edges and the island naturally
 * overlap the content like a real device.
 *
 * On top of the live route we draw an iOS-style status bar (time on the left,
 * signal / wifi / battery on the right) flanking the centered island, and we
 * push the page content down so it begins BELOW the status bar — exactly how a
 * real browser renders web content beneath the system status bar.
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

// iOS status-bar height in logical (390-wide) pixels — content starts below it
const STATUS_BAR_LOGICAL = 52

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
  const statusBarHeight = STATUS_BAR_LOGICAL * scale

  // The live page occupies the screen below the status bar
  const contentHeight = screenHeight - statusBarHeight
  const iframeLogicalHeight = contentHeight / scale

  // Status-bar typography / icon sizing scales with the phone
  const statusFont = Math.round(screenWidth * 0.058)
  const iconSize = Math.round(screenWidth * 0.06)

  return (
    <div className="relative shrink-0" style={{ width, height: phoneHeight }}>
      {/* Screen: status bar + live route, clipped to the screen cut-out */}
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
        {/* iOS status bar (sits above the page content, flanks the island) */}
        <div
          className="flex items-center justify-between bg-white text-black"
          style={{
            height: statusBarHeight,
            paddingLeft: screenWidth * 0.09,
            paddingRight: screenWidth * 0.08,
          }}
        >
          <span
            className="font-semibold leading-none"
            style={{ fontSize: statusFont }}
          >
            9:41
          </span>
          <span className="flex items-center" style={{ gap: screenWidth * 0.018 }}>
            <SignalHigh style={{ width: iconSize, height: iconSize }} strokeWidth={2.5} />
            <Wifi style={{ width: iconSize, height: iconSize }} strokeWidth={2.5} />
            <BatteryFull style={{ width: iconSize * 1.15, height: iconSize * 1.15 }} strokeWidth={2} />
          </span>
        </div>

        {/* Live route begins below the status bar */}
        <div className="relative overflow-hidden" style={{ height: contentHeight }}>
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
      </div>

      {/* iPhone frame on top — transparent screen reveals the content,
          and the built-in dynamic island overlaps the status bar like a real device */}
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
