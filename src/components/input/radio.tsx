import { forwardRef } from "react";
import type React from "react";
import {
  type BasicRadioProps,
  getRadioClasses,
} from "@/components/input/radio-styles";

export interface RadioProps
  extends Omit<React.InputHTMLAttributes<HTMLInputElement>, "size">,
    BasicRadioProps {
  name: string;
  value: string;
  label?: React.ReactNode;
  labelClassName?: string;
}

export const Radio = forwardRef<HTMLInputElement, RadioProps>(
  (
    {
      radioSize,
      radioWidth,
      variant,
      disabled,
      className,
      label,
      labelClassName,
      ...props
    },
    ref
  ) => {
    const radioClass = getRadioClasses({
      radioSize,
      radioWidth,
      variant,
      disabled,
    });

    const style: React.CSSProperties = {
      accentColor: "var(--color-primary)",
    };

    const inputEl = (
      <input
        {...props}
        ref={ref}
        type="radio"
        disabled={disabled}
        className={[radioClass, className].filter(Boolean).join(" ")}
        style={style}
      />
    );

    if (!label) return inputEl;

    return (
      <label className="inline-flex items-center gap-2 cursor-pointer select-none">
        {inputEl}
        <span className={labelClassName}>{label}</span>
      </label>
    );
  }
);

Radio.displayName = "Radio";
