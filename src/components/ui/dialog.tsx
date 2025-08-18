import { useEffect, useRef } from "react";
import { createPortal } from "react-dom";

type DialogProps = {
  open: boolean;
  onClose: () => void;
  titleId?: string;
  descriptionId?: string;
  initialFocusRef?: React.RefObject<HTMLButtonElement | null>;
  disableOutsideClose?: boolean;
  children: (ctx: {
    close: () => void;
    panelRef: React.RefObject<HTMLDivElement | null>;
  }) => React.ReactNode;
};

// focus 가능한 요소
const FOCUSABLE = [
  "a[href]",
  "button:not([disabled])",
  "textarea:not([disabled])",
  "input:not([disabled])",
  "select:not([disabled])",
  "[tabindex]:not([tabindex='-1'])",
].join(",");

export default function Dialog({
  open,
  onClose,
  titleId,
  descriptionId,
  initialFocusRef,
  disableOutsideClose,
  children,
}: DialogProps) {
  const overlayRef = useRef<HTMLDivElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);
  const lastActiveRef = useRef<HTMLElement | null>(null);

  useEffect(() => {
    if (!open) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = prev;
    };
  }, [open]);

  useEffect(() => {
    if (!open) return;
    lastActiveRef.current = document.activeElement as HTMLElement | null;
    const focusTarget =
      initialFocusRef?.current ||
      panelRef.current?.querySelector<HTMLElement>(FOCUSABLE) ||
      panelRef.current;
    focusTarget?.focus();

    return () => {
      lastActiveRef?.current?.focus?.();
    };
  }, [open, initialFocusRef]);

  useEffect(() => {
    if (!open) return;

    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        e.stopPropagation();
        onClose();
      } else if (e.key === "Tab") {
        const root = panelRef.current;
        if (!root) return;
        const els = Array.from(
          root.querySelectorAll<HTMLElement>(FOCUSABLE)
        ).filter(
          (el) => el.offsetParent !== null || el === document.activeElement
        );
        if (els.length === 0) {
          e.preventDefault();
          root.focus();
          return;
        }
        const first = els[0];
        const last = els[els.length - 1];
        const active = document.activeElement as HTMLElement;
        if (e.shiftKey && active === first) {
          e.preventDefault();
          last.focus();
        } else if (!e.shiftKey && active === last) {
          e.preventDefault();
          first.focus();
        }
      }
    };

    document.addEventListener("keydown", onKeyDown, true);
    return () => document.removeEventListener("keydown", onKeyDown, true);
  }, [open, onClose]);

  if (!open) return null;

  const onOverlayMouseDown: React.MouseEventHandler<HTMLDivElement> = (e) => {
    if (disableOutsideClose) return;
    if (e.target === overlayRef.current) onClose();
  };

  return createPortal(
    <div
      ref={overlayRef}
      onMouseDown={onOverlayMouseDown}
      aria-hidden="true"
      className="fixed inset-0 z-[1000] grid sm:place-items-center items-end w-full"
    >
      <div className="absolute inset-0 bg-slate-900/50 backdrop-blur-[1px] animate-overlay-in" />
      <div
        ref={panelRef}
        role="dialog"
        aria-modal="true"
        aria-labelledby={titleId}
        aria-describedby={descriptionId}
        tabIndex={-1}
        className="relative w-full sm:w-auto animate-panel-in sm:place-self-center"
      >
        {children({ close: onClose, panelRef })}
      </div>
    </div>,
    document.body
  );
}
