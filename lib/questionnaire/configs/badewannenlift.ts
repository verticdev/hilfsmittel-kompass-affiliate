import type { QuestionnaireConfig } from "../types"

export const badewannenliftConfig: QuestionnaireConfig = {
  id: "badewannenlift",
  title: "Badewannenlift",
  description: "bis zu 4.180 € Zuschuss",
  steps: [
    {
      id: "modell",
      title: "Für welches Modell interessieren Sie sich?",
      questions: [
        {
          id: "modell",
          type: "radio",
          label: "Modell",
          required: true,
          options: [
            { value: "Bandlift", label: "Bandlift" },
            { value: "Personenlifter", label: "Personenlifter" },
            { value: "Luftkissen", label: "Luftkissen" },
          ],
        },
      ],
    },
    {
      id: "anfrage-fuer",
      title: "Für wen ist die Anfrage gedacht?",
      questions: [
        {
          id: "anfrage_fuer",
          type: "radio",
          label: "Anfrage für",
          required: true,
          options: [
            { value: "Für mich", label: "Für mich" },
            { value: "Angehörige", label: "Angehörige" },
            { value: "Patient/Kunde", label: "Patient/Kunde" },
            { value: "Andere Person", label: "Andere Person" },
          ],
        },
      ],
    },
    {
      id: "montageart",
      title: "Wie soll der Badewannenlift montiert werden?",
      questions: [
        {
          id: "montageart",
          type: "radio",
          label: "Montageart",
          required: true,
          options: [
            { value: "Fest installiert", label: "Fest installiert" },
            { value: "Flexibel", label: "Flexibel" },
            { value: "Noch unklar", label: "Noch unklar" },
          ],
        },
      ],
    },
    {
      id: "gewicht",
      title: "Für welches Gewicht wird der Lift benötigt?",
      questions: [
        {
          id: "gewicht",
          type: "radio",
          label: "Gewicht",
          required: true,
          options: [
            { value: "Bis 90 kg", label: "Bis 90 kg" },
            { value: "90–150 kg", label: "90 – 150 kg" },
            { value: "150 kg oder mehr", label: "Über 150 kg" },
          ],
        },
      ],
    },
    {
      id: "pflegegrad",
      title: "Ist ein Pflegegrad vorhanden?",
      questions: [
        {
          id: "pflegegrad",
          type: "radio",
          label: "Pflegegrad",
          required: true,
          options: [
            { value: "Vorhanden", label: "Vorhanden" },
            { value: "Beantragt", label: "Beantragt" },
            { value: "Nicht vorhanden", label: "Nicht vorhanden" },
          ],
        },
      ],
    },
    {
      id: "zeitpunkt",
      title: "Wann wird der Badewannenlift benötigt?",
      questions: [
        {
          id: "zeitpunkt",
          type: "radio",
          label: "Zeitpunkt",
          required: true,
          options: [
            { value: "Sofort", label: "Sofort" },
            { value: "In 3 Monaten", label: "In den nächsten 3 Monaten" },
            { value: "Später", label: "Später" },
          ],
        },
      ],
    },
    {
      id: "remarks",
      title: "Weitere Anmerkungen zum Kunden/Sachverhalt",
      description: "",
      questions: [
        { id: "anmerkungen", type: "long-text-field", label: "Anmerkungen", placeholder: "Optionale Anmerkungen...", required: false },
      ],
    },
    {
      id: "contact",
      title: "Ihre Kontaktdaten",
      description: "Damit wir Sie für ein unverbindliches Angebot kontaktieren können",
      questions: [
        { id: "anrede", type: "radio", label: "Anrede", required: false, options: [{ value: "Herr", label: "Herr" }, { value: "Frau", label: "Frau" }] },
        { id: "vorname", type: "text", label: "Vorname", placeholder: "Max", required: true },
        { id: "nachname", type: "text", label: "Nachname", placeholder: "Mustermann", required: true },
        { id: "email", type: "email", label: "E-Mail (optional)", placeholder: "max@beispiel.de", required: false },
        { id: "telefonnummer", type: "tel", label: "Telefonnummer", placeholder: "+49 123 456789", required: true },
        { id: "strasse", type: "text", label: "Straße", placeholder: "Musterstraße", required: true },
        { id: "hausnummer", type: "text", label: "HNr.", placeholder: "1a", required: true },
        { id: "plz", type: "text", label: "PLZ", placeholder: "12345", required: true },
        { id: "ort", type: "text", label: "Ort", placeholder: "Musterstadt", required: true },
      ],
    },
    {
      id: "consent",
      title: "Zusammenfassung & Einwilligung",
      description: "Bitte überprüfen Sie Ihre Angaben und stimmen Sie der Datenverarbeitung zu",
      questions: [
        { id: "summary_display", type: "summary", label: "Zusammenfassung", required: false },
        { id: "datenschutz", type: "consent", label: "Datenschutz Einwilligung", required: true },
      ],
    },
  ],
  successMessage: {
    title: "Vielen Dank für Ihre Anfrage!",
    description: "Wir haben Ihre Badewannenlift-Anfrage erhalten und werden uns in Kürze bei Ihnen melden.",
  },
}
