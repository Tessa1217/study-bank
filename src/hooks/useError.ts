import { useCallback, useRef } from "react";
import type { AppError } from "@/api/error/error.types";
import {
  ERROR_FEEDBACK_POLICY,
  type ErrorFeedbackVariant,
} from "@/api/error/error-feedback.policy";

type NotifyPayload = {
  variant: ErrorFeedbackVariant;
  message: string;
  actionLabel?: string;
  onAction?: () => void;
};

type UseErrorOptions = {
  notifyImpl?: (p: NotifyPayload) => void; // 없으면 alert로 fallback
  dedupeMs?: number; // 연속 중복 억제
};

export function useError(opts: UseErrorOptions = {}) {
  const { notifyImpl, dedupeMs = 2500 } = opts;
  const lastRef = useRef<{ key: string; at: number } | null>(null);

  const notify = useCallback(
    (err: AppError, o?: { overrideMessage?: string; dedupeKey?: string }) => {
      if (!err) return;
      const policy = ERROR_FEEDBACK_POLICY[err.type] ?? ERROR_FEEDBACK_POLICY.UNKNOWN;
      const message =
        o?.overrideMessage || err.message || policy.defaultMessage;

      const key = o?.dedupeKey || `${err.type}:${message}`;
      const now = Date.now();
      if (
        lastRef.current &&
        lastRef.current.key === key &&
        now - lastRef.current.at < dedupeMs
      )
        return;
      lastRef.current = { key, at: now };

      const payload: NotifyPayload = {
        variant: policy.variant,
        message,
        actionLabel: policy.actionLabel,
        onAction: policy.action ? () => policy.action!(err) : undefined,
      };

      if (notifyImpl) notifyImpl(payload);
      else {
        alert(message);
        if (payload.onAction) payload.onAction();
      }
    },
    [notifyImpl, dedupeMs]
  );

  const handle = useCallback(
    async <T>(
      p: Promise<{ data: T | null; error: AppError | null }>,
      o?: { silent?: boolean; overrideMessage?: string }
    ) => {
      const res = await p;
      if (res.error && !o?.silent)
        notify(res.error, { overrideMessage: o?.overrideMessage });
      return res.error ? null : (res.data as T);
    },
    [notify]
  );

  const wrap = useCallback(
    <A extends any[], T>(
        fn: (...args: A) => Promise<{ data: T | null; error: AppError | null }>,
        o?: { silent?: boolean; overrideMessage?: string }
      ) =>
      async (...args: A): Promise<T | null> =>
        handle<T>(fn(...args), o),
    [handle]
  );

  return { notify, handle, wrap };
}
