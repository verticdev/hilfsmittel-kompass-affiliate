"use client"

import { useAffiliateConfig } from "@/lib/affiliate/context"
import Image from "next/image"
import { Phone, Mail, MapPin } from "lucide-react"

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
              <span className="font-semibold text-gray-900">Ihre exklusiven Vorteile für Senioren und pflegende Angehörige</span>
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

          {/* Headline */}
          <div className="px-8 pb-4">
            <h1 
              className="text-xl font-medium"
              style={{ color: affiliateConfig.primaryColor }}
            >
              Entlastung und Unterstützung im Pflegealltag
            </h1>
          </div>

          {/* Hero Image */}
          <div className="px-8 pb-6">
            <Image
              src="/images/hero-consultation.png"
              alt="Beratung für Senioren"
              width={600}
              height={300}
              className="w-full h-auto rounded-lg object-cover"
            />
          </div>

          {/* Main Content */}
          <div className="px-8 pb-8">
            {/* Greeting */}
            <h2 
              className="text-2xl font-normal mb-4"
              style={{ color: affiliateConfig.primaryColor }}
            >
              Guten Tag Herr/Frau Mustermann,
            </h2>

            <p className="text-gray-700 mb-4 leading-relaxed">
              kennen Sie schon den{" "}
              <a href="#" style={{ color: affiliateConfig.primaryColor }} className="font-medium">
                Hilfsmittel-Kompass in Kooperation mit Senioren Focus
              </a>
              ? Hier finden Sie umfassende Informationen und Unterstützung rund um das Thema Pflege 
              und Hilfsmittel für Senioren. Wir helfen Ihnen dabei, Ihre Ansprüche zu kennen und 
              die richtigen Leistungen zu erhalten.
            </p>

            {/* Partner benefits section */}
            <p className="text-gray-900 font-semibold mb-4">
              Ihre Vorteile im Überblick:
            </p>

            <ul className="space-y-4 mb-6 text-gray-700">
              <li className="leading-relaxed">
                <strong>Pflegehilfsmittel zum Verbrauch:</strong> Mit einem anerkannten Pflegegrad 
                erhalten Sie monatlich Pflegehilfsmittel im Wert von bis zu 42€ – vollständig von 
                der Pflegekasse übernommen. Dazu gehören Einmalhandschuhe, Desinfektionsmittel, 
                Bettschutzeinlagen und mehr.
              </li>
              <li className="leading-relaxed">
                <strong>Hausnotruf-Systeme:</strong> Sicherheit rund um die Uhr mit modernen 
                Notrufsystemen für Zuhause. Bei Pflegegrad werden die Kosten von der Pflegekasse 
                bezuschusst – für mehr Unabhängigkeit im Alltag.
              </li>
              <li className="leading-relaxed">
                <strong>Alltagshilfen und Mobilitätslösungen:</strong> Von Treppenliften über 
                barrierefreie Badumbauten bis hin zu praktischen Alltagshelfern – wir vermitteln 
                Sie an qualifizierte regionale Fachberater.
              </li>
              <li className="leading-relaxed">
                <strong>Kostenlose Beratung:</strong> Unsere Experten beraten Sie unverbindlich 
                zu allen Fragen rund um Pflegeleistungen und unterstützen Sie bei der Antragstellung.
              </li>
            </ul>

            <p className="text-gray-700 mb-6">
              Nutzen Sie jetzt Ihre Vorteile – schnell, einfach und 100% kostenlos!
            </p>

            {/* CTA Button */}
            <div className="mb-8">
              <a
                href="#"
                className="inline-block px-6 py-3 text-white font-medium rounded"
                style={{ backgroundColor: affiliateConfig.primaryColor }}
              >
                Zum Hilfsmittel-Kompass
              </a>
            </div>

            {/* Closing */}
            <p className="text-gray-700 mb-4">
              Mit freundlichen Grüßen
            </p>
            <p className="text-gray-700 font-medium mb-6">
              Ihr {affiliateConfig.partnerName}
            </p>

            {/* Tip section */}
            <div className="border-t border-gray-200 pt-6">
              <p className="text-gray-900 font-semibold mb-2">Unser Tipp:</p>
              <p className="text-gray-600 text-sm leading-relaxed">
                Haben Sie oder ein Angehöriger bereits einen Pflegegrad? Dann stehen Ihnen 
                zahlreiche Leistungen zu, die oft nicht bekannt sind. Lassen Sie sich kostenlos 
                beraten und erfahren Sie, welche Unterstützung Ihnen zusteht.
              </p>
            </div>
          </div>

          {/* Footer Icons */}
          <div className="px-8 py-6 border-t border-gray-200">
            <div className="grid grid-cols-3 gap-4 text-center mb-6">
              <div>
                <Phone className="w-6 h-6 mx-auto mb-2 text-gray-400" />
                <p className="text-sm text-gray-600">Sie haben Fragen?</p>
                <p className="text-sm font-medium text-gray-900">
                  {affiliateConfig.contactPhone || "0800 123 456"}
                </p>
              </div>
              <div>
                <Mail className="w-6 h-6 mx-auto mb-2 text-gray-400" />
                <p className="text-sm text-gray-600">Kontaktieren Sie uns</p>
                <p className="text-sm font-medium text-gray-900">per E-Mail</p>
              </div>
              <div>
                <MapPin className="w-6 h-6 mx-auto mb-2 text-gray-400" />
                <p className="text-sm text-gray-600">Finden Sie einen</p>
                <p className="text-sm font-medium text-gray-900">Berater vor Ort</p>
              </div>
            </div>

            {/* Senioren Focus Partner Badge */}
            <div className="flex justify-center mb-6">
              <div className="flex items-center gap-3 bg-gray-50 px-4 py-2 rounded-full">
                <Image
                  src="/images/senioren-focus-badge.png"
                  alt="Senioren Focus Partner"
                  width={40}
                  height={40}
                  className="w-10 h-10"
                />
                <span className="text-sm text-gray-600">In Kooperation mit Senioren Focus</span>
              </div>
            </div>
          </div>

          {/* Legal Footer */}
          <div className="px-8 py-4 bg-gray-50 border-t border-gray-200">
            <p className="text-xs text-gray-500 leading-relaxed mb-2">
              Bitte antworten Sie nicht direkt auf diese E-Mail.
            </p>
            <p className="text-xs text-gray-500 leading-relaxed">
              Für Fragen oder Anregungen nutzen Sie bitte die dafür vorgesehenen Kontaktwege. 
              Diese E-Mail wurde an max.mustermann@beispiel.de gesendet. 
              <a href="#" className="underline ml-1">Newsletter abbestellen</a> | 
              <a href="#" className="underline ml-1">Datenschutz</a> | 
              <a href="#" className="underline ml-1">Impressum</a>
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
