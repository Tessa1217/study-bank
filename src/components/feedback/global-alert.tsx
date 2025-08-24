import { useAlertStore } from "@/store/useAlertStore";
import Alert from "@/components/feedback/alert";

export default function GlobalAlert() {
  const { open, message, actionLabel, onAction, closeAlert } = useAlertStore();

  return (
    <Alert
      open={open}
      message={message}
      confirmLabel="확인"
      secondaryLabel={actionLabel}
      onSecondary={closeAlert}
      onConfirm={onAction}
      onClose={closeAlert}
    />
  );
}
