"use client"

import Link from "next/link"
import Image from "next/image"
import { ChevronRight, Shield, Home, Phone, CheckCircle2, Users, Clock, Award, MapPin, Star } from "lucide-react"
import { useAffiliate } from "@/lib/affiliate/context"
import { useEffect } from "react"
import { useSearchParams } from "next/navigation"
import { saveTrackingParams, buildUrlWithTracking } from "@/lib/tracking-params"
import { trackLandingPageView, trackServiceCardClick } from "@/lib/analytics"

// All services with their details
const services = [
  {
    id: "treppenlift",
    title: "Treppenlift",
    description: "Bis zu 4.180 € Zuschuss",
    href: "/treppenlift",
    image: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/treppenlift-hires-OPi736ZQFWliRxy1LkEz3HdN42PZa4.png",
    category: "Barrierefreiheit",
  },
  {
    id: "badumbau",
    title: "Badumbau",
    description: "Bis zu 4.180 € Zuschuss",
    href: "/badumbau",
    image: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/badumbau-hires-EXxPR0rUnJ8hPk0mjOx1BXRfCgkmNE.png",
    category: "Barrierefreiheit",
  },
  {
    id: "hausnotruf",
    title: "Hausnotruf",
    description: "25,50€ mtl. Zuschuss",
    href: "/hausnotruf",
    image: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/hausnotruf-hires-T0JSt0tu2DNdXbFRMLp8QCeaKY7qbc.png",
    category: "Sicherheit",
  },
  {
    id: "pflegebox",
    title: "Pflegebox",
    description: "40€/Monat Pauschale",
    href: "/pflegebox",
    image: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/pflegebox-hires-z1lJWhYiQKZp3KTlRnLwrKLx6fYmo4.png",
    category: "Pflege",
  },
  {
    id: "elektromobil",
    title: "Elektromobil",
    description: "Bis zu 100% Kostenübernahme",
    href: "/elektromobil",
    image: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/elektromobil-hires-zLjR2Nkurh392mP8at2gKkXFcU2hgq.png",
    category: "Mobilität",
  },
  {
    id: "badewannenlift",
    title: "Badewannenlift",
    description: "Ab 0€ mit Pflegekasse",
    href: "/badewannenlift",
    image: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/badewannenlift-hires-22QKk0Kvy5M7FPS8dEphrKXrlNjAeT.png",
    category: "Barrierefreiheit",
  },
  {
    id: "elektrorollstuhl",
    title: "Elektrorollstuhl",
    description: "Ab 0€ mit Krankenkasse",
    href: "/elektrorollstuhl",
    image: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/rollstuhl-hires-s5NDxTYfMYlzGt1UMw5UEw6f8hBR9g.png",
    category: "Mobilität",
  },
  {
    id: "alltagshilfe",
    title: "Alltagshilfe",
    description: "Unterstützung im Alltag",
    href: "/alltagshilfe",
    image: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/24h-pflege-PxmgSOKC82ZuhGfWDjfCsa8nvEtVbQ.png",
    category: "Pflege",
  },
]

// Benefits of the service
const benefits = [
  {
    icon: Users,
    title: "Persönliche Beratung",
    description: "Regionale Experten beraten Sie individuell zu Ihren Ansprüchen",
  },
  {
    icon: Award,
    title: "Geprüfte Partner",
    description: "Nur qualifizierte und zertifizierte Anbieter in unserem Netzwerk",
  },
  {
    icon: Clock,
    title: "Schnell & Unkompliziert",
    description: "In nur 2 Minuten zur kostenlosen Beratung - wir melden uns bei Ihnen",
  },
]

// Service card component
function ServiceCard({ service, onClick }: { service: typeof services[0]; onClick?: () => void }) {
  return (
    <Link
      href={buildUrlWithTracking(service.href)}
      onClick={onClick}
      className="group bg-white rounded-xl border border-gray-200 overflow-hidden shadow-sm hover:shadow-md hover:border-primary/30 transition-all duration-200"
    >
      {/* Image */}
      <div className="aspect-[4/3] relative bg-gray-50 overflow-hidden">
        <img
          src={service.image}
          alt={service.title}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
        />
        <div className="absolute top-2 left-2">
          <span className="text-[10px] font-medium bg-white/90 backdrop-blur-sm text-gray-600 px-2 py-0.5 rounded-full">
            {service.category}
          </span>
        </div>
      </div>
      
      {/* Content */}
      <div className="p-3">
        <h3 className="font-semibold text-gray-900 group-hover:text-primary transition-colors">
          {service.title}
        </h3>
        <p className="text-sm text-gray-500 mt-0.5">{service.description}</p>
        <div className="mt-2 flex items-center text-sm font-medium text-primary">
          <span>Jetzt anfragen</span>
          <ChevronRight className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform" />
        </div>
      </div>
    </Link>
  )
}

export function PublicLanding() {
  const searchParams = useSearchParams()
  const affiliateConfig = useAffiliate()

  // Save tracking params and track page view when component mounts
  useEffect(() => {
    saveTrackingParams(searchParams)
    trackLandingPageView()
  }, [searchParams])

  return (
    <div className="min-h-screen bg-gray-200 flex flex-col">
      {/* Contained card wrapper for wide screens */}
      <div className="w-full max-w-[1200px] mx-auto bg-white shadow-xl flex flex-col min-h-screen">
        {/* Header */}
        <header className="border-b border-border bg-white sticky top-0 z-40">
          <div className="px-4 sm:px-6 lg:px-8 py-3">
            <div className="flex items-center justify-between">
              <Link href={buildUrlWithTracking("/")} className="flex items-center">
                <Image
                  src={affiliateConfig.logo || "/placeholder.svg"}
                  alt={affiliateConfig.partnerName}
                  width={120}
                  height={48}
                  style={{ height: 48, width: "auto" }}
                  className="object-contain"
                />
              </Link>
              
              <div className="hidden md:flex items-center gap-2 text-sm text-gray-600">
                <Phone className="w-4 h-4 text-primary" />
                <span>Kostenlose Beratung</span>
              </div>
            </div>
        </div>
      </header>

      <main className="flex-1">
        {/* Hero Section */}
        <section className="bg-primary overflow-hidden">
          <div className="relative flex flex-col md:flex-row md:items-end">
            {/* Left: Content */}
            <div className="relative z-10 w-full md:w-[55%] px-6 sm:px-10 lg:px-12 py-6 md:py-8">
              <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm rounded-full px-3 py-1.5 text-sm text-white mb-3">
                <CheckCircle2 className="w-4 h-4 text-secondary" />
                <span>Exklusiv für EDEKA-Kunden</span>
              </div>
              
              <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold leading-tight text-white text-balance">
                Ihre Pflegeleistungen<br />
                - <span className="text-secondary">einfach beantragt</span>
              </h1>
              
              <p className="mt-3 text-sm md:text-base text-white/90 leading-relaxed max-w-sm">
                Wir helfen Ihnen, alle Ansprüche und Zuschüsse zu nutzen, 
                die Ihnen zustehen - für mehr Lebensqualität zuhause.
                Kostenlos und unverbindlich.
              </p>
              
              <div className="mt-5 flex flex-col sm:flex-row sm:items-stretch gap-0 max-w-sm">
                <div className="relative flex-1">
                  <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                  <input
                    type="text"
                    placeholder="Ihre Postleitzahl"
                    className="w-full h-10 pl-9 pr-3 rounded-md sm:rounded-r-none border-0 bg-white text-gray-900 placeholder:text-gray-400 focus:ring-2 focus:ring-secondary outline-none text-sm"
                  />
                </div>
                <Link 
                href="#services"
                className="inline-flex h-10 items-center justify-center bg-secondary text-primary hover:bg-secondary/90 font-semibold px-5 whitespace-nowrap rounded-md sm:rounded-l-none text-sm transition-colors"
              >
                Beratung starten
                <ChevronRight className="w-4 h-4 ml-1" />
              </Link>
              </div>
              
              <div className="mt-6 mb-2 flex flex-wrap items-center gap-x-4 gap-y-2 text-xs md:text-sm text-white/80">
                <div className="flex items-center gap-1.5">
                  <CheckCircle2 className="w-4 h-4 text-secondary" />
                  <span>100% kostenlos</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <CheckCircle2 className="w-4 h-4 text-secondary" />
                  <span>Unverbindlich</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <CheckCircle2 className="w-4 h-4 text-secondary" />
                  <span>Deutschlandweit</span>
                </div>
              </div>
            </div>
            
            {/* Right: Hero Image - stays within container */}
            <div className="hidden md:flex md:w-[45%] items-end justify-end">
              <Image
                src="/images/hero-consultation.png"
                alt="EDEKA Pflegeberatung - Persönliche Beratung zu Hause"
                width={550}
                height={450}
                className="w-full h-auto max-h-[480px] object-contain object-bottom"
                priority
              />
            </div>
          </div>
        </section>

        {/* Stats Section */}
        <section className="bg-white border-y border-gray-200">
          <div className="px-6 sm:px-10 lg:px-12 py-8 md:py-10">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-8">
              <div className="text-center">
                <div className="flex justify-center mb-2">
                  <Users className="w-6 h-6 text-primary opacity-70" />
                </div>
                <div className="text-2xl md:text-3xl font-bold text-foreground">10.000+</div>
                <div className="text-sm text-muted-foreground">Beratene Senioren</div>
              </div>
              <div className="text-center">
                <div className="flex justify-center mb-2">
                  <MapPin className="w-6 h-6 text-primary opacity-70" />
                </div>
                <div className="text-2xl md:text-3xl font-bold text-foreground">250+</div>
                <div className="text-sm text-muted-foreground">Regionale Berater</div>
              </div>
              <div className="text-center">
                <div className="flex justify-center mb-2">
                  <Star className="w-6 h-6 text-secondary" />
                </div>
                <div className="text-2xl md:text-3xl font-bold text-foreground">4.9</div>
                <div className="text-sm text-muted-foreground">Kundenbewertung</div>
              </div>
              <div className="text-center">
                <div className="flex justify-center mb-2">
                  <Shield className="w-6 h-6 text-primary opacity-70" />
                </div>
                <div className="text-2xl md:text-3xl font-bold text-foreground">100%</div>
                <div className="text-sm text-muted-foreground">Kostenlose Beratung</div>
              </div>
            </div>
          </div>
        </section>

        {/* Benefits Section */}
        <section className="bg-white border-b border-gray-100">
          <div className="px-6 sm:px-10 lg:px-12 py-10 md:py-12">
            <div className="grid md:grid-cols-3 gap-6 md:gap-8">
              {benefits.map((benefit, index) => (
                <div key={index} className="flex gap-4">
                  <div className="flex-shrink-0 w-12 h-12 rounded-xl bg-secondary/20 flex items-center justify-center">
                    <benefit.icon className="w-6 h-6 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900">{benefit.title}</h3>
                    <p className="mt-1 text-sm text-gray-600 leading-relaxed">{benefit.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Services Section */}
        <section id="services" className="bg-primary scroll-mt-16">
          <div className="px-6 sm:px-10 lg:px-12 py-10 md:py-14">
            <div className="text-center mb-8">
              <h2 className="text-2xl md:text-3xl font-bold text-white">
                Welche Leistung interessiert Sie?
              </h2>
              <p className="mt-2 text-white/80">
                Wählen Sie einen Bereich aus und erhalten Sie eine kostenlose, unverbindliche Beratung
              </p>
            </div>
            
            {/* Services Grid - 4x2 layout */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-4">
              {services.slice(0, 10).map((service) => (
                <ServiceCard 
                  key={service.id} 
                  service={service}
                  onClick={() => trackServiceCardClick(service.id, service.title)}
                />
              ))}
            </div>
          </div>
        </section>

        {/* How it Works Section */}
        <section className="bg-white">
          <div className="px-4 sm:px-6 lg:px-8 py-10 md:py-14">
            <div className="text-center mb-10">
              <h2 className="text-2xl md:text-3xl font-bold text-gray-900">
                So einfach geht&apos;s
              </h2>
              <p className="mt-2 text-gray-600">
                In 3 Schritten zu Ihrer Pflegeleistung
              </p>
            </div>
            
            <div className="grid md:grid-cols-3 gap-8 max-w-4xl mx-auto">
              {[
                {
                  step: "1",
                  title: "Leistung auswählen",
                  description: "Wählen Sie die gewünschte Pflegeleistung aus unserem Angebot",
                },
                {
                  step: "2",
                  title: "Kurze Fragen beantworten",
                  description: "Beantworten Sie wenige Fragen zu Ihrer Situation - dauert nur 2 Minuten",
                },
                {
                  step: "3",
                  title: "Beratung erhalten",
                  description: "Ein regionaler Experte meldet sich bei Ihnen für eine persönliche Beratung",
                },
              ].map((item, index) => (
                <div key={index} className="text-center">
                  <div className="w-12 h-12 rounded-full bg-primary text-white font-bold text-xl flex items-center justify-center mx-auto">
                    {item.step}
                  </div>
                  <h3 className="mt-4 font-semibold text-gray-900">{item.title}</h3>
                  <p className="mt-2 text-sm text-gray-600 leading-relaxed">{item.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="bg-primary">
          <div className="px-4 sm:px-6 lg:px-8 py-10 md:py-14 text-center">
            <h2 className="text-2xl md:text-3xl font-bold text-white">
              Nutzen Sie Ihre Pflegeleistungen voll aus
            </h2>
            <p className="mt-3 text-white/90 max-w-xl mx-auto">
              Viele Leistungen stehen Ihnen zu - wir helfen Ihnen, diese zu beantragen. 
              Kostenlos und unverbindlich.
            </p>
            <Link 
              href="#services"
              className="mt-6 inline-flex h-11 items-center justify-center bg-secondary text-primary hover:bg-secondary/90 font-semibold px-8 rounded-lg transition-colors"
            >
              Jetzt Leistung auswählen
              <ChevronRight className="w-5 h-5 ml-1" />
            </Link>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-8">
        <div className="px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-4">
              <div className="bg-white rounded-lg p-2">
                <Image
                  src={affiliateConfig.logo || "/placeholder.svg"}
                  alt={affiliateConfig.partnerName}
                  width={60}
                  height={40}
                  style={{ height: 40, width: "auto" }}
                />
              </div>
              <span className="text-sm text-gray-400">
                © {new Date().getFullYear()} {affiliateConfig.partnerName}
              </span>
            </div>
            <div className="flex items-center gap-6 text-sm text-gray-400">
              <Link href="/impressum" className="hover:text-white transition-colors">
                Impressum
              </Link>
              <Link href="/datenschutz" className="hover:text-white transition-colors">
                Datenschutz
              </Link>
              <Link href="/agb" className="hover:text-white transition-colors">
                AGB
              </Link>
            </div>
          </div>
        </div>
      </footer>
      </div>
    </div>
  )
}
