"use client"

import { useState, useEffect, Suspense } from "react"
import { useRouter, useSearchParams } from "next/navigation"
import Link from "next/link"
import Image from "next/image"
import { ArrowRight } from "lucide-react"
import { BRAND_ASSETS } from "@/lib/brand-assets"
import { cn } from "@/lib/utils"
import { saveTrackingParams, buildUrlWithTracking } from "@/lib/tracking-params"

// Service options matching the landing page services
const serviceOptions = [
  {
    id: "treppenlift",
    label: "Treppenlift",
    description: "Bis zu 4.180 € Zuschuss",
    href: "/treppenlift",
  },
  {
    id: "badumbau",
    label: "Badumbau",
    description: "Bis zu 4.180 € Zuschuss",
    href: "/badumbau",
  },
  {
    id: "hausnotruf",
    label: "Hausnotruf",
    description: "25,50€ mtl. Zuschuss",
    href: "/hausnotruf",
  },
  {
    id: "pflegebox",
    label: "Pflegebox",
    description: "40€/Monat Pauschale",
    href: "/pflegebox",
  },
  {
    id: "elektromobil",
    label: "Elektromobil",
    description: "Bis zu 100% Kostenübernahme",
    href: "/elektromobil",
  },
  {
    id: "badewannenlift",
    label: "Badewannenlift",
    description: "Ab 0€ mit Pflegekasse",
    href: "/badewannenlift",
  },
  {
    id: "elektrorollstuhl",
    label: "Elektrorollstuhl",
    description: "Ab 0€ mit Krankenkasse",
    href: "/elektrorollstuhl",
  },
  {
    id: "alltagshilfe",
    label: "Alltagshilfe",
    description: "Unterstützung im Alltag",
    href: "/alltagshilfe",
  },
]

function ServiceSelectionContent() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const [selectedService, setSelectedService] = useState<string | null>(null)
  const [postalCode, setPostalCode] = useState<string>("")

  // Capture tracking params and postal code from URL
  useEffect(() => {
    saveTrackingParams(searchParams)
    const plz = searchParams.get("plz")
    if (plz) {
      setPostalCode(plz)
    }
  }, [searchParams])

  const handleServiceSelect = (serviceId: string) => {
    setSelectedService(serviceId)
  }

  const handleContinue = () => {
    if (!selectedService) return
    
    const service = serviceOptions.find(s => s.id === selectedService)
    if (service) {
      // Build URL with tracking params and postal code
      const params = new URLSearchParams()
      if (postalCode) {
        params.set("plz", postalCode)
      }
      // Add any existing tracking params
      searchParams.forEach((value, key) => {
        if (key !== "plz") {
          params.set(key, value)
        }
      })
      
      const queryString = params.toString()
      const url = queryString ? `${service.href}?${queryString}` : service.href
      router.push(url)
    }
  }

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      {/* Header */}
      <header className="border-b border-gray-200 bg-white sticky top-0 z-40">
        <div className="max-w-4xl mx-auto px-4 py-2.5">
          <div className="flex items-center justify-between">
            <Link href={buildUrlWithTracking("/", searchParams)} className="flex items-center gap-2.5">
              <Image
                src={BRAND_ASSETS.logo.main || "/placeholder.svg"}
                alt={BRAND_ASSETS.logo.alt}
                width={130}
                height={40}
                style={{ height: 40, width: "auto" }}
              />
            </Link>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 flex items-start justify-center py-6 md:py-10 px-4">
        <div className="w-full max-w-2xl">
          {/* Card */}
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
            {/* Progress */}
            <div className="px-6 pt-5 pb-4 border-b border-gray-100">
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm text-gray-500">Schritt 1</span>
                <span className="text-sm font-medium text-primary">Leistung wählen</span>
              </div>
              <div className="h-1.5 bg-gray-100 rounded-full overflow-hidden">
                <div className="h-full bg-primary rounded-full w-[10%]" />
              </div>
            </div>

            {/* Question */}
            <div className="p-6">
              <h1 className="text-xl md:text-2xl font-bold text-gray-900 mb-2">
                Welche Leistung interessiert Sie?
              </h1>
              <p className="text-gray-600 text-sm md:text-base mb-6">
                Wählen Sie die Pflegeleistung, zu der Sie beraten werden möchten.
              </p>

              {/* Service Options - Radio style like questionnaire */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {serviceOptions.map((service) => {
                  const isSelected = selectedService === service.id
                  return (
                    <button
                      key={service.id}
                      type="button"
                      onClick={() => handleServiceSelect(service.id)}
                      className={cn(
                        "relative flex items-center gap-3 p-4 rounded-xl border-2 text-left transition-all",
                        isSelected
                          ? "border-primary bg-primary/5"
                          : "border-gray-200 bg-white hover:border-gray-300 hover:bg-gray-50"
                      )}
                    >
                      {/* Radio indicator */}
                      <div
                        className={cn(
                          "flex-shrink-0 w-5 h-5 rounded-full border-2 flex items-center justify-center transition-colors",
                          isSelected
                            ? "border-primary bg-primary"
                            : "border-gray-300 bg-white"
                        )}
                      >
                        {isSelected && (
                          <div className="w-2 h-2 rounded-full bg-white" />
                        )}
                      </div>
                      
                      {/* Content */}
                      <div className="flex-1 min-w-0">
                        <span className={cn(
                          "block font-medium",
                          isSelected ? "text-primary" : "text-gray-900"
                        )}>
                          {service.label}
                        </span>
                        <span className="block text-xs text-gray-500 mt-0.5">
                          {service.description}
                        </span>
                      </div>
                    </button>
                  )
                })}
              </div>

              {/* Postal code display if provided */}
              {postalCode && (
                <div className="mt-6 p-3 bg-gray-50 rounded-lg text-sm text-gray-600">
                  <span className="font-medium">Ihre Postleitzahl:</span> {postalCode}
                </div>
              )}
            </div>

            {/* Footer */}
            <div className="px-6 py-4 bg-gray-50 border-t border-gray-100">
              <div className="flex items-center justify-between">
                <Link
                  href={buildUrlWithTracking("/", searchParams)}
                  className="inline-flex items-center gap-2 px-4 py-2.5 text-sm font-medium text-gray-600 hover:text-gray-900 transition-colors"
                >
                  Zurück
                </Link>
                
                <button
                  onClick={handleContinue}
                  disabled={!selectedService}
                  className={cn(
                    "inline-flex items-center gap-2 px-6 py-2.5 rounded-lg font-semibold text-sm transition-all",
                    selectedService
                      ? "bg-primary text-white hover:bg-primary/90"
                      : "bg-gray-200 text-gray-400 cursor-not-allowed"
                  )}
                >
                  Weiter
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}

function LoadingState() {
  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center">
      <div className="text-center">
        <div className="w-8 h-8 border-4 border-primary border-t-transparent rounded-full animate-spin mx-auto mb-4" />
        <p className="text-gray-600">Laden...</p>
      </div>
    </div>
  )
}

export default function ServiceSelectionPage() {
  return (
    <Suspense fallback={<LoadingState />}>
      <ServiceSelectionContent />
    </Suspense>
  )
}
