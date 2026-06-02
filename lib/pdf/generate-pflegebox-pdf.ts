import { PDFDocument, rgb, StandardFonts } from "pdf-lib"

interface PflegeboxFormData {
  pflegebox_typ: string
  anrede?: string
  vorname: string
  nachname: string
  strasse: string
  hausnummer: string
  plz: string
  ort: string
  telefonnummer: string
  email: string
  geburtsdatum: string
  krankenkasse: string
  versichertennummer: string
  unterschrift?: string // Base64 signature image
}

// Use direct blob URLs for PDF templates to ensure they load correctly
const PDF_TEMPLATES: Record<string, string> = {
  "hygiene-basis": "https://blobs.vusercontent.net/blob/Pflegebox_Hygiene%20Basis_Antragsformular_VitalSet-sRCeXZH03xYuf0wOl6C76nsMMUVso0.pdf",
  "bettschutz-plus": "https://blobs.vusercontent.net/blob/Pflegebox_Bettschutz%20Plus_Antragsformular_VitalSet-FZAJVWWONO4vcJXg0wi7RG6clcix2e.pdf",
  "desinfektion-komplett": "https://blobs.vusercontent.net/blob/Pflegebox_Desinfektion%20Komplett_Antragsformular_VitalSet-6WJTi02VRJYZUb1pwR4VljvQygAG6i.pdf",
}

export async function generatePflegeboxPdf(formData: PflegeboxFormData): Promise<Uint8Array> {
  const templateUrl = PDF_TEMPLATES[formData.pflegebox_typ]
  if (!templateUrl) {
    throw new Error(`Unknown pflegebox type: ${formData.pflegebox_typ}`)
  }

  // Fetch the PDF template
  const response = await fetch(templateUrl)
  if (!response.ok) {
    throw new Error(`Failed to fetch PDF template: ${response.status} ${response.statusText}`)
  }
  
  const existingPdfBytes = await response.arrayBuffer()
  const pdfDoc = await PDFDocument.load(existingPdfBytes)
  
  // Get the form
  const form = pdfDoc.getForm()
  const fields = form.getFields()
  
  // Log field names to help with debugging
  console.log("PDF Form Fields found:", fields.map(f => f.getName()))
  
  // Helper to safely set text field
  const setTextField = (fieldName: string, value: string) => {
    try {
      const field = form.getTextField(fieldName)
      if (field && value) {
        field.setText(value)
      }
    } catch (e) {
      console.log(`Field "${fieldName}" not found or error:`, e)
    }
  }
  
  // Helper to safely check checkbox
  const setCheckbox = (fieldName: string, shouldCheck: boolean) => {
    try {
      const checkbox = form.getCheckBox(fieldName)
      if (checkbox && shouldCheck) {
        checkbox.check()
      }
    } catch (e) {
      console.log(`Checkbox "${fieldName}" not found or error:`, e)
    }
  }
  
  // Fill personal data fields (matching exact field names from PDF)
  setTextField("vorname", formData.vorname)
  setTextField("nachname", formData.nachname)
  setTextField("strasse", `${formData.strasse} ${formData.hausnummer}`)
  setTextField("plz", formData.plz)
  setTextField("ort", formData.ort)
  setTextField("telefonnummer", formData.telefonnummer)
  setTextField("email", formData.email)
  setTextField("krankenkasse", formData.krankenkasse)
  setTextField("versichertennummer", formData.versichertennummer)
  
  // Birthdate is split into 3 fields: tt, mm, jjjj
  if (formData.geburtsdatum) {
    const dateParts = formData.geburtsdatum.split(".")
    if (dateParts.length === 3) {
      setTextField("tt", dateParts[0])   // Day
      setTextField("mm", dateParts[1])   // Month
      setTextField("jjjj", dateParts[2]) // Year
    }
  }
  
  // Set today's date for the datum field (format: ddmmjjjj, no dots)
  const today = new Date()
  const day = String(today.getDate()).padStart(2, "0")
  const month = String(today.getMonth() + 1).padStart(2, "0")
  const year = String(today.getFullYear())
  const dateStr = `${day}${month}${year}`
  
  // Try to set a smaller font size for the datum field
  try {
    const datumField = form.getTextField("datum")
    if (datumField) {
      datumField.setFontSize(10) // Smaller font
      datumField.setText(dateStr)
    }
  } catch {
    setTextField("datum", dateStr)
  }
  
  // Handle Anrede - radio button group named "anrede" with options "Frau" and "Herr"
  try {
    const radioGroup = form.getRadioGroup("anrede")
    if (radioGroup) {
      // Get available options to match exactly
      const options = radioGroup.getOptions()
      console.log("Anrede radio options:", options)
      
      if (formData.anrede === "Frau") {
        // Try to find the matching option
        const frauOption = options.find(o => o.toLowerCase().includes("frau")) || "Frau"
        radioGroup.select(frauOption)
      } else if (formData.anrede === "Herr") {
        const herrOption = options.find(o => o.toLowerCase().includes("herr")) || "Herr"
        radioGroup.select(herrOption)
      }
    }
  } catch (e) {
    console.log("Radio group 'anrede' error:", e)
  }
  
  // Handle signature - draw directly on page 2 at the signature box location
  // Based on PDF layout: signature box is to the right of "Datum" label, above "Unterschrift der/des Versicherten"
  if (formData.unterschrift) {
    try {
      const signatureData = formData.unterschrift.split(",")[1]
      if (signatureData) {
        const signatureBytes = Uint8Array.from(atob(signatureData), c => c.charCodeAt(0))
        const signatureImage = await pdfDoc.embedPng(signatureBytes)
        
        const pages = pdfDoc.getPages()
        // Signature is on page 2 (index 1)
        const page2 = pages[1] || pages[0]
        
        // Use the known field position from debug logs: x:276.275, y:301.463, width:202.769, height:28.427
        // Draw signature scaled to fit nicely in the box
        const boxX = 276
        const boxY = 301
        const boxWidth = 200
        const boxHeight = 28
        
        // Scale signature to fit the box while maintaining aspect ratio
        const imgWidth = signatureImage.width
        const imgHeight = signatureImage.height
        const scaleX = boxWidth / imgWidth
        const scaleY = boxHeight / imgHeight
        const scale = Math.min(scaleX, scaleY, 0.4) // Cap at 0.4 to not be too large
        
        const drawWidth = imgWidth * scale
        const drawHeight = imgHeight * scale
        
        // Center the signature in the box
        const drawX = boxX + (boxWidth - drawWidth) / 2
        const drawY = boxY + (boxHeight - drawHeight) / 2
        
        page2.drawImage(signatureImage, {
          x: drawX,
          y: drawY,
          width: drawWidth,
          height: drawHeight,
        })
        
        console.log("Signature drawn at:", { x: drawX, y: drawY, width: drawWidth, height: drawHeight })
      }
    } catch (error) {
      console.error("Error embedding signature:", error)
    }
  }
  
  // Flatten the form to make it non-editable
  form.flatten()

  const pdfBytes = await pdfDoc.save()
  return pdfBytes
}

export function downloadPdf(pdfBytes: Uint8Array, filename: string): void {
  const blob = new Blob([pdfBytes as BlobPart], { type: "application/pdf" })
  const url = URL.createObjectURL(blob)
  const link = document.createElement("a")
  link.href = url
  link.download = filename
  document.body.appendChild(link)
  link.click()
  document.body.removeChild(link)
  URL.revokeObjectURL(url)
}
