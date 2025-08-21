import type { AppError } from "./error.types";

/**
 * 에러 피드백 정책
 * - GLOBAL_ALERT: 전역 Alert로 사용자에게 메시지를 보여줌
 * - LOCAL_ALERT: 컴포넌트 레벨에서 개별적으로 처리 (e.g., 입력 필드 아래 에러 메시지)
 * - SILENT: 아무런 피드백을 주지 않음 (e.g., 백그라운드 동기화 실패)
 */
export type ErrorFeedbackPolicy = "GLOBAL_ALERT" | "LOCAL_ALERT" | "SILENT";

// AppError 타입을 기반으로 어떤 정책을 사용할지 결정
export function getFeedbackPolicy(error: AppError): ErrorFeedbackPolicy {
  switch (error.type) {
    // 즉시 사용자에게 알려야 하는 심각한 에러
    case "NETWORK":
    case "SERVER":
    case "AUTH":
    case "PERMISSION":
      return "GLOBAL_ALERT";

    // 사용자의 입력 값 오류 등, 특정 UI와 관련된 에러
    case "VALIDATION":
    case "CONFLICT":
      return "LOCAL_ALERT";

    // 개발자가 인지해야 하지만, 사용자에게 직접 알릴 필요는 없는 경우
    case "UNKNOWN":
    case "TIMEOUT":
    default:
      return "SILENT";
  }
}
