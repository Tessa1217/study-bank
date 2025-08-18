import type { Size, Width } from '@/types'

export type RadioVariant = "default" | "soft"

export interface BasicRadioProps {
  radioSize?: Size;
  radioWidth?: Width;
  variant: RadioVariant;
  disabled?: boolean;
}

export function getRadioClasses({
  radioSize = 'md',
  radioWidth = 'auto',
  variant = 'default',
  disabled = false
}:BasicRadioProps) {
  const base = "radio"

  const sizeMap : Record<Size, string> = {
    sm: "h-4 w-4",
    md: "h-5 w-5",
    lg: "h-6 w-6",
    xl: 'h-8 w-8'
  }

  const variantMap: Record<RadioVariant, string> = {
    default:
      "border-slate-300 checked:border-transparent " +
      "checked:bg-[--color-primary] " +
      "bg-white",
    soft:
      "border-slate-200 bg-slate-50 checked:border-transparent " +
      "checked:bg-[--color-primary]",
  }

  const widthMap: Record<Width, string> = {
    auto: "w-auto",
    full: "w-full"
  }

  const disabledClass = 'disabled:opacity-50 disabled:cursor-not-allowed'

  return [
    base,
    sizeMap[radioSize],
    variantMap[variant],
    widthMap[radioWidth],
    disabled && disabledClass
  ].filter(Boolean).join(" ")
}