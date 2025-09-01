import { forwardRef } from "react";
import {
  type BasicInputProps,
  getInputClasses,
} from "@/components/input/input-styles";

interface TextareaProps
  extends React.TextareaHTMLAttributes<HTMLTextAreaElement>,
    BasicInputProps {
  value?: string;
  defaultValue?: string;
  onChange?: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
}

export const Textarea = forwardRef<HTMLTextAreaElement, TextareaProps>(
  (
    {
      value,
      defaultValue,
      onChange,
      inputWidth,
      inputSize,
      variant,
      disabled,
      className,
      ...props
    },
    ref
  ) => {
    const inputClass = getInputClasses({
      inputWidth,
      inputSize,
      variant,
      disabled,
    });

    return (
      <textarea
        ref={ref}
        value={value}
        defaultValue={defaultValue}
        onChange={onChange}
        className={[inputClass, className].join(" ")}
        disabled={disabled}
        {...props}
      />
    );
  }
);

Textarea.displayName = "Textarea";
