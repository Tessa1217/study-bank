export const ErrorType = {
  NETWORK: "NETWORK",
  TIMEOUT: "TIMEOUT",
  AUTH: "AUTH",
  PERMISSION: "PERMISSION",
  VALIDATION: "VALIDATION",
  CONFLICT: "CONFLICT",
  NOT_FOUND: "NOT_FOUND",
  SERVER: "SERVER",
  RATE_LIMIT: "RATE_LIMIT",
  STORAGE: "STORAGE",
  REALTIME: "REALTIME",
  UNKNOWN: "UNKNOWN",
} as const;

export type ErrorTypeKey = keyof typeof ErrorType;

export interface AppError {
  type: ErrorTypeKey;
  message: string;
  code?: string | number;
  raw?: unknown;
}
