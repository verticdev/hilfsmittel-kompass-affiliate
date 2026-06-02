"use client"

import { useState, useRef, useEffect } from "react"
import { useRouter, useSearchParams } from "next/navigation"
import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Checkbox } from "@/components/ui/checkbox"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Slider } from "@/components/ui/slider"
import { ArrowLeft, ArrowRight, Check, Loader2, ChevronsUpDown, X, Search, Calendar, Download } from "lucide-react"
import { BRAND_ASSETS } from "@/lib/brand-assets"
import type { QuestionnaireConfig, FormData, QuestionConfig } from "./types"
import { ProductSelectionCard } from "@/components/product-selection-card"
import { cn } from "@/lib/utils"
import { TRACKING_PARAMS, saveTrackingParams, buildUrlWithTracking, getAllTrackingParams } from "@/lib/tracking-params"
import { 
  trackQuestionnaireStarted, 
  trackQuestionnaireStepCompleted, 
  trackQuestionnaireBackClicked,
  trackQuestionnaireCompleted,
  trackFormSubmitted,
  trackFormSubmissionError 
} from "@/lib/analytics"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from "@/components/ui/command"

// Dynamic import for PDF generation (only loaded when needed on success screen)
const loadPdfGenerator = () => import("@/lib/pdf/generate-pflegebox-pdf")

interface QuestionnaireRendererProps {
  config: QuestionnaireConfig
}

export function QuestionnaireRenderer({ config }: QuestionnaireRendererProps) {
  const router = useRouter()
  const searchParams = useSearchParams()
  const [currentStep, setCurrentStep] = useState(0)
  const [formData, setFormData] = useState<FormData>({})
  const [trackingData, setTrackingData] = useState<Record<string, string>>({})
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isComplete, setIsComplete] = useState(false)
  const [errors, setErrors] = useState<Record<string, string>>({})
  const [openCombobox, setOpenCombobox] = useState<string | null>(null)
  const [comboboxSearch, setComboboxSearch] = useState("")
  const signatureRef = useRef<HTMLCanvasElement>(null)
  const [isDrawing, setIsDrawing] = useState(false)

  // Capture tracking params from URL and sessionStorage on mount
  useEffect(() => {
    // Save URL params to sessionStorage
    saveTrackingParams(searchParams)
    // Get all tracking params (merged from URL and storage)
    const allParams = getAllTrackingParams(searchParams)
    if (Object.keys(allParams).length > 0) {
      setTrackingData(allParams as Record<string, string>)
    }
    // Track questionnaire started
    trackQuestionnaireStarted(config.id, config.steps.length)
  }, [searchParams, config.id, config.steps.length])

  const totalSteps = config.steps.length
  const progress = ((currentStep + 1) / totalSteps) * 100
  const currentStepData = config.steps[currentStep]

  const updateFormData = (key: string, value: string | string[] | boolean | number) => {
    setFormData((prev) => ({ ...prev, [key]: value }))
    if (errors[key]) {
      setErrors((prev) => {
        const next = { ...prev }
        delete next[key]
        return next
      })
    }
  }

  const validateStep = (): boolean => {
    const newErrors: Record<string, string> = {}
    
    // Get required fields from questions with required: true
    const requiredQuestions = currentStepData.questions.filter(q => q.required)
    
    for (const question of requiredQuestions) {
      const value = formData[question.id]
      if (!value || (Array.isArray(value) && value.length === 0) || value === "") {
        newErrors[question.id] = "Bitte beantworten Sie diese Frage"
      }
    }

    // Email validation
    const emailQuestion = currentStepData.questions.find(q => q.id === "email")
    if (emailQuestion?.required && formData.email) {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
      if (!emailRegex.test(String(formData.email))) {
        newErrors.email = "Bitte geben Sie eine gültige E-Mail-Adresse ein"
      }
    }

    // Phone validation
    const phoneQuestion = currentStepData.questions.find(q => q.id === "telefonnummer")
    if (phoneQuestion?.required && formData.telefonnummer) {
      const phoneRegex = /^[\d\s\-+()]{6,}$/
      if (!phoneRegex.test(String(formData.telefonnummer))) {
        newErrors.telefonnummer = "Bitte geben Sie eine gültige Telefonnummer ein"
      }
    }

    // PLZ validation
    const plzQuestion = currentStepData.questions.find(q => q.id === "plz")
    if (plzQuestion?.required && formData.plz) {
      const plzRegex = /^\d{5}$/
      if (!plzRegex.test(String(formData.plz))) {
        newErrors.plz = "Bitte geben Sie eine gültige Postleitzahl ein"
      }
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleNext = () => {
    if (!validateStep()) return

    // Track step completion
    trackQuestionnaireStepCompleted(
      config.id,
      currentStep + 1,
      currentStepData.id,
      totalSteps
    )

    if (currentStep < totalSteps - 1) {
      setCurrentStep((prev) => prev + 1)
      window.scrollTo({ top: 0, behavior: "smooth" })
    }
  }

  const handleBack = () => {
    // Track back button click
    trackQuestionnaireBackClicked(config.id, currentStep + 1)
    
    if (currentStep === 0) {
      router.push(buildUrlWithTracking("/", searchParams))
    } else {
      setCurrentStep((prev) => prev - 1)
      window.scrollTo({ top: 0, behavior: "smooth" })
    }
  }

  const handleSubmit = async () => {
    if (!validateStep()) return

    // Track final step completion and questionnaire completion
    trackQuestionnaireStepCompleted(config.id, totalSteps, currentStepData.id, totalSteps)
    trackQuestionnaireCompleted(config.id, totalSteps)

    setIsSubmitting(true)
    try {
      // Generate dummy email if email is empty (for seniors without email)
      let emailToSubmit = formData.email
      if (!emailToSubmit || String(emailToSubmit).trim() === "") {
        const firstName = String(formData.vorname || "").trim().toLowerCase().replace(/\s+/g, "")
        const lastName = String(formData.nachname || "").trim().toLowerCase().replace(/\s+/g, "")
        emailToSubmit = `${firstName}${lastName}@sf.de`
      }

      // Submit all questionnaires to API with tracking data
      const submitData = {
        ...formData,
        email: emailToSubmit,
        dsgvo_einwilligung: formData.datenschutz || formData.dsgvo_einwilligung || false,
      }
      
      const response = await fetch("/api/anfrage/submit", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          service: config.id,
          data: submitData,
          tracking: trackingData,
          timestamp: new Date().toISOString(),
        }),
      })

      if (response.ok) {
        // Track successful form submission (conversion)
        trackFormSubmitted(config.id, !!trackingData.partner_id)
        setIsComplete(true)
        window.scrollTo({ top: 0, behavior: "smooth" })
      } else {
        const errorData = await response.json()
        const errorMessage = errorData.message || "Ein Fehler ist aufgetreten"
        trackFormSubmissionError(config.id, errorMessage)
        alert(errorMessage + ". Bitte versuchen Sie es erneut.")
      }
    } catch (error) {
      console.error("Submit error:", error)
      trackFormSubmissionError(config.id, error instanceof Error ? error.message : "Unknown error")
      alert("Ein Fehler ist aufgetreten. Bitte versuchen Sie es erneut.")
    } finally {
      setIsSubmitting(false)
    }
  }

  // Signature canvas handlers - scale coordinates to match canvas resolution
  const getCanvasCoordinates = (e: React.MouseEvent<HTMLCanvasElement> | React.TouchEvent<HTMLCanvasElement>) => {
    const canvas = signatureRef.current
    if (!canvas) return { x: 0, y: 0 }
    
    const rect = canvas.getBoundingClientRect()
    const clientX = "touches" in e ? e.touches[0].clientX : e.clientX
    const clientY = "touches" in e ? e.touches[0].clientY : e.clientY
    
    // Scale coordinates to match canvas internal resolution
    const scaleX = canvas.width / rect.width
    const scaleY = canvas.height / rect.height
    
    const x = (clientX - rect.left) * scaleX
    const y = (clientY - rect.top) * scaleY
    
    return { x, y }
  }

  const startDrawing = (e: React.MouseEvent<HTMLCanvasElement> | React.TouchEvent<HTMLCanvasElement>) => {
    setIsDrawing(true)
    const canvas = signatureRef.current
    if (!canvas) return
    const ctx = canvas.getContext("2d")
    if (!ctx) return

    const { x, y } = getCanvasCoordinates(e)
    ctx.beginPath()
    ctx.moveTo(x, y)
  }

  const draw = (e: React.MouseEvent<HTMLCanvasElement> | React.TouchEvent<HTMLCanvasElement>) => {
    if (!isDrawing) return
    const canvas = signatureRef.current
    if (!canvas) return
    const ctx = canvas.getContext("2d")
    if (!ctx) return

    const { x, y } = getCanvasCoordinates(e)
    ctx.lineWidth = 2
    ctx.lineCap = "round"
    ctx.lineJoin = "round"
    ctx.strokeStyle = "#1a1a1a"
    ctx.lineTo(x, y)
    ctx.stroke()
  }

  const stopDrawing = (questionId: string) => {
    setIsDrawing(false)
    const canvas = signatureRef.current
    if (canvas) {
      const dataUrl = canvas.toDataURL()
      updateFormData(questionId, dataUrl)
    }
  }

  const clearSignature = (questionId: string) => {
    const canvas = signatureRef.current
    if (canvas) {
      const ctx = canvas.getContext("2d")
      if (ctx) {
        ctx.clearRect(0, 0, canvas.width, canvas.height)
        updateFormData(questionId, "")
      }
    }
  }

  const renderQuestion = (question: QuestionConfig) => {
    switch (question.type) {
      case "radio":
        return (
          <div className="space-y-2">
            <Label className="text-sm font-medium">{question.label}{question.required && " *"}</Label>
            {question.description && (
              <p className="text-xs text-muted-foreground">{question.description}</p>
            )}
            <RadioGroup
              value={String(formData[question.id] || "")}
              onValueChange={(value) => updateFormData(question.id, value)}
              className={cn(
                "grid gap-2",
                question.options?.length === 3 && question.options.every(o => o.label.length <= 25)
                  ? "grid-cols-1 sm:grid-cols-3"
                  : question.options?.length === 2
                    ? "grid-cols-1 sm:grid-cols-2"
                    : "grid-cols-1 sm:grid-cols-2"
              )}
            >
              {question.options?.map((option) => (
                <Label
                  key={option.value}
                  htmlFor={`${question.id}-${option.value}`}
                  className={cn(
                    "flex items-center gap-3 p-3 rounded-lg border cursor-pointer transition-all",
                    formData[question.id] === option.value
                      ? "border-primary bg-primary/5 ring-1 ring-primary"
                      : errors[question.id]
                        ? "border-red-300 hover:border-red-400 bg-white"
                        : "border-gray-200 hover:border-gray-300 bg-white"
                  )}
                >
                  <RadioGroupItem value={option.value} id={`${question.id}-${option.value}`} />
                  <span className="text-sm">{option.label}</span>
                </Label>
              ))}
            </RadioGroup>
            {errors[question.id] && <p className="text-xs text-red-500 mt-1">{errors[question.id]}</p>}
          </div>
        )

      case "checkbox-group":
        const selectedValues = (formData[question.id] as string[]) || []
        return (
          <div className="space-y-2">
            <Label className="text-sm font-medium">{question.label}{question.required && " *"}</Label>
            {question.description && (
              <p className="text-xs text-muted-foreground">{question.description}</p>
            )}
            <div className={cn(
                "grid gap-2",
                question.options?.length === 3 && question.options.every(o => o.label.length <= 25)
                  ? "grid-cols-1 sm:grid-cols-3"
                  : question.options?.length === 2
                    ? "grid-cols-1 sm:grid-cols-2"
                    : "grid-cols-1 sm:grid-cols-2"
              )}>
              {question.options?.map((option) => (
                <Label
                  key={option.value}
                  htmlFor={`${question.id}-${option.value}`}
                  className={cn(
                    "flex items-center gap-3 p-3 rounded-lg border cursor-pointer transition-all",
                    selectedValues.includes(option.value)
                      ? "border-primary bg-primary/5 ring-1 ring-primary"
                      : errors[question.id]
                        ? "border-red-300 hover:border-red-400 bg-white"
                        : "border-gray-200 hover:border-gray-300 bg-white"
                  )}
                >
                  <Checkbox
                    id={`${question.id}-${option.value}`}
                    checked={selectedValues.includes(option.value)}
                    onCheckedChange={(checked) => {
                      if (checked) {
                        updateFormData(question.id, [...selectedValues, option.value])
                      } else {
                        updateFormData(question.id, selectedValues.filter((v) => v !== option.value))
                      }
                    }}
                  />
                  <span className="text-sm">{option.label}</span>
                </Label>
              ))}
            </div>
            {errors[question.id] && <p className="text-xs text-red-500 mt-1">{errors[question.id]}</p>}
          </div>
        )

      case "checkbox":
        return (
          <div className="space-y-2">
            <Label
              htmlFor={question.id}
              className="flex items-center gap-3 p-3 rounded-lg border cursor-pointer transition-all bg-white"
            >
              <Checkbox
                id={question.id}
                checked={Boolean(formData[question.id])}
                onCheckedChange={(checked) => updateFormData(question.id, Boolean(checked))}
              />
              <span className="text-sm">{question.label}</span>
            </Label>
          </div>
        )

      case "custom-radio":
        return (
          <div className="space-y-2">
            <Label className="text-sm font-medium">{question.label}{question.required && " *"}</Label>
            {question.description && (
              <p className="text-xs text-muted-foreground">{question.description}</p>
            )}
            <RadioGroup
              value={String(formData[question.id] || "")}
              onValueChange={(value) => updateFormData(question.id, value)}
              className="space-y-2"
            >
              {question.options?.map((option) => (
                <Label
                  key={option.value}
                  htmlFor={`${question.id}-${option.value}`}
                  className={cn(
                    "flex flex-col p-4 rounded-lg border cursor-pointer transition-all",
                    formData[question.id] === option.value
                      ? "border-primary bg-primary/5 ring-1 ring-primary"
                      : "border-gray-200 hover:border-gray-300 bg-white"
                  )}
                >
                  <div className="flex items-center gap-3">
                    <RadioGroupItem value={option.value} id={`${question.id}-${option.value}`} />
                    <span className="font-medium text-sm">{option.label}</span>
                  </div>
                  {option.description && (
                    <p className="text-xs text-muted-foreground mt-2 ml-7 whitespace-pre-line">{option.description}</p>
                  )}
                </Label>
              ))}
            </RadioGroup>
            {errors[question.id] && <p className="text-xs text-red-500">{errors[question.id]}</p>}
          </div>
        )

      case "text":
      case "email":
      case "tel":
        return (
          <div className="space-y-1">
            <Label htmlFor={question.id} className="text-sm font-medium">
              {question.label}{question.required && " *"}
            </Label>
            <Input
              id={question.id}
              type={question.type}
              placeholder={question.placeholder}
              value={String(formData[question.id] || "")}
              onChange={(e) => updateFormData(question.id, e.target.value)}
              className={cn(errors[question.id] && "border-red-500")}
            />
            {errors[question.id] && <p className="text-xs text-red-500">{errors[question.id]}</p>}
          </div>
        )

      case "date":
        const handleDateInput = (e: React.ChangeEvent<HTMLInputElement>) => {
          let value = e.target.value.replace(/[^0-9]/g, "") // Remove non-digits
          
          // Auto-add dots after day and month
          if (value.length > 2) {
            value = value.slice(0, 2) + "." + value.slice(2)
          }
          if (value.length > 5) {
            value = value.slice(0, 5) + "." + value.slice(5)
          }
          // Limit to 10 characters (tt.mm.jjjj)
          value = value.slice(0, 10)
          
          updateFormData(question.id, value)
        }
        return (
          <div className="space-y-1">
            <Label htmlFor={question.id} className="text-sm font-medium">
              {question.label}{question.required && " *"}
            </Label>
            <div className="relative">
              <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground pointer-events-none" />
              <Input
                id={question.id}
                type="text"
                inputMode="numeric"
                placeholder="tt.mm.jjjj"
                value={String(formData[question.id] || "")}
                onChange={handleDateInput}
                className={cn(
                  "pl-10",
                  errors[question.id] && "border-red-500"
                )}
              />
            </div>
            {errors[question.id] && <p className="text-xs text-red-500">{errors[question.id]}</p>}
          </div>
        )

      case "range":
        const rangeValue = Number(formData[question.id]) || question.default || question.min || 0
        return (
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <Label className="text-sm font-medium">{question.label}{question.required && " *"}</Label>
              <span className="text-lg font-semibold text-primary">
                {rangeValue.toLocaleString("de-DE")}{question.suffix}
              </span>
            </div>
            <Slider
              value={[rangeValue]}
              onValueChange={(values) => updateFormData(question.id, Array.isArray(values) ? values[0] : values)}
              min={question.min}
              max={question.max}
              step={question.step}
              className="w-full"
            />
            <div className="flex justify-between text-xs text-muted-foreground">
              <span>{question.min?.toLocaleString("de-DE")}{question.suffix}</span>
              <span>{question.max?.toLocaleString("de-DE")}{question.suffix}</span>
            </div>
            {errors[question.id] && <p className="text-xs text-red-500">{errors[question.id]}</p>}
          </div>
        )

      case "combobox":
        const comboboxValue = String(formData[question.id] || "")
        const filteredOptions = question.options?.filter(option => 
          option.label.toLowerCase().includes(comboboxSearch.toLowerCase()) ||
          option.value.toLowerCase().includes(comboboxSearch.toLowerCase())
        ) || []
        const hasNoResults = comboboxSearch.length > 0 && filteredOptions.length === 0
        
        return (
          <div className="space-y-1">
            <Label className="text-sm font-medium">{question.label}{question.required && " *"}</Label>
            <Popover 
              open={openCombobox === question.id} 
              onOpenChange={(open) => {
                setOpenCombobox(open ? question.id : null)
                if (!open) setComboboxSearch("")
              }}
            >
              <PopoverTrigger>
                <button
                  type="button"
                  role="combobox"
                  className={cn(
                    "flex h-10 w-full items-center justify-between rounded-md border border-gray-300 bg-white px-3 py-2 text-sm font-normal shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2",
                    !comboboxValue && "text-muted-foreground",
                    errors[question.id] && "border-red-500"
                  )}
                >
                  {comboboxValue || question.placeholder || "Bitte wählen..."}
                  <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                </button>
              </PopoverTrigger>
              <PopoverContent className="w-full p-0" align="start">
                <Command shouldFilter={false}>
                  <CommandInput 
                    placeholder={question.searchPlaceholder || "Suchen..."} 
                    value={comboboxSearch}
                    onValueChange={setComboboxSearch}
                  />
                  <CommandList>
                    {hasNoResults ? (
                      <CommandGroup>
                        <CommandItem
                          value={comboboxSearch}
                          onSelect={() => {
                            updateFormData(question.id, comboboxSearch)
                            setOpenCombobox(null)
                            setComboboxSearch("")
                          }}
                          className="cursor-pointer"
                        >
                          <Check className="mr-2 h-4 w-4 opacity-0" />
                          <span>&quot;{comboboxSearch}&quot; verwenden</span>
                        </CommandItem>
                      </CommandGroup>
                    ) : (
                      <CommandGroup>
                        {filteredOptions.map((option) => (
                          <CommandItem
                            key={option.value}
                            value={option.value}
                            onSelect={() => {
                              updateFormData(question.id, option.value)
                              setOpenCombobox(null)
                              setComboboxSearch("")
                            }}
                          >
                            <Check
                              className={cn(
                                "mr-2 h-4 w-4",
                                comboboxValue === option.value ? "opacity-100" : "opacity-0"
                              )}
                            />
                            {option.label}
                          </CommandItem>
                        ))}
                      </CommandGroup>
                    )}
                  </CommandList>
                </Command>
              </PopoverContent>
            </Popover>
            {errors[question.id] && <p className="text-xs text-red-500">{errors[question.id]}</p>}
          </div>
        )

      case "long-text-field":
      case "textarea":
        return (
          <div className="space-y-1">
            <Label htmlFor={question.id} className="text-sm font-medium">
              {question.label}{question.required && " *"}
            </Label>
            <Textarea
              id={question.id}
              placeholder={question.placeholder}
              value={String(formData[question.id] || "")}
              onChange={(e) => updateFormData(question.id, e.target.value)}
              className={cn("min-h-[80px]", errors[question.id] && "border-red-500")}
            />
            {errors[question.id] && <p className="text-xs text-red-500">{errors[question.id]}</p>}
          </div>
        )

      case "signature":
        return (
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <Label className="text-sm font-medium">{question.label}{question.required && " *"}</Label>
              <Button
                type="button"
                variant="ghost"
                size="sm"
                onClick={() => clearSignature(question.id)}
                className="text-xs"
              >
                <X className="w-3 h-3 mr-1" />
                Löschen
              </Button>
            </div>
            <div className={cn(
              "border rounded-lg bg-white",
              errors[question.id] && "border-red-500"
            )}>
              <canvas
                ref={signatureRef}
                width={400}
                height={150}
                className="w-full cursor-crosshair touch-none"
                onMouseDown={startDrawing}
                onMouseMove={draw}
                onMouseUp={() => stopDrawing(question.id)}
                onMouseLeave={() => stopDrawing(question.id)}
                onTouchStart={startDrawing}
                onTouchMove={draw}
                onTouchEnd={() => stopDrawing(question.id)}
              />
            </div>
            <p className="text-xs text-muted-foreground">Bitte unterschreiben Sie mit der Maus oder dem Finger</p>
            {errors[question.id] && <p className="text-xs text-red-500">{errors[question.id]}</p>}
          </div>
        )

      case "product_selection":
        const selectedProduct = String(formData[question.id] || "")
        return (
          <div className="space-y-3">
            {question.products?.map((product) => (
              <ProductSelectionCard
                key={product.value}
                product={product}
                isSelected={selectedProduct === product.value}
                onSelect={() => updateFormData(question.id, product.value)}
              />
            ))}
            {errors[question.id] && <p className="text-xs text-red-500 mt-2">{errors[question.id]}</p>}
          </div>
        )

      case "consent":
        return (
          <div className="space-y-2">
            <Label
              htmlFor={question.id}
              className={cn(
                "flex items-start gap-3 p-4 rounded-lg border cursor-pointer transition-all bg-white",
                errors[question.id] ? "border-red-300" : "border-gray-200 hover:border-gray-300"
              )}
            >
              <Checkbox
                id={question.id}
                checked={Boolean(formData[question.id])}
                onCheckedChange={(checked) => updateFormData(question.id, Boolean(checked))}
                className="mt-0.5"
              />
              <span className="text-sm leading-relaxed">
                Der Kunde hat den{" "}
                <a href="/agb" target="_blank" className="text-primary hover:underline font-medium">
                  AGB
                </a>
                , der{" "}
                <a href="/datenschutz" target="_blank" className="text-primary hover:underline font-medium">
                  Datenschutzerklärung
                </a>{" "}
                sowie der Datenweitergabe an qualifizierte Anbieter zugestimmt. Ein Widerruf ist jederzeit möglich.
                {question.required && <span className="text-red-500 ml-1">*</span>}
              </span>
            </Label>
            {errors[question.id] && <p className="text-xs text-red-500 mt-1">{errors[question.id]}</p>}
          </div>
        )

      case "summary":
        // Render a summary of all collected data
        // Paired fields (two columns)
        const pairedFields = [
          [{ key: "vorname", label: "Vorname" }, { key: "nachname", label: "Nachname" }],
          [{ key: "email", label: "E-Mail" }, { key: "telefonnummer", label: "Telefonnummer" }],
          [{ key: "strasse", label: "Straße" }, { key: "hausnummer", label: "Hausnummer" }],
          [{ key: "plz", label: "PLZ" }, { key: "ort", label: "Ort" }],
        ]
        return (
          <div className="space-y-4">
            <div className="bg-gray-50 rounded-lg p-4 border border-gray-200">
              <h4 className="font-medium text-sm mb-3 text-gray-700">Ihre Kontaktdaten</h4>
              <div className="space-y-3 text-sm">
                {/* Anrede - full width row */}
                {formData.anrede && (
                  <div className="flex flex-col">
                    <span className="text-xs text-muted-foreground">Anrede</span>
                    <span className="text-gray-900">{String(formData.anrede)}</span>
                  </div>
                )}
                {/* Paired fields in 2-column grid */}
                {pairedFields.map((pair, index) => (
                  <div key={index} className="grid grid-cols-2 gap-x-4">
                    {pair.map((field) => {
                      const value = formData[field.key]
                      // Show email field with "-" if empty, skip other empty fields
                      if (!value && field.key !== "email") return <div key={field.key} />
                      return (
                        <div key={field.key} className="flex flex-col">
                          <span className="text-xs text-muted-foreground">{field.label}</span>
                          <span className="text-gray-900">{value ? String(value) : "-"}</span>
                        </div>
                      )
                    })}
                  </div>
                ))}
              </div>
            </div>
          </div>
        )

      default:
        return null
    }
  }

  // Render contact form step - compact two-column layout for desktop
  const renderContactStep = () => {
    const contactQuestions = currentStepData.questions
    
    // Check if this step has the standard contact form structure
    const hasStandardContactFields = contactQuestions.some(q => q.id === "vorname") && contactQuestions.some(q => q.id === "plz")

    if (!hasStandardContactFields) {
      // Render questions in a two-column grid anyway
      return (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-4 gap-y-2">
          {currentStepData.questions.map((question) => (
            <div key={question.id}>{renderQuestion(question)}</div>
          ))}
        </div>
      )
    }

    // Render compact contact form layout - responsive two-column on desktop
    return (
      <div className="space-y-3">
        {/* Row 1: Anrede - inline horizontal, constrained width on desktop */}
        {contactQuestions.find(q => q.id === "anrede") && (
          <div className="space-y-2 md:max-w-xs">
            <Label className="text-sm font-medium">Anrede</Label>
            <RadioGroup
              value={String(formData["anrede"] || "")}
              onValueChange={(value) => updateFormData("anrede", value)}
              className="flex gap-3"
            >
              {contactQuestions.find(q => q.id === "anrede")?.options?.map((option) => (
                <Label
                  key={option.value}
                  htmlFor={`anrede-inline-${option.value}`}
                  className={cn(
                    "flex items-center gap-2 px-4 py-2.5 rounded-lg border cursor-pointer transition-all flex-1 justify-center",
                    formData["anrede"] === option.value
                      ? "border-primary bg-primary/5 ring-1 ring-primary"
                      : "border-gray-200 hover:border-gray-300 bg-white"
                  )}
                >
                  <RadioGroupItem value={option.value} id={`anrede-inline-${option.value}`} />
                  <span className="text-sm">{option.label}</span>
                </Label>
              ))}
            </RadioGroup>
          </div>
        )}

        {/* Row 2: Vorname + Nachname */}
        <div className="grid grid-cols-2 gap-3">
          {contactQuestions.find(q => q.id === "vorname") && renderQuestion(contactQuestions.find(q => q.id === "vorname")!)}
          {contactQuestions.find(q => q.id === "nachname") && renderQuestion(contactQuestions.find(q => q.id === "nachname")!)}
        </div>

        {/* Row 3: E-Mail + Telefonnummer - stacked on mobile, side by side on desktop */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          {contactQuestions.find(q => q.id === "email") && renderQuestion(contactQuestions.find(q => q.id === "email")!)}
          {contactQuestions.find(q => q.id === "telefonnummer") && renderQuestion(contactQuestions.find(q => q.id === "telefonnummer")!)}
        </div>

        {/* Row 4: Straße + Hausnummer */}
        <div className="grid grid-cols-4 gap-3">
          <div className="col-span-3">
            {contactQuestions.find(q => q.id === "strasse") && renderQuestion(contactQuestions.find(q => q.id === "strasse")!)}
          </div>
          <div className="col-span-1">
            {contactQuestions.find(q => q.id === "hausnummer") && renderQuestion(contactQuestions.find(q => q.id === "hausnummer")!)}
          </div>
        </div>

        {/* Row 5: PLZ + Ort */}
        <div className="grid grid-cols-3 gap-3">
          <div className="col-span-1">
            {contactQuestions.find(q => q.id === "plz") && renderQuestion(contactQuestions.find(q => q.id === "plz")!)}
          </div>
          <div className="col-span-2">
            {contactQuestions.find(q => q.id === "ort") && renderQuestion(contactQuestions.find(q => q.id === "ort")!)}
          </div>
        </div>

        {/* Other questions spanning full width */}
        {contactQuestions.filter(q => 
          !["anrede", "vorname", "nachname", "email", "telefonnummer", "strasse", "hausnummer", "plz", "ort"].includes(q.id)
        ).map(q => (
          <div key={q.id}>{renderQuestion(q)}</div>
        ))}
      </div>
    )
  }

  // Thank you page
  if (isComplete) {
    return (
      <div className="min-h-screen bg-background flex flex-col">
        <header className="border-b border-gray-200 bg-white sticky top-0 z-40">
          <div className="max-w-4xl mx-auto px-4 py-2.5">
            <div className="flex items-center justify-between">
            <Link href={buildUrlWithTracking("/", searchParams)} className="flex items-center gap-2.5">
              <Image
                src={BRAND_ASSETS.logo.main || "/placeholder.svg"}
                alt={BRAND_ASSETS.logo.alt}
                width={130}
                height={40}
                style={{ height: 40, width: "auto" }}
              />
            </Link>
            </div>
          </div>
        </header>

        <main className="flex-1 py-6">
          <div className="max-w-2xl mx-auto px-4">
            <Card className="shadow-sm border-gray-200/80 text-center">
              <CardContent className="p-6 py-10 md:px-16 lg:px-24">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Check className="w-8 h-8 text-green-600" />
              </div>
              <h2 className="text-xl font-semibold mb-2">
                {config.successMessage?.title || "Vielen Dank für Ihre Anfrage!"}
              </h2>
              <p className="text-muted-foreground text-sm mb-6">
                {config.successMessage?.description ||
                  "Wir haben Ihre Anfrage erhalten und werden uns in Kürze bei Ihnen melden."}
              </p>
              
              {/* PDF Download for Pflegebox */}
              {config.id === "pflegebox" && (
                <Button
                  onClick={async () => {
                    try {
                      // Dynamically load PDF generator
                      const { generatePflegeboxPdf, downloadPdf } = await loadPdfGenerator()
                      const pdfBytes = await generatePflegeboxPdf({
                        pflegebox_typ: String(formData.pflegebox_typ || ""),
                        anrede: String(formData.anrede || ""),
                        vorname: String(formData.vorname || ""),
                        nachname: String(formData.nachname || ""),
                        strasse: String(formData.strasse || ""),
                        hausnummer: String(formData.hausnummer || ""),
                        plz: String(formData.plz || ""),
                        ort: String(formData.ort || ""),
                        telefonnummer: String(formData.telefonnummer || ""),
                        email: String(formData.email || ""),
                        geburtsdatum: String(formData.geburtsdatum || ""),
                        krankenkasse: String(formData.krankenkasse || ""),
                        versichertennummer: String(formData.versichertennummer || ""),
                        unterschrift: String(formData.unterschrift || ""),
                      })
                      const boxName = formData.pflegebox_typ === "hygiene-basis" 
                        ? "Hygiene_Basis" 
                        : formData.pflegebox_typ === "bettschutz-plus"
                        ? "Bettschutz_Plus"
                        : "Desinfektion_Komplett"
                      const userName = `${formData.vorname || ""}_${formData.nachname || ""}`.trim().replace(/\s+/g, "_")
                      downloadPdf(pdfBytes, `Pflegebox_${boxName}_${userName}.pdf`)
                    } catch (error) {
                      console.error("Error generating PDF:", error)
                    }
                  }}
                  variant="outline"
                  className="w-full mb-3 gap-2"
                >
                  <Download className="w-4 h-4" />
                  Antragsformular herunterladen
                </Button>
              )}
              
              <Button onClick={() => router.push(buildUrlWithTracking("/", searchParams))} className="w-full">
                Zurück zur Startseite
              </Button>
              </CardContent>
            </Card>
          </div>
        </main>
      </div>
    )
  }

  const isContactStep = currentStepData.id === "contact" || currentStepData.id === "contact-details" || currentStepData.id === "data-entry"
  const isLastStep = currentStep === totalSteps - 1
  const isSummaryStep = currentStepData.id === "summary"

  // Render summary of all collected data
  const renderSummary = () => {
    // Collect data labels from all previous steps
    const summaryItems: { label: string; value: string }[] = []

    config.steps.forEach((step) => {
      if (step.id === "summary") return // Skip summary step itself

      step.questions.forEach((question) => {
        const value = formData[question.id]
        if (!value || value === "" || (Array.isArray(value) && value.length === 0)) return

        // Skip hausnummer - it will be combined with strasse
        if (question.id === "hausnummer") return

        let displayValue = ""

        if (question.type === "product_selection") {
          const selectedProduct = question.products?.find(p => p.value === value)
          displayValue = selectedProduct?.productName || String(value)
        } else if (question.type === "checkbox-group" && Array.isArray(value)) {
          displayValue = value.join(", ")
        } else if (question.type === "checkbox") {
          displayValue = value ? "Ja" : "Nein"
        } else if (question.type === "radio" || question.type === "custom-radio") {
          const option = question.options?.find(o => o.value === value)
          displayValue = option?.label || String(value)
        } else if (question.type === "date" && typeof value === "string") {
          // Format date to German format
          const date = new Date(value)
          displayValue = date.toLocaleDateString("de-DE")
        } else if (question.type === "signature") {
          return // Skip signature in summary
        } else {
          displayValue = String(value)
        }

        // Combine strasse and hausnummer into one address field
        if (question.id === "strasse") {
          const hausnummer = formData["hausnummer"]
          if (hausnummer) {
            displayValue = `${displayValue} ${hausnummer}`
          }
          summaryItems.push({
            label: "Adresse",
            value: displayValue,
          })
          return
        }

        summaryItems.push({
          label: question.label.replace(" *", ""),
          value: displayValue,
        })
      })
    })

    // Reorder: put Anrede first, then Pflegebox, then rest
    const orderedItems = [...summaryItems].sort((a, b) => {
      const priority: Record<string, number> = {
        "Anrede": 0,
        "Pflegebox": 1,
      }
      const aPriority = priority[a.label] ?? 99
      const bPriority = priority[b.label] ?? 99
      return aPriority - bPriority
    })

    return (
      <div className="mb-5 p-3 bg-gray-50 rounded-lg border border-gray-200">
        <h3 className="text-xs font-semibold text-muted-foreground uppercase tracking-wide mb-2">Ihre Angaben</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-4 gap-y-1">
          {orderedItems.map((item, index) => (
            <div key={index} className="flex justify-between gap-2 text-sm py-1 border-b border-gray-100 last:border-0 sm:[&:nth-last-child(2)]:border-0">
              <span className="text-muted-foreground text-xs">{item.label}</span>
              <span className="font-medium text-foreground text-xs text-right">{item.value}</span>
            </div>
          ))}
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-background flex flex-col">
      {/* Header */}
      <header className="border-b border-gray-200 bg-white sticky top-0 z-40">
        <div className="max-w-4xl mx-auto px-4 py-2.5">
          <div className="flex items-center justify-between">
            <Link href={buildUrlWithTracking("/", searchParams)} className="flex items-center gap-2.5">
              <Image
                src={BRAND_ASSETS.logo.main || "/placeholder.svg"}
                alt={BRAND_ASSETS.logo.alt}
                width={130}
                height={40}
                style={{ height: 40, width: "auto" }}
              />
            </Link>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 py-6">
        <div className="max-w-2xl mx-auto px-4">
          <Card className="shadow-sm border-gray-200/80">
            {/* Progress Bar */}
            <div className="px-6 py-4 border-b border-gray-200">
              <div className="flex items-center justify-between text-xs text-muted-foreground mb-1">
                <span>
                  Schritt {currentStep + 1} von {totalSteps}
                </span>
                <span>{Math.round(progress)}%</span>
              </div>
              <Progress value={progress} className="h-1.5" />
            </div>

            <CardContent className="p-6">
              {/* Step Title */}
              <div className="mb-6">
                <h1 className="text-xl font-semibold text-foreground">{currentStepData.title}</h1>
                {currentStepData.description && (
                  <p className="text-sm text-muted-foreground mt-1">{currentStepData.description}</p>
                )}
              </div>
              <div className="space-y-5">
                {isSummaryStep && renderSummary()}
                {isContactStep ? renderContactStep() : isSummaryStep ? (
                  <>
                    {/* Render non-checkbox questions normally */}
                    {currentStepData.questions
                      .filter(q => q.type !== "checkbox")
                      .map((question) => (
                        <div key={question.id}>{renderQuestion(question)}</div>
                      ))}
                    {/* Group all checkboxes in one bordered container */}
                    {currentStepData.questions.some(q => q.type === "checkbox") && (
                      <div className="p-4 rounded-lg border bg-white space-y-3">
                        {currentStepData.questions
                          .filter(q => q.type === "checkbox")
                          .map((question) => (
                            <Label
                              key={question.id}
                              htmlFor={question.id}
                              className="flex items-start gap-3 cursor-pointer"
                            >
                              <Checkbox
                                id={question.id}
                                checked={Boolean(formData[question.id])}
                                onCheckedChange={(checked) => updateFormData(question.id, Boolean(checked))}
                                className="mt-0.5"
                              />
                              <span className="text-sm leading-relaxed">{question.label}</span>
                            </Label>
                          ))}
                      </div>
                    )}
                  </>
                ) : (
                  currentStepData.questions.map((question) => (
                    <div key={question.id}>{renderQuestion(question)}</div>
                  ))
                )}
              </div>

              {/* Navigation */}
              <div className="flex items-center justify-between mt-8 pt-5 border-t border-gray-100">
                <Button variant="outline" onClick={handleBack} className="gap-2">
                  <ArrowLeft className="w-4 h-4" />
                  Zurück
                </Button>

                {isLastStep ? (
                  <Button onClick={handleSubmit} disabled={isSubmitting} className="gap-2">
                    {isSubmitting ? (
                      <>
                        <Loader2 className="w-4 h-4 animate-spin" />
                        Wird gesendet...
                      </>
                    ) : (
                      <>
                        Absenden
                        <Check className="w-4 h-4" />
                      </>
                    )}
                  </Button>
                ) : (
                  <Button onClick={handleNext} className="gap-2">
                    Weiter
                    <ArrowRight className="w-4 h-4" />
                  </Button>
                )}
              </div>
            </CardContent>
          </Card>
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-white border-t border-gray-200 py-2.5">
        <div className="max-w-4xl mx-auto px-4">
          <div className="flex flex-wrap items-center justify-center gap-4 text-xs text-muted-foreground">
            <Link href="/impressum" className="hover:text-foreground transition-colors">
              Impressum
            </Link>
            <Link href="/datenschutz" className="hover:text-foreground transition-colors">
              Datenschutz
            </Link>
            <Link href="/agb" className="hover:text-foreground transition-colors">
              AGB
            </Link>
          </div>
        </div>
      </footer>
    </div>
  )
}
