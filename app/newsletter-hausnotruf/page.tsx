"use client"

import { useAffiliateConfig } from "@/lib/affiliate/context"
import Image from "next/image"
import { Phone, Mail, MapPin, CheckCircle, ArrowRight, Shield, Clock, Bell } from "lucide-react"

export default function NewsletterHausnotrufPage() {
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
              <span className="font-semibold text-gray-900">Exklusiv für Sie: Ihr Hausnotruf ab 0€ mit Pflegegrad</span>
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

          {/* Single Primary-Colored Header with title and logo */}
          <div 
            className="px-8 py-5 flex items-center justify-between"
            style={{ backgroundColor: affiliateConfig.primaryColor }}
          >
            <h1 className="text-lg md:text-xl font-bold text-white">
              Sicherheit auf Knopfdruck – rund um die Uhr
            </h1>
            {affiliateConfig.logo && (
              <Image
                src={affiliateConfig.logo}
                alt={affiliateConfig.partnerName}
                width={60}
                height={60}
                className="h-12 w-auto object-contain bg-white rounded p-1"
              />
            )}
          </div>

          {/* Hero Image */}
          <div className="relative">
            <Image
              src="/images/carousel-hausnotruf.png"
              alt="Seniorin mit Hausnotruf-System zuhause"
              width={700}
              height={350}
              className="w-full h-auto object-cover"
              style={{ paddingTop: "10px" }}
            />
            {/* Overlay Badge with Primary/Secondary swap */}
            <div 
              className="absolute bottom-4 left-4 px-4 py-2 rounded-lg font-bold text-lg shadow-lg z-20"
              style={{ 
                backgroundColor: affiliateConfig.primaryColor,
                color: affiliateConfig.secondaryColor === "#FFFFFF" || affiliateConfig.secondaryColor === "#ffffff" 
                  ? "#000000" 
                  : affiliateConfig.secondaryColor
              }}
            >
              EXKLUSIVES ANGEBOT
            </div>
          </div>

          {/* Value Proposition Box - overlapping image */}
          <div className="mx-8 -mt-6 relative z-10">
            <div 
              className="rounded-lg p-6 text-center shadow-lg"
              style={{ 
                backgroundColor: affiliateConfig.secondaryColor === "#FFFFFF" || affiliateConfig.secondaryColor === "#ffffff" 
                  ? affiliateConfig.primaryColor 
                  : affiliateConfig.secondaryColor 
              }}
            >
              <p 
                className="text-2xl md:text-3xl font-bold mb-1"
                style={{ 
                  color: affiliateConfig.secondaryColor === "#FFFFFF" || affiliateConfig.secondaryColor === "#ffffff" 
                    ? "#FFFFFF" 
                    : affiliateConfig.primaryColor 
                }}
              >
                Hausnotruf ab 0€ mit Pflegegrad!
              </p>
              <p 
                className="text-sm opacity-90"
                style={{ 
                  color: affiliateConfig.secondaryColor === "#FFFFFF" || affiliateConfig.secondaryColor === "#ffffff" 
                    ? "#FFFFFF" 
                    : affiliateConfig.primaryColor 
                }}
              >
                Die Pflegekasse übernimmt die Kosten – schnelle Hilfe per Knopfdruck
              </p>
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
              als geschätzter <strong>{affiliateConfig.partnerName}-Kunde</strong> möchten wir Sie auf ein 
              besonderes Angebot aufmerksam machen: Gemeinsam mit <span style={{ color: affiliateConfig.primaryColor }} className="font-semibold">Senioren Focus</span> bieten 
              wir Ihnen den <span style={{ color: affiliateConfig.primaryColor }} className="font-semibold">Hausnotruf</span> – 
              für mehr Sicherheit und Selbstständigkeit in den eigenen vier Wänden!
            </p>

            <p className="text-gray-700 mb-4 leading-relaxed">
              <strong>Das Beste daran?</strong> Mit einem anerkannten Pflegegrad übernimmt die Pflegekasse 
              die Kosten – für Sie als {affiliateConfig.partnerName}-Kunde also <strong>ab 0€ im Monat</strong>. 
              Im Notfall genügt ein Knopfdruck und Hilfe ist rund um die Uhr für Sie da.
            </p>

            {/* First CTA with Secondary Color accent */}
            <div className="text-center my-6">
              <a
                href="#"
                className="inline-flex items-center gap-2 px-8 py-4 font-bold rounded-lg text-lg shadow-lg hover:opacity-90 transition-opacity"
                style={{ 
                  backgroundColor: affiliateConfig.secondaryColor === "#FFFFFF" || affiliateConfig.secondaryColor === "#ffffff" 
                    ? affiliateConfig.primaryColor 
                    : affiliateConfig.secondaryColor,
                  color: affiliateConfig.secondaryColor === "#FFFFFF" || affiliateConfig.secondaryColor === "#ffffff" 
                    ? "#FFFFFF" 
                    : affiliateConfig.primaryColor
                }}
              >
                Kostenlosen Hausnotruf prüfen
                <ArrowRight className="w-5 h-5" />
              </a>
              <p className="text-sm text-gray-500 mt-2">Ab 0€ mit Pflegegrad - exklusiv für {affiliateConfig.partnerName}-Kunden</p>
            </div>

            {/* Benefits with Icons */}
            <div className="bg-gray-50 rounded-xl p-6 my-8">
              <h3 className="text-lg font-bold text-gray-900 mb-4 text-center">
                Ihre Vorteile mit dem Hausnotruf:
              </h3>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="flex items-start gap-3">
                  <div 
                    className="w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0"
                    style={{ backgroundColor: `${affiliateConfig.primaryColor}20` }}
                  >
                    <Bell className="w-5 h-5" style={{ color: affiliateConfig.primaryColor }} />
                  </div>
                  <div>
                    <p className="font-semibold text-gray-900">Hilfe per Knopfdruck</p>
                    <p className="text-sm text-gray-600">Sofortige Verbindung zur Notrufzentrale</p>
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
                    <p className="font-semibold text-gray-900">24/7 erreichbar</p>
                    <p className="text-sm text-gray-600">Rund um die Uhr für Sie da – jeden Tag</p>
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
                    <p className="font-semibold text-gray-900">Ab 0€ mit Pflegegrad</p>
                    <p className="text-sm text-gray-600">Kostenübernahme durch die Pflegekasse</p>
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
                    <p className="font-semibold text-gray-900">Mehr Selbstständigkeit</p>
                    <p className="text-sm text-gray-600">Sicher und unabhängig zuhause leben</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Urgency Section with Secondary Color */}
            <div 
              className="rounded-lg p-5 mb-8 border-l-4"
              style={{ 
                borderColor: affiliateConfig.secondaryColor === "#FFFFFF" || affiliateConfig.secondaryColor === "#ffffff" 
                  ? affiliateConfig.primaryColor 
                  : affiliateConfig.secondaryColor,
                backgroundColor: affiliateConfig.secondaryColor === "#FFFFFF" || affiliateConfig.secondaryColor === "#ffffff" 
                  ? `${affiliateConfig.primaryColor}10`
                  : `${affiliateConfig.secondaryColor}30`
              }}
            >
              <p 
                className="font-bold mb-2"
                style={{ 
                  color: affiliateConfig.primaryColor 
                }}
              >
                Wussten Sie schon?
              </p>
              <p className="text-gray-700">
                Bereits ab <strong>Pflegegrad 1</strong> übernimmt die Pflegekasse die Kosten für den Hausnotruf. 
                Lassen Sie sich jetzt kostenlos beraten und sichern Sie sich Ihre Sicherheit zuhause!
              </p>
            </div>

            {/* Trust Elements */}
            <div className="flex flex-wrap justify-center gap-6 mb-8 text-sm text-gray-600">
              <div className="flex items-center gap-2">
                <CheckCircle className="w-5 h-5 text-green-500" />
                <span>Ab 0€ mit Pflegegrad</span>
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
                P.S.: Unsere Experten beraten Sie gerne telefonisch – natürlich ebenfalls kostenlos!
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
            </p>
            <p className="text-xs text-gray-500 leading-relaxed mt-1">
              <a href="#" className="underline">Newsletter abbestellen</a> | 
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
            Newsletter-Vorlage (Hausnotruf) für {affiliateConfig.partnerName}
          </span>
        </div>
      </div>
    </div>
  )
}
