import { supabase, sbExecMany, sbExecOne } from "@/api/shared/sb-api";
import type { SbResult } from "@/api/shared/sb-api";
import type { Insert } from "@/api/shared/types";

export type StudyFolderSetInsert = Insert<"study_folder_set">;

export type StudyFolderSetDelete = {
  folder_id: string;
  set_id: string;
};

export type StudyFolderSetRelations = {
  card_count: number;
  id: string;
  title: string;
  user_name: string;
  added_to_folder: boolean;
};

export const studyFolderSetRepository = {
  findAll: (folderId: string): SbResult<StudyFolderSetRelations[]> => {
    const builder = supabase.rpc("get_filtered_study_sets", {
      folder_set_relation_yn: true,
      folder_id_param: folderId,
    });
    return sbExecMany(builder);
  },
  findAllAvailable: (
    userId: string,
    folderId: string
  ): SbResult<StudyFolderSetRelations[]> => {
    const builder = supabase.rpc("get_filtered_study_sets", {
      user_id_param: userId,
      folder_id_param: folderId,
      folder_set_relation_yn: false,
      is_public_param: true,
    });
    return sbExecMany(builder);
  },
  create: (payload: StudyFolderSetInsert) => {
    const builder = supabase
      .from("study_folder_set")
      .insert(payload)
      .select()
      .single();
    return sbExecOne(builder);
  },
  deleteById: (payload: StudyFolderSetDelete) => {
    console.log(payload);
    const builder = supabase
      .from("study_folder_set")
      .delete()
      .match({ folder_id: payload.folder_id, set_id: payload.set_id })
      .select();
    return sbExecOne(builder);
  },
};
