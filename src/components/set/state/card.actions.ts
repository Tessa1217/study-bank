import { v4 as uuid } from 'uuid'
import type { StudyCardDraft } from '@/api/mapper/types'

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
