import type { SbResult } from "@/api/shared/sb-api";
import { sbExecMany, supabase } from "@/api/shared/sb-api";
import type { Row, Insert } from "@/api/shared/types";
export type StudyCardRow = Row<"study_card">
type StudyCardUpsert = Insert<"study_card">

export async function getStudyCardList(setId:string):SbResult<StudyCardRow[]> {
  const cardBuilder = supabase.from('study_card').select("*").eq("set_id", setId)
  return sbExecMany(cardBuilder)
}

export async function upsertStudyCard(payload:StudyCardUpsert[]):SbResult<StudyCardRow[]> {
  const cardBuilder = supabase.from("study_card").upsert(payload).select()
  return sbExecMany(cardBuilder)
}