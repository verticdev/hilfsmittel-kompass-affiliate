"use client"

import { useState, useMemo } from "react"
import { useRouter } from "next/navigation"
import {
  ComposableMap,
  Geographies,
  Geography,
} from "react-simple-maps"

// GeoJSON for German Bundesländer
const GERMANY_TOPO_URL = "https://raw.githubusercontent.com/isellsoap/deutschlandGeoJSON/main/2_bundeslaender/4_niedrig.geo.json"

// Map state names to URL-friendly slugs
const stateNameMap: Record<string, string> = {
  "Baden-Württemberg": "baden-wuerttemberg",
  "Bayern": "bayern",
  "Berlin": "berlin",
  "Brandenburg": "brandenburg",
  "Bremen": "bremen",
  "Hamburg": "hamburg",
  "Hessen": "hessen",
  "Mecklenburg-Vorpommern": "mecklenburg-vorpommern",
  "Niedersachsen": "niedersachsen",
  "Nordrhein-Westfalen": "nordrhein-westfalen",
  "Rheinland-Pfalz": "rheinland-pfalz",
  "Saarland": "saarland",
  "Sachsen": "sachsen",
  "Sachsen-Anhalt": "sachsen-anhalt",
  "Schleswig-Holstein": "schleswig-holstein",
  "Thüringen": "thueringen",
}

// Helper to generate a very light tint of a color (for map fill)
function generateLightFill(hex: string): string {
  const cleanHex = hex.replace("#", "")
  const r = parseInt(cleanHex.slice(0, 2), 16)
  const g = parseInt(cleanHex.slice(2, 4), 16)
  const b = parseInt(cleanHex.slice(4, 6), 16)
  
  // Mix with white to create a very light tint (90% white, 10% primary)
  const tintR = Math.round(r * 0.10 + 255 * 0.90)
  const tintG = Math.round(g * 0.10 + 255 * 0.90)
  const tintB = Math.round(b * 0.10 + 255 * 0.90)
  
  return `#${tintR.toString(16).padStart(2, "0")}${tintG.toString(16).padStart(2, "0")}${tintB.toString(16).padStart(2, "0")}`
}

// Helper to generate a medium tint for hover state
function generateHoverFill(hex: string): string {
  const cleanHex = hex.replace("#", "")
  const r = parseInt(cleanHex.slice(0, 2), 16)
  const g = parseInt(cleanHex.slice(2, 4), 16)
  const b = parseInt(cleanHex.slice(4, 6), 16)
  
  // Mix with white to create a medium tint (75% white, 25% primary)
  const tintR = Math.round(r * 0.25 + 255 * 0.75)
  const tintG = Math.round(g * 0.25 + 255 * 0.75)
  const tintB = Math.round(b * 0.25 + 255 * 0.75)
  
  return `#${tintR.toString(16).padStart(2, "0")}${tintG.toString(16).padStart(2, "0")}${tintB.toString(16).padStart(2, "0")}`
}

interface GermanyMapProps {
  primaryColor?: string
  secondaryColor?: string
}

export function GermanyMap({ primaryColor = "#0F4386" }: GermanyMapProps) {
  const router = useRouter()
  const [hoveredState, setHoveredState] = useState<string | null>(null)
  
  // Generate colors based on primary color
  const fillColor = useMemo(() => generateLightFill(primaryColor), [primaryColor])
  const hoverColor = useMemo(() => generateHoverFill(primaryColor), [primaryColor])

  const handleStateClick = (stateName: string) => {
    const slug = stateNameMap[stateName] || stateName.toLowerCase().replace(/\s+/g, "-")
    router.push(`/start?region=${encodeURIComponent(slug)}`)
  }

  return (
    <div className="relative w-full flex justify-center overflow-visible">
      {/* Hovered state label */}
      {hoveredState && (
        <div className="absolute top-0 left-1/2 -translate-x-1/2 bg-white shadow-lg rounded-lg px-4 py-2 z-10 border border-gray-200">
          <span className="font-medium text-gray-900">{hoveredState}</span>
        </div>
      )}
      
      <ComposableMap
        projection="geoMercator"
        projectionConfig={{
          center: [10.4, 51.1],
          scale: 1800,
        }}
        width={340}
        height={400}
        style={{ width: "100%", height: "auto", maxWidth: "340px" }}
      >
        <Geographies geography={GERMANY_TOPO_URL}>
          {({ geographies }) =>
            geographies.map((geo) => {
              const stateName = geo.properties.name || geo.properties.NAME_1 || geo.properties.GEN
              
              return (
                <Geography
                  key={geo.rsmKey}
                  geography={geo}
                  onMouseEnter={() => setHoveredState(stateName)}
                  onMouseLeave={() => setHoveredState(null)}
                  onClick={() => handleStateClick(stateName)}
                  style={{
                    default: {
                      fill: fillColor,
                      stroke: primaryColor,
                      strokeWidth: 0.8,
                      outline: "none",
                      cursor: "pointer",
                    },
                    hover: {
                      fill: hoverColor,
                      stroke: primaryColor,
                      strokeWidth: 1.5,
                      outline: "none",
                      cursor: "pointer",
                    },
                    pressed: {
                      fill: primaryColor,
                      stroke: primaryColor,
                      strokeWidth: 1.5,
                      outline: "none",
                      cursor: "pointer",
                    },
                  }}
                />
              )
            })
          }
        </Geographies>
      </ComposableMap>
    </div>
  )
}
