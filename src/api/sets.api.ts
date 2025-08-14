import type { StudyCardRow } from "@/api/cards.api";
import type { SbResult } from "@/api/shared/sb-api";
import { sbExecMany, sbExecOne, supabase } from "@/api/shared/sb-api";
import type { Row } from "@/api/shared/types";
export type StudySetRow = Row<"study_set">
export interface StudySetWithCard extends Partial<StudySetRow> {
  study_card : Partial<StudyCardRow>[]
}

export async function getStudySetList():SbResult<Partial<StudySetRow>[]> {
  const setBuilder = supabase.from("study_set").select("id, title, description")
  return sbExecMany(setBuilder)
}

export async function getStudySet(setId:string):SbResult<StudySetWithCard> {
  const setBuilder = supabase.from("study_set")
                             .select(`
                                id,
                                title,
                                description,
                                study_card (
                                  id,
                                  word,                                  
                                  definition,
                                  sort_order,
                                  word_lang,
                                  definition_lang,
                                  set_id
                                )`).eq("id", setId).single()
  return sbExecOne(setBuilder)
}