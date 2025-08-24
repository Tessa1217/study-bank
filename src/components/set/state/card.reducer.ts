import type { CardAction, CardState } from "@/components/set/state/card.types";
import { createCard } from "@/components/set/state/card.actions";
export const initialCardState: CardState = { cards: [], activeId: undefined };

export function cardReducer(state: CardState, action: CardAction): CardState {
  switch (action.type) {
    case "INIT":
      return {
        ...state,
        cards: action.payload.sort((a, b) => a.sort_order - b.sort_order),
        activeId: action.payload[0]?.id,
      };
    case "ADD_CARD":
      const order = (state.cards.at(-1)?.sort_order ?? 0) + 1;
      const next = createCard(order, action.payload);
      return { ...state, cards: [...state.cards, next], activeId: next.id };
    case "ADD_BATCH_CARDS":
      const base_order = (state.cards.at(-1)?.sort_order ?? 0) + 1;
      const batch =
        action.payload?.map((card, i) => {
          return createCard(base_order + i, card);
        }) ?? [];
      const nextId = batch.length ? batch?.at(-1)?.id : state.activeId;
      return { ...state, cards: [...state.cards, ...batch], activeId: nextId };

    case "UPDATE_TEXT": {
      const cards = state.cards.map((c) =>
        c.id === action.id ? { ...c, [action.side]: action.text } : c
      );
      return { ...state, cards };
    }
    case "UPDATE_LANG": {
      const cards = state.cards.map((c) =>
        c.id === action.id ? { ...c, [`${action.side}_lang`]: action.lang } : c
      );
      return { ...state, cards };
    }
    case "REMOVE_CARD": {
      const cards = state.cards
        .filter((c) => c.id !== action.id)
        .map((c, i) => ({ ...c, order: i + 1 }));
      const activeId =
        state.activeId === action.id ? cards[0]?.id : state.activeId;
      return { ...state, cards, activeId };
    }
    case "REORDER": {
      const sorted_cards = action.payload.map((card, new_idx) => ({
        ...card,
        sort_order: new_idx + 1,
      }));
      return { ...state, cards: sorted_cards };
    }
    case "SET_ACTIVE":
      return { ...state, activeId: action.id };
    default:
      return state;
  }
}
