import { supabase } from "@/lib/supabase";
import { sbExecMany, sbExecOne } from "@/api/shared/sb-api";
import type { SbResult } from "@/api/shared/sb-api";
import type { Row } from "@/api/shared/types";
import type { StudyCardRow } from "@/api/repository/studyCard.repository";

export type StudySetRow = Row<"study_set">;

export interface StudySetWithCard extends Partial<StudySetRow> {
  study_card: Partial<StudyCardRow>[];
}

export const studySetRepository = {
  findAll: (): SbResult<Partial<StudySetRow>[]> => {
    const builder = supabase.from("study_set").select("id, title, description");
    return sbExecMany(builder);
  },

  findById: (id: string): SbResult<StudySetWithCard> => {
    const builder = supabase
      .from("study_set")
      .select(
        `id,
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
                          )`
      )
      .eq("id", id)
      .single();
    return sbExecOne(builder);
  },
};
