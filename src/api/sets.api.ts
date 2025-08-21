import type { StudyCardRow } from "@/api/cards.api";
import { studySetRepository } from "@/api/repository/studySet.repository";
import type { Row } from "@/api/shared/types";

export type StudySetRow = Row<"study_set">;
export interface StudySetWithCard extends Partial<StudySetRow> {
  study_card: Partial<StudyCardRow>[];
}

export async function getStudySets() {
  return studySetRepository.findAll();
}

export async function getStudySetById(setId: string) {
  return studySetRepository.findById(setId);
}
