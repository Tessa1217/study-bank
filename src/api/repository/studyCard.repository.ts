import type { SbResult } from "@/api/shared/sb-api";
import { sbExecMany, supabase } from "@/api/shared/sb-api";
import type { Row, Insert } from "@/api/shared/types";

export type StudyCardRow = Row<"study_card">
export type StudyCardUpsert = Insert<"study_card">

export const studyCardRepository = {
  fetchAllBySetId : (setId:string):SbResult<StudyCardRow[]> => {
    const builder = supabase.from("study_card").select("*").eq("set_id", setId)
    return sbExecMany(builder)
  },
  upsertAll : (payloads:StudyCardUpsert[]):SbResult<StudyCardRow[]> => {
    const builder = supabase.from("study_card").upsert(payloads).select()
    return sbExecMany(builder)  
  }
}