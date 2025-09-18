import { supabase } from "@/api/shared/sb-api";
import { sbExecOne } from "@/api/shared/sb-api";
import type { Insert, Row } from "@/api/shared/types";

export type StudyMatchGameSessionRow = Row<"study_match_game_session">;
export type StudyMatchGameSessionInsert = Insert<"study_match_game_session">;

export async function insertStudyMatchGameSession(
  payload: StudyMatchGameSessionInsert
) {
  const studyMatchGameSessionBuilder = supabase
    .from("study_match_game_session")
    .upsert(payload)
    .select()
    .single();
  return sbExecOne(studyMatchGameSessionBuilder);
}

export async function getStudyMatchGameSession(setId: string, userId: string) {
  const studyMatchGameSessionBuilder = supabase
    .from("study_match_game_session")
    .select("*")
    .eq("set_id", setId)
    .eq("user_id", userId)
    .select()
    .single();
  return studyMatchGameSessionBuilder;
}
