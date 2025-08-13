import type { ErrorTypeKey } from "@/api/error/error.types";

export const DEFAULT_MESSAGE: Record<ErrorTypeKey, string> = {
  NETWORK: "네트워크 연결을 확인해주세요.",
  TIMEOUT: "요청이 지연되고 있어요. 잠시 후 다시 시도해주세요.",
  AUTH: "로그인이 필요합니다.",
  PERMISSION: "권한이 없습니다.",
  VALIDATION: "입력 값을 확인해주세요.",
  CONFLICT: "이미 존재하는 데이터입니다.",
  NOT_FOUND: "대상을 찾을 수 없습니다.",
  SERVER: "서버 오류가 발생했습니다. 잠시 후 다시 시도해주세요.",
  RATE_LIMIT: "요청이 너무 많습니다. 잠시 후 다시 시도해주세요.",
  STORAGE: "파일 처리 중 문제가 발생했습니다.",
  REALTIME: "실시간 연결에 문제가 있습니다. 새로고침 해주세요.",
  UNKNOWN: "알 수 없는 오류가 발생했습니다.",
};
