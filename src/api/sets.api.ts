import { studySetRepository } from "@/api/repository/studySet.repository";

export async function getStudySets() {
  return studySetRepository.findAll();
}

export async function getStudySetById(setId: string) {
  return studySetRepository.findById(setId);
}
