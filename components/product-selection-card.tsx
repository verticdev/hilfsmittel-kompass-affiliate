"use client"

import Image from "next/image"
import { Check } from "lucide-react"
import { cn } from "@/lib/utils"
import type { ProductOption } from "@/lib/questionnaire/types"

interface ProductSelectionCardProps {
  product: ProductOption
  isSelected: boolean
  onSelect: () => void
}

export function ProductSelectionCard({ product, isSelected, onSelect }: ProductSelectionCardProps) {
  return (
    <button
      type="button"
      onClick={onSelect}
      className={cn(
        "w-full text-left rounded-xl border-2 bg-white transition-all",
        isSelected
          ? "border-primary ring-2 ring-primary/20"
          : "border-gray-200 hover:border-gray-300"
      )}
    >
      <div className="p-4 sm:p-5">
        {/* Selection indicator - absolute positioned on mobile */}
        <div className="flex justify-between items-start mb-4 sm:hidden">
          <div className="flex items-center gap-3">
            {product.brandLogo && (
              <Image
                src={product.brandLogo}
                alt={product.brandName}
                width={100}
                height={28}
                className="h-6 w-auto object-contain"
              />
            )}
          </div>
          <div
            className={cn(
              "flex-shrink-0 w-6 h-6 rounded-full border-2 flex items-center justify-center transition-colors",
              isSelected
                ? "bg-primary border-primary"
                : "border-gray-300 bg-white"
            )}
          >
            {isSelected && <Check className="w-3.5 h-3.5 text-white" />}
          </div>
        </div>

        {/* Mobile layout: stacked vertically */}
        <div className="flex flex-col sm:flex-row sm:gap-5">
          {/* Product image - centered on mobile, left side on desktop */}
          <div className="flex-shrink-0 sm:w-28 flex flex-col items-center gap-3 mb-4 sm:mb-0">
            {product.brandLogo && (
              <Image
                src={product.brandLogo}
                alt={product.brandName}
                width={100}
                height={28}
                className="h-7 w-auto object-contain hidden sm:block"
              />
            )}
            {product.productImage && (
              <Image
                src={product.productImage}
                alt={product.productName}
                width={100}
                height={100}
                className="w-20 h-20 sm:w-24 sm:h-24 object-contain"
              />
            )}
          </div>

          {/* Product details */}
          <div className="flex-1 min-w-0">
            <div className="flex items-start justify-between gap-3">
              <div>
                <h3 className="font-semibold text-base text-foreground">{product.productName}</h3>
                <p className="text-sm text-muted-foreground mt-1">{product.description}</p>
              </div>
              {/* Selection indicator - only visible on desktop */}
              <div
                className={cn(
                  "flex-shrink-0 w-6 h-6 rounded-full border-2 items-center justify-center transition-colors hidden sm:flex",
                  isSelected
                    ? "bg-primary border-primary"
                    : "border-gray-300 bg-white"
                )}
              >
                {isSelected && <Check className="w-3.5 h-3.5 text-white" />}
              </div>
            </div>

            {/* Features list */}
            <ul className="mt-3 sm:mt-4 space-y-1.5 sm:space-y-2">
              {product.features.map((feature, index) => (
                <li key={index} className="flex items-start gap-2 text-sm text-foreground">
                  <Check className="w-4 h-4 text-primary flex-shrink-0 mt-0.5" />
                  <span>{feature}</span>
                </li>
              ))}
            </ul>

            {/* Price section - only show if price is provided */}
            {product.price && (
              <div className="mt-3 sm:mt-4 pt-3 sm:pt-4 border-t border-gray-100">
                <div className="flex items-baseline gap-1">
                  <span className="text-xl sm:text-2xl font-bold text-foreground">{product.price}</span>
                  {product.priceUnit && (
                    <span className="text-sm text-muted-foreground">{product.priceUnit}</span>
                  )}
                </div>
                {product.priceNote && (
                  <p className="text-sm text-primary font-medium mt-0.5">{product.priceNote}</p>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </button>
  )
}
