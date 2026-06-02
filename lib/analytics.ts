import { getStoredTrackingParams } from "./tracking-params"

// Analytics utility functions for tracking user interactions

type EventProperties = Record<string, string | number | boolean | undefined | null>

function track(eventName: string, properties?: EventProperties) {
  // Get stored tracking params (UTM, partner_id, etc.)
  const trackingParams = getStoredTrackingParams()

  // Merge tracking params with event properties
  const eventData = {
    ...trackingParams,
    ...properties,
    timestamp: new Date().toISOString(),
  }

  // Log events in development
  if (process.env.NODE_ENV === "development") {
    console.log("[Analytics]", eventName, eventData)
  }
  
  // Send to analytics provider (Google Analytics, Mixpanel, etc.)
  if (typeof window !== "undefined" && (window as unknown as { gtag?: (...args: unknown[]) => void }).gtag) {
    (window as unknown as { gtag: (...args: unknown[]) => void }).gtag("event", eventName, eventData)
  }
}

export function trackLandingPageView() {
  track("landing_page_view", {
    page: "home",
    referrer: typeof document !== "undefined" ? document.referrer : "",
    page_url: typeof window !== "undefined" ? window.location.href : "",
  })
}

export function trackServiceCardClick(serviceId: string, serviceTitle: string) {
  track("service_card_click", {
    service_id: serviceId,
    service_title: serviceTitle,
  })
}

export function trackFormStart(formType: string) {
  track("form_start", {
    form_type: formType,
  })
}

export function trackFormSubmit(formType: string, success: boolean) {
  track("form_submit", {
    form_type: formType,
    success,
  })
}

export function trackCTAClick(ctaName: string, location: string) {
  track("cta_click", {
    cta_name: ctaName,
    location,
  })
}

/**
 * Track when a questionnaire is started
 */
export function trackQuestionnaireStarted(
  vertical: string,
  totalSteps: number
) {
  track("questionnaire_started", {
    vertical,
    total_steps: totalSteps,
  })
}

/**
 * Track when a questionnaire step is completed
 */
export function trackQuestionnaireStepCompleted(
  vertical: string,
  stepNumber: number,
  stepId: string,
  totalSteps: number
) {
  const progressPercent = Math.round((stepNumber / totalSteps) * 100)
  
  track("questionnaire_step_completed", {
    vertical,
    step_number: stepNumber,
    step_id: stepId,
    total_steps: totalSteps,
    progress_percent: progressPercent,
  })
}

/**
 * Track when user clicks back in questionnaire
 */
export function trackQuestionnaireBackClicked(
  vertical: string,
  fromStep: number
) {
  track("questionnaire_back_clicked", {
    vertical,
    from_step: fromStep,
  })
}

/**
 * Track when a questionnaire is fully completed (reached final step)
 */
export function trackQuestionnaireCompleted(vertical: string, totalSteps: number) {
  track("questionnaire_completed", {
    vertical,
    total_steps: totalSteps,
  })
}

/**
 * Track successful form submission
 */
export function trackFormSubmitted(
  vertical: string,
  hasPartner: boolean = false
) {
  track("form_submitted", {
    vertical,
    has_partner: hasPartner,
    conversion: true,
  })
}

/**
 * Track form submission error
 */
export function trackFormSubmissionError(
  vertical: string,
  errorMessage: string
) {
  track("form_submission_error", {
    vertical,
    error_message: errorMessage,
  })
}
