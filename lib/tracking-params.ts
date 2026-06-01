import type { ReadonlyURLSearchParams } from "next/navigation"

const TRACKING_PARAMS = ["utm_source", "utm_medium", "utm_campaign", "utm_content", "utm_term", "ref", "partner", "clickid"] as const

type TrackingParams = {
  [K in (typeof TRACKING_PARAMS)[number]]?: string
}

let savedParams: TrackingParams = {}

export function saveTrackingParams(searchParams: ReadonlyURLSearchParams) {
  const params: TrackingParams = {}
  
  TRACKING_PARAMS.forEach((param) => {
    const value = searchParams.get(param)
    if (value) {
      params[param] = value
    }
  })
  
  savedParams = params
  
  // Also save to sessionStorage if available
  if (typeof window !== "undefined") {
    try {
      sessionStorage.setItem("tracking_params", JSON.stringify(params))
    } catch {
      // Silent fail for SSR or storage unavailable
    }
  }
  
  return params
}

export function getTrackingParams(): TrackingParams {
  if (typeof window !== "undefined" && Object.keys(savedParams).length === 0) {
    try {
      const stored = sessionStorage.getItem("tracking_params")
      if (stored) {
        savedParams = JSON.parse(stored)
      }
    } catch {
      // Silent fail
    }
  }
  
  return savedParams
}

export function buildUrlWithTracking(baseUrl: string): string {
  const params = getTrackingParams()
  
  if (Object.keys(params).length === 0) {
    return baseUrl
  }
  
  const url = new URL(baseUrl, "http://placeholder.com")
  
  Object.entries(params).forEach(([key, value]) => {
    if (value) {
      url.searchParams.set(key, value)
    }
  })
  
  // Return just the path + search params without the placeholder origin
  return `${url.pathname}${url.search}`
}
