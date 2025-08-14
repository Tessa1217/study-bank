import { SortableCardList } from "@/components/set/sortable-card-list";
import { useCardEditor } from "@/components/set/card-editor-context";
import CardListItem from "@/components/set/card-list-item";
import { X } from "lucide-react";
const CardList = () => {
  const {
    state: { activeId, cards },
    actions: { reorder, setActive, removeCard },
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
              <button
                type="button"
                className="ml-auto cursor-pointer"
                onClick={(e) => {
                  e.stopPropagation();
                  removeCard(item.id);
                }}
              >
                <X size={13} />
              </button>
            </div>
          </SortableCardList.Item>
        )}
      />
    </div>
  );
};

export default CardList;
