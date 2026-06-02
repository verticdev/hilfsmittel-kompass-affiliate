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
  partnerId: "edeka",
  partnerName: "EDEKA",
  logo: "/images/edeka-logo.png",
  primaryColor: "#0F4386",
  secondaryColor: "#FDDC3F",
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

// Helper to inject CSS variables for colors
function injectColorVariables(primary: string, secondary: string) {
  if (typeof document === "undefined") return
  
  const root = document.documentElement
  
  // Convert hex to HSL for Tailwind CSS variable format
  const hexToHSL = (hex: string): string => {
    const r = parseInt(hex.slice(1, 3), 16) / 255
    const g = parseInt(hex.slice(3, 5), 16) / 255
    const b = parseInt(hex.slice(5, 7), 16) / 255

    const max = Math.max(r, g, b)
    const min = Math.min(r, g, b)
    let h = 0
    let s = 0
    const l = (max + min) / 2

    if (max !== min) {
      const d = max - min
      s = l > 0.5 ? d / (2 - max - min) : d / (max + min)
      switch (max) {
        case r:
          h = ((g - b) / d + (g < b ? 6 : 0)) / 6
          break
        case g:
          h = ((b - r) / d + 2) / 6
          break
        case b:
          h = ((r - g) / d + 4) / 6
          break
      }
    }

    return `${Math.round(h * 360)} ${Math.round(s * 100)}% ${Math.round(l * 100)}%`
  }

  // Set CSS variables
  root.style.setProperty("--primary", hexToHSL(primary))
  root.style.setProperty("--secondary", hexToHSL(secondary))
  
  // Also set ring color to match primary
  root.style.setProperty("--ring", hexToHSL(primary))
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
  const [isHydrated, setIsHydrated] = useState(false)

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
    setIsHydrated(true)
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

  // Prevent hydration mismatch by not rendering until hydrated
  if (!isHydrated) {
    return null
  }

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
