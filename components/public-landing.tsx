"use client"

import Link from "next/link"
import Image from "next/image"
import { ChevronRight, ChevronLeft, Shield, Home, Phone, CheckCircle2, Users, Clock, Award, MapPin, Bath, ShoppingBag, Handshake, Menu } from "lucide-react"
import { useAffiliate } from "@/lib/affiliate/context"
import { useEffect, useState } from "react"
import { useSearchParams } from "next/navigation"
import { saveTrackingParams, buildUrlWithTracking } from "@/lib/tracking-params"
import { trackLandingPageView, trackServiceCardClick } from "@/lib/analytics"
import { GermanyMap } from "@/components/germany-map"

// Custom Treppenlift (stairlift) icon, matches lucide-react icon interface
function TreppenliftIcon({ className }: { className?: string }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      aria-hidden="true"
    >
      <path d="M2 22h5v-5h5v-5h5v-5h5" />
      <path d="M3 9l6-6m0 0h-5m5 0v5" />
    </svg>
  )
}

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
    image: "/images/hausnotruf-card.png",
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
    description: "Bis zu 100% Kostenübernahme",
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

// Carousel slides data
const carouselSlides = [
  {
    id: "alltagshilfe",
    label: "Alltagshilfe",
    icon: ShoppingBag,
    image: "/images/carousel-alltagshilfe.png",
    headline: "Bis zu 131 € monatlich für Unterstützung im Alltag",
    description: "Ob Einkaufen, Putzen oder Begleitung – wir finden passende Unterstützung für Sie. Bleiben Sie selbstständig und entlasten Ihre Angehörigen.",
    cta: "Alltagshilfe finden",
    href: "/alltagshilfe",
  },
  {
    id: "badumbau",
    label: "Barrierefreies Bad",
    icon: Bath,
    image: "/images/carousel-badumbau.jpg",
    headline: "Bis zu 4.180 € Zuschuss für Ihr barrierefreies Bad",
    description: "Mehr Sicherheit und Komfort im Badezimmer: Wir helfen Ihnen, Zuschüsse für bodengleiche Duschen, Haltegriffe oder einen Badumbau zu erhalten.",
    cta: "Badumbau-Zuschuss prüfen",
    href: "/badumbau",
  },
  {
      id: "hausnotruf",
      label: "Hausnotruf",
      icon: Phone,
      image: "/images/carousel-hausnotruf.png",
    headline: "Hausnotruf kostenlos ab Pflegegrad 1",
    description: "Schnelle Hilfe auf Knopfdruck – rund um die Uhr. Bleiben Sie zuhause sicher und geben Sie sich und Ihrer Familie ein gutes Gefühl.",
    cta: "Kostenlosen Hausnotruf prüfen",
    href: "/hausnotruf",
  },
  {
      id: "treppenlift",
      label: "Treppenlift",
      icon: TreppenliftIcon,
      image: "/images/carousel-treppenlift.png",
    headline: "Bis zu 4.180 € Zuschuss für Ihren Treppenlift",
    description: "Bleiben Sie in den eigenen vier Wänden mobil und sicher. Wir helfen bei Zuschüssen und vergleichen Angebote seriöser Anbieter.",
    cta: "Treppenlift-Zuschuss prüfen",
    href: "/treppenlift",
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

// Support Carousel component
function SupportCarousel() {
  const [activeIndex, setActiveIndex] = useState(0)
  const [touchStart, setTouchStart] = useState<number | null>(null)
  const [touchEnd, setTouchEnd] = useState<number | null>(null)
  const currentSlide = carouselSlides[activeIndex]

  const goToNext = () => {
    setActiveIndex((prev) => (prev + 1) % carouselSlides.length)
  }

  const goToPrev = () => {
    setActiveIndex((prev) => (prev - 1 + carouselSlides.length) % carouselSlides.length)
  }

  // Swipe handlers
  const minSwipeDistance = 50

  const onTouchStart = (e: React.TouchEvent) => {
    setTouchEnd(null)
    setTouchStart(e.targetTouches[0].clientX)
  }

  const onTouchMove = (e: React.TouchEvent) => {
    setTouchEnd(e.targetTouches[0].clientX)
  }

  const onTouchEnd = () => {
    if (!touchStart || !touchEnd) return
    const distance = touchStart - touchEnd
    const isLeftSwipe = distance > minSwipeDistance
    const isRightSwipe = distance < -minSwipeDistance
    if (isLeftSwipe) {
      goToNext()
    } else if (isRightSwipe) {
      goToPrev()
    }
  }

  return (
    <section id="leistungen" className="bg-gray-50 border-y border-gray-200 scroll-mt-16">
      <div className="px-6 sm:px-10 lg:px-12 py-10 md:py-14">
        {/* Header */}
        <div className="text-center mb-8">
          <h2 className="text-xl md:text-2xl font-bold text-gray-900">
            So unterstützen wir Sie
          </h2>
          <p className="mt-2 text-gray-600">
            Entdecken Sie, welche Leistungen Ihnen zustehen – und wie andere Senioren davon profitieren.
          </p>
        </div>

        {/* Tab Buttons */}
        <div className="flex flex-wrap justify-center gap-2 md:gap-3 mb-8">
          {carouselSlides.map((slide, index) => {
            const IconComponent = slide.icon
            return (
              <button
                key={slide.id}
                onClick={() => setActiveIndex(index)}
                className={`inline-flex items-center gap-2 px-4 py-2.5 rounded-full text-sm font-medium transition-all ${
                  index === activeIndex
                    ? "bg-secondary text-primary shadow-sm"
                    : "bg-white border border-gray-200 text-gray-700 hover:border-gray-300 hover:bg-gray-50"
                }`}
              >
                <IconComponent className="w-4 h-4" />
                <span className="hidden sm:inline">{slide.label}</span>
              </button>
            )
          })}
        </div>

        {/* Carousel Content */}
        <div 
          className="relative"
          onTouchStart={onTouchStart}
          onTouchMove={onTouchMove}
          onTouchEnd={onTouchEnd}
        >
          {/* Navigation Arrows - hidden on mobile */}
          <button
            onClick={goToPrev}
            className="hidden md:flex absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 z-10 w-12 h-12 rounded-full bg-white border border-gray-200 shadow-sm items-center justify-center text-gray-600 hover:bg-gray-50 hover:border-secondary transition-colors"
            aria-label="Previous slide"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>
          
          <button
            onClick={goToNext}
            className="hidden md:flex absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 z-10 w-12 h-12 rounded-full bg-white border border-secondary shadow-sm items-center justify-center text-gray-600 hover:bg-secondary/10 transition-colors"
            aria-label="Next slide"
          >
            <ChevronRight className="w-5 h-5" />
          </button>

          {/* Slide Content - edge-to-edge on mobile */}
          <div className="bg-white rounded-xl overflow-hidden mx-0 md:mx-10">
            <div className="flex flex-col md:flex-row">
              {/* Image - all slides stacked and crossfaded for smooth, preloaded transitions */}
              <div className="md:w-1/2">
                <div className="aspect-[4/3] md:aspect-auto md:h-full relative">
                  {carouselSlides.map((slide, index) => (
                    <img
                      key={slide.id}
                      src={slide.image || "/placeholder.svg"}
                      alt={slide.label}
                      loading={index === 0 ? "eager" : "lazy"}
                      aria-hidden={index !== activeIndex}
                      className={`w-full h-full object-cover transition-opacity duration-500 ease-in-out ${
                        index === activeIndex
                          ? "opacity-100"
                          : "opacity-0 pointer-events-none"
                      } ${index === 0 ? "relative" : "absolute inset-0"}`}
                    />
                  ))}
                </div>
              </div>

              {/* Content */}
              <div className="md:w-1/2 p-6 md:p-8 lg:p-10 flex flex-col justify-center">
                <div className="flex items-center gap-2 text-gray-500 mb-3">
                  <currentSlide.icon className="w-5 h-5" />
                  <span className="text-sm font-medium">{currentSlide.label}</span>
                </div>
                
                <h3 className="text-lg md:text-xl lg:text-2xl font-bold text-gray-900 leading-tight">
                  {currentSlide.headline}
                </h3>
                
                <p className="mt-4 text-gray-600 leading-relaxed">
                  {currentSlide.description}
                </p>
                
                <div className="mt-6">
                  <Link
                    href={buildUrlWithTracking(currentSlide.href)}
                    className="inline-flex items-center justify-center h-11 px-6 bg-secondary text-primary font-semibold rounded-lg hover:bg-secondary/90 transition-colors"
                  >
                    {currentSlide.cta}
                  </Link>
                </div>
              </div>
            </div>
          </div>

          {/* Dot Indicators */}
          <div className="flex justify-center gap-2 mt-6">
            {carouselSlides.map((_, index) => (
              <button
                key={index}
                onClick={() => setActiveIndex(index)}
                className={`transition-all ${
                  index === activeIndex
                    ? "w-6 h-2 bg-secondary rounded-full"
                    : "w-2 h-2 bg-gray-300 rounded-full hover:bg-gray-400"
                }`}
                aria-label={`Go to slide ${index + 1}`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

export function PublicLanding() {
  const searchParams = useSearchParams()
  const affiliateConfig = useAffiliate()
  const [postalCode, setPostalCode] = useState("")

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
              
              {/* Navigation - Desktop */}
              <nav className="hidden md:flex items-center gap-6">
                <Link href="#so-funktionierts" className="text-sm font-medium text-gray-700 hover:text-primary transition-colors">
                  So funktioniert&apos;s
                </Link>
                <Link href="#leistungen" className="text-sm font-medium text-gray-700 hover:text-primary transition-colors">
                  Unsere Leistungen
                </Link>
                <Link href="#regionale-suche" className="text-sm font-medium text-gray-700 hover:text-primary transition-colors">
                  Regionale Beratung
                </Link>
                <Link href="#faq" className="text-sm font-medium text-gray-700 hover:text-primary transition-colors">
                  Häufig gestellte Fragen
                </Link>
              </nav>
              
              {/* Right side - Desktop: phone text, Mobile: Anrufen button + Menu */}
              <div className="flex items-center gap-3">
                {/* Desktop phone number - prominent with yellow underline */}
                <a href="tel:+49800123456" className="hidden md:flex items-center gap-2 text-primary hover:text-primary/80 transition-colors">
                  <Phone className="w-5 h-5" />
                  <span className="font-semibold text-base border-b-2 border-secondary">+49 800 123 456</span>
                </a>
                
                {/* Mobile: Anrufen button */}
                <a 
                  href="tel:+49800123456" 
                  className="md:hidden inline-flex items-center gap-1.5 bg-secondary hover:bg-secondary/90 text-primary font-semibold px-3 py-2 rounded-full text-sm transition-colors"
                >
                  <Phone className="w-4 h-4" />
                  <span>Anrufen</span>
                </a>
                
                {/* Mobile: Hamburger menu */}
                <button 
                  className="md:hidden p-2 text-gray-700 hover:text-primary transition-colors"
                  aria-label="Menü öffnen"
                >
                  <Menu className="w-6 h-6" />
                </button>
              </div>
            </div>
        </div>
      </header>

      <main className="flex-1">
        {/* Hero Section */}
        <section className="bg-primary overflow-hidden">
          <div className="relative flex flex-col md:flex-row md:items-end">
            {/* Left: Content */}
            <div className="relative z-10 w-full md:w-[55%] px-6 sm:px-10 lg:px-12 xl:pl-[88px] py-8 md:py-10">
              <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm rounded-full px-3 py-1.5 text-sm text-white mb-4">
                <CheckCircle2 className="w-4 h-4 text-secondary" />
                <span>Exklusiv für {affiliateConfig.partnerName}-Kunden</span>
              </div>
              
              <h1 className="text-xl sm:text-2xl md:text-3xl font-bold leading-tight text-white text-balance">
                Ihre Pflegeleistungen<br />
                - <span className="text-secondary">einfach beantragt</span>
              </h1>
              
              <p className="mt-4 text-sm md:text-base text-white/90 leading-relaxed max-w-md">
                Wir helfen Ihnen, alle Ansprüche und Zuschüsse zu nutzen, 
                die Ihnen zustehen - für mehr Lebensqualität zuhause.
                Kostenlos und unverbindlich.
              </p>
              
              {/* Input and CTA - stacked on mobile, inline on desktop */}
              <div className="mt-6 flex flex-col md:flex-row md:items-stretch gap-3 md:gap-0 max-w-sm md:max-w-md">
                <div className="relative flex-1">
                  <MapPin className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                  <input
                    type="text"
                    placeholder="Ihre Postleitzahl"
                    value={postalCode}
                    onChange={(e) => setPostalCode(e.target.value)}
                    className="w-full h-12 pl-11 pr-4 rounded-lg md:rounded-r-none border-0 bg-white text-gray-900 placeholder:text-gray-500 focus:ring-2 focus:ring-secondary outline-none text-base"
                  />
                </div>
                <Link 
                  href={postalCode ? `/start?plz=${encodeURIComponent(postalCode)}` : "/start"}
                  className="inline-flex h-12 items-center justify-center bg-secondary text-primary hover:bg-secondary/90 font-semibold px-6 rounded-lg md:rounded-l-none text-base transition-colors whitespace-nowrap"
                >
                  Beratung starten
                  <ChevronRight className="w-5 h-5 ml-1" />
                </Link>
              </div>
              
              {/* Trust badges - single row, no wrapping */}
              <div className="mt-4 md:mt-6 flex items-center justify-start gap-3 sm:gap-4 md:gap-6 text-[11px] sm:text-xs md:text-sm text-white/90">
                <div className="flex items-center gap-1 whitespace-nowrap">
                  <CheckCircle2 className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-secondary flex-shrink-0" />
                  <span>100% kostenlos</span>
                </div>
                <div className="flex items-center gap-1 whitespace-nowrap">
                  <CheckCircle2 className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-secondary flex-shrink-0" />
                  <span>Unverbindlich</span>
                </div>
                <div className="flex items-center gap-1 whitespace-nowrap">
                  <CheckCircle2 className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-secondary flex-shrink-0" />
                  <span>Deutschlandweit</span>
                </div>
              </div>
            </div>
            
            {/* Hero Image - edge-to-edge on mobile, contained on desktop */}
            <div className="w-[100vw] relative left-[50%] -translate-x-[50%] -mt-4 md:mt-0 md:w-[45%] md:static md:translate-x-0 md:flex md:items-end md:justify-end">
              <Image
                src="/images/hero-consultation.png"
                alt={`${affiliateConfig.partnerName} Pflegeberatung - Persönliche Beratung zu Hause`}
                width={550}
                height={450}
                className="w-full h-auto max-h-[300px] md:max-h-[480px] object-cover object-top md:object-contain md:object-bottom"
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
                <div className="text-xl md:text-2xl font-bold text-foreground">10.000+</div>
                <div className="text-sm text-muted-foreground">Beratene Senioren</div>
              </div>
              <div className="text-center">
                <div className="flex justify-center mb-2">
                  <MapPin className="w-6 h-6 text-primary opacity-70" />
                </div>
                <div className="text-xl md:text-2xl font-bold text-foreground">250+</div>
                <div className="text-sm text-muted-foreground">Regionale Berater</div>
              </div>
              <div className="text-center">
                <div className="flex justify-center mb-2">
                  <Handshake className="w-6 h-6 text-primary opacity-70" />
                </div>
                <div className="text-xl md:text-2xl font-bold text-foreground">300+</div>
                <div className="text-sm text-muted-foreground">Regionale Partner</div>
              </div>
              <div className="text-center">
                <div className="flex justify-center mb-2">
                  <Shield className="w-6 h-6 text-primary opacity-70" />
                </div>
                <div className="text-xl md:text-2xl font-bold text-foreground">100%</div>
                <div className="text-sm text-muted-foreground">Kostenlose Beratung</div>
              </div>
            </div>
          </div>
        </section>

        {/* Support Carousel Section */}
        <SupportCarousel />

        {/* Services Section */}
        <section id="services" className="bg-primary scroll-mt-16">
          <div className="px-6 sm:px-10 lg:px-12 py-10 md:py-14">
            <div className="text-center mb-8">
            <h2 className="text-xl md:text-2xl font-bold text-white">
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

        {/* Regional Search Section */}
        <section id="regionale-suche" className="bg-white border-t border-gray-200 scroll-mt-16">
          <div className="px-6 sm:px-10 lg:px-12 py-10 md:py-14">
            <div className="relative flex flex-col lg:flex-row lg:items-center lg:gap-12">
              {/* Left: Text Content */}
              <div className="lg:w-1/2 mb-8 lg:mb-0">
                <div className="inline-flex items-center gap-2 bg-primary/10 rounded-full px-3 py-1.5 text-sm text-primary mb-4">
                  <MapPin className="w-4 h-4" />
                  <span>Regionale Beratung</span>
                </div>
                <h2 className="text-xl md:text-2xl font-bold text-gray-900 mb-4">
                  Finden Sie Ihren regionalen Fachberater
                </h2>
                <p className="text-gray-600 mb-6 leading-relaxed">
                  Gemeinsam mit unserem Partner <span className="font-semibold text-primary">Senioren Focus</span> vermitteln 
                  wir Sie an erfahrene Fachberater in Ihrer Nähe. Unsere Experten kennen die regionalen Angebote und 
                  unterstützen Sie persönlich bei allen Fragen zu Pflegeleistungen.
                </p>
                <div className="flex flex-wrap gap-4 text-sm text-gray-600 mb-6">
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="w-5 h-5 text-green-500" />
                    <span>100% kostenlos</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="w-5 h-5 text-green-500" />
                    <span>Unverbindlich</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="w-5 h-5 text-green-500" />
                    <span>Experten vor Ort</span>
                  </div>
                </div>
                
                {/* Partner Badge and instruction */}
                <div className="flex items-center gap-4 p-4 bg-gray-50 rounded-lg">
                  <Image
                    src="/images/senioren-focus-badge.png"
                    alt="Senioren Focus - Offizieller Partner"
                    width={56}
                    height={56}
                    className="flex-shrink-0"
                  />
                  <p className="text-sm text-gray-600 max-w-xs">
                    Klicken Sie auf Ihr Bundesland, um einen Fachberater in Ihrer Region zu finden.
                  </p>
                </div>
              </div>
              
              {/* Static curved arrow overlay - desktop only, positioned between columns */}
              <svg 
                width="180" 
                height="80" 
                viewBox="0 0 180 80" 
                className="hidden lg:block absolute left-[calc(50%-40px)] bottom-12 z-10"
                style={{ color: affiliateConfig.primaryColor }}
              >
                {/* Curved arrow path pointing right toward map */}
                <path 
                  d="M0 55 Q 50 50, 90 35 Q 130 20, 165 28" 
                  fill="none" 
                  stroke="currentColor" 
                  strokeWidth="2.5"
                  strokeLinecap="round"
                  strokeDasharray="6,4"
                />
                {/* Arrow head */}
                <path 
                  d="M158 20 L170 28 L158 36" 
                  fill="none" 
                  stroke="currentColor" 
                  strokeWidth="2.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
              
              {/* Right: Germany Map */}
              <div className="lg:w-1/2">
                <GermanyMap 
                  primaryColor={affiliateConfig.primaryColor} 
                  secondaryColor={affiliateConfig.secondaryColor} 
                />
              </div>
            </div>
          </div>
        </section>

        {/* FAQ Section */}
        <section id="faq" className="bg-gray-50 border-t border-gray-200 scroll-mt-16">
          <div className="px-4 sm:px-6 lg:px-8 py-10 md:py-14">
            <div className="text-center mb-10">
            <h2 className="text-xl md:text-2xl font-bold text-gray-900">
              Häufig gestellte Fragen
            </h2>
              <p className="mt-2 text-gray-600">
                Antworten auf die wichtigsten Fragen rund um Pflegeleistungen
              </p>
            </div>
            
            <div className="max-w-3xl mx-auto space-y-4">
              {[
                {
                  question: "Wer hat Anspruch auf Pflegeleistungen und Zuschüsse?",
                  answer: "Grundsätzlich haben alle Personen mit einem anerkannten Pflegegrad (1-5) Anspruch auf verschiedene Leistungen der Pflegekasse. Dazu gehören unter anderem Zuschüsse für wohnumfeldverbessernde Maßnahmen (bis zu 4.000€), Pflegehilfsmittel (40€/Monat) und Hausnotruf (25,50€/Monat). Auch ohne Pflegegrad können bestimmte Hilfsmittel über die Krankenkasse beantragt werden."
                },
                {
                  question: "Ist die Beratung wirklich kostenlos?",
                  answer: "Ja, unsere Beratung ist zu 100% kostenlos und unverbindlich. Wir finanzieren uns über Partnerschaften mit geprüften Anbietern. Für Sie entstehen keine Kosten - weder für die Beratung noch für die Vermittlung. Sie entscheiden selbst, ob Sie ein Angebot annehmen möchten."
                },
                {
                  question: "Wie lange dauert es, bis ich meine Leistung erhalte?",
                  answer: "Nach Ihrer Anfrage meldet sich innerhalb von 1-2 Werktagen ein regionaler Berater bei Ihnen. Die Bearbeitungszeit bei der Pflegekasse beträgt in der Regel 2-4 Wochen. Bei dringenden Fällen können wir oft eine beschleunigte Bearbeitung erreichen. Pflegehilfsmittel wie die Pflegebox werden meist innerhalb weniger Tage geliefert."
                },
                {
                  question: "Benötige ich einen Pflegegrad für alle Leistungen?",
                  answer: "Nicht für alle Leistungen ist ein Pflegegrad erforderlich. Hilfsmittel wie Elektromobile oder Elektrorollstühle können auch über die Krankenkasse mit ärztlicher Verordnung beantragt werden. Für Leistungen wie die Pflegebox, Hausnotruf-Zuschuss oder Badumbau-Förderung wird jedoch mindestens Pflegegrad 1 benötigt."
                },
                {
                  question: "Welche Unterlagen benötige ich für die Beantragung?",
                  answer: "In der Regel benötigen Sie Ihren Pflegebescheid (falls vorhanden), Ihre Versichertenkarte und bei bestimmten Hilfsmitteln eine ärztliche Verordnung. Unser Berater hilft Ihnen dabei, alle notwendigen Unterlagen zusammenzustellen und unterstützt Sie bei der Antragstellung - Sie müssen sich um nichts kümmern."
                },
                {
                  question: "Kann ich mehrere Leistungen gleichzeitig beantragen?",
                  answer: "Ja, Sie können mehrere Leistungen parallel beantragen. Viele unserer Kunden nutzen beispielsweise die Pflegebox zusammen mit dem Hausnotruf oder kombinieren einen Badumbau mit einem Treppenlift. Unser Berater erstellt mit Ihnen gemeinsam einen Überblick über alle Leistungen, die Ihnen zustehen."
                },
              ].map((faq, index) => (
                <details 
                  key={index} 
                  className="group bg-white rounded-lg border border-gray-200 overflow-hidden"
                >
                  <summary className="flex items-center justify-between cursor-pointer px-5 py-4 text-left font-semibold text-gray-900 hover:bg-gray-50 transition-colors">
                    <span className="pr-4">{faq.question}</span>
                    <ChevronRight className="w-5 h-5 text-gray-400 flex-shrink-0 transition-transform group-open:rotate-90" />
                  </summary>
                  <div className="px-5 pb-4 pt-0 text-sm text-gray-600 leading-relaxed">
                    {faq.answer}
                  </div>
                </details>
              ))}
            </div>
          </div>
        </section>

        {/* Trust Elements Section */}
        <section className="bg-white border-y border-gray-200">
          <div className="px-6 sm:px-10 lg:px-12 py-10 md:py-16 lg:py-20">
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

        {/* CTA Section */}
        <section className="bg-primary">
          <div className="px-4 sm:px-6 lg:px-8 py-10 md:py-14 text-center">
            <h2 className="text-xl md:text-2xl font-bold text-white">
              Nutzen Sie Ihre Pflegeleistungen voll aus
            </h2>
            <p className="mt-3 text-white/90 max-w-xl mx-auto">
              Viele Leistungen stehen Ihnen zu - wir helfen Ihnen, diese zu beantragen. 
              Kostenlos und unverbindlich.
            </p>
  <Link
  href="/start"
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
