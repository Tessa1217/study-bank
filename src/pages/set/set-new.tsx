import { useRef, useEffect } from "react";
import { useParams } from "react-router-dom";
import CardEditor from "@/components/set/card-editor";
import {
  CardEditorProvider,
  useCardEditor,
} from "@/components/set/card-editor-context";
import clsx from "clsx";
import {
  useSaveSetWithCardsMutation,
  useSetWithCardsQuery,
} from "@/hooks/queries/useSetAndCardQuery";
import Button from "@/components/button/button";
import SetData from "@/pages/set/set-data";

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

  const { setId } = useParams();

  const { data: editSet } = useSetWithCardsQuery(setId);

  useEffect(() => {
    if (editSet) {
      const { cards, ...meta } = editSet;
      const { init, setMeta } = actions;
      setMeta({
        id: meta.id,
        title: meta.title,
        description: meta.description ?? undefined,
      });
      init(cards);
    }
  }, [editSet]);

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
    <div className="page">
      <div className="page-content">
        <div className="page-header">
          <div className="page-title-container">
            <h1 className="page-title">학습 세트 생성</h1>
            <p className="page-sub-title">나만의 학습 세트를 생성해보세요.</p>
          </div>
          <div className="page-btn-container">
            <Button color="primary" onClick={onSave}>
              저장
            </Button>
            <SetData></SetData>
          </div>
        </div>
        <header className="card grid gap-3">
          <div className="grid gap-1">
            <label className="label">세트명 *</label>
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
                <p key={m} className="error-text">
                  {m}
                </p>
              ))}
          </div>
          <div className="grid gap-1">
            <label className="label">설명</label>
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
                <p key={m} className="error-text">
                  {m}
                </p>
              ))}
          </div>
          {setId && (
            <div className="page-btn-container">
              <div className="ml-auto flex gap-2">
                <Button variant="outline">학습</Button>
                <Button variant="outline">학습</Button>
                <Button color="primary">학습</Button>
              </div>
            </div>
          )}
        </header>
        <CardEditor />
      </div>
    </div>
  );
};

export default SetPage;
