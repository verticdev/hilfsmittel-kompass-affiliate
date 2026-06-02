import type { QuestionnaireConfig } from "../types"
import { krankenkassenOptions } from "./shared/krankenkassen-options"

export const pflegeboxConfig: QuestionnaireConfig = {
  id: "pflegebox",
  title: "Pflegebox",
  description: "bis zu 40 € monatlich kostenlos mit Pflegegrad",
  steps: [
    // Step 1: Product Choice
    {
      id: "box-auswahl",
      title: "Welche Pflegebox benötigen Sie?",
      description: "Wählen Sie eine Pflegebox die zu Ihren Bedürfnissen passt",
      questions: [
        {
          id: "pflegebox_typ",
          type: "product_selection",
          label: "Pflegebox",
          required: true,
          products: [
            {
              value: "hygiene-basis",
              brandName: "Pflegebox",
              productName: "Hygiene Basis",
              productImage: "/images/products/pflegebox-hygiene-basis.png",
              description: "Hand- und Flächendesinfektion für den täglichen Bedarf",
              features: [
                "Handdesinfektionsmittel 500ml",
                "Flächendesinfektionstücher 150 Stk.",
                "Einmalhandschuhe 100 Stk.",
              ],
            },
            {
              value: "bettschutz-plus",
              brandName: "Pflegebox",
              productName: "Bettschutz Plus",
              productImage: "/images/products/pflegebox-bettschutz.png",
              description: "Inkontinenzschutz mit Hygiene-Grundausstattung",
              features: [
                "Händedesinfektionstücher 150 Stk.",
                "Saugende Bettschutzeinlagen 25 Stk.",
                "Einmalhandschuhe 100 Stk.",
              ],
            },
            {
              value: "desinfektion-komplett",
              brandName: "Pflegebox",
              productName: "Desinfektion Komplett",
              productImage: "/images/products/pflegebox-desinfektion.png",
              description: "Umfassende Desinfektion für Hände und Flächen",
              features: [
                "Einmalhandschuhe 100 Stk.",
                "Flächendesinfektionsmittel 500ml",
                "Händedesinfektionstücher 150 Stk.",
              ],
            },
          ],
        },
      ],
    },
    // Step 2: Für wen
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
    // Step 3: Pflegegrad
    {
      id: "pflegegrad",
      title: "Ist ein Pflegegrad vorhanden?",
      description: "Ein Pflegegrad ist Voraussetzung für die kostenlose Pflegebox",
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
    // Step 4: Pflegekasse
    {
      id: "krankenkasse",
      title: "Bei welcher Pflegekasse sind Sie versichert?",
      description: "Ihre Pflegekasse übernimmt die Kosten für die Pflegebox",
      questions: [
        {
          id: "krankenkasse",
          type: "combobox",
          label: "Pflegekasse",
          placeholder: "Pflegekasse auswählen...",
          searchPlaceholder: "Pflegekasse suchen...",
          emptyMessage: "Keine Pflegekasse gefunden.",
          required: true,
          allowCustomValue: true,
          options: krankenkassenOptions,
        },
      ],
    },
    // Step 5: Versichertennummer
    {
      id: "versichertennummer",
      title: "Wie lautet Ihre Versichertennummer?",
      description: "Sie finden diese auf Ihrer Versichertenkarte",
      questions: [
        {
          id: "versichertennummer",
          type: "text",
          label: "Versichertennummer",
          placeholder: "A123456789",
          required: true,
        },
      ],
    },
    // Step 6: Geburtsdatum
    {
      id: "geburtsdatum",
      title: "Wann sind Sie geboren?",
      description: "Geburtsdatum der pflegebedürftigen Person",
      questions: [
        {
          id: "geburtsdatum",
          type: "date",
          label: "Geburtsdatum",
          placeholder: "TT.MM.JJJJ",
          required: true,
        },
      ],
    },
    // Step 7: Anmerkungen
    {
      id: "remarks",
      title: "Haben Sie weitere Anmerkungen?",
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
    // Step 8: Contact Form
    {
      id: "contact",
      title: "Ihre Kontaktdaten",
      description: "Angaben zur pflegebedürftigen Person",
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
    // Step 9: Summary, Signature & Optin
    {
      id: "summary",
      title: "Zusammenfassung & Bestellung",
      description: "Bitte überprüfen Sie Ihre Angaben und bestätigen Sie die Bestellung",
      questions: [
        {
          id: "unterschrift",
          type: "signature",
          label: "Unterschrift",
          required: true,
        },
        {
          id: "kuendigung_altvertrag",
          type: "checkbox",
          label: "Sollte bereits ein Vertrag zur Lieferung bestehen, so beauftrage ich die Vitalset GmbH mit der Kündigung des Vertrages meines bisherigen Anbieters mit dem heutigen Datum.",
          required: true,
        },
        {
          id: "datenschutz",
          type: "checkbox",
          label: "Ich habe die Datenschutzerklärung gelesen und bin mit dieser einverstanden.",
          required: true,
        },
        {
          id: "beratung_bestaetigung",
          type: "checkbox",
          label: "Ich bestätige, dass ich eine Beratung erhalten habe oder diese nicht in Anspruch genommen habe.",
          required: true,
        },
      ],
    },
  ],
  successMessage: {
    title: "Vielen Dank für Ihre Bestellung!",
    description: "Ihr Antrag wurde erfolgreich übermittelt. Laden Sie Ihr ausgefülltes Antragsformular als PDF herunter.",
  },
}
