import { v4 as uuid } from 'uuid'
import type { CardAction, Side, StudyCardDraft } from '@/components/set/state/card.types'

export const createCard = (sort_order: number, partial?: Partial<StudyCardDraft>):StudyCardDraft => ({
  id : uuid(),
  set_id: '',
  word: '',
  word_lang: '',
  definition: '',
  definition_lang: '',
  sort_order,
  ...partial
})

export const init = (cards:StudyCardDraft[]): CardAction => ({type : "INIT", payload: cards})
export const addCard = (partial?: Partial<StudyCardDraft>): CardAction => ({ type: "ADD_CARD", payload: partial });
export const updateText = (id: string, side: Side, text: string): CardAction =>
  ({ type: "UPDATE_TEXT", id, side, text });
export const updateLang = (id: string, side:Side, lang: string):CardAction => ({type : "UPDATE_LANG", id, side, lang})
export const removeCard = (id: string): CardAction => ({ type: "REMOVE_CARD", id });
export const reorder = (cards:StudyCardDraft[]): CardAction => ({ type: "REORDER", payload: cards });
export const setActive = (id?: string): CardAction => ({ type: "SET_ACTIVE", id });