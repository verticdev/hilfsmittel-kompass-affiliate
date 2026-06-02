"use client"

import { useAffiliateConfig } from "@/lib/affiliate/context"
import Image from "next/image"
import { CheckCircle2, ArrowRight, Phone, Mail, Calendar } from "lucide-react"

export default function NewsletterPage() {
  const { config: affiliateConfig } = useAffiliateConfig()

  return (
    <div className="min-h-screen bg-gray-200 py-8 px-4">
      {/* Email client mock frame */}
      <div className="max-w-3xl mx-auto">
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
              <span>{affiliateConfig.partnerName} Newsletter &lt;newsletter@{affiliateConfig.partnerId.toLowerCase()}.de&gt;</span>
            </div>
            <div className="flex gap-2">
              <span className="font-medium w-16">An:</span>
              <span>kunde@beispiel.de</span>
            </div>
            <div className="flex gap-2">
              <span className="font-medium w-16">Betreff:</span>
              <span className="font-semibold text-gray-900">Exklusiv für Sie: Kostenlose Pflegehilfsmittel im Wert von bis zu 42€/Monat</span>
            </div>
          </div>
        </div>

        {/* Email content */}
        <div className="bg-white border border-gray-300 rounded-b-lg shadow-lg overflow-hidden">
          {/* Newsletter Header */}
          <div 
            className="px-8 py-6"
            style={{ backgroundColor: affiliateConfig.primaryColor }}
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                {affiliateConfig.logo && (
                  <div className="bg-white rounded-lg p-2">
                    <Image
                      src={affiliateConfig.logo}
                      alt={affiliateConfig.partnerName}
                      width={100}
                      height={40}
                      className="h-8 w-auto object-contain"
                    />
                  </div>
                )}
                <span className="text-white/80 text-sm font-medium">Newsletter</span>
              </div>
              <div className="flex items-center gap-2 text-white/80 text-sm">
                <Calendar className="w-4 h-4" />
                <span>{new Date().toLocaleDateString("de-DE", { month: "long", year: "numeric" })}</span>
              </div>
            </div>
          </div>

          {/* Main Content */}
          <div className="px-8 py-10">
            {/* Greeting */}
            <p className="text-gray-700 text-lg mb-6">
              Liebe Kundin, lieber Kunde,
            </p>

            <p className="text-gray-600 mb-8 leading-relaxed">
              als treuer {affiliateConfig.partnerName}-Kunde möchten wir Sie auf ein besonderes Angebot aufmerksam machen, 
              das Ihnen oder Ihren Angehörigen im Pflegealltag helfen kann.
            </p>

            {/* Feature Box */}
            <div 
              className="rounded-xl p-6 mb-8 border-2"
              style={{ 
                backgroundColor: `${affiliateConfig.primaryColor}08`,
                borderColor: `${affiliateConfig.primaryColor}20`
              }}
            >
              <div className="flex items-start gap-4">
                <div 
                  className="w-12 h-12 rounded-full flex items-center justify-center flex-shrink-0"
                  style={{ backgroundColor: affiliateConfig.secondaryColor }}
                >
                  <CheckCircle2 className="w-6 h-6" style={{ color: affiliateConfig.primaryColor }} />
                </div>
                <div>
                  <h2 
                    className="text-xl font-bold mb-2"
                    style={{ color: affiliateConfig.primaryColor }}
                  >
                    Kostenlose Pflegehilfsmittel für Pflegebedürftige
                  </h2>
                  <p className="text-gray-600">
                    Wussten Sie schon? Mit einem anerkannten Pflegegrad haben Sie Anspruch auf 
                    <strong> bis zu 42€ monatlich</strong> für Pflegehilfsmittel zum Verbrauch – 
                    komplett von der Pflegekasse übernommen!
                  </p>
                </div>
              </div>
            </div>

            {/* Benefits List */}
            <h3 className="font-semibold text-gray-900 mb-4">Diese Produkte stehen Ihnen zu:</h3>
            <div className="grid grid-cols-2 gap-3 mb-8">
              {[
                "Einmalhandschuhe",
                "Desinfektionsmittel",
                "Bettschutzeinlagen",
                "Mundschutz",
                "Schutzschürzen",
                "Händedesinfektion"
              ].map((item) => (
                <div key={item} className="flex items-center gap-2">
                  <CheckCircle2 
                    className="w-5 h-5 flex-shrink-0" 
                    style={{ color: affiliateConfig.primaryColor }} 
                  />
                  <span className="text-gray-700">{item}</span>
                </div>
              ))}
            </div>

            {/* Partner Introduction */}
            <div className="bg-gray-50 rounded-lg p-6 mb-8">
              <p className="text-gray-600 mb-4">
                Gemeinsam mit unserem Partner <strong style={{ color: affiliateConfig.primaryColor }}>Hilfsmittel-Kompass</strong> bieten 
                wir Ihnen einen einfachen Weg, Ihre Ansprüche geltend zu machen. Der Service ist:
              </p>
              <div className="flex flex-wrap gap-4">
                <div className="flex items-center gap-2 bg-white px-3 py-2 rounded-full border border-gray-200">
                  <span className="text-green-500 font-bold">✓</span>
                  <span className="text-sm font-medium">100% kostenlos</span>
                </div>
                <div className="flex items-center gap-2 bg-white px-3 py-2 rounded-full border border-gray-200">
                  <span className="text-green-500 font-bold">✓</span>
                  <span className="text-sm font-medium">Unverbindlich</span>
                </div>
                <div className="flex items-center gap-2 bg-white px-3 py-2 rounded-full border border-gray-200">
                  <span className="text-green-500 font-bold">✓</span>
                  <span className="text-sm font-medium">Direkte Lieferung</span>
                </div>
              </div>
            </div>

            {/* CTA Button */}
            <div className="text-center mb-8">
              <a
                href="#"
                className="inline-flex items-center gap-2 px-8 py-4 rounded-lg text-white font-semibold text-lg transition-transform hover:scale-105"
                style={{ backgroundColor: affiliateConfig.primaryColor }}
              >
                Jetzt kostenlos anfragen
                <ArrowRight className="w-5 h-5" />
              </a>
              <p className="text-sm text-gray-500 mt-3">
                In nur 2 Minuten zum unverbindlichen Angebot
              </p>
            </div>

            {/* Testimonial */}
            <div 
              className="border-l-4 pl-4 py-2 mb-8"
              style={{ borderColor: affiliateConfig.secondaryColor }}
            >
              <p className="text-gray-600 italic mb-2">
                &quot;Ich hätte nicht gedacht, dass es so einfach ist. Die Hilfsmittel werden direkt zu mir nach Hause 
                geliefert und ich muss mich um nichts kümmern.&quot;
              </p>
              <p className="text-sm text-gray-500">– Maria K., 72, aus Hamburg</p>
            </div>

            {/* Closing */}
            <p className="text-gray-600 mb-6">
              Haben Sie Fragen? Unser Serviceteam hilft Ihnen gerne weiter.
            </p>

            <p className="text-gray-700">
              Herzliche Grüße,<br />
              <strong>Ihr {affiliateConfig.partnerName}-Team</strong>
            </p>
          </div>

          {/* Footer */}
          <div 
            className="px-8 py-6 border-t border-gray-200"
            style={{ backgroundColor: `${affiliateConfig.primaryColor}05` }}
          >
            <div className="flex flex-col sm:flex-row items-center justify-between gap-4 text-sm text-gray-500">
              <div className="flex items-center gap-4">
                {affiliateConfig.contactPhone && (
                  <span className="flex items-center gap-1">
                    <Phone className="w-4 h-4" />
                    {affiliateConfig.contactPhone}
                  </span>
                )}
                {affiliateConfig.contactEmail && (
                  <span className="flex items-center gap-1">
                    <Mail className="w-4 h-4" />
                    {affiliateConfig.contactEmail}
                  </span>
                )}
              </div>
              <div className="flex gap-4">
                <a href="#" className="hover:underline">Impressum</a>
                <a href="#" className="hover:underline">Datenschutz</a>
                <a href="#" className="hover:underline">Abmelden</a>
              </div>
            </div>
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
