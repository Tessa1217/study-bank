import type { StudySetRow, StudySetWithCard } from "@/api/sets.api";
import type { StudyCardDraft, StudyFolderSummary, StudySetDetail, StudySetSummary } from "@/api/mapper/types";
import type { StudyCardRow } from "@/api/cards.api";
import type { StudyFolderRow } from "@/api/folder.api";

export function toSetDTO(d: {id?: string, title: string, description?: string}) {
  return {
    id: d.id ?? null,
    title: d.title,
    description: d.description ?? null,
  };
}

export function toCardsDTO(cards: StudyCardDraft[]) {
  cards.sort((a, b) => a.sort_order - b.sort_order).forEach((c, i) => (c.sort_order = i + 1));
  return cards.map((c) => ({
    id: c.id ?? null,
    sort_order: c.sort_order,
    word: c.word,
    definition: c.definition,
    word_lang: c.word_lang,
    definition_lang: c.definition_lang,
  }));
}

export function toFolderSummary(row: Partial<StudyFolderRow>):StudyFolderSummary {
  return {
    id: row.id!,
    name: row.name!,
    description: row.description ?? null
  }
}

export function toSetSummary(row: Partial<StudySetRow>):StudySetSummary {
  return {
    id : row.id!,
    title: row.title!,
    description: row.description ?? null,
  }
}

export function toCard(row : Partial<StudyCardRow>) : StudyCardDraft {
  return {
    id : row.id!,
    sort_order: row.sort_order!,
    set_id: row.set_id!,
    word: row.word!,
    definition: row.definition!,
    word_lang: row.word_lang ?? '',
    definition_lang: row.definition_lang ?? ''
  }
}

export function toSetDetail(row: StudySetWithCard):StudySetDetail {
  const cards = (row.study_card ?? [])
                  .map(toCard);
  return {
    id : row.id!,
    title: row.title!,
    description: row.description ?? null,
    cards
  }                    
}