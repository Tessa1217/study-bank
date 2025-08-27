import { supabase } from "@/lib/supabase";
import { sbExecMany, sbExecOne } from "@/api/shared/sb-api";
import type { SbResult } from "@/api/shared/sb-api";
import type { Row } from "@/api/shared/types";
import type { StudyCardRow } from "@/api/repository/studyCard.repository";
import type { Json } from "@/types/supabase.types";
export type StudySetRow = Row<"study_set">;

export type StudySetWithRelations = {
  card_count: number;
  id: string;
  title: string;
  user_name: string;
};

export interface StudySetWithCard extends Partial<StudySetRow> {
  study_card: Partial<StudyCardRow>[];
}

export const studySetRepository = {
  findAll: (): SbResult<Partial<StudySetRow>[]> => {
    const builder = supabase
      .from("study_set")
      .select("id, title, description, is_public");
    return sbExecMany(builder);
  },

  findAllPublicOrCreatedByUser: (
    userId: string
  ): SbResult<StudySetWithRelations[]> => {
    const builder = supabase.rpc(
      "get_public_or_user_study_sets_with_card_count",
      { user_id_param: userId }
    );
    return sbExecMany(builder);
  },

  findById: (id: string): SbResult<StudySetWithCard> => {
    const builder = supabase
      .from("study_set")
      .select(
        `id,
               title,
               description,
               is_public,
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
