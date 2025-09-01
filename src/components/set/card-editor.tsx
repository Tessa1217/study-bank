import CardList from "@/components/set/card-list";
import { useCardEditor } from "@/components/set/card-editor-context";
import CardItemEditor from "@/components/set/card-item-editor";
import Button from "@/components/button/button";

const CardEditor = () => {
  const {
    actions: { addCard },
  } = useCardEditor();

  return (
    <div className="grid relative grid-cols-1 lg:grid-cols-[360px_1fr] gap-4">
      {/* Left — Card list */}
      <aside className="card space-y-2 overflow-auto max-h-[500px]">
        <div className="flex items-center justify-between">
          <h4 className="font-semibold">카드 리스트</h4>
          <Button variant="outline" color="secondary" onClick={() => addCard()}>
            + 새 카드
          </Button>
        </div>
        <CardList />
      </aside>
      {/* Right — Card Item Editor */}
      <CardItemEditor />
    </div>
  );
};

export default CardEditor;
