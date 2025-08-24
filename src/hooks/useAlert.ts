import { useAlertStore } from "@/store/useAlertStore";
import { getMessage } from "@/utils/message";

type Alert = {
  messageCode: string;
  actionLabel?: string;
  onAction?: () => void;
};

export function useAlert() {
  const showAlert = useAlertStore((state) => state.showAlert);

  const generateMessage = (messageCode: string) => {
    const code = messageCode.toUpperCase();
    return getMessage(code);
  };

  const showConfirm = ({
    messageCode,
    actionLabel = "취소",
    onAction,
  }: Alert) => {
    const message = generateMessage(messageCode);
    if (!message) return;
    showAlert(message, actionLabel, onAction);
  };

  const showSuccessAlert = ({
    messageCode,
    actionLabel = "",
    onAction,
  }: Alert) => {
    const message = generateMessage(messageCode);
    if (!message) return;
    showAlert(message, actionLabel, onAction);
  };

  return {
    showConfirm,
    showSuccessAlert,
  };
}
