import { useSaveSetWithCardsMutation } from "@/hooks/queries/useSetAndCardQuery";
import { useAlert } from "@/hooks/useAlert";
export function useSetEditorSave(actions, meta, state, titleRef) {
  const { mutate: save } = useSaveSetWithCardsMutation();

  const { showConfirm, showSuccessAlert } = useAlert();

  const validateSetWithCards = () => {
    return actions.validateNow();
  };

  const handleSave = () => {
    return new Promise((resolve, reject) => {
      const { ok, firstError } = validateSetWithCards();
      if (!ok) {
        if (firstError?.scope === "set") {
          if (firstError.field === "title") titleRef.current?.focus();
        } else if (firstError?.scope === "card" && firstError.cardId) {
          actions.setActive(firstError.cardId);
          requestAnimationFrame(() => {
            document
              .querySelector<HTMLElement>(
                `[data-card-id="\${firstError.cardId}"]`
              )
              ?.scrollIntoView({ behavior: "smooth", block: "center" });
          });
        }
        return reject(firstError);
      }
      save(
        { set: meta, cards: state.cards },
        {
          onSuccess: (result) => {
            actions.clearErrors();
            resolve(result);
          },
          onError: (error) => {
            reject(error);
          },
        }
      );
    });
  };

  const onSave = () =>
    showConfirm({
      messageCode: "COMMON.INFO.SAVE",
      onAction: async () => {
        try {
          await handleSave();
          showSuccessAlert({ messageCode: "COMMON.SUCCESS.SAVE" });
        } catch {
          console.error("error");
        }
      },
    });

  return {
    onSave,
  };
}
