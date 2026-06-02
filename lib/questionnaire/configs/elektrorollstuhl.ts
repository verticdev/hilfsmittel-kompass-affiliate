import type { QuestionnaireConfig } from "../types"
import { krankenkassenOptions } from "./shared/krankenkassen-options"

export const elektrorollstuhlConfig: QuestionnaireConfig = {
  id: "elektrorollstuhl",
  title: "Elektrorollstuhl",
  description: "ab 0€ mit Rezept",
  steps: [
    {
      id: "modellart",
      title: "Welches Modell ist gewünscht?",
      questions: [
        {
          id: "modellart",
          type: "radio",
          label: "Modellart",
          required: true,
          options: [
            { value: "Elektrorollstuhl faltbar", label: "Faltbarer Elektrorollstuhl" },
            { value: "Elektrorollstuhl Standard", label: "Standard Elektrorollstuhl" },
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
      id: "koerpergewicht",
      title: "Welches Nutzungsgewicht wird benötigt?",
      questions: [
        {
          id: "koerpergewicht",
          type: "radio",
          label: "Körpergewicht",
          required: true,
          options: [
            { value: "<90kg", label: "Bis 90 kg" },
            { value: "90-145kg", label: "90 - 145 kg" },
            { value: ">145kg", label: "145 kg oder mehr" },
          ],
        },
      ],
    },
    {
      id: "krankenkasse",
      title: "Bei welcher Krankenkasse sind Sie versichert?",
      questions: [
        {
          id: "krankenkasse",
          type: "combobox",
          label: "Krankenkasse",
          placeholder: "Krankenkasse auswählen...",
          searchPlaceholder: "Krankenkasse suchen...",
          emptyMessage: "Keine Krankenkasse gefunden.",
          required: true,
          allowCustomValue: true,
          options: krankenkassenOptions,
        },
      ],
    },
    {
      id: "rezept",
      title: "Ist ein Rezept für einen Elektrorollstuhl vorhanden?",
      questions: [
        {
          id: "rezeptVorhanden",
          type: "radio",
          label: "Rezept",
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
      title: "Wann wird der Elektrorollstuhl benötigt?",
      questions: [
        {
          id: "zeitpunkt",
          type: "radio",
          label: "Zeitpunkt",
          required: true,
          options: [
            { value: "Sofort", label: "Sofort" },
            { value: "1 Monat", label: "In 1 Monat" },
            { value: "1-3 Monate", label: "In 1-3 Monaten" },
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
    description: "Wir haben Ihre Elektrorollstuhl-Anfrage erhalten und werden uns in Kürze bei Ihnen melden.",
  },
}
