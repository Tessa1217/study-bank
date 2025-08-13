import {
  SortableCardHandle,
  SortableCardItem,
} from "@/components/set/sortable-card-item";
import SortableCardOverlay from "@/components/set/sortable-card-overlay";
import {
  DndContext,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
} from "@dnd-kit/core";
import type { Active, Over, UniqueIdentifier } from "@dnd-kit/core";
import {
  SortableContext,
  arrayMove,
  sortableKeyboardCoordinates,
} from "@dnd-kit/sortable";
import React, { useState, useMemo } from "react";

interface BaseItem {
  id: UniqueIdentifier;
}

interface Props<T extends BaseItem> {
  items: T[];
  onChange(items: T[]): void;
  renderItem(item: T): React.ReactNode;
}

export function SortableCardList<T extends BaseItem>({
  items,
  onChange,
  renderItem,
}: Props<T>) {
  const [active, setActive] = useState<Active | null>(null);
  const activeItem = useMemo(
    () => items.find((card) => card.id === active?.id),
    [active, items]
  );
  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

  const handleDragEnd = ({
    active,
    over,
  }: {
    active: Active;
    over: Over | null;
  }) => {
    if (over && active.id !== over?.id) {
      const activeIndex = items.findIndex(({ id }) => id === active.id);
      const overIndex = items.findIndex(({ id }) => id === over.id);
      onChange(arrayMove(items, activeIndex, overIndex));
    }
    setActive(null);
  };

  return (
    <DndContext
      sensors={sensors}
      onDragStart={({ active }) => setActive(active)}
      onDragEnd={({ active, over }) => handleDragEnd({ active, over })}
      onDragCancel={() => setActive(null)}
    >
      <SortableContext items={items}>
        <div className="" role="application">
          {items.map((item) => (
            <React.Fragment key={item.id}>{renderItem(item)}</React.Fragment>
          ))}
        </div>
      </SortableContext>
      <SortableCardOverlay>
        {activeItem ? renderItem(activeItem) : null}
      </SortableCardOverlay>
    </DndContext>
  );
}

SortableCardList.Item = SortableCardItem;
SortableCardList.DragHandle = SortableCardHandle;
