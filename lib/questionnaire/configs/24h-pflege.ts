import type { QuestionnaireConfig } from "../types"

export const twentyFourHourCareConfig: QuestionnaireConfig = {
  id: "24h-pflege",
  title: "24h Pflege",
  description: "bis zu 3.386 € jährlich bezuschusst",
  steps: [
    {
      id: "betreuung-fuer",
      title: "Für wen wird die 24h-Pflegekraft benötigt?",
      description: "Bitte wählen Sie aus, für wen die Betreuung gedacht ist",
      questions: [
        {
          id: "betreuung-fuer",
          type: "radio",
          label: "Betreuung für",
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
      id: "zimmer",
      title: "Ist ein Zimmer für die Pflegekraft vorhanden?",
      description: "Die Pflegekraft benötigt ein eigenes Zimmer",
      questions: [
        {
          id: "zimmer-vorhanden",
          type: "radio",
          label: "Zimmer vorhanden",
          required: true,
          options: [
            { value: "Ja", label: "Ja", description: "Ein separates Zimmer ist verfügbar" },
            { value: "Nein", label: "Nein", description: "Kein separates Zimmer vorhanden" },
          ],
        },
      ],
    },
    {
      id: "pflegegrad",
      title: "Ist ein Pflegegrad vorhanden?",
      description: "Angaben zum aktuellen Pflegegrad",
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
      id: "budget",
      title: "Welches monatliche Budget steht zur Verfügung?",
      description: "Ihr verfügbares Budget für die 24h-Betreuung",
      questions: [
        {
          id: "budget",
          type: "radio",
          label: "Monatliches Budget",
          required: true,
          options: [
            { value: "Bis zu 2.500€", label: "Bis zu 2.500€" },
            { value: "2.500-3.000€", label: "2.500-3.000€" },
            { value: "3.000-3.500€", label: "3.000-3.500€" },
            { value: "Über 3.500€", label: "Über 3.500€" },
          ],
        },
      ],
    },
    {
      id: "zeitpunkt",
      title: "Wann wird die Pflegekraft benötigt?",
      description: "Gewünschter Starttermin der Betreuung",
      questions: [
        {
          id: "zeitpunkt",
          type: "radio",
          label: "Zeitpunkt",
          required: true,
          options: [
            { value: "Sofort", label: "Sofort", description: "Schnellstmöglich" },
            { value: "In 1-2 Wochen", label: "In 1-2 Wochen" },
            { value: "In 1 Monat", label: "In 1 Monat" },
            { value: "Später", label: "Später", description: "In mehr als einem Monat" },
          ],
        },
      ],
    },
    {
      id: "anmerkungen",
      title: "Haben Sie weitere Anmerkungen?",
      description: "Optionale zusätzliche Informationen",
      questions: [
        {
          id: "anmerkungen",
          type: "textarea",
          label: "Anmerkungen",
          placeholder: "Hier können Sie uns weitere Informationen mitteilen...",
          required: false,
        },
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
    description: "Wir haben Ihre 24h-Pflege-Anfrage erhalten und werden uns in Kürze bei Ihnen melden.",
  },
}
