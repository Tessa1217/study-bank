import {
  sbExecMany,
  sbExecOne,
  supabase,
  type SbResult,
} from "@/api/shared/sb-api";
import type { Row, Insert, Update } from "@/api/shared/types";

export type StudyFolderRow = Row<"study_folder">;
export type StudyFolderInsert = Insert<"study_folder">;
export type StudyFolderUpdate = Update<"study_folder">;

export const studyFolderRepository = {
  findAll: (): SbResult<StudyFolderRow[]> => {
    const builder = supabase.from("study_folder").select("*");
    return sbExecMany(builder);
  },
  findById: (id: string): SbResult<StudyFolderRow> => {
    const builder = supabase
      .from("study_folder")
      .select("*")
      .eq("id", id)
      .single();
    return sbExecOne(builder);
  },
  create: (payload: StudyFolderInsert): SbResult<StudyFolderRow> => {
    const builder = supabase
      .from("study_folder")
      .insert(payload)
      .select()
      .single();
    return sbExecOne(builder);
  },
  update: (payload: StudyFolderUpdate): SbResult<StudyFolderRow> => {
    const builder = supabase
      .from("study_folder")
      .update(payload)
      .eq("id", payload.id!)
      .select()
      .single();
    return sbExecOne(builder);
  },
  deleteById: (id: string) => {
    const builder = supabase.from("study_folder").delete().eq("id", id);
    return sbExecOne(builder);
  },
};
