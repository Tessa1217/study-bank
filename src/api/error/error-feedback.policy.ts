import { ErrorType } from "@/api/error/error.types";
import type { AppError } from "@/api/error/error.types";
import { DEFAULT_MESSAGE } from "@/api/error/error-defaults";
import type { Feedback } from "@/types";

export type ErrorFeedbackVariant = Feedback

export interface ErrorUiPolicy {
  variant: ErrorFeedbackVariant;
  defaultMessage: string;
  actionLabel?: string;
  action?: (err: AppError) => void;
}

export const ERROR_FEEDBACK_POLICY: Record<keyof typeof ErrorType, ErrorUiPolicy> = {
  NETWORK: {
    variant: "warning",
    defaultMessage: DEFAULT_MESSAGE.NETWORK,
    actionLabel: "재시도",
  },
  TIMEOUT: {
    variant: "warning",
    defaultMessage: DEFAULT_MESSAGE.TIMEOUT,
    actionLabel: "재시도",
  },
  AUTH: {
    variant: "warning",
    defaultMessage: DEFAULT_MESSAGE.AUTH,
    actionLabel: "로그인하기",
    action: () => {
      window.location.href = "/login";
    },
  },
  PERMISSION: {
    variant: "warning",
    defaultMessage: DEFAULT_MESSAGE.PERMISSION,
  },
  VALIDATION: {
    variant: "info",
    defaultMessage: DEFAULT_MESSAGE.VALIDATION,
  },
  CONFLICT: {
    variant: "info",
    defaultMessage: DEFAULT_MESSAGE.CONFLICT,
  },
  NOT_FOUND: {
    variant: "info",
    defaultMessage: DEFAULT_MESSAGE.NOT_FOUND,
  },
  RATE_LIMIT: {
    variant: "warning",
    defaultMessage: DEFAULT_MESSAGE.RATE_LIMIT,
  },
  STORAGE: {
    variant: "error",
    defaultMessage: DEFAULT_MESSAGE.STORAGE,
  },
  REALTIME: {
    variant: "warning",
    defaultMessage: DEFAULT_MESSAGE.REALTIME,
  },
  SERVER: {
    variant: "error",
    defaultMessage: DEFAULT_MESSAGE.SERVER,
  },
  UNKNOWN: {
    variant: "error",
    defaultMessage: DEFAULT_MESSAGE.UNKNOWN,
  },
};
