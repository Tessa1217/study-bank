import type { Color, Size, Width } from "@/types";

export type Variant = "solid" | "outline" | "ghost";

export interface BaseButtonProps {
  color?: Color;
  size?: Size;
  width?: Width;
  variant?: Variant;
  disabled?: boolean;
  iconOnly?: boolean;
}

export function getButtonClasses({
  color = "blue",
  size = "md",
  width = "auto",
  variant = "solid",
  disabled = false,
  iconOnly = false,
}: BaseButtonProps) {
  const baseClasses = "font-medium rounded transition-colors cursor-pointer";

  const colorMap: Record<Color, { [key in Variant]: string }> = {
    red: {
      solid: "bg-red-500 text-white hover:bg-red-600",
      outline: "border border-red-500 text-red-500 hover:bg-red-50",
      ghost: "text-red-500 hover:bg-red-50",
    },
    orange: {
      solid: "bg-orange-500 text-white hover:bg-orange-600",
      outline: "border border-orange-500 text-orange-500 hover:bg-orange-50",
      ghost: "text-orange-500 hover:bg-orange-50",
    },
    yellow: {
      solid: "bg-yellow-400 text-black hover:bg-yellow-500",
      outline: "border border-yellow-400 text-yellow-600 hover:bg-yellow-50",
      ghost: "text-yellow-600 hover:bg-yellow-50",
    },
    amber: {
      solid: "bg-amber-500 text-white hover:bg-amber-600",
      outline: "border border-amber-500 text-amber-500 hover:bg-amber-50",
      ghost: "text-amber-500 hover:bg-amber-50",
    },
    green: {
      solid: "bg-green-500 text-white hover:bg-green-600",
      outline: "border border-green-500 text-green-500 hover:bg-green-50",
      ghost: "text-green-500 hover:bg-green-50",
    },
    blue: {
      solid: "bg-blue-500 text-white hover:bg-blue-600",
      outline: "border border-blue-500 text-blue-500 hover:bg-blue-50",
      ghost: "text-blue-500 hover:bg-blue-50",
    },
    purple: {
      solid: "bg-purple-500 text-white hover:bg-purple-600",
      outline: "border border-purple-500 text-purple-500 hover:bg-purple-50",
      ghost: "text-purple-500 hover:bg-purple-50",
    },
    gray: {
      solid: "bg-gray-500 text-white hover:bg-gray-600",
      outline: "border border-gray-400 text-gray-700 hover:bg-gray-50",
      ghost: "text-gray-700 hover:bg-gray-100",
    },
  };

  const sizeMap: Record<Size, string> = {
    sm: "px-3 py-1.5 text-sm",
    md: "px-4 py-2 text-base",
    lg: "px-6 py-3 text-lg",
    xl: "px-8 py-4 text-xl",
  };

  const iconOnlyPadding: Record<Size, string> = {
    sm: "p-2",
    md: "p-2.5",
    lg: "p-3",
    xl: "p-4",
  };

  const widthMap: Record<Width, string> = {
    auto: "w-auto",
    full: "w-full",
  };

  const disabledClasses = "opacity-50 cursor-not-allowed pointer-events-none";

  const classes = [
    baseClasses,
    colorMap[color][variant],
    iconOnly ? iconOnlyPadding[size] : sizeMap[size],
    disabled && disabledClasses,
    widthMap[width],
  ];

  return classes.filter(Boolean).join(" ");
}
