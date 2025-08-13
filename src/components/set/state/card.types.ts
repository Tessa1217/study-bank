export type Side = "word" | "definition"

export type StudyCardDraft = {
  id : string;
  set_id: string;
  word: string;
  word_lang: string;
  definition: string;
  definition_lang: string;
  sort_order: number;
}

export type CardState = {
  cards: StudyCardDraft[];
  activeId?: string;
}

export type CardAction =
  | { type: "INIT"; payload: StudyCardDraft[] }
  | { type: "ADD_CARD"; payload?: Partial<StudyCardDraft> }
  | { type: "UPDATE_TEXT"; id: string; side: Side; text: string }
  | {type : "UPDATE_LANG", id: string, side: Side; lang: string }
  | { type: "REMOVE_CARD"; id: string }
  | { type: "REORDER"; payload: StudyCardDraft[] }
  | { type: "SET_ACTIVE"; id?: string };