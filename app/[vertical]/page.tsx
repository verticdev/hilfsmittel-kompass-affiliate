import { notFound } from "next/navigation"
import { QuestionnaireRenderer } from "@/lib/questionnaire/questionnaire-renderer"
import { questionnaireConfigs } from "@/lib/questionnaire/configs"
import type { Metadata } from "next"

interface PageProps {
  params: Promise<{ vertical: string }>
}

const verticalMeta: Record<string, { title: string; description: string }> = {
  treppenlift: {
    title: "Treppenlift",
    description: "Finden Sie den passenden Treppenlift - Bis zu 4.180€ Zuschuss möglich",
  },
  hausnotruf: {
    title: "Hausnotruf",
    description: "Sicherheit auf Knopfdruck - 24/7 erreichbar",
  },
  badumbau: {
    title: "Badumbau",
    description: "Barrierefreies Bad - Bis zu 4.180€ Zuschuss möglich",
  },
  badewannenlift: {
    title: "Badewannenlift",
    description: "Sicher und bequem in die Badewanne - Ab 0€ mit Pflegekasse",
  },
  elektromobil: {
    title: "Elektromobil",
    description: "Mobil bleiben - Bis zu 100% Kostenübernahme möglich",
  },
  elektrorollstuhl: {
    title: "Elektrorollstuhl",
    description: "Elektrorollstuhl - Ab 0€ mit Krankenkasse",
  },
  pflegebox: {
    title: "Pflegebox",
    description: "Monatliche Pflegehilfsmittel - 40€ Pauschale von der Pflegekasse",
  },
  pflegekurs: {
    title: "Pflegekurs",
    description: "Kostenloser Pflegekurs für pflegende Angehörige",
  },
  alltagshilfe: {
    title: "Alltagshilfe",
    description: "Unterstützung im Alltag - Entlastung für Sie und Ihre Angehörigen",
  },
  "24h-pflege": {
    title: "24h Pflege",
    description: "Rund-um-die-Uhr Betreuung zu Hause",
  },
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { vertical } = await params
  const meta = verticalMeta[vertical]

  if (!meta) {
    return {
      title: "Hilfsmittel Kompass",
    }
  }

  return {
    title: `${meta.title} - Hilfsmittel Kompass`,
    description: meta.description,
  }
}

export async function generateStaticParams() {
  return Object.keys(questionnaireConfigs).map((vertical) => ({
    vertical,
  }))
}

export default async function VerticalPage({ params }: PageProps) {
  const { vertical } = await params
  const config = questionnaireConfigs[vertical]

  if (!config) {
    notFound()
  }

  return <QuestionnaireRenderer config={config} />
}
