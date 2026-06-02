"use client"

import { useState } from "react"
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

interface GermanyMapProps {
  primaryColor?: string
  secondaryColor?: string
}

export function GermanyMap({ primaryColor = "#0F4386", secondaryColor = "#FFD700" }: GermanyMapProps) {
  const router = useRouter()
  const [hoveredState, setHoveredState] = useState<string | null>(null)

  const handleStateClick = (stateName: string) => {
    const slug = stateNameMap[stateName] || stateName.toLowerCase().replace(/\s+/g, "-")
    router.push(`/start?region=${encodeURIComponent(slug)}`)
  }

  return (
    <div className="relative w-full flex flex-col items-center">
      {/* Hovered state label */}
      {hoveredState && (
        <div className="absolute top-2 left-1/2 -translate-x-1/2 bg-white shadow-lg rounded-lg px-4 py-2 z-10 border border-gray-200">
          <span className="font-medium text-gray-900">{hoveredState}</span>
        </div>
      )}
      
      <ComposableMap
        projection="geoMercator"
        projectionConfig={{
          center: [10.4, 51.1],
          scale: 2400,
        }}
        width={450}
        height={480}
        style={{ width: "100%", height: "auto", maxWidth: "400px" }}
      >
        <Geographies geography={GERMANY_TOPO_URL}>
          {({ geographies }) =>
            geographies.map((geo) => {
              const stateName = geo.properties.name || geo.properties.NAME_1 || geo.properties.GEN
              const isHovered = hoveredState === stateName
              
              return (
                <Geography
                  key={geo.rsmKey}
                  geography={geo}
                  onMouseEnter={() => setHoveredState(stateName)}
                  onMouseLeave={() => setHoveredState(null)}
                  onClick={() => handleStateClick(stateName)}
                  style={{
                    default: {
                      fill: "#E8EEF4",
                      stroke: primaryColor,
                      strokeWidth: 0.8,
                      outline: "none",
                      cursor: "pointer",
                    },
                    hover: {
                      fill: secondaryColor,
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
