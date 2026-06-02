// QuestionnaireConfig types for all product questionnaires

export interface QuestionOption {
  value: string
  label: string
  description?: string
}

export interface ProductOption {
  value: string
  brandLogo?: string
  brandName: string
  productImage?: string
  productName: string
  description: string
  features: string[]
  price: string
  priceUnit?: string
  priceNote: string
}

export interface QuestionConfig {
  id: string
  type:
    | "radio"
    | "checkbox"
    | "checkbox-group"
    | "text"
    | "email"
    | "tel"
    | "date"
    | "range"
    | "combobox"
    | "long-text-field"
    | "custom-radio"
    | "signature"
    | "product_selection"
    | "consent"
    | "summary"
  label: string
  description?: string
  placeholder?: string
  searchPlaceholder?: string
  emptyMessage?: string
  required?: boolean
  options?: QuestionOption[]
  products?: ProductOption[]
  min?: number
  max?: number
  step?: number
  default?: number
  suffix?: string
  allowCustomValue?: boolean
}

export interface StepValidation {
  requiredFields: string[]
}

export interface QuestionnaireStep {
  id: string
  title: string
  description: string
  questions: QuestionConfig[]
  validation?: StepValidation
}

export interface SuccessMessage {
  title: string
  description: string
}

export interface QuestionnaireConfig {
  id: string
  title: string
  description: string
  steps: QuestionnaireStep[]
  successMessage: SuccessMessage
}

export interface FormData {
  [key: string]: string | string[] | boolean | number | undefined
}
