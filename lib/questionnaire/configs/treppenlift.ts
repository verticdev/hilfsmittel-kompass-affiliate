import type { QuestionnaireConfig } from "../types"

export const treppenliftConfig: QuestionnaireConfig = {
  id: "treppenlift",
  title: "Treppenlift",
  description: "bis zu 4.180 € Zuschuss",
  steps: [
    {
      id: "liftart",
      title: "Was für einen Treppenlift suchen Sie?",
      questions: [
        {
          id: "liftart",
          type: "radio",
          label: "Liftart",
          required: true,
          options: [
            { value: "Sitzlift", label: "Sitzlift" },
            { value: "Plattformlift", label: "Plattformlift" },
            { value: "Hublift", label: "Hublift" },
            { value: "Hauslift", label: "Hauslift" },
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
      id: "wohnsituation",
      title: "Wie ist Ihre Wohnsituation?",
      questions: [
        {
          id: "wohnsituation",
          type: "radio",
          label: "Wohnsituation",
          required: true,
          options: [
            { value: "Eigentum", label: "Eigentum" },
            { value: "Miete", label: "Miete" },
          ],
        },
      ],
    },
    {
      id: "nutzungsort",
      title: "Wo soll der Lift genutzt werden?",
      questions: [
        {
          id: "nutzungsort",
          type: "radio",
          label: "Nutzungsort",
          required: true,
          options: [
            { value: "Innenbereich", label: "Innenbereich" },
            { value: "Außenbereich", label: "Außenbereich" },
          ],
        },
      ],
    },
    {
      id: "treppentyp",
      title: "Was für eine Treppe haben Sie?",
      questions: [
        {
          id: "treppentyp",
          type: "radio",
          label: "Treppentyp",
          required: true,
          options: [
            { value: "Gerade Treppe", label: "Gerade Treppe" },
            { value: "Treppe mit Kurve", label: "Treppe mit Kurve" },
            { value: "Unklar", label: "Unklar" },
          ],
        },
      ],
    },
    {
      id: "treppenbreite",
      title: "Wie breit ist die Treppe ungefähr?",
      questions: [
        {
          id: "treppenbreite",
          type: "radio",
          label: "Treppenbreite",
          required: true,
          options: [
            { value: "schmaler als 90 cm", label: "Schmaler als 90 cm" },
            { value: "90 cm oder breiter", label: "90 cm oder breiter" },
            { value: "110 cm oder breiter", label: "110 cm oder breiter" },
          ],
        },
      ],
    },
    {
      id: "etagen",
      title: "Für wie viele Etagen ist der Lift gedacht?",
      questions: [
        {
          id: "etagen",
          type: "radio",
          label: "Etagen",
          required: true,
          options: [
            { value: "1", label: "Eine Etage" },
            { value: "2", label: "Zwei Etagen" },
            { value: "Mehrere Etagen", label: "Mehrere Etagen" },
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
      title: "Wann wird der Treppenlift benötigt?",
      questions: [
        {
          id: "zeitpunkt",
          type: "radio",
          label: "Zeitpunkt",
          required: true,
          options: [
            { value: "Sofort", label: "Sofort" },
            { value: "In 1-2 Wochen", label: "In 1-2 Wochen" },
            { value: "In 1 Monat", label: "In 1 Monat" },
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
    description: "Wir haben Ihre Treppenlift-Anfrage erhalten und werden uns in Kürze bei Ihnen melden.",
  },
}
