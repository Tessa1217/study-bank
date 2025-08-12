import {
  pickDefined,
  sbExecMany,
  sbExecOne,
  supabase,
} from "@/services/shared/supabase-helper";
import type { Row, Insert, Update } from "@/services/shared/types";

type StudyFolderRow = Row<"study_folder">;
type StudyFolderInsert = Insert<"study_folder">;
type StudyFolderUpdate = Update<"study_folder">;

export async function getStudyFolderList(
  userId: string
): Promise<StudyFolderRow[]> {
  const folderBuilder = supabase
    .from("study_folder")
    .select("*")
    .eq("user_id", userId);
  return sbExecMany(folderBuilder);
}

export async function getStudyFolder(
  folderId: string
): Promise<StudyFolderRow> {
  const folderBuilder = supabase
    .from("study_folder")
    .select("*")
    .eq("id", folderId)
    .single();

  return sbExecOne(folderBuilder);
}

export async function insertStudyFolder(
  payload: StudyFolderInsert[]
): Promise<StudyFolderRow[]> {
  const folderBuilder = supabase.from("study_folder").insert(payload).select();
  return sbExecMany(folderBuilder);
}
