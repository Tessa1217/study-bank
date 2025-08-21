import { useAlertStore } from "@/store/useAlertStore";
import { getFeedbackPolicy } from "@/api/error/error-feedback.policy";
import type { AppError } from "@/api/error/error.types";

// 전역 에러 핸들러
export function useGlobalErrorHandler() {
  const { showAlert } = useAlertStore();

  const handleError = (error: unknown) => {
    console.error("An error occurred:", error); // 에러 로깅

    // AppError 타입인지 확인 후 정책에 따라 처리
    if (
      error &&
      typeof error === "object" &&
      "type" in error &&
      "message" in error
    ) {
      const appError = error as AppError;
      const policy = getFeedbackPolicy(appError);

      if (policy === "GLOBAL_ALERT") {
        showAlert(appError.message);
      }
    } else {
      // AppError가 아닌 예외적인 경우, 일반 메시지 표시
      showAlert("알 수 없는 오류가 발생했습니다.");
    }
  };

  return { handleError };
}
