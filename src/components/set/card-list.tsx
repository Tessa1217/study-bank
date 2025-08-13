import { SortableCardList } from "@/components/set/sortable-card-list";
import { useCardEditor } from "@/components/set/card-editor-context";
import CardListItem from "@/components/set/card-list-item";
const CardList = () => {
  const {
    state: { activeId, cards },
    actions: { reorder, setActive },
  } = useCardEditor();

  return (
    <div>
      <SortableCardList
        items={cards}
        onChange={(data) => reorder(data)}
        renderItem={(item) => (
          <SortableCardList.Item id={item.id}>
            <div
              className="flex items-center gap-3 rounded-xl border p-3 bg-white hover:bg-slate-50 cursor-grab"
              onClick={() => setActive(item.id)}
            >
              <CardListItem
                cardNumber={item.sort_order}
                selected={activeId === item.id}
              />
              <SortableCardList.DragHandle />
            </div>
          </SortableCardList.Item>
        )}
      />
    </div>
  );
};

export default CardList;
