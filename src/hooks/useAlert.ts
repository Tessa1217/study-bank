import { useAlertStore } from "@/store/useAlertStore";
import { getMessage } from "@/utils/message";
export function useAlert() {
  const showAlert = useAlertStore((state) => state.showAlert);
  const showConfirm = ({ messageCode, actionLabel = "취소", onAction }) => {
    const code = messageCode.toUpperCase();
    const message = getMessage(code);
    if (!message) return;
    showAlert(message, actionLabel, onAction);
  };

  const showSuccessAlert = ({ messageCode, onAction }) => {
    const code = messageCode.toUpperCase();
    const message = getMessage(code);
    if (!message) return;
    showAlert(message, onAction);
  };

  return {
    showConfirm,
    showSuccessAlert,
  };
}
