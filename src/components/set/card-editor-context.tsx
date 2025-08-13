import {
  createContext,
  useContext,
  useMemo,
  useReducer,
  type Dispatch,
} from "react";
import {
  cardReducer,
  initialCardState,
} from "@/components/set/state/card.reducer";
import type { CardState, CardAction } from "@/components/set/state/card.types";

type EditorCtx = {
  state: CardState;
  dispatch: Dispatch<CardAction>;
  actions: {
    init: (cards: CardState["cards"]) => void;
    addCard: (partial?: Partial<CardState["cards"][number]>) => void;
    updateWord: (id: string, text: string) => void;
    updateDefinition: (id: string, text: string) => void;
    removeCard: (id: string) => void;
    reorder: (cards: CardState["cards"]) => void;
    setActive: (id?: string) => void;
  };
};

const CardEditorContext = createContext<EditorCtx | null>(null);

interface CardEditorProiderProps {
  children: React.ReactNode;
}

export const CardEditorProvider = ({ children }: CardEditorProiderProps) => {
  const [state, dispatch] = useReducer(cardReducer, initialCardState);

  const actions = useMemo(
    () => ({
      init: (cards: CardState["cards"]) =>
        dispatch({ type: "INIT", payload: cards }),
      addCard: (partial?: Partial<CardState["cards"][number]>) =>
        dispatch({ type: "ADD_CARD", payload: partial }),
      updateWord: (id: string, text: string) =>
        dispatch({ type: "UPDATE_TEXT", id, side: "word", text }),
      updateDefinition: (id: string, text: string) =>
        dispatch({ type: "UPDATE_TEXT", id, side: "definition", text }),
      removeCard: (id: string) => dispatch({ type: "REMOVE_CARD", id }),
      reorder: (cards: CardState["cards"]) =>
        dispatch({ type: "REORDER", payload: cards }),
      setActive: (id?: string) => dispatch({ type: "SET_ACTIVE", id }),
    }),
    []
  );

  const value = useMemo(
    () => ({ state, dispatch, actions }),
    [state, dispatch, actions]
  );

  return (
    <CardEditorContext.Provider value={value}>
      {children}
    </CardEditorContext.Provider>
  );
};

export function useCardEditor() {
  const ctx = useContext(CardEditorContext);
  if (!ctx) throw new Error("useCardEditor must be within CardEditorProvider");
  return ctx;
}
