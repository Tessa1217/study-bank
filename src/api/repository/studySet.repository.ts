import { supabase } from "@/lib/supabase";
import { sbExecMany, sbExecOne } from "@/api/shared/sb-api";
import type { SbResult } from "@/api/shared/sb-api";
import type { StudySetRow, StudySetWithCard } from "@/api/sets.api";

export const studySetRepository = {
  findAll: (): SbResult<Partial<StudySetRow>[]> => {
    const builder = supabase.from("study_set").select("id, title, description");
    return sbExecMany(builder);
  },

  findById: (id: string): SbResult<StudySetWithCard> => {
    const builder = supabase
      .from("study_set")
      .select(`id,
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
