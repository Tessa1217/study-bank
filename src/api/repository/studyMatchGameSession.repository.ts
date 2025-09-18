import { supabase, type SbResult } from "@/api/shared/sb-api";
import { sbExecOne } from "@/api/shared/sb-api";
import type { Insert, Row } from "@/api/shared/types";

export type StudyMatchGameSessionRow = Row<"study_match_game_session">;
export type StudyMatchGameSessionInsert = Insert<"study_match_game_session">;

export const studyMatchGameSessionRepository = {
  create: (
    payload: StudyMatchGameSessionInsert
  ): SbResult<StudyMatchGameSessionRow> => {
    const studyMatchGameSessionBuilder = supabase
      .from("study_match_game_session")
      .upsert(payload)
      .select()
      .single();
    return sbExecOne(studyMatchGameSessionBuilder);
  },
  findStatsBySetIdAndUserId: (setId: string, userId: string) => {
    const studyMatchGameSessionBuilder = supabase.rpc("get_match_game_stats", {
      user_uuid: userId,
      set_uuid: setId,
    });
    return studyMatchGameSessionBuilder;
  },
};
