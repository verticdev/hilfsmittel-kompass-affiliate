"use client"

import { createContext, useContext, useState, useEffect, useCallback, type ReactNode } from "react"

export interface AffiliateConfig {
  partnerId: string
  partnerName: string
  logo: string
  primaryColor: string
  secondaryColor: string
  contactPhone?: string
  contactEmail?: string
}

const defaultConfig: AffiliateConfig = {
  partnerId: "norma",
  partnerName: "NORMA",
  logo: "/images/norma-logo.png",
  primaryColor: "#CC1F20",
  secondaryColor: "#FDC548",
}

const STORAGE_KEY = "affiliate-config"

interface AffiliateContextValue {
  config: AffiliateConfig
  updateConfig: (updates: Partial<AffiliateConfig>) => void
  resetConfig: () => void
  isCustomized: boolean
}

const AffiliateContext = createContext<AffiliateContextValue>({
  config: defaultConfig,
  updateConfig: () => {},
  resetConfig: () => {},
  isCustomized: false,
})

// Helper to check if a color is white or near-white
function isWhiteOrNearWhite(hex: string): boolean {
  const cleanHex = hex.replace("#", "")
  const r = parseInt(cleanHex.slice(0, 2), 16)
  const g = parseInt(cleanHex.slice(2, 4), 16)
  const b = parseInt(cleanHex.slice(4, 6), 16)
  // Consider it "white" if all channels are above 240
  return r >= 240 && g >= 240 && b >= 240
}

// Helper to generate a light tint of a color (for use when secondary is white)
function generateLightTint(hex: string): string {
  const cleanHex = hex.replace("#", "")
  const r = parseInt(cleanHex.slice(0, 2), 16)
  const g = parseInt(cleanHex.slice(2, 4), 16)
  const b = parseInt(cleanHex.slice(4, 6), 16)
  
  // Mix with white to create a light tint (85% white, 15% primary)
  const tintR = Math.round(r * 0.15 + 255 * 0.85)
  const tintG = Math.round(g * 0.15 + 255 * 0.85)
  const tintB = Math.round(b * 0.15 + 255 * 0.85)
  
  return `#${tintR.toString(16).padStart(2, "0")}${tintG.toString(16).padStart(2, "0")}${tintB.toString(16).padStart(2, "0")}`
}

// Helper to inject CSS variables for colors
function injectColorVariables(primary: string, secondary: string) {
  if (typeof document === "undefined") return
  
  const root = document.documentElement
  
  // If secondary is white/near-white, generate a light tint of primary instead
  const effectiveSecondary = isWhiteOrNearWhite(secondary) 
    ? generateLightTint(primary) 
    : secondary
  
  // Set CSS variables directly with hex values (matching globals.css format)
  root.style.setProperty("--primary", primary)
  root.style.setProperty("--secondary", effectiveSecondary)
  root.style.setProperty("--ring", primary)
  root.style.setProperty("--secondary-foreground", primary)
  root.style.setProperty("--affiliate-primary", primary)
  root.style.setProperty("--affiliate-secondary", effectiveSecondary)
  root.style.setProperty("--info", primary)
  root.style.setProperty("--sidebar-primary", primary)
  root.style.setProperty("--chart-1", primary)
}

export function AffiliateProvider({
  children,
  initialConfig,
}: {
  children: ReactNode
  initialConfig?: AffiliateConfig
}) {
  const [config, setConfig] = useState<AffiliateConfig>(initialConfig || defaultConfig)
  const [isCustomized, setIsCustomized] = useState(false)

  // Load config from localStorage on mount
  useEffect(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY)
      if (stored) {
        const parsed = JSON.parse(stored) as AffiliateConfig
        setConfig(parsed)
        setIsCustomized(true)
        injectColorVariables(parsed.primaryColor, parsed.secondaryColor)
      } else if (initialConfig) {
        injectColorVariables(initialConfig.primaryColor, initialConfig.secondaryColor)
      } else {
        injectColorVariables(defaultConfig.primaryColor, defaultConfig.secondaryColor)
      }
    } catch (e) {
      console.error("Failed to load affiliate config from localStorage:", e)
    }
  }, [initialConfig])

  const updateConfig = useCallback((updates: Partial<AffiliateConfig>) => {
    setConfig((prev) => {
      const newConfig = { ...prev, ...updates }
      
      // Persist to localStorage
      try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(newConfig))
      } catch (e) {
        console.error("Failed to save affiliate config to localStorage:", e)
      }
      
      // Inject color variables if colors changed
      if (updates.primaryColor || updates.secondaryColor) {
        injectColorVariables(
          updates.primaryColor || prev.primaryColor,
          updates.secondaryColor || prev.secondaryColor
        )
      }
      
      setIsCustomized(true)
      return newConfig
    })
  }, [])

  const resetConfig = useCallback(() => {
    setConfig(defaultConfig)
    setIsCustomized(false)
    try {
      localStorage.removeItem(STORAGE_KEY)
    } catch (e) {
      console.error("Failed to remove affiliate config from localStorage:", e)
    }
    injectColorVariables(defaultConfig.primaryColor, defaultConfig.secondaryColor)
  }, [])

  return (
    <AffiliateContext.Provider value={{ config, updateConfig, resetConfig, isCustomized }}>
      {children}
    </AffiliateContext.Provider>
  )
}

export function useAffiliate() {
  const context = useContext(AffiliateContext)
  return context.config
}

export function useAffiliateConfig() {
  return useContext(AffiliateContext)
}

export { defaultConfig }
