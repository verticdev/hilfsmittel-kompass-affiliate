import type { QuestionnaireConfig } from "../types"

export const badumbauConfig: QuestionnaireConfig = {
  id: "badumbau",
  title: "Badumbau",
  description: "bis zu 4.180 € Zuschuss",
  steps: [
    {
      id: "umbauart",
      title: "Welche Art von Umbau planen Sie?",
      questions: [
        {
          id: "umbauart",
          type: "radio",
          label: "Umbauart",
          required: true,
          options: [
            { value: "Badewanne zu Dusche", label: "Badewanne zu Dusche" },
            { value: "Barrierearme Dusche", label: "Barrierearme Dusche" },
            { value: "Ebenerdige Dusche", label: "Ebenerdige Dusche" },
            { value: "Badewanne mit Tür", label: "Badewanne mit Tür" },
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
      id: "budget",
      title: "Was darf der Badumbau kosten?",
      questions: [
        {
          id: "budget",
          type: "range",
          label: "Budget",
          required: true,
          min: 2000,
          max: 20000,
          step: 500,
          default: 6000,
          suffix: "€",
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
      title: "Wann wird der Badumbau benötigt?",
      questions: [
        {
          id: "zeitpunkt",
          type: "radio",
          label: "Zeitpunkt",
          required: true,
          options: [
            { value: "Sofort", label: "Sofort" },
            { value: "In 1 Monat", label: "In 1 Monat" },
            { value: "In 1–3 Monaten", label: "In 1–3 Monaten" },
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
    description: "Wir haben Ihre Badumbau-Anfrage erhalten und werden uns in Kürze bei Ihnen melden.",
  },
}
