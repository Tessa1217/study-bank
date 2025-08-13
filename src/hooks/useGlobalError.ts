import { useError } from "@/hooks/useError";
import { useAlertStore } from "@/store/useAlertStore";

export function useGlobalError() {
  const showAlert = useAlertStore((s) => s.showAlert);

  return useError({
    notifyImpl: ({ message, actionLabel, onAction }) => {
      showAlert(message, actionLabel, onAction);
    },
  });
}
