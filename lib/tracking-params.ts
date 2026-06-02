// Tracking params to preserve across navigation
export const TRACKING_PARAMS = [
  "partner_id",
  "utm_source",
  "utm_medium",
  "utm_campaign",
  "utm_term",
  "utm_content",
  "gclid",
  "fbclid",
  "ref",
  "partner",
  "clickid",
] as const

const STORAGE_KEY = "hmk_tracking_params"

export type TrackingParams = {
  [key in (typeof TRACKING_PARAMS)[number]]?: string
}

/**
 * Save tracking params to sessionStorage
 */
export function saveTrackingParams(searchParams: URLSearchParams): void {
  if (typeof window === "undefined") return

  const params: TrackingParams = {}
  let hasParams = false

  TRACKING_PARAMS.forEach((param) => {
    const value = searchParams.get(param)
    if (value) {
      params[param] = value
      hasParams = true
    }
  })

  if (hasParams) {
    try {
      sessionStorage.setItem(STORAGE_KEY, JSON.stringify(params))
    } catch (e) {
      console.warn("Failed to save tracking params to sessionStorage:", e)
    }
  }
}

/**
 * Get tracking params from sessionStorage
 */
export function getStoredTrackingParams(): TrackingParams {
  if (typeof window === "undefined") return {}

  try {
    const stored = sessionStorage.getItem(STORAGE_KEY)
    if (stored) {
      return JSON.parse(stored)
    }
  } catch (e) {
    console.warn("Failed to read tracking params from sessionStorage:", e)
  }
  return {}
}

/**
 * Build URL with tracking params from both URL and sessionStorage
 * URL params take priority over stored params
 */
export function buildUrlWithTracking(baseUrl: string, searchParams?: URLSearchParams): string {
  const storedParams = getStoredTrackingParams()
  const params = new URLSearchParams()

  // First add stored params
  TRACKING_PARAMS.forEach((param) => {
    const storedValue = storedParams[param]
    if (storedValue) {
      params.set(param, storedValue)
    }
  })

  // Then override with URL params (they take priority)
  if (searchParams) {
    TRACKING_PARAMS.forEach((param) => {
      const urlValue = searchParams.get(param)
      if (urlValue) {
        params.set(param, urlValue)
      }
    })
  }

  const queryString = params.toString()
  return queryString ? `${baseUrl}?${queryString}` : baseUrl
}

/**
 * Get all tracking params (merged from URL and storage)
 */
export function getAllTrackingParams(searchParams?: URLSearchParams): TrackingParams {
  const storedParams = getStoredTrackingParams()
  const result: TrackingParams = { ...storedParams }

  if (searchParams) {
    TRACKING_PARAMS.forEach((param) => {
      const urlValue = searchParams.get(param)
      if (urlValue) {
        result[param] = urlValue
      }
    })
  }

  return result
}

// Legacy alias for backwards compatibility
export function getTrackingParams(): TrackingParams {
  return getStoredTrackingParams()
}
