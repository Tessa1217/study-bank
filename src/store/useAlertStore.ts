import { createZustandStore } from "@/store/store";
import type { Feedback } from "@/types";

type AlertState = {
  open: boolean;
  message: string;
  alertVariant?: Feedback;
  onAction?: () => void;
  actionLabel?: string;
  showAlert: ({
    message,
    alertVariant,
    actionLabel,
    onAction,
  }: Partial<AlertState>) => void;
  closeAlert: () => void;
};

export const useAlertStore = createZustandStore<AlertState>(
  "alert-storage",
  (set) => ({
    open: false,
    message: "",
    alertVariant: undefined,
    actionLabel: undefined,
    onAction: undefined,
    showAlert: ({
      message,
      alertVariant,
      actionLabel,
      onAction,
    }: Partial<AlertState>) =>
      set({ open: true, message, alertVariant, actionLabel, onAction }),
    closeAlert: () =>
      set({
        open: false,
        message: "",
        alertVariant: undefined,
        actionLabel: undefined,
        onAction: undefined,
      }),
  })
);
