"use client"

import { PhoneMockup } from "./phone-mockup"

const MOCKUPS = [
  {
    src: "/",
    label: "Startseite",
    description: "Die mobile Landingpage",
  },
  {
    src: "/hausnotruf",
    label: "Hausnotruf Funnel",
    description: "Produktauswahl im Fragebogen",
  },
  {
    src: "/newsletter-hausnotruf",
    label: "Newsletter",
    description: "Die E-Mail auf dem Smartphone",
  },
]

export default function ScreenshotMobilePage() {
  return (
    <main className="min-h-screen bg-muted">
      <div className="mx-auto max-w-6xl px-6 py-12 md:py-16">
        <header className="mb-10 text-center md:mb-14">
          <h1 className="text-balance text-2xl font-bold text-foreground md:text-3xl">
            Mobile Ansichten
          </h1>
          <p className="mt-3 text-pretty leading-relaxed text-muted-foreground">
            So erleben Ihre Kunden den Hilfsmittel-Kompass auf dem Smartphone.
          </p>
        </header>

        <div className="flex flex-col items-center justify-center gap-12 md:flex-row md:items-start md:gap-8 lg:gap-12">
          {MOCKUPS.map((mockup) => (
            <div key={mockup.src} className="flex flex-col items-center">
              <PhoneMockup src={mockup.src} title={mockup.label} />
              <h2 className="mt-6 text-lg font-semibold text-foreground">
                {mockup.label}
              </h2>
              <p className="mt-1 text-sm text-muted-foreground">
                {mockup.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </main>
  )
}
