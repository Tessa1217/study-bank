import type { StudyCardDraft } from "@/api/mapper/types";
export type Side = "word" | "definition"

export type CardState = {
  cards: StudyCardDraft[];
  activeId?: string;
}

export type CardAction =
  | { type: "INIT"; payload: StudyCardDraft[] }
  | { type: "ADD_CARD"; payload?: Partial<StudyCardDraft> }
  | {type : "ADD_BATCH_CARDS"; payload?: Partial<StudyCardDraft>[]}
  | { type: "UPDATE_TEXT"; id: string; side: Side; text: string }
  | {type : "UPDATE_LANG", id: string, side: Side; lang: string }
  | { type: "REMOVE_CARD"; id: string }
  | { type: "REORDER"; payload: StudyCardDraft[] }
  | { type: "SET_ACTIVE"; id?: string };