import { forwardRef } from "react";
import {
  type BasicInputProps,
  getInputClasses,
} from "@components/input/input-styles";
interface InputProps
  extends React.InputHTMLAttributes<HTMLInputElement>,
    BasicInputProps {
  value?: string;
  defaultValue?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export const Input = forwardRef<HTMLInputElement, InputProps>(
  (
    {
      value,
      defaultValue,
      onChange,
      inputWidth,
      inputSize,
      variant,
      disabled,
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
      <input
        ref={ref}
        value={value}
        defaultValue={defaultValue}
        onChange={onChange}
        className={inputClass}
        {...props}
      />
    );
  }
);
