import type { Size, Width } from "@/types";
export interface BasicInputProps {
  inputWidth?: Width;
  inputSize?: Size;
  variant?: "default" | "outlined" | "unstyled";
  disabled?: boolean;
}

export const getInputClasses = ({
  inputSize = "md",
  inputWidth = "auto",
  variant = "default",
  disabled = false,
}: BasicInputProps) => {
  const defaultClass = "rounded-sm";

  const sizeMap: Record<Size, string> = {
    sm: "text-sm px-2 py-1",
    md: "text-base px-3 py-2",
    lg: "text-lg px-4 py-3",
    xl: "text-xl px-5 py-4",
  };

  const widthMap: Record<Width, string> = {
    auto: "w-auto",
    full: "w-full",
  };

  const variantClasses = {
    default: "border border-gray-400 bg-white",
    outlined: "border-2 border-blue-500 bg-white",
    unstyled: "border-none bg-transparent p-0",
  };

  const sizeClass = sizeMap[inputSize];
  const variantClass = variantClasses[variant];
  const widthClass = widthMap[inputWidth];
  const disabledClass = disabled ? "opacity-50 cursor-not-allowed" : "";

  return [
    defaultClass,
    sizeClass,
    variantClass,
    widthClass,
    disabledClass,
  ].join(" ");
};
