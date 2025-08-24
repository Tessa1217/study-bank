import { useAlertStore } from "@/store/useAlertStore";
import type { Feedback } from "@/types";
import { getMessage } from "@/utils/message";

type Alert = {
  messageCode: string;
  actionLabel?: string;
  alertVariant?: Feedback;
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
    alertVariant = "info",
    actionLabel = "취소",
    onAction,
  }: Alert) => {
    const message = generateMessage(messageCode);
    if (!message) return;
    showAlert({ message, actionLabel, onAction, alertVariant });
  };

  const showSuccessAlert = ({
    messageCode,
    alertVariant = "success",
    actionLabel = "",
    onAction,
  }: Alert) => {
    const message = generateMessage(messageCode);
    if (!message) return;
    showAlert({ message, actionLabel, onAction, alertVariant });
  };

  return {
    showConfirm,
    showSuccessAlert,
  };
}
