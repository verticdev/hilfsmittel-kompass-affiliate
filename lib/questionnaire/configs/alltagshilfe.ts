import type { QuestionnaireConfig } from "../types"

export const alltagshilfeConfig: QuestionnaireConfig = {
  id: "alltagshilfe",
  title: "Alltagshilfe",
  description: "bis zu 131 € monatlicher Zuschuss",
  steps: [
    {
      id: "hilfeart",
      title: "Welche Art von Hilfe wird benötigt?",
      questions: [
        {
          id: "hilfeart",
          type: "radio",
          label: "Art der Hilfe",
          required: true,
          options: [
            { value: "Haushaltshilfe", label: "Haushaltshilfe", description: "Putzen, Waschen, Aufräumen", badge: "BELIEBT" },
            { value: "Einkäufe & Erledigungen", label: "Einkäufe & Erledigungen", description: "Lebensmittel, Medikamente" },
            { value: "Begleitung", label: "Begleitung", description: "Arztbesuche, Spaziergänge" },
            { value: "Grundpflege", label: "Grundpflege", description: "Unterstützung bei der Grundpflege" },
          ],
        },
      ],
    },
    {
      id: "haeufigkeit",
      title: "Wie oft wird Hilfe benötigt?",
      questions: [
        {
          id: "haeufigkeit",
          type: "radio",
          label: "Häufigkeit",
          required: true,
          options: [
            { value: "Täglich", label: "Täglich", description: "Jeden Tag Unterstützung" },
            { value: "Mehrmals wöchentlich", label: "Mehrmals wöchentlich", description: "2-4 mal pro Woche" },
            { value: "Wöchentlich", label: "Wöchentlich", description: "1 mal pro Woche", badge: "BELIEBT" },
            { value: "Nach Bedarf", label: "Nach Bedarf", description: "Flexibel bei Bedarf" },
          ],
        },
      ],
    },
    {
      id: "anfrage-fuer",
      title: "Für wen wird die Alltagshilfe benötigt?",
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
    description: "Wir haben Ihre Alltagshilfe-Anfrage erhalten und werden uns in Kürze bei Ihnen melden.",
  },
}
