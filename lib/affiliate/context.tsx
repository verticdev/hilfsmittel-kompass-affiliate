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
  
  // Set CSS variables directly with hex values (matching globals.css format)
  root.style.setProperty("--primary", primary)
  root.style.setProperty("--secondary", secondary)
  root.style.setProperty("--ring", primary)
  root.style.setProperty("--secondary-foreground", primary)
  root.style.setProperty("--affiliate-primary", primary)
  root.style.setProperty("--affiliate-secondary", secondary)
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
