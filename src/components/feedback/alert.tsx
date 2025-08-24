import Button from "@/components/button/button";
import { X } from "lucide-react";
import { useEffect } from "react";

type AlertProps = {
  open: boolean;
  message: string;
  confirmLabel?: string;
  secondaryLabel?: string;
  onSecondary?: () => void;
  onConfirm?: () => void;
  onClose: () => void;
};

export default function Alert({
  open,
  message,
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
          <X size={5} />
        </button>
        {/* Content */}
        <div className="flex flex-col items-center text-center">
          <div className="mb-4 text-gray-400">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="h-10 w-10 text-gray-500"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M12 9v3.75m-9.303 3.376c-.866 1.5.06 3.377 1.868 3.377h14.48c1.808 0 2.734-1.877 1.868-3.377L13.715 4.36a1.875 1.875 0 00-3.431 0L2.697 16.126zM12 15.75h.007v.008H12v-.008z"
              />
            </svg>
          </div>
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
