import type { SbResult } from "@/api/shared/sb-api";
import { sbExecMany, sbExecOne, supabase } from "@/api/shared/sb-api";
import type { Row, Insert } from "@/api/shared/types";
export type StudySetRow = Row<"study_set">
type StudySetUpsert = Insert<"study_set">


export async function getStudySet(setId:string):SbResult<StudySetRow> {
  const setBuilder = supabase.from("study_set").select("*").eq("id", setId).single()
  return sbExecOne(setBuilder)
}

export async function upsertStudySet(payload:StudySetUpsert):SbResult<StudySetRow> {
  const setBuilder = supabase.from("study_set").upsert(payload).select().single()
  return sbExecOne(setBuilder)
}