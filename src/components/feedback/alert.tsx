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
      className="fixed inset-0 z-50 flex items-center justify-center"
      aria-modal="true"
      role="alertdialog"
    >
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/50 backdrop-blur-[1px]"
        onClick={onClose}
      />
      {/* Panel */}
      <div className="relative mx-4 w-full max-w-sm rounded-2xl bg-white p-5 shadow-xl ring-1 ring-black/5">
        <div className="text-sm text-gray-700 whitespace-pre-wrap">
          {message}
        </div>
        {secondaryLabel && (
          <button
            className="inline-flex items-center rounded-lg border px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50"
            onClick={() => {
              onSecondary?.();
              onClose();
            }}
          >
            {secondaryLabel}
          </button>
        )}
        <div className="mt-5 flex justify-end">
          <button
            className="inline-flex items-center rounded-lg border border-transparent bg-gray-900 px-4 py-2 text-sm font-medium text-white hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-gray-400"
            onClick={() => {
              onConfirm?.();
              onClose();
            }}
          >
            {confirmLabel}
          </button>
        </div>
        <button
          aria-label="close"
          className="absolute right-2 top-2 rounded p-1 text-gray-400 hover:bg-gray-100 hover:text-gray-600"
          onClick={onClose}
        >
          ✕
        </button>
      </div>
    </div>
  );
}
