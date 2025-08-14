import { useRef } from "react";
import CardEditor from "@/components/set/card-editor";
import {
  CardEditorProvider,
  useCardEditor,
} from "@/components/set/card-editor-context";
import clsx from "clsx";
import { useSaveSetWithCardsMutation } from "@/hooks/queries/useSetAndCardQuery";

const SetPage = () => {
  return (
    <CardEditorProvider>
      <SetNew />
    </CardEditorProvider>
  );
};

const SetNew = () => {
  const titleRef = useRef<HTMLInputElement>(null);
  const { state, meta, submitAttempted, actions, errors } = useCardEditor();

  const { mutate: saveSetWithCards } = useSaveSetWithCardsMutation();

  const onSave = async () => {
    const { ok, firstError } = actions.validateNow();
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
      return;
    }
    saveSetWithCards({ set: meta, cards: state.cards });
    actions.clearErrors();
  };

  return (
    <div className="space-y-6 relative max-h-full overflow-hidden">
      <div className="flex justify-between align-middle content-center">
        <h1 className="text-2xl font-bold">학습 세트 생성</h1>
        <div className="flex justify-end gap-2 pt-2">
          <button className="btn-primary" onClick={onSave}>
            저장
          </button>
        </div>
      </div>

      <header className="card grid gap-3">
        <div className="grid gap-1">
          <label className="text-sm font-medium">세트명 *</label>
          <input
            placeholder="예: HTML/CSS 기본"
            ref={titleRef}
            className={clsx(
              "input",
              errors.set?.title?.length ? "border-red-500 ring-red-500" : ""
            )}
            value={meta.title}
            onChange={(e) =>
              actions.setMeta({ ...meta, title: e.target.value })
            }
          />
          {submitAttempted &&
            errors.set?.title?.map((m) => (
              <p key={m} className="text-red-600 text-xs">
                {m}
              </p>
            ))}
        </div>
        <div className="grid gap-1">
          <label className="text-sm font-medium">설명</label>
          <textarea
            className="input min-h-20"
            placeholder="세트 설명"
            value={meta.description}
            onChange={(e) =>
              actions.setMeta({ ...meta, description: e.target.value })
            }
          />
          {submitAttempted &&
            errors.set?.description?.map((m) => (
              <p key={m} className="text-red-600 text-xs">
                {m}
              </p>
            ))}
        </div>
        <div className="flex flex-wrap items-center gap-2">
          <div className="ml-auto flex gap-2">
            <button className="btn-outline">학습</button>
            <button className="btn-outline">퀴즈</button>
            <button className="btn-primary">공유</button>
          </div>
        </div>
      </header>
      <CardEditor />
    </div>
  );
};

export default SetPage;
