// Analytics utility functions for tracking user interactions

type EventProperties = Record<string, string | number | boolean | undefined>

function track(eventName: string, properties?: EventProperties) {
  // Log events in development
  if (process.env.NODE_ENV === "development") {
    console.log("[Analytics]", eventName, properties)
  }
  
  // Send to analytics provider (Google Analytics, Mixpanel, etc.)
  // This is a placeholder - implement your analytics provider here
  if (typeof window !== "undefined" && (window as unknown as { gtag?: (...args: unknown[]) => void }).gtag) {
    (window as unknown as { gtag: (...args: unknown[]) => void }).gtag("event", eventName, properties)
  }
}

export function trackLandingPageView() {
  track("landing_page_view", {
    page: "home",
    timestamp: Date.now(),
  })
}

export function trackServiceCardClick(serviceId: string, serviceTitle: string) {
  track("service_card_click", {
    service_id: serviceId,
    service_title: serviceTitle,
    timestamp: Date.now(),
  })
}

export function trackFormStart(formType: string) {
  track("form_start", {
    form_type: formType,
    timestamp: Date.now(),
  })
}

export function trackFormSubmit(formType: string, success: boolean) {
  track("form_submit", {
    form_type: formType,
    success,
    timestamp: Date.now(),
  })
}

export function trackCTAClick(ctaName: string, location: string) {
  track("cta_click", {
    cta_name: ctaName,
    location,
    timestamp: Date.now(),
  })
}
