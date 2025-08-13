import {
  sbExecMany,
  sbExecOne,
  supabase,
  type SbResult,
} from "@/api/shared/sb-api";
import type { Row, Insert, Update } from "@/api/shared/types";

export type StudyFolderRow = Row<"study_folder">;
type StudyFolderInsert = Insert<"study_folder">;
type StudyFolderUpdate = Update<"study_folder">;

export async function getStudyFolderList(): SbResult<StudyFolderRow[]> {
  const folderBuilder = supabase.from("study_folder").select("*");
  return sbExecMany(folderBuilder);
}

export async function getStudyFolder(
  folderId: string
): SbResult<StudyFolderRow> {
  const folderBuilder = supabase
    .from("study_folder")
    .select("*")
    .eq("id", folderId)
    .single();

  return sbExecOne(folderBuilder);
}

export async function insertStudyFolder(
  payload: StudyFolderInsert
): SbResult<StudyFolderRow> {
  const folderBuilder = supabase.from("study_folder").insert(payload).select().single();
  return sbExecOne(folderBuilder);
}
