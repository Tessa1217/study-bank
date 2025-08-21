import type { SbResult } from "@/api/shared/sb-api";
import type {
  StudyFolderInsert,
  StudyFolderUpdate,
  StudyFolderRow,
} from "@/api/repository/studyFolder.repository";
import { studyFolderRepository } from "@/api/repository/studyFolder.repository";

export async function getStudyFolders(): SbResult<StudyFolderRow[]> {
  return studyFolderRepository.findAll();
}

export async function getStudyFolder(
  folderId: string
): SbResult<StudyFolderRow> {
  return studyFolderRepository.findById(folderId);
}

export async function createStudyFolder(
  payload: StudyFolderInsert
): SbResult<StudyFolderRow> {
  return studyFolderRepository.create(payload);
}

export async function updateStudyFolder(
  payload: StudyFolderUpdate
): SbResult<StudyFolderRow> {
  return studyFolderRepository.update(payload);
}

export async function deleteStudyFolder(id: string) {
  return studyFolderRepository.deleteById(id);
}
