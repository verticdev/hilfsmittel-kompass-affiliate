"use client"

import { useAffiliateConfig } from "@/lib/affiliate/context"
import Image from "next/image"
import { Phone, Mail, User, CheckCircle, PhoneCall, FileCheck, Handshake } from "lucide-react"

export default function CrmMockupPage() {
  const { config: affiliateConfig } = useAffiliateConfig()

  // Demo recipient data (would be populated from the CRM/lead in production)
  const lead = {
    name: "Max Mustermann",
    phone: "01573 / 598 6330",
    email: "max.mustermann@beispiel.de",
  }

  const callbackNumber = "01573 / 598 6330"

  // Selected product from the questionnaire (would come from the lead in production)
  const product = {
    brandName: "Johanniter",
    brandLogo: "/images/logos/johanniter-logo.png",
    productName: "Johanniter Hausnotruf",
    productImage: "/images/products/johanniter-hausnotruf.png",
  }

  return (
    <div className="min-h-screen bg-gray-200 py-8 px-4">
      {/* Email client mock frame */}
      <div className="max-w-2xl mx-auto">
        {/* Email header bar */}
        <div className="bg-gray-100 rounded-t-lg border border-gray-300 border-b-0 px-4 py-3">
          <div className="flex items-center gap-2 mb-3">
            <div className="w-3 h-3 rounded-full bg-red-400" />
            <div className="w-3 h-3 rounded-full bg-yellow-400" />
            <div className="w-3 h-3 rounded-full bg-green-400" />
          </div>
          <div className="space-y-1 text-sm text-gray-600">
            <div className="flex gap-2">
              <span className="font-medium w-16">Von:</span>
              <span>Senioren Focus &lt;service@senioren-focus.de&gt;</span>
            </div>
            <div className="flex gap-2">
              <span className="font-medium w-16">An:</span>
              <span>{lead.email}</span>
            </div>
            <div className="flex gap-2">
              <span className="font-medium w-16">Betreff:</span>
              <span className="font-semibold text-gray-900">
                Ihre Hausnotruf-Anfrage ist eingegangen – wir kümmern uns darum
              </span>
            </div>
          </div>
        </div>

        {/* Email content */}
        <div className="bg-white border border-gray-300 rounded-b-lg shadow-lg overflow-hidden">
          {/* Webversion link */}
          <div className="text-center py-3 text-sm text-gray-500 border-b border-gray-100">
            Wenn diese E-Mail nicht korrekt angezeigt wird, klicken Sie bitte{" "}
            <a href="#" style={{ color: affiliateConfig.primaryColor }}>
              hier
            </a>
            .
          </div>

          {/* Co-branded header: Senioren Focus takes over in partnership with NORMA Hilfsmittel-Kompass */}
          <div
            className="px-8 py-5 flex items-center justify-between gap-4"
            style={{ backgroundColor: affiliateConfig.primaryColor }}
          >
            <h1 className="text-lg md:text-xl font-bold text-white leading-tight">
              Ihre Anfrage zum Johanniter Hausnotruf
            </h1>
            <div className="flex items-center gap-2 flex-shrink-0">
              <Image
                src="/images/senioren-focus-badge.png"
                alt="Senioren Focus"
                width={48}
                height={48}
                className="h-10 w-10 object-contain bg-white rounded p-1"
              />
              {affiliateConfig.logo && (
                <Image
                  src={affiliateConfig.logo}
                  alt={affiliateConfig.partnerName}
                  width={320}
                  height={120}
                  quality={100}
                  className="h-10 w-auto object-contain bg-white rounded p-1"
                />
              )}
            </div>
          </div>

          {/* Partnership handoff banner */}
          <div
            className="px-8 py-5 border-b border-gray-100"
            style={{ backgroundColor: `${affiliateConfig.primaryColor}0D` }}
          >
            <div className="flex items-start gap-3">
              <div
                className="w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0"
                style={{ backgroundColor: `${affiliateConfig.primaryColor}20` }}
              >
                <Handshake className="w-5 h-5" style={{ color: affiliateConfig.primaryColor }} />
              </div>
              <p className="text-gray-700 leading-relaxed text-sm">
                Sie haben Ihre Anfrage über den{" "}
                <strong>{affiliateConfig.partnerName} Hilfsmittel-Kompass</strong> gestellt. Ab jetzt übernimmt{" "}
                <strong style={{ color: affiliateConfig.primaryColor }}>Senioren Focus</strong> – unser
                spezialisierter Partner für Hausnotrufsysteme. Gemeinsam sorgen wir dafür, dass Sie den
                passenden Hausnotruf erhalten.
              </p>
            </div>
          </div>

          {/* Main Content */}
          <div className="px-8 py-8">
            {/* Greeting */}
            <p className="text-gray-700 mb-4 leading-relaxed">
              Guten Tag {lead.name},
            </p>

            <p className="text-gray-700 mb-6 leading-relaxed">
              herzlichen Dank für Ihre Anfrage. Wir freuen uns, dass Sie sich entschieden haben, Ihre
              Hausnotruf-Auswahl in professionelle Hände zu geben. Zeitnah melden wir uns unter folgender
              Nummer bei Ihnen:{" "}
              <strong style={{ color: affiliateConfig.primaryColor }}>{callbackNumber}</strong>.
            </p>

            {/* Contact data box */}
            <div className="bg-gray-50 rounded-xl p-6 mb-6">
              <div className="flex flex-col sm:flex-row gap-6">
                {/* Product (1/3): logo + image */}
                <div className="sm:w-1/3 flex flex-col items-center justify-center gap-3 sm:border-r sm:border-gray-200 sm:pr-6">
                  <div className="relative h-8 w-full">
                    <Image
                      src={product.brandLogo || "/placeholder.svg"}
                      alt={product.brandName}
                      fill
                      className="object-contain object-center"
                    />
                  </div>
                  <div className="relative h-24 w-full">
                    <Image
                      src={product.productImage || "/placeholder.svg"}
                      alt={product.productName}
                      fill
                      className="object-contain object-center"
                    />
                  </div>
                  <span className="text-xs text-gray-500 text-center leading-tight">
                    {product.productName}
                  </span>
                </div>

                {/* Contact data (2/3) */}
                <div className="sm:w-2/3">
                  <h3 className="text-lg font-bold mb-4" style={{ color: affiliateConfig.primaryColor }}>
                    Ihre Kontaktdaten
                  </h3>
                  <div className="space-y-3">
                    <div className="flex items-center gap-3">
                      <User className="w-5 h-5 flex-shrink-0" style={{ color: affiliateConfig.primaryColor }} />
                      <span className="text-sm text-gray-500 w-20">Name:</span>
                      <span className="text-gray-900 font-medium">{lead.name}</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <Phone className="w-5 h-5 flex-shrink-0" style={{ color: affiliateConfig.primaryColor }} />
                      <span className="text-sm text-gray-500 w-20">Telefon:</span>
                      <span className="text-gray-900 font-medium">{lead.phone}</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <Mail className="w-5 h-5 flex-shrink-0" style={{ color: affiliateConfig.primaryColor }} />
                      <span className="text-sm text-gray-500 w-20">E-Mail:</span>
                      <a href={`mailto:${lead.email}`} className="font-medium" style={{ color: affiliateConfig.primaryColor }}>
                        {lead.email}
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <p className="text-gray-700 mb-8 leading-relaxed">
              <strong>Sind Ihre Kontaktdaten richtig?</strong> Falls nicht, antworten Sie einfach auf diese
              E-Mail oder rufen Sie uns an unter{" "}
              <strong style={{ color: affiliateConfig.primaryColor }}>{callbackNumber}</strong>.
            </p>

            {/* Steps section */}
            <div className="border-t border-gray-200 pt-8">
              <h3 className="text-xl font-bold text-center text-gray-900 mb-6">
                In 3 Schritten zu Ihrem Hausnotruf
              </h3>

              <div className="space-y-6">
                {/* Step 1 */}
                <div className="flex gap-4">
                  <div
                    className="w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0 text-white font-bold"
                    style={{ backgroundColor: affiliateConfig.primaryColor }}
                  >
                    1
                  </div>
                  <div>
                    <p className="font-bold text-gray-900 mb-1 flex items-center gap-2">
                      <CheckCircle className="w-4 h-4" style={{ color: affiliateConfig.primaryColor }} />
                      Überprüfen Sie Ihre Kontaktdaten
                    </p>
                    <p className="text-gray-600 text-sm leading-relaxed">
                      Bitte überprüfen Sie Ihre Kontaktdaten, damit wir Ihnen Informationen zu Anbietern
                      zukommen lassen können.
                    </p>
                  </div>
                </div>

                {/* Step 2 */}
                <div className="flex gap-4">
                  <div
                    className="w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0 text-white font-bold"
                    style={{ backgroundColor: affiliateConfig.primaryColor }}
                  >
                    2
                  </div>
                  <div>
                    <p className="font-bold text-gray-900 mb-1 flex items-center gap-2">
                      <PhoneCall className="w-4 h-4" style={{ color: affiliateConfig.primaryColor }} />
                      Kurzes Beratungstelefonat
                    </p>
                    <p className="text-gray-600 text-sm leading-relaxed">
                      In einem kurzen Telefongespräch von maximal 5 Minuten überprüfen wir Ihre Angaben und
                      finden gemeinsam den passenden Hausnotruf.
                    </p>
                  </div>
                </div>

                {/* Step 3 */}
                <div className="flex gap-4">
                  <div
                    className="w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0 text-white font-bold"
                    style={{ backgroundColor: affiliateConfig.primaryColor }}
                  >
                    3
                  </div>
                  <div>
                    <p className="font-bold text-gray-900 mb-1 flex items-center gap-2">
                      <FileCheck className="w-4 h-4" style={{ color: affiliateConfig.primaryColor }} />
                      Unverbindliches Angebot direkt vom Anbieter
                    </p>
                    <p className="text-gray-600 text-sm leading-relaxed">
                      Der Anbieter lässt Ihnen ein Angebot zukommen. Außerdem werden Sie ggf. dabei
                      unterstützt, dass Ihre Pflegekasse die Kosten übernimmt, wenn ein Pflegegrad vorliegt.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Closing */}
            <div className="border-t border-gray-200 mt-8 pt-6">
              <p className="text-gray-700 mb-2">Herzliche Grüße</p>
              <p className="text-gray-700 font-semibold mb-4">Ihr Senioren Focus Team</p>
              <p className="text-gray-600 text-sm italic">
                P.S.: Haben Sie Fragen? Rufen Sie uns gerne an unter {callbackNumber} – wir helfen Ihnen
                persönlich weiter.
              </p>
            </div>
          </div>

          {/* Footer */}
          <div className="px-8 py-6 border-t border-gray-200 bg-gray-50">
            {/* Partner badge */}
            <div className="flex justify-center mb-4">
              <div className="flex items-center gap-3 bg-white px-5 py-3 rounded-full shadow-sm border border-gray-200">
                <Image
                  src="/images/senioren-focus-badge.png"
                  alt="Senioren Focus Partner"
                  width={40}
                  height={40}
                  className="w-10 h-10"
                />
                <span className="text-sm font-medium text-gray-700">
                  Bearbeitet von Senioren Focus – in Partnerschaft mit {affiliateConfig.partnerName}
                </span>
              </div>
            </div>
          </div>

          {/* Legal Footer */}
          <div className="px-8 py-4 bg-gray-100 border-t border-gray-200">
            <p className="text-xs text-gray-500 leading-relaxed mb-2">
              Sie erhalten diese E-Mail, weil Sie eine Hausnotruf-Anfrage über den {affiliateConfig.partnerName}{" "}
              Hilfsmittel-Kompass gestellt haben.
            </p>
            <p className="text-xs text-gray-500 leading-relaxed">
              Diese E-Mail wurde an {lead.email} gesendet.
            </p>
            <p className="text-xs text-gray-500 leading-relaxed mt-1">
              <a href="#" className="underline">
                Datenschutz
              </a>{" "}
              |
              <a href="#" className="underline ml-1">
                Impressum
              </a>
            </p>
            <p className="text-xs text-gray-400 mt-2">
              © {new Date().getFullYear()} Senioren Focus in Kooperation mit {affiliateConfig.partnerName}{" "}
              Hilfsmittel-Kompass
            </p>
          </div>
        </div>

        {/* Demo label */}
        <div className="mt-6 text-center">
          <span
            className="inline-block px-4 py-2 rounded-full text-sm font-medium text-white"
            style={{ backgroundColor: affiliateConfig.primaryColor }}
          >
            CRM-Bestätigungsmail (Hausnotruf) für {affiliateConfig.partnerName}
          </span>
        </div>
      </div>
    </div>
  )
}
