import { forwardRef } from "react";
import {
  getLoadingSpinnerClasses,
  type LoadingSpinnerProps as BaseLoadingSpinnerProps,
} from "@/components/ui/loading-styles";
import clsx from "clsx";

interface CustomLoadingSpinnerProps {
  className?: string;
  label?: string;
  fullScreen?: boolean;
}

export type LoadingSpinnerProps = CustomLoadingSpinnerProps &
  BaseLoadingSpinnerProps &
  React.ComponentPropsWithRef<"div">;

const LoadingSpinner = forwardRef<HTMLDivElement, LoadingSpinnerProps>(
  (
    {
      color = "primary",
      size = "md",
      className,
      label = "Loading...",
      fullScreen = false,
      ...props
    },
    ref
  ) => {
    const spinnerClass = getLoadingSpinnerClasses({ color, size });

    const spinner = (
      <div
        role="status"
        className={clsx(spinnerClass, className)}
        {...props}
        ref={ref}
      >
        <span className="sr-only">{label}</span>
      </div>
    );

    if (fullScreen) {
      return (
        <div className="fixed inset-0 z-[1000] flex items-center justify-center bg-white/50 backdrop-blur-sm">
          {spinner}
        </div>
      );
    }

    return spinner;
  }
);

LoadingSpinner.displayName = "LoadingSpinner";

export default LoadingSpinner;
