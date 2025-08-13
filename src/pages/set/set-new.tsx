import CardEditor from "@/components/set/card-editor";
import type { StudyCardDraft } from "@/components/set/state/card.types";
import { CardEditorProvider } from "@/components/set/card-editor-context";

const SetNew = () => {
  const initialCards = [
    {
      id: "1",
      set_id: "1",
      sort_order: 1,
      definition_lang: "ENG",
      definition: "카드 1번의 정의",
      word: "카드입니다",
      word_lang: "ENG",
    },
    {
      id: "2",
      set_id: "1",
      sort_order: 2,
      definition_lang: "ENG",
      definition: "히히히히히",
      word: "헤헤",
      word_lang: "ENG",
    },
    {
      id: "3",
      set_id: "1",
      sort_order: 3,
      definition_lang: "ENG",
      definition: "메롱",
      word: "바부",
      word_lang: "ENG",
    },
  ] as StudyCardDraft[];

  return (
    <div className="space-y-6 relative max-h-full overflow-hidden">
      <h1 className="text-2xl font-bold">학습 세트 생성</h1>
      <header className="card grid gap-3">
        <div className="grid gap-1">
          <label className="text-sm font-medium">세트명 *</label>
          <input className="input" placeholder="예: HTML/CSS 기본" />
        </div>
        <div className="grid gap-1">
          <label className="text-sm font-medium">설명</label>
          <textarea className="input min-h-20" placeholder="세트 설명" />
        </div>
        <div className="flex flex-wrap items-center gap-2">
          <div className="ml-auto flex gap-2">
            <button className="btn-outline">학습</button>
            <button className="btn-outline">퀴즈</button>
            <button className="btn-primary">공유</button>
          </div>
        </div>
      </header>
      <CardEditorProvider>
        <CardEditor cardList={initialCards} />
      </CardEditorProvider>
      <div className="flex justify-end gap-2 pt-2">
        <button className="btn-primary">저장</button>
      </div>
    </div>
  );
};

export default SetNew;
