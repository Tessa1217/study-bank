import React, { forwardRef } from "react";
import {
  getButtonClasses,
  type BaseButtonProps,
} from "@/components/button/button-styles";
import clsx from "clsx";

interface CustomButtonProps {
  className?: string;
}

export type ButtonProps = CustomButtonProps &
  BaseButtonProps &
  React.ComponentPropsWithRef<"button">;

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      children,
      color = "blue",
      size = "md",
      width = "auto",
      variant = "solid",
      disabled = false,
      iconOnly = false,
      className,
      ...props
    },
    ref
  ) => {
    const buttonClass = getButtonClasses({
      color,
      size,
      width,
      variant,
      disabled,
      iconOnly,
    });

    return (
      <button className={clsx(buttonClass, className)} {...props} ref={ref}>
        {children}
      </button>
    );
  }
);

export default Button;
