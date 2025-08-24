import type { Color, Size, Shape } from "@/types";
export interface BaseBadgeProps {
  color?: Color;
  size?: Size;
  shape?: Shape;
  icon?: React.ReactNode;
  iconOnly?: boolean;
}

export function getBadgeClasses({
  color = "primary",
  size = "sm",
  shape = "pill",
  icon = null,
  iconOnly = false,
}: BaseBadgeProps) {
  const baseClasses = "font-medium me-2 px-2.5 py-0.5";

  const colorMap: Record<Color, string> = {
    red: "bg-red-100 text-red-800  dark:bg-red-900 dark:text-red-300",
    orange:
      "bg-orange-100 text-orange-800 dark:bg-orange-900 dark:text-orange-300",
    yellow:
      "bg-yellow-100 text-yellow-800  dark:bg-yellow-900 dark:text-yellow-300",
    amber: "bg-amber-100 text-amber-800  dark:bg-amber-900 dark:text-amber-300",
    green: "bg-green-100 text-green-800  dark:bg-green-900 dark:text-green-300",
    blue: "bg-blue-100 text-blue-800  dark:bg-blue-900 dark:text-blue-300",
    purple:
      "bg-purple-100 text-purple-800  dark:bg-purple-900 dark:text-purple-300",
    primary: "bg-brand-100 text-white dark:bg-brand-900 dark:text-white",
    secondary: "bg-gray-100 text-gray-800  dark:bg-gray-700 dark:text-gray-300",
  };

  const sizeMap: Record<Size, string> = {
    sm: "text-sm",
    md: "text-md",
    lg: "text-lg",
    xl: "text-xl",
  };

  const shapeClasses = shape === "pill" ? "rounded-full" : "rounded-sm";

  const classes = [
    baseClasses,
    colorMap[color],
    sizeMap[size],
    shapeClasses,
    icon ?? "inline-flex items-center",
    iconOnly ?? "justify-center",
  ];

  return classes.filter(Boolean).join(" ");
}
