import { createZustandStore } from "@/store/store";

type AlertState = {
  open: boolean;
  message: string;
  onAction?: () => void;
  actionLabel?: string;
  showAlert: (msg: string, actionLabel?: string, onAction?: () => void) => void;
  closeAlert: () => void;
};

export const useAlertStore = createZustandStore<AlertState>((set) => ({
  open: false,
  message: "",
  actionLabel: undefined,
  onAction: undefined,
  showAlert: (message, actionLabel, onAction) =>
    set({ open: true, message, actionLabel, onAction }),
  closeAlert: () =>
    set({
      open: false,
      message: "",
      actionLabel: undefined,
      onAction: undefined,
    }),
}));
