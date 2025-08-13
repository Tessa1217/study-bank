import { DEFAULT_MESSAGE } from "./error-defaults";
import type { AppError, ErrorTypeKey } from "@/api/error/error.types";

const PG_CODE_MAP: Record<string, { type: ErrorTypeKey; msg?: string }> = {
  "23505": { type: "CONFLICT", msg: "이미 존재하는 데이터입니다." },
  "23503": {
    type: "VALIDATION",
    msg: "연관된 데이터가 없어 처리할 수 없습니다.",
  },
  "23502": { type: "VALIDATION", msg: "필수 입력값을 확인해주세요." },
  "42501": { type: "PERMISSION" },
};

// 공통 포맷터: message 없으면 기본 메시지로 보정
function finalize(
  type: ErrorTypeKey,
  opts?: { message?: string; code?: any; raw?: unknown }
): AppError {
  return {
    type,
    message: opts?.message || DEFAULT_MESSAGE[type],
    code: opts?.code,
    raw: opts?.raw,
  };
}

export function mapSupabaseError(e: unknown): AppError {
  // 1) 네트워크/타임아웃
  if (e instanceof TypeError && e.message?.includes("Failed to fetch")) {
    return finalize("NETWORK", { raw: e });
  }
  if ((e as any)?.name === "AbortError") {
    return finalize("TIMEOUT", { raw: e });
  }

  const err = e as any;

  // 2) PostgREST(쿼리/DB) 계열
  if (
    err?.code &&
    (err?.message || err?.details || typeof err?.status === "number")
  ) {
    const known = PG_CODE_MAP[err.code];
    if (known) {
      return finalize(known.type, {
        message: known.msg,
        code: err.code,
        raw: e,
      });
    }

    if (err?.status === 404)
      return finalize("NOT_FOUND", { code: err.code, raw: e });
    if (err?.status === 429)
      return finalize("RATE_LIMIT", { code: err.code, raw: e });
    if (err?.status >= 500)
      return finalize("SERVER", { code: err.code, raw: e });
    if (err?.status >= 400)
      return finalize("VALIDATION", {
        message: err.message,
        code: err.code,
        raw: e,
      });

    return finalize("UNKNOWN", {
      message: err.message,
      code: err.code,
      raw: e,
    });
  }

  // 3) Auth
  if (err?.name === "AuthApiError" || err?.__isAuthError) {
    if (err?.status === 401) return finalize("AUTH", { raw: e });
    if (err?.status === 429) return finalize("RATE_LIMIT", { raw: e });
    return finalize("AUTH", { message: err?.message, raw: e });
  }

  // 4) Storage
  if (
    err?.name === "StorageError" ||
    (typeof err?.status === "number" && err?.error === "Storage error")
  ) {
    if (err?.status === 404) return finalize("NOT_FOUND", { raw: e });
    return finalize("STORAGE", { message: err?.message, raw: e });
  }

  // 5) Realtime
  if (err?.name === "RealtimeError") {
    return finalize("REALTIME", { raw: e });
  }

  // 6) 그 외
  return finalize("UNKNOWN", { raw: e });
}
