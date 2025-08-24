import Button from "@/components/button/button";
import type { Feedback } from "@/types";
import { CircleCheckBig, CircleX, Info, TriangleAlert, X } from "lucide-react";
import { useEffect } from "react";

type AlertProps = {
  open: boolean;
  message: string;
  alertVariant?: Feedback;
  confirmLabel?: string;
  secondaryLabel?: string;
  onSecondary?: () => void;
  onConfirm?: () => void;
  onClose: () => void;
};

const AlertIcon = ({ alertVariant }: { alertVariant?: Feedback }) => {
  if (!alertVariant) return null;

  let iconComponent;
  switch (alertVariant) {
    case "info":
      iconComponent = <Info size={40} />;
      break;
    case "error":
      iconComponent = <CircleX size={40} />;
      break;
    case "warning":
      iconComponent = <TriangleAlert size={40} />;
      break;
    case "success":
      iconComponent = <CircleCheckBig size={40} />;
      break;
    default:
      iconComponent = null;
      break;
  }

  return <div className="mb-4 text-gray-400">{iconComponent}</div>;
};
export default function Alert({
  open,
  message,
  alertVariant,
  confirmLabel = "확인",
  secondaryLabel,
  onSecondary,
  onConfirm,
  onClose,
}: AlertProps) {
  const closeOnEsc = (e: KeyboardEvent) => {
    if (e.key === "Escape") onClose();
  };

  useEffect(() => {
    if (!open) return;
    document.addEventListener("keydown", closeOnEsc);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", closeOnEsc);
      document.body.style.overflow = "";
    };
  }, [open]);

  if (!open) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4"
      aria-modal="true"
      role="alertdialog"
    >
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-gray-900/40 backdrop-blur-sm"
        onClick={onClose}
      />
      {/* Panel */}
      <div className="relative w-full max-w-sm rounded-xl bg-white p-6 shadow-2xl ring-1 ring-black/5 animate-fade-in-up">
        {/* Close Button */}
        <button
          aria-label="닫기"
          className="absolute right-3 top-3 rounded-full p-2 text-gray-400 transition-colors duration-200 hover:bg-gray-100 hover:text-gray-600 focus:outline-none focus:ring-2 focus:ring-gray-300"
          onClick={onClose}
        >
          <X size={20} />
        </button>
        {/* Content */}
        <div className="flex flex-col items-center text-center">
          <AlertIcon alertVariant={alertVariant} />
          {/* Message */}
          <p className="mb-6 text-base font-semibold text-gray-800 whitespace-pre-wrap">
            {message}
          </p>

          {/* Buttons */}
          <div className="flex w-full flex-col gap-3 sm:flex-row sm:justify-center">
            {secondaryLabel && (
              <Button
                color="secondary"
                variant="outline"
                onClick={() => {
                  onSecondary?.();
                  onClose();
                }}
              >
                {secondaryLabel}
              </Button>
            )}
            <Button
              color="primary"
              onClick={() => {
                onConfirm?.();
                onClose();
              }}
            >
              {confirmLabel}
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
