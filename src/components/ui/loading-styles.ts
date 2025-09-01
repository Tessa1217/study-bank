import type { Color, Size } from "@/types";

export interface LoadingSpinnerProps {
  color?: Color;
  size?: Size;
}

export function getLoadingSpinnerClasses({
  color = "primary",
  size = "md",
}: LoadingSpinnerProps) {
  const baseClasses = "animate-spin rounded-full border-solid";

  const colorMap: Record<Color, string> = {
    red: "border-red-500",
    orange: "border-orange-500",
    yellow: "border-yellow-400",
    amber: "border-amber-500",
    green: "border-green-500",
    blue: "border-blue-500",
    purple: "border-purple-500",
    secondary: "border-gray-500",
    primary: "border-brand-600",
  };

  const sizeMap: Record<Size, string> = {
    sm: "h-5 w-5 border-2",
    md: "h-8 w-8 border-4",
    lg: "h-12 w-12 border-4",
    xl: "h-16 w-16 border-4",
  };

  const transparentBorder = "border-t-transparent";

  const classes = [
    baseClasses,
    colorMap[color],
    sizeMap[size],
    transparentBorder,
  ];

  return classes.filter(Boolean).join(" ");
}
