import { Suspense } from "react"
import { PublicLanding } from "@/components/public-landing"

function LoadingFallback() {
  return (
    <div className="min-h-screen bg-gray-200 flex items-center justify-center">
      <div className="animate-pulse text-gray-500">Laden...</div>
    </div>
  )
}

export default function Home() {
  return (
    <Suspense fallback={<LoadingFallback />}>
      <PublicLanding />
    </Suspense>
  )
}
