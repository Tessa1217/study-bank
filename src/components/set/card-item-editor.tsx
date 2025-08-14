import { useCardEditor } from "@/components/set/card-editor-context";
import { File } from "lucide-react";

const CardItemError = ({ message }: { message: string }) => {
  return (
    <p key={message} className="text-red-600 text-xs">
      {message}
    </p>
  );
};

const CardItemEditor = () => {
  const {
    state: { cards, activeId },
    actions: { updateWord, updateDefinition },
    errors,
    submitAttempted,
  } = useCardEditor();

  const selected = cards.find(({ id }) => id === activeId);

  if (!selected) {
    return (
      <section className="card space-y-4">
        <div>편집할 카드를 선택해주세요.</div>
      </section>
    );
  }

  const cardErrors = errors.cards[selected.id];

  return (
    <section className="card space-y-4">
      <div className="grid gap-2">
        <label className="text-sm font-medium">단어</label>
        <textarea
          className="input min-h-[120px]"
          placeholder="학습할 단어를 입력해주세요."
          value={selected.word}
          onChange={(e) => updateWord(selected.id, e.target.value)}
        />
        {submitAttempted &&
          cardErrors?.word?.map((m) => <CardItemError message={m} />)}
      </div>
      <div className="grid gap-2">
        <label htmlFor="definition" className="text-sm font-medium">
          뜻
        </label>
        <textarea
          id="definition"
          className="input min-h-[160px]"
          placeholder="학습할 단어의 뜻을 입력해주세요."
          value={selected.definition}
          onChange={(e) => updateDefinition(selected.id, e.target.value)}
        />
        {submitAttempted &&
          cardErrors?.definition?.map((m) => <CardItemError message={m} />)}
      </div>
      <div className="flex flex-wrap justify-between items-center gap-2">
        <button className="btn-outline flex gap-2">
          <File size={20} />
          <span>파일 첨부</span>
        </button>
        <button className="btn-outline">미리보기</button>
      </div>
    </section>
  );
};

export default CardItemEditor;
