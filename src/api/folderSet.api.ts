import {
  studyFolderSetRepository,
  type StudyFolderSetDelete,
  type StudyFolderSetInsert,
} from "@/api/repository/studyFolderSet.repository";

export async function getStudyFolderSets(folderId: string) {
  return studyFolderSetRepository.findAll(folderId);
}

export async function getStudyFolderAvailableSets(
  userId: string,
  folderId: string
) {
  return studyFolderSetRepository.findAllAvailable(userId, folderId);
}

export async function createStudyFolderSet(payload: StudyFolderSetInsert) {
  return studyFolderSetRepository.create(payload);
}

export async function deleteStudyFolderSet(payload: StudyFolderSetDelete) {
  return studyFolderSetRepository.deleteById(payload);
}
