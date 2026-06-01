"use client"

import { createContext, useContext, type ReactNode } from "react"

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
  primaryColor: "#005c73",
  secondaryColor: "#eaf5f7",
}

const AffiliateContext = createContext<AffiliateConfig>(defaultConfig)

export function AffiliateProvider({
  children,
  config = defaultConfig,
}: {
  children: ReactNode
  config?: AffiliateConfig
}) {
  return (
    <AffiliateContext.Provider value={config}>
      {children}
    </AffiliateContext.Provider>
  )
}

export function useAffiliate() {
  return useContext(AffiliateContext)
}

export { defaultConfig }
