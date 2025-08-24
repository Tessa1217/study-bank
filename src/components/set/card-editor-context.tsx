import {
  createContext,
  useContext,
  useMemo,
  useReducer,
  useState,
  type Dispatch,
} from "react";
import {
  cardReducer,
  initialCardState,
} from "@/components/set/state/card.reducer";
import type { CardState, CardAction } from "@/components/set/state/card.types";
import {
  validateSet,
  type SetErrors,
  hasErrors,
} from "@/components/set/state/card.validation";

export type StudySet = {
  id?: string;
  title: string;
  description?: string;
  isPublic: boolean;
};

type FirstError =
  | { scope: "set"; field?: string }
  | { scope: "card"; cardId: string; field?: string };

type EditorCtx = {
  state: CardState;
  dispatch: Dispatch<CardAction>;
  actions: {
    init: (cards: CardState["cards"]) => void;
    addCard: (partial?: Partial<CardState["cards"][number]>) => void;
    addBatchCards: (batch?: Partial<CardState["cards"][number]>[]) => void;
    updateWord: (id: string, text: string) => void;
    updateDefinition: (id: string, text: string) => void;
    removeCard: (id: string) => void;
    reorder: (cards: CardState["cards"]) => void;
    setActive: (id?: string) => void;
    setMeta: (meta: StudySet) => void;
    toggleIsPublic: () => void;
    validateNow: () => {
      ok: boolean;
      firstError?: FirstError;
      errors: SetErrors;
    };
    clearErrors: () => void;
  };
  meta: StudySet;
  errors: SetErrors;
  isValid: boolean;
  submitAttempted: boolean;
};

const CardEditorContext = createContext<EditorCtx | null>(null);

interface CardEditorProiderProps {
  children: React.ReactNode;
}

export const CardEditorProvider = ({ children }: CardEditorProiderProps) => {
  const [state, dispatch] = useReducer(cardReducer, initialCardState);
  const [meta, setMeta] = useState<StudySet>({
    title: "",
    description: "",
    isPublic: false,
  });
  const [errors, setErrors] = useState<SetErrors>({ cards: {} });
  const [submitAttempted, setSubmitAttempted] = useState(false);

  /** 첫번째 에러 탐색 */
  const findFirstError = (e: SetErrors): FirstError | undefined => {
    const setFields = Object.keys(e.set ?? {});
    if (setFields.length) return { scope: "set", field: setFields[0] };
    for (const [cardId, fields] of Object.entries(e.cards)) {
      const fs = Object.keys(fields);
      if (fs.length) return { scope: "card", cardId, field: fs[0] };
    }
    return undefined;
  };

  const actions = useMemo(
    () => ({
      init: (cards: CardState["cards"]) =>
        dispatch({ type: "INIT", payload: cards }),
      addCard: (partial?: Partial<CardState["cards"][number]>) =>
        dispatch({ type: "ADD_CARD", payload: partial }),
      addBatchCards: (batch?: Partial<CardState["cards"][number]>[]) =>
        dispatch({ type: "ADD_BATCH_CARDS", payload: batch }),
      updateWord: (id: string, text: string) =>
        dispatch({ type: "UPDATE_TEXT", id, side: "word", text }),
      updateDefinition: (id: string, text: string) =>
        dispatch({ type: "UPDATE_TEXT", id, side: "definition", text }),
      removeCard: (id: string) => dispatch({ type: "REMOVE_CARD", id }),
      reorder: (cards: CardState["cards"]) =>
        dispatch({ type: "REORDER", payload: cards }),
      setActive: (id?: string) => dispatch({ type: "SET_ACTIVE", id }),
      setMeta: (m: StudySet) => setMeta(m),
      toggleIsPublic: () =>
        setMeta((prevMeta) => ({ ...prevMeta, isPublic: !prevMeta.isPublic })),
      validateNow: () => {
        const next = validateSet({ ...meta, cards: state.cards });
        setErrors(next);
        setSubmitAttempted(true);
        const firstError = findFirstError(next);
        return { ok: !hasErrors(next), firstError, errors: next };
      },
      clearErrors: () => {
        setErrors({ cards: {} });
        setSubmitAttempted(false);
      },
    }),
    [meta, state.cards]
  );

  const isValid = useMemo(() => !hasErrors(errors), [errors]);

  const value: EditorCtx = useMemo(
    () => ({
      state,
      dispatch,
      actions,
      meta,
      errors,
      isValid,
      submitAttempted,
    }),
    [state, dispatch, actions, meta, errors, isValid, submitAttempted]
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
