import { supabase } from "@/api/shared/sb-api";
import { sbExecOne } from "@/api/shared/sb-api";
import type { Insert, Row } from "@/api/shared/types";
export type StudyProgressRow = Row<"study_progress">
export type StudyProgressInsert = Insert<"study_progress">

export async function insertStudyProgress(payload:StudyProgressInsert) {
  const studyProgressBuilder = supabase.from("study_progress").upsert(payload).select().single()
  return sbExecOne(studyProgressBuilder)
}

export async function getStudyProgressBySetId(setId:string) {
  const studyProgressBuilder = supabase.from("study_progress").select("*").eq("set_id", setId).select().single()
  return sbExecOne(studyProgressBuilder)
}