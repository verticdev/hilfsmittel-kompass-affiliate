"use client"

import { useAffiliateConfig } from "@/lib/affiliate/context"
import Image from "next/image"
import { Phone, Mail, MapPin, CheckCircle, ArrowRight, Gift, Shield, Clock } from "lucide-react"

export default function NewsletterPage() {
  const { config: affiliateConfig } = useAffiliateConfig()

  return (
    <div className="min-h-screen bg-gray-200 py-8 px-4">
      {/* Email client mock frame */}
      <div className="max-w-2xl mx-auto">
        {/* Email header bar */}
        <div className="bg-gray-100 rounded-t-lg border border-gray-300 border-b-0 px-4 py-3">
          <div className="flex items-center gap-2 mb-3">
            <div className="w-3 h-3 rounded-full bg-red-400"></div>
            <div className="w-3 h-3 rounded-full bg-yellow-400"></div>
            <div className="w-3 h-3 rounded-full bg-green-400"></div>
          </div>
          <div className="space-y-1 text-sm text-gray-600">
            <div className="flex gap-2">
              <span className="font-medium w-16">Von:</span>
              <span>{affiliateConfig.partnerName} &lt;info@{affiliateConfig.partnerId.toLowerCase().replace(/\s+/g, "-")}.de&gt;</span>
            </div>
            <div className="flex gap-2">
              <span className="font-medium w-16">An:</span>
              <span>max.mustermann@beispiel.de</span>
            </div>
            <div className="flex gap-2">
              <span className="font-medium w-16">Betreff:</span>
              <span className="font-semibold text-gray-900">Exklusiv: Ihre Vorteile für Pflege, Sicherheit & Alltag</span>
            </div>
          </div>
        </div>

        {/* Email content */}
        <div className="bg-white border border-gray-300 rounded-b-lg shadow-lg overflow-hidden">
          {/* Webversion link */}
          <div className="text-center py-3 text-sm text-gray-500 border-b border-gray-100">
            Wenn diese E-Mail nicht korrekt angezeigt wird, klicken Sie bitte{" "}
            <a href="#" style={{ color: affiliateConfig.primaryColor }}>hier</a>.
          </div>

          {/* Newsletter Header - Company name and logo */}
          <div className="px-8 py-6 flex items-center justify-between">
            <span 
              className="text-xl font-semibold"
              style={{ color: affiliateConfig.primaryColor }}
            >
              {affiliateConfig.partnerName}
            </span>
            {affiliateConfig.logo && (
              <Image
                src={affiliateConfig.logo}
                alt={affiliateConfig.partnerName}
                width={60}
                height={60}
                className="h-12 w-auto object-contain"
              />
            )}
          </div>

          {/* Attention-Grabbing Headline Banner */}
          <div 
            className="px-8 py-5"
            style={{ backgroundColor: affiliateConfig.primaryColor }}
          >
            <h1 className="text-xl md:text-2xl font-bold text-white text-center">
              Entlastung & Unterstützung im Pflegealltag - kostenlos!
            </h1>
          </div>

          {/* Hero Image */}
          <div className="relative">
            <Image
              src="/images/hero-consultation.png"
              alt="Beratung für Senioren"
              width={700}
              height={350}
              className="w-full h-auto object-cover"
            />
            {/* Overlay Badge */}
            <div 
              className="absolute bottom-4 left-4 px-4 py-2 rounded-lg text-white font-bold text-lg"
              style={{ backgroundColor: affiliateConfig.primaryColor }}
            >
              KOSTENLOSE BERATUNG
            </div>
          </div>

          {/* Main Content */}
          <div className="px-8 py-8">
            {/* Greeting */}
            <h2 
              className="text-2xl font-normal mb-4"
              style={{ color: affiliateConfig.primaryColor }}
            >
              Guten Tag Herr/Frau Mustermann,
            </h2>

            <p className="text-gray-700 mb-4 leading-relaxed text-lg">
              kennen Sie schon den <span style={{ color: affiliateConfig.primaryColor }} className="font-semibold">Hilfsmittel-Kompass</span> in 
              Kooperation mit <span style={{ color: affiliateConfig.primaryColor }} className="font-semibold">Senioren Focus</span>? 
              Wir helfen Ihnen, <strong>alle Leistungen zu erhalten, die Ihnen zustehen</strong> - von Pflegehilfsmitteln 
              bis zum Hausnotruf!
            </p>

            {/* First CTA */}
            <div className="text-center my-6">
              <a
                href="#"
                className="inline-flex items-center gap-2 px-8 py-4 text-white font-bold rounded-lg text-lg shadow-lg hover:opacity-90 transition-opacity"
                style={{ backgroundColor: affiliateConfig.primaryColor }}
              >
                Jetzt kostenlos beraten lassen
                <ArrowRight className="w-5 h-5" />
              </a>
              <p className="text-sm text-gray-500 mt-2">Unverbindlich & in nur 2 Minuten</p>
            </div>

            {/* Benefits with Icons */}
            <div className="bg-gray-50 rounded-xl p-6 my-8">
              <h3 className="text-lg font-bold text-gray-900 mb-4 text-center">
                Unsere Leistungen im Überblick:
              </h3>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="flex items-start gap-3">
                  <div 
                    className="w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0"
                    style={{ backgroundColor: `${affiliateConfig.primaryColor}20` }}
                  >
                    <Gift className="w-5 h-5" style={{ color: affiliateConfig.primaryColor }} />
                  </div>
                  <div>
                    <p className="font-semibold text-gray-900">Pflegehilfsmittel</p>
                    <p className="text-sm text-gray-600">Bis zu 42€/Monat - von der Kasse bezahlt</p>
                  </div>
                </div>
                
                <div className="flex items-start gap-3">
                  <div 
                    className="w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0"
                    style={{ backgroundColor: `${affiliateConfig.primaryColor}20` }}
                  >
                    <Shield className="w-5 h-5" style={{ color: affiliateConfig.primaryColor }} />
                  </div>
                  <div>
                    <p className="font-semibold text-gray-900">Hausnotruf</p>
                    <p className="text-sm text-gray-600">24/7 Sicherheit auf Knopfdruck</p>
                  </div>
                </div>
                
                <div className="flex items-start gap-3">
                  <div 
                    className="w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0"
                    style={{ backgroundColor: `${affiliateConfig.primaryColor}20` }}
                  >
                    <CheckCircle className="w-5 h-5" style={{ color: affiliateConfig.primaryColor }} />
                  </div>
                  <div>
                    <p className="font-semibold text-gray-900">Treppenlift & Badumbau</p>
                    <p className="text-sm text-gray-600">Bis zu 4.000€ Zuschuss möglich</p>
                  </div>
                </div>
                
                <div className="flex items-start gap-3">
                  <div 
                    className="w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0"
                    style={{ backgroundColor: `${affiliateConfig.primaryColor}20` }}
                  >
                    <Clock className="w-5 h-5" style={{ color: affiliateConfig.primaryColor }} />
                  </div>
                  <div>
                    <p className="font-semibold text-gray-900">Alltagshilfen</p>
                    <p className="text-sm text-gray-600">Individuelle Unterstützung im Alltag</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Urgency Section */}
            <div 
              className="rounded-lg p-5 mb-8 border-l-4"
              style={{ 
                borderColor: affiliateConfig.primaryColor,
                backgroundColor: `${affiliateConfig.primaryColor}10`
              }}
            >
              <p className="font-bold text-gray-900 mb-2">
                Wussten Sie schon?
              </p>
              <p className="text-gray-700">
                Viele Pflegeleistungen werden <strong>nicht beantragt</strong>, obwohl ein Anspruch besteht. 
                Lassen Sie sich jetzt kostenlos von unseren Experten beraten!
              </p>
            </div>

            {/* Main CTA Button */}
            <div className="text-center mb-8">
              <a
                href="#"
                className="inline-flex items-center gap-2 px-10 py-5 text-white font-bold rounded-lg text-xl shadow-xl hover:opacity-90 transition-all hover:scale-105"
                style={{ backgroundColor: affiliateConfig.primaryColor }}
              >
                Jetzt Leistungen entdecken
                <ArrowRight className="w-6 h-6" />
              </a>
            </div>

            {/* Trust Elements */}
            <div className="flex flex-wrap justify-center gap-6 mb-8 text-sm text-gray-600">
              <div className="flex items-center gap-2">
                <CheckCircle className="w-5 h-5 text-green-500" />
                <span>100% kostenlos</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle className="w-5 h-5 text-green-500" />
                <span>Unverbindlich</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle className="w-5 h-5 text-green-500" />
                <span>Geprüfte Partner</span>
              </div>
            </div>

            {/* Closing */}
            <div className="border-t border-gray-200 pt-6">
              <p className="text-gray-700 mb-2">
                Herzliche Grüße
              </p>
              <p className="text-gray-700 font-semibold mb-4">
                Ihr {affiliateConfig.partnerName} Team
              </p>
              <p className="text-gray-600 text-sm italic">
                P.S.: Haben Sie Fragen? Unsere Experten beraten Sie gerne telefonisch – 
                natürlich ebenfalls kostenlos!
              </p>
            </div>
          </div>

          {/* Footer Icons */}
          <div className="px-8 py-6 border-t border-gray-200 bg-gray-50">
            <div className="grid grid-cols-3 gap-4 text-center mb-6">
              <div>
                <Phone className="w-6 h-6 mx-auto mb-2" style={{ color: affiliateConfig.primaryColor }} />
                <p className="text-sm text-gray-600">Kostenlose Hotline</p>
                <p className="text-sm font-bold text-gray-900">
                  0800 123 456 789
                </p>
              </div>
              <div>
                <Mail className="w-6 h-6 mx-auto mb-2" style={{ color: affiliateConfig.primaryColor }} />
                <p className="text-sm text-gray-600">E-Mail Support</p>
                <p className="text-sm font-bold text-gray-900">Jederzeit erreichbar</p>
              </div>
              <div>
                <MapPin className="w-6 h-6 mx-auto mb-2" style={{ color: affiliateConfig.primaryColor }} />
                <p className="text-sm text-gray-600">Berater in Ihrer Nähe</p>
                <p className="text-sm font-bold text-gray-900">Bundesweit</p>
              </div>
            </div>

            {/* Senioren Focus Partner Badge */}
            <div className="flex justify-center mb-4">
              <div className="flex items-center gap-3 bg-white px-5 py-3 rounded-full shadow-sm border border-gray-200">
                <Image
                  src="/images/senioren-focus-badge.png"
                  alt="Senioren Focus Partner"
                  width={40}
                  height={40}
                  className="w-10 h-10"
                />
                <span className="text-sm font-medium text-gray-700">Offizieller Partner von Senioren Focus</span>
              </div>
            </div>

            {/* Final CTA */}
            <div className="text-center mt-6">
              <a
                href="#"
                className="inline-block px-6 py-3 border-2 font-semibold rounded-lg transition-colors"
                style={{ 
                  borderColor: affiliateConfig.primaryColor,
                  color: affiliateConfig.primaryColor
                }}
              >
                Mehr erfahren auf hilfsmittel-kompass.de
              </a>
            </div>
          </div>

          {/* Legal Footer */}
          <div className="px-8 py-4 bg-gray-100 border-t border-gray-200">
            <p className="text-xs text-gray-500 leading-relaxed mb-2">
              Bitte antworten Sie nicht direkt auf diese E-Mail.
            </p>
            <p className="text-xs text-gray-500 leading-relaxed">
              Diese E-Mail wurde an max.mustermann@beispiel.de gesendet. 
              <a href="#" className="underline ml-1">Newsletter abbestellen</a> | 
              <a href="#" className="underline ml-1">Datenschutz</a> | 
              <a href="#" className="underline ml-1">Impressum</a>
            </p>
            <p className="text-xs text-gray-400 mt-2">
              © {new Date().getFullYear()} {affiliateConfig.partnerName} in Kooperation mit Hilfsmittel-Kompass & Senioren Focus
            </p>
          </div>
        </div>

        {/* Demo label */}
        <div className="mt-6 text-center">
          <span 
            className="inline-block px-4 py-2 rounded-full text-sm font-medium text-white"
            style={{ backgroundColor: affiliateConfig.primaryColor }}
          >
            Newsletter-Vorlage für {affiliateConfig.partnerName}
          </span>
        </div>
      </div>
    </div>
  )
}
