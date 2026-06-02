"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import Image from "next/image"
import { useAffiliateConfig, defaultConfig } from "@/lib/affiliate/context"
import { ArrowLeft, RotateCcw, Copy, Check, ExternalLink, Palette, Building2, Image as ImageIcon } from "lucide-react"
import { cn } from "@/lib/utils"

export default function ConfigPage() {
  const { config, updateConfig, resetConfig, isCustomized } = useAffiliateConfig()
  
  const [companyName, setCompanyName] = useState(config.partnerName)
  const [logoUrl, setLogoUrl] = useState(config.logo)
  const [primaryColor, setPrimaryColor] = useState(config.primaryColor)
  const [secondaryColor, setSecondaryColor] = useState(config.secondaryColor)
  const [copied, setCopied] = useState(false)
  const [logoError, setLogoError] = useState(false)

  // Sync local state when config changes (e.g., on reset)
  useEffect(() => {
    setCompanyName(config.partnerName)
    setLogoUrl(config.logo)
    setPrimaryColor(config.primaryColor)
    setSecondaryColor(config.secondaryColor)
  }, [config])

  const handleCompanyNameChange = (value: string) => {
    setCompanyName(value)
    updateConfig({ partnerName: value, partnerId: value.toLowerCase().replace(/\s+/g, "-") })
  }

  const handleLogoChange = (value: string) => {
    setLogoUrl(value)
    setLogoError(false)
    updateConfig({ logo: value })
  }

  const handlePrimaryColorChange = (value: string) => {
    setPrimaryColor(value)
    updateConfig({ primaryColor: value })
  }

  const handleSecondaryColorChange = (value: string) => {
    setSecondaryColor(value)
    updateConfig({ secondaryColor: value })
  }

  const handleReset = () => {
    resetConfig()
    setLogoError(false)
  }

  const copyConfigAsJson = () => {
    const configJson = JSON.stringify(config, null, 2)
    navigator.clipboard.writeText(configJson)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b border-gray-200 sticky top-0 z-40">
        <div className="max-w-4xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Link 
                href="/" 
                className="inline-flex items-center gap-2 text-gray-600 hover:text-gray-900 transition-colors"
              >
                <ArrowLeft className="w-4 h-4" />
                <span className="text-sm font-medium">Zurück zur Seite</span>
              </Link>
            </div>
            <div className="flex items-center gap-3">
              <button
                onClick={copyConfigAsJson}
                className="inline-flex items-center gap-2 px-3 py-2 text-sm font-medium text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-lg transition-colors"
              >
                {copied ? (
                  <>
                    <Check className="w-4 h-4 text-green-600" />
                    <span className="text-green-600">Kopiert!</span>
                  </>
                ) : (
                  <>
                    <Copy className="w-4 h-4" />
                    <span>JSON kopieren</span>
                  </>
                )}
              </button>
              {isCustomized && (
                <button
                  onClick={handleReset}
                  className="inline-flex items-center gap-2 px-3 py-2 text-sm font-medium text-red-600 hover:text-red-700 hover:bg-red-50 rounded-lg transition-colors"
                >
                  <RotateCcw className="w-4 h-4" />
                  <span>Zurücksetzen</span>
                </button>
              )}
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-4xl mx-auto px-4 py-8">
        {/* Title */}
        <div className="mb-8">
          <h1 className="text-2xl md:text-3xl font-bold text-gray-900">
            Branding Konfiguration
          </h1>
          <p className="mt-2 text-gray-600">
            Passen Sie das Erscheinungsbild der Seite für Ihren Kundentermin an. 
            Änderungen werden sofort übernommen und im Browser gespeichert.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          {/* Left Column - Form */}
          <div className="space-y-6">
            {/* Company Name */}
            <div className="bg-white rounded-xl border border-gray-200 p-6">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                  <Building2 className="w-5 h-5 text-primary" />
                </div>
                <div>
                  <h2 className="font-semibold text-gray-900">Firmenname</h2>
                  <p className="text-sm text-gray-500">Wird in der gesamten Seite verwendet</p>
                </div>
              </div>
              <input
                type="text"
                value={companyName}
                onChange={(e) => handleCompanyNameChange(e.target.value)}
                placeholder="z.B. REWE, Lidl, Penny..."
                className="w-full h-11 px-4 rounded-lg border border-gray-300 bg-white text-gray-900 placeholder:text-gray-400 focus:ring-2 focus:ring-primary focus:border-primary outline-none transition-all"
              />
            </div>

            {/* Logo URL */}
            <div className="bg-white rounded-xl border border-gray-200 p-6">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                  <ImageIcon className="w-5 h-5 text-primary" />
                </div>
                <div>
                  <h2 className="font-semibold text-gray-900">Logo URL</h2>
                  <p className="text-sm text-gray-500">Externe URL oder lokaler Pfad</p>
                </div>
              </div>
              <input
                type="text"
                value={logoUrl}
                onChange={(e) => handleLogoChange(e.target.value)}
                placeholder="https://example.com/logo.png"
                className="w-full h-11 px-4 rounded-lg border border-gray-300 bg-white text-gray-900 placeholder:text-gray-400 focus:ring-2 focus:ring-primary focus:border-primary outline-none transition-all"
              />
              {logoError && (
                <p className="mt-2 text-sm text-red-600">
                  Logo konnte nicht geladen werden. Bitte überprüfen Sie die URL.
                </p>
              )}
            </div>

            {/* Colors */}
            <div className="bg-white rounded-xl border border-gray-200 p-6">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                  <Palette className="w-5 h-5 text-primary" />
                </div>
                <div>
                  <h2 className="font-semibold text-gray-900">Farben</h2>
                  <p className="text-sm text-gray-500">Primär- und Akzentfarbe</p>
                </div>
              </div>
              
              <div className="space-y-4">
                {/* Primary Color */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Primärfarbe (Buttons, Header)
                  </label>
                  <div className="flex items-center gap-3">
                    <div className="relative">
                      <input
                        type="color"
                        value={primaryColor}
                        onChange={(e) => handlePrimaryColorChange(e.target.value)}
                        className="w-12 h-12 rounded-lg border border-gray-300 cursor-pointer overflow-hidden"
                        style={{ padding: 0 }}
                      />
                    </div>
                    <input
                      type="text"
                      value={primaryColor}
                      onChange={(e) => handlePrimaryColorChange(e.target.value)}
                      placeholder="#0F4386"
                      className="flex-1 h-11 px-4 rounded-lg border border-gray-300 bg-white text-gray-900 font-mono text-sm focus:ring-2 focus:ring-primary focus:border-primary outline-none transition-all"
                    />
                  </div>
                </div>

                {/* Secondary Color */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Sekundärfarbe (CTA Buttons)
                  </label>
                  <div className="flex items-center gap-3">
                    <div className="relative">
                      <input
                        type="color"
                        value={secondaryColor}
                        onChange={(e) => handleSecondaryColorChange(e.target.value)}
                        className="w-12 h-12 rounded-lg border border-gray-300 cursor-pointer overflow-hidden"
                        style={{ padding: 0 }}
                      />
                    </div>
                    <input
                      type="text"
                      value={secondaryColor}
                      onChange={(e) => handleSecondaryColorChange(e.target.value)}
                      placeholder="#FDDC3F"
                      className="flex-1 h-11 px-4 rounded-lg border border-gray-300 bg-white text-gray-900 font-mono text-sm focus:ring-2 focus:ring-primary focus:border-primary outline-none transition-all"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column - Preview */}
          <div className="space-y-6">
            {/* Live Preview Card */}
            <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
              <div className="px-6 py-4 border-b border-gray-100">
                <h2 className="font-semibold text-gray-900">Live-Vorschau</h2>
              </div>
              
              {/* Mini Header Preview */}
              <div 
                className="p-4 border-b border-gray-100"
                style={{ backgroundColor: primaryColor }}
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    {logoUrl && !logoError ? (
                      <Image
                        src={logoUrl}
                        alt={companyName}
                        width={80}
                        height={40}
                        className="h-8 w-auto object-contain bg-white rounded p-1"
                        onError={() => setLogoError(true)}
                      />
                    ) : (
                      <div className="h-8 px-3 bg-white/20 rounded flex items-center">
                        <span className="text-white font-semibold text-sm">{companyName}</span>
                      </div>
                    )}
                  </div>
                  <button 
                    className="px-3 py-1.5 rounded text-xs font-semibold transition-colors"
                    style={{ backgroundColor: secondaryColor, color: primaryColor }}
                  >
                    Anrufen
                  </button>
                </div>
              </div>

              {/* Content Preview */}
              <div className="p-6">
                <div className="space-y-4">
                  <div>
                    <div 
                      className="inline-block px-2 py-1 rounded text-xs font-medium mb-2"
                      style={{ backgroundColor: `${primaryColor}15`, color: primaryColor }}
                    >
                      Exklusiv für {companyName}-Kunden
                    </div>
                    <h3 className="text-lg font-bold text-gray-900">
                      Ihre Pflegeleistungen
                    </h3>
                    <p className="text-sm text-gray-600 mt-1">
                      Wir helfen Ihnen, alle Zuschüsse zu nutzen.
                    </p>
                  </div>
                  
                  <button 
                    className="w-full py-2.5 rounded-lg font-semibold text-sm transition-colors"
                    style={{ backgroundColor: secondaryColor, color: primaryColor }}
                  >
                    Beratung starten
                  </button>

                  <div className="flex items-center gap-4 text-xs text-gray-500">
                    <span className="flex items-center gap-1">
                      <span className="w-3 h-3 rounded-full" style={{ backgroundColor: secondaryColor }} />
                      100% kostenlos
                    </span>
                    <span className="flex items-center gap-1">
                      <span className="w-3 h-3 rounded-full" style={{ backgroundColor: secondaryColor }} />
                      Unverbindlich
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* Quick Actions */}
            <div className="bg-white rounded-xl border border-gray-200 p-6">
              <h2 className="font-semibold text-gray-900 mb-4">Schnellaktionen</h2>
              <div className="space-y-3">
                <Link
                  href="/"
                  className={cn(
                    "flex items-center justify-between p-3 rounded-lg border border-gray-200 hover:border-primary/50 hover:bg-primary/5 transition-colors"
                  )}
                >
                  <div>
                    <span className="font-medium text-gray-900">Landing Page öffnen</span>
                    <p className="text-sm text-gray-500">Mit aktueller Konfiguration</p>
                  </div>
                  <ExternalLink className="w-4 h-4 text-gray-400" />
                </Link>
                
                <Link
                  href="/start"
                  className="flex items-center justify-between p-3 rounded-lg border border-gray-200 hover:border-primary/50 hover:bg-primary/5 transition-colors"
                >
                  <div>
                    <span className="font-medium text-gray-900">Fragebogen starten</span>
                    <p className="text-sm text-gray-500">Service-Auswahl testen</p>
                  </div>
                  <ExternalLink className="w-4 h-4 text-gray-400" />
                </Link>
              </div>
            </div>

            {/* Current Config JSON */}
            <div className="bg-gray-900 rounded-xl p-4 overflow-hidden">
              <div className="flex items-center justify-between mb-3">
                <span className="text-xs font-medium text-gray-400">Aktuelle Konfiguration</span>
                <button
                  onClick={copyConfigAsJson}
                  className="text-xs text-gray-400 hover:text-white transition-colors"
                >
                  {copied ? "Kopiert!" : "Kopieren"}
                </button>
              </div>
              <pre className="text-xs text-green-400 overflow-x-auto">
                {JSON.stringify(config, null, 2)}
              </pre>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}
